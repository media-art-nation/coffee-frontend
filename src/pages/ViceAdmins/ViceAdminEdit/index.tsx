import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { Button, Stack, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import { useGetViceAdminDetails } from '@/apis/AppUser/useGetViceAdminDetails';
import { useUpdateViceAdminDetails } from '@/apis/AppUser/useUpdateViceAdminDetails';
import { useGetArea } from '@/apis/Area/useGetArea';
import { QUERY_KEYS } from '@/apis/QueryKeys';
import AddPhoto from '@/components/AddPhoto';
import LabelAndInput from '@/components/LabelAndInput';
import LabelAndSelect from '@/components/LabelAndSelect';
import PageLayout from '@/components/PageLayout';
import Title from '@/components/Title';
import { useDialog } from '@/hooks/useDialog';

type TViceAdminDetailsInput = {
    viceAdminId: number;
    username: string;
    userId: string;
    areaId: string;
    idCardFile: File | null;
};
const ViceAdminEdit = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const { openDialog } = useDialog();
    const { id } = useParams();
    const { data: viceAdminDetail } = useGetViceAdminDetails(id);
    const { mutateAsync: updateViceAdmin } = useUpdateViceAdminDetails();
    const { data: getAreaList } = useGetArea();
    const navigate = useNavigate();
    const methods = useForm<TViceAdminDetailsInput>({
        defaultValues: {
            viceAdminId: Number(id),
            username: viceAdminDetail?.username || '',
            userId: viceAdminDetail?.userId || '',
            idCardFile: null,
            areaId: String(viceAdminDetail?.areaInfo.areaId || ''),
        },
    });
    const onSubmitEdit = (data: TViceAdminDetailsInput) => {
        updateViceAdmin({ ...data, areaId: Number(data.areaId) })
            .then((res) => {
                if (res.data.code === 'SUCCESS') {
                    queryClient.invalidateQueries({
                        queryKey: QUERY_KEYS.APP_USER.getViceAdminDetail(JSON.stringify(id)),
                    });
                    openDialog({
                        title: t('부관리자 수정 완료'),
                        variant: 'confirm',
                        primaryAction: {
                            name: t('확인'),
                            onClick: () => {
                                navigate(`/vice-admins/${id}`);
                            },
                        },
                    });
                }
            })
            .catch((err) => {
                openDialog({
                    title: t('부관리자 수정 실패'),
                    description: `${t('에러')} : ${err}.\n 관리자에게 문의 바랍니다.`,
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
    return (
        <Stack>
            <Title title={t('부관리자 정보 수정')}>
                <Button
                    variant="containedGrey"
                    sx={{ width: '86px', wordBreak: 'keep-all' }}
                    onClick={() => navigate(`/vice-admins/${id}`)}
                >
                    {t('취소')}
                </Button>
                <Button
                    variant="containedBlue"
                    sx={{ width: '86px', wordBreak: 'keep-all' }}
                    onClick={() => methods.handleSubmit(onSubmitEdit)()}
                >
                    {t('수정')}
                </Button>
            </Title>
            <PageLayout gap={'27px'}>
                <LabelAndInput
                    register={methods.register}
                    labelValue={t('이름')}
                    fieldName="username"
                    placeholder={t('이름을 입력해주세요.')}
                />
                <LabelAndInput
                    register={methods.register}
                    labelValue={t('아이디')}
                    fieldName="userId"
                    disabled={true}
                    placeholder={t('아이디를 입력해주세요.')}
                />
                <LabelAndSelect
                    control={methods.control}
                    labelValue={t('관리 지역')}
                    fieldName="areaId"
                    selectArr={
                        getAreaList?.map((area) => {
                            return { value: String(area.id), label: area.areaName };
                        }) || []
                    }
                    placeholder={t('관리 지역을 선택해주세요.')}
                />
                <Stack gap={'27px'}>
                    <Typography variant="title/medium">ID Card</Typography>
                    <AddPhoto
                        fieldName="idCardFile"
                        currentUrl={viceAdminDetail?.idCardUrl || ''}
                        watch={methods.watch}
                        setValue={methods.setValue}
                    />
                </Stack>
            </PageLayout>
        </Stack>
    );
};

export default ViceAdminEdit;
