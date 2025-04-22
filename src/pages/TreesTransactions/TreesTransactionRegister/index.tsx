import { useForm } from 'react-hook-form';

import { Button, Stack } from '@mui/material';
import { Dayjs } from 'dayjs';

import CustomDatePicker from '@/components/CustomDatePicker';
import LabelAndInput from '@/components/LabelAndInput';
import LabelAndSelect from '@/components/LabelAndSelect';
import LabelComponentsLayout from '@/components/LabelComponentsLayout';
import PageLayout from '@/components/PageLayout';
import Title from '@/components/Title';

type TTreesTransactionRegisterInput = {
    farmer: string;
    receipt: Dayjs | null;
    tree: string;
    count: number;
};
const TreesTransactionRegister = () => {
    const methods = useForm<TTreesTransactionRegisterInput>();
    return (
        <Stack>
            <Title title="나무 수령 등록">
                <Button variant="containedGrey">취소</Button>
                <Button variant="containedBlue">등록</Button>
            </Title>
            <PageLayout gap={'27px'}>
                <LabelAndSelect
                    sx={{ width: '300px' }}
                    labelValue="농부"
                    selectArr={[
                        { label: '농부1', value: '1' },
                        { label: '농부2', value: '2' },
                    ]}
                    control={methods.control}
                    fieldName="farmer"
                    placeholder="선택"
                />
                <LabelComponentsLayout labelValue="수령 일자">
                    <CustomDatePicker
                        value={methods.watch('receipt')}
                        onChange={(newValue: Dayjs | null) => methods.setValue('receipt', newValue)}
                    />
                </LabelComponentsLayout>
                <LabelAndInput
                    labelValue="나무 종"
                    fieldName="tree"
                    register={methods.register}
                    placeholder="나무 종에 대해서 입력해주세요."
                />
                <LabelAndInput
                    labelValue="수량"
                    fieldName="count"
                    register={methods.register}
                    placeholder="수량을 입력해주세요."
                />
            </PageLayout>
        </Stack>
    );
};

export default TreesTransactionRegister;
