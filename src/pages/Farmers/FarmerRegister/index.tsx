import { useForm } from 'react-hook-form';

import { Button, Stack, Typography } from '@mui/material';

import AddPhoto from '@/components/AddPhoto';
import LabelAndInput from '@/components/LabelAndInput';
import LabelAndSelect from '@/components/LabelAndSelect';
import PageLayout from '@/components/PageLayout';
import Title from '@/components/Title';

interface TFarmerRegister {
    villageHead: string;
    farmerName: string;
    farmerId: string;
    photo: File | null;
}
const FarmerRegister = () => {
    const methods = useForm<TFarmerRegister>({
        defaultValues: { villageHead: '1', farmerName: '', farmerId: '', photo: null },
    });
    const onSubmit = (data: TFarmerRegister) => {
        console.log('제출 데이터:', data);
    };
    return (
        <Stack>
            <Title title="농부 등록">
                <Button variant="containedGrey">취소</Button>
                <Button
                    variant="containedBlue"
                    onClick={() => {
                        methods.handleSubmit(onSubmit)();
                    }}
                >
                    등록
                </Button>
            </Title>
            <PageLayout gap={'27px'}>
                <LabelAndSelect
                    labelValue="면장"
                    control={methods.control}
                    fieldName="villageHead"
                    placeholder="면장 선택"
                    selectArr={[
                        { value: '1', label: '면장1' },
                        { value: '2', label: '면장2' },
                    ]}
                />
                <Stack gap={'30px'}>
                    <Typography fontSize={'14px'}>사진</Typography>
                    <AddPhoto fieldName="photo" watch={methods.watch} setValue={methods.setValue} />
                </Stack>
                <LabelAndInput
                    labelValue="이름"
                    placeholder="이름을 적어주세요."
                    register={methods.register}
                    fieldName="farmerName"
                />
                <LabelAndInput
                    labelValue="아이디"
                    placeholder="아이디를 적어주세요."
                    register={methods.register}
                    fieldName="farmerId"
                />
            </PageLayout>
        </Stack>
    );
};

export default FarmerRegister;
