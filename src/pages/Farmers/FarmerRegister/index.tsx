import { useForm } from 'react-hook-form';

import { Button, Stack, Typography } from '@mui/material';

import { useGetVillageHeadList } from '@/apis/AppUser/useGetVillageHeadList';
import {
    CreateApprovalFarmerRegisterReq,
    useCreateApprovalFarmerRegister,
} from '@/apis/Approval/useCreateApprovalFarmerRegister';
import AddPhoto from '@/components/AddPhoto';
import LabelAndInput from '@/components/LabelAndInput';
import LabelAndSelect from '@/components/LabelAndSelect';
import PageLayout from '@/components/PageLayout';
import Title from '@/components/Title';

const FarmerRegister = () => {
    const { data: villageHeadList } = useGetVillageHeadList();
    const { mutateAsync: farmerRegisterMutateAsync } = useCreateApprovalFarmerRegister();
    const methods = useForm<CreateApprovalFarmerRegisterReq>({
        defaultValues: {
            villageHeadId: null,
            name: '',
            approverId: null,
            identificationPhoto: null,
        },
    });
    const onSubmit = (data: CreateApprovalFarmerRegisterReq) => {
        console.log('제출 데이터:', data);
        farmerRegisterMutateAsync(data);
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
                    fieldName="villageHeadId"
                    placeholder="면장 선택"
                    selectArr={
                        villageHeadList?.map((head) => {
                            return { value: String(head.id), label: head.appUserName };
                        }) || []
                    }
                />
                <Stack gap={'30px'}>
                    <Typography fontSize={'14px'}>사진</Typography>
                    <AddPhoto
                        fieldName="identificationPhoto"
                        watch={methods.watch}
                        setValue={methods.setValue}
                    />
                </Stack>
                <LabelAndInput
                    labelValue="이름"
                    placeholder="이름을 적어주세요."
                    register={methods.register}
                    fieldName="name"
                />
                {/*[TODO] 문의 필요 */}
                {/* <LabelAndInput
                    labelValue="아이디"
                    placeholder="아이디를 적어주세요."
                    register={methods.register}
                    fieldName="farmerId"
                /> */}
            </PageLayout>
        </Stack>
    );
};

export default FarmerRegister;
