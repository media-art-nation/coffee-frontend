import { useForm } from 'react-hook-form';

import { Button, Stack, TextField, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import {
    CreateApprovalVillageHeadRegisterReq,
    useCreateApprovalVillageHeadRegister,
} from '@/apis/Approval/useCreateApprovalVillageHeadRegister';
import { useGetArea } from '@/apis/Area/useGetArea';
import { QUERY_KEYS } from '@/apis/QueryKeys';
import LabelAndInput from '@/components/LabelAndInput';
import LabelAndSelect from '@/components/LabelAndSelect';
import LabelAndSelectFile from '@/components/LabelAndSelectFile';
import PageLayout from '@/components/PageLayout';
import Title from '@/components/Title';

const VillageHeadRegister = () => {
    const { data: areaData } = useGetArea();
    const { mutateAsync: createVillageHead } = useCreateApprovalVillageHeadRegister();
    const queryClient = useQueryClient();
    const methods = useForm<CreateApprovalVillageHeadRegisterReq>();
    const onSubmit = (data: CreateApprovalVillageHeadRegisterReq) => {
        createVillageHead(data).then((res) => {
            if (res?.data?.code === 'SUCCESS') {
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.APP_USER.getVillageHeadList(),
                });
            }
        });
    };
    return (
        <Stack>
            <Title title="면장 등록">
                <Button variant="containedGrey" sx={{ width: '86px', wordBreak: 'keep-all' }}>
                    취소
                </Button>
                <Button
                    variant="containedBlue"
                    sx={{ width: '86px', wordBreak: 'keep-all' }}
                    onClick={() => methods.handleSubmit(onSubmit)()}
                >
                    등록
                </Button>
            </Title>
            <PageLayout gap={'10px'}>
                <LabelAndSelect
                    labelValue="관리 지역"
                    fieldName="sectionId"
                    control={methods.control}
                    placeholder={'관리 지역'}
                    selectArr={
                        areaData?.map((area) => {
                            return { value: String(area.id), label: area.areaName };
                        }) || []
                    }
                />
                <LabelAndInput
                    labelValue="이름"
                    fieldName="username"
                    register={methods.register}
                    placeholder="이름"
                />
                <LabelAndInput
                    labelValue="아이디"
                    fieldName="userId"
                    register={methods.register}
                    placeholder="ID"
                />
                <LabelAndInput
                    labelValue="패스워드"
                    fieldName="password"
                    register={methods.register}
                    placeholder="password"
                />
                <Stack sx={{ gap: '12px' }}>
                    <Typography sx={{ fontSize: '14px' }}>계좌 정보</Typography>
                    <Stack direction={'row'} gap="15px">
                        <TextField {...methods.register('bankName')} placeholder={'은행명'} />
                        <TextField
                            sx={{ width: '500px' }}
                            {...methods.register('accountInfo')}
                            placeholder={'계좌 번호'}
                        />
                    </Stack>
                </Stack>
                <LabelAndSelectFile
                    labelValue="신분증"
                    fieldName={'identificationPhoto'}
                    watch={methods.watch}
                    setValue={methods.setValue}
                />
                <LabelAndSelectFile
                    labelValue="계약서"
                    fieldName={'contractFile'}
                    watch={methods.watch}
                    setValue={methods.setValue}
                />
                <LabelAndSelectFile
                    labelValue="통장 사본"
                    fieldName={'bankbookPhoto'}
                    watch={methods.watch}
                    setValue={methods.setValue}
                />
            </PageLayout>
        </Stack>
    );
};

export default VillageHeadRegister;
