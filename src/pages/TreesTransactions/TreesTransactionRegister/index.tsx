import { useForm } from 'react-hook-form';

import { Button, Stack } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

import {
    TApprovalTreeTransactionInput,
    useCreateApprovalTreeTransaction,
} from '@/apis/Approval/useCreateApprovalTreeTransaction';
import { useGetFarmerList } from '@/apis/Farmer/useGetFarmerList';
import CustomDatePicker from '@/components/CustomDatePicker';
import LabelAndInput from '@/components/LabelAndInput';
import LabelAndSelect from '@/components/LabelAndSelect';
import LabelComponentsLayout from '@/components/LabelComponentsLayout';
import PageLayout from '@/components/PageLayout';
import Title from '@/components/Title';

const TreesTransactionRegister = () => {
    const { mutateAsync } = useCreateApprovalTreeTransaction();
    const { data: farmerList } = useGetFarmerList();
    const methods = useForm<TApprovalTreeTransactionInput>();
    const onSubmit = (data: TApprovalTreeTransactionInput) => {
        console.log('제출 데이터:', data);
        mutateAsync({ param: data, approverId: 1 });
    };
    return (
        <Stack>
            <Title title="나무 수령 등록">
                <Button variant="containedGrey">취소</Button>
                <Button variant="containedBlue" onClick={() => methods.handleSubmit(onSubmit)()}>
                    등록
                </Button>
            </Title>
            <PageLayout gap={'27px'}>
                <LabelAndSelect
                    sx={{ width: '300px' }}
                    labelValue="농부"
                    selectArr={
                        farmerList?.map((farmer) => {
                            return { value: farmer.id.toString(), label: farmer.farmerName };
                        }) || []
                    }
                    control={methods.control}
                    fieldName="farmerId"
                    placeholder="선택"
                />
                <LabelComponentsLayout labelValue="수령 일자">
                    <CustomDatePicker
                        value={dayjs(methods.watch('receivedDate'))}
                        onChange={(newValue: Dayjs | null) =>
                            methods.setValue(
                                'receivedDate',
                                newValue?.format('YYYY-MM-DD').toString() || ''
                            )
                        }
                    />
                </LabelComponentsLayout>
                <LabelAndInput
                    labelValue="나무 종"
                    fieldName="species"
                    register={methods.register}
                    placeholder="나무 종에 대해서 입력해주세요."
                />
                <LabelAndInput
                    labelValue="수량"
                    fieldName="quantity"
                    register={methods.register}
                    placeholder="수량을 입력해주세요."
                />
            </PageLayout>
        </Stack>
    );
};

export default TreesTransactionRegister;
