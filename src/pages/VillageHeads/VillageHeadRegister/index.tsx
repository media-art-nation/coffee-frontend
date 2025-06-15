import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

import { Button, Stack, TextField, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import { useGetVillageHeadDetails } from '@/apis/AppUser/useGetVillageHeadDetails';
import {
    CreateApprovalVillageHeadRegisterReq,
    useCreateApprovalVillageHeadRegister,
} from '@/apis/Approval/useCreateApprovalVillageHeadRegister';
import { useUpdateApprovalVillageHead } from '@/apis/Approval/useUpdateApprovalVillageHead';
import { useGetArea } from '@/apis/Area/useGetArea';
import { QUERY_KEYS } from '@/apis/QueryKeys';
import AddPhoto from '@/components/AddPhoto';
import LabelAndInput from '@/components/LabelAndInput';
import LabelAndSelect from '@/components/LabelAndSelect';
import LabelAndSelectFile from '@/components/LabelAndSelectFile';
import PageLayout from '@/components/PageLayout';
import Title from '@/components/Title';
import { useDialog } from '@/hooks/useDialog';

const VillageHeadRegister = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { openDialog } = useDialog();
    const { data: villageHead } = useGetVillageHeadDetails(id);
    const { data: areaData } = useGetArea();
    const { mutateAsync: createVillageHead } = useCreateApprovalVillageHeadRegister();
    const { mutateAsync: updateVillageHead } = useUpdateApprovalVillageHead();
    const queryClient = useQueryClient();
    const methods = useForm<CreateApprovalVillageHeadRegisterReq>({
        defaultValues: {
            userId: villageHead?.userId,
            username: villageHead?.username,
            accountInfo: villageHead?.accountInfo,
        },
    });
    const onSubmit = (data: CreateApprovalVillageHeadRegisterReq) => {
        createVillageHead(data)
            .then((res) => {
                if (res?.data?.code === 'SUCCESS') {
                    queryClient.invalidateQueries({
                        queryKey: QUERY_KEYS.APP_USER.getVillageHeadList(),
                    });
                    openDialog({
                        title: '면장 등록 요청을 성공했습니다.',
                        description: '관리자가 요청 승인 후 목록에서 확인가능합니다.',
                        variant: 'confirm',
                        primaryAction: {
                            name: '확인',
                            onClick: () => {
                                methods.reset();
                            },
                        },
                    });
                }
            })
            .catch((err) => {
                openDialog({
                    title: '면장 등록 요청에 실패하였습니다.',
                    description: `에러 : ${err}.\n 관리자에게 문의 바랍니다.`,
                    variant: 'alert',
                    primaryAction: {
                        name: '확인',
                        onClick: () => {
                            methods.reset();
                        },
                    },
                });
            });
    };

    const onSubmitEdit = (data: CreateApprovalVillageHeadRegisterReq) => {
        if (id) {
            updateVillageHead({ ...data, appUserId: id || '' }) //[TODO] appUserId에는 어떤 값이 들어가야 되는지 확인 필요.
                .then((res) => {
                    if (res?.data?.code === 'SUCCESS') {
                        queryClient.invalidateQueries({
                            queryKey: QUERY_KEYS.APP_USER.getVillageHeadDetail(JSON.stringify(id)),
                        });
                        openDialog({
                            title: '면장 수정 요청을 성공했습니다.',
                            description: '관리자가 요청 승인 후 확인가능합니다.',
                            variant: 'confirm',
                            primaryAction: {
                                name: '확인',
                                onClick: () => {
                                    methods.reset();
                                },
                            },
                        });
                    }
                })
                .catch((err) => {
                    openDialog({
                        title: '면장 수정 요청에 실패하였습니다.',
                        description: `에러 : ${err}.\n 관리자에게 문의 바랍니다.`,
                        variant: 'alert',
                        primaryAction: {
                            name: '확인',
                            onClick: () => {
                                methods.reset();
                            },
                        },
                    });
                });
        }
    };

    return (
        <Stack>
            <Title title={id ? '면장 정보 수정' : '면장 등록'}>
                <Button
                    variant="containedGrey"
                    sx={{ width: '86px', wordBreak: 'keep-all' }}
                    onClick={() => navigate(`/village-heads/${id}`)}
                >
                    취소
                </Button>
                {id ? (
                    <Button
                        variant="containedBlue"
                        sx={{ width: '86px', wordBreak: 'keep-all' }}
                        onClick={() => methods.handleSubmit(onSubmitEdit)()}
                    >
                        수정
                    </Button>
                ) : (
                    <Button
                        variant="containedBlue"
                        sx={{ width: '86px', wordBreak: 'keep-all' }}
                        onClick={() => methods.handleSubmit(onSubmit)()}
                    >
                        등록
                    </Button>
                )}
            </Title>
            <PageLayout gap={'10px'}>
                <Stack gap={'10px'}>
                    <Typography>Add Photo</Typography>
                    <AddPhoto fieldName="photo" watch={methods.watch} setValue={methods.setValue} />
                </Stack>
                <LabelAndSelect
                    labelValue="관리 세션"
                    fieldName="sectionId"
                    control={methods.control}
                    placeholder={'관리 세션'}
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
