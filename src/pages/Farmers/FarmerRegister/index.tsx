import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Stack, Typography } from '@mui/material';

import { useGetVillageHeadList } from '@/apis/AppUser/useGetVillageHeadList';
import {
    CreateApprovalFarmerRegisterReq,
    useCreateApprovalFarmerRegister,
} from '@/apis/Approval/useCreateApprovalFarmerRegister';
import { QUERY_KEYS } from '@/apis/QueryKeys';
import { queryClient } from '@/apis/axiosInstance';
import AddPhoto from '@/components/AddPhoto';
import LabelAndInput from '@/components/LabelAndInput';
import LabelAndSelect from '@/components/LabelAndSelect';
import PageLayout from '@/components/PageLayout';
import Title from '@/components/Title';
import { useDialog } from '@/hooks/useDialog';

const FarmerRegister = () => {
    const { t } = useTranslation();
    const { openDialog } = useDialog();
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
        farmerRegisterMutateAsync(data)
            .then((res) => {
                if (res.data.code === 'SUCCESS') {
                    queryClient.invalidateQueries({
                        queryKey: QUERY_KEYS.FARMER.getFarmerList(),
                    });
                    openDialog({
                        title: t('농부 등록 요청 성공'),
                        description: t('관리자가 요청 승인 후 목록에서 확인가능합니다.'),
                        variant: 'confirm',
                        primaryAction: {
                            name: t('확인'),
                            onClick: () => {
                                methods.reset();
                            },
                        },
                    });
                    return;
                }
                openDialog({
                    title: t('농부 등록 요청 실패'),
                    description: t('권한 확인 또는 관리자에게 문의해주세요.'),
                    variant: 'alert',
                    primaryAction: {
                        name: t('확인'),
                        onClick: () => {},
                    },
                });
            })
            .catch((err) => {
                openDialog({
                    title: t('농부 등록 요청 실패'),
                    description: `${t('에러')} : ${err}.\n 관리자에게 문의 바랍니다.`,
                    variant: 'alert',
                    primaryAction: {
                        name: t('확인'),
                        onClick: () => {
                            methods.reset();
                        },
                    },
                });
            });
    };
    return (
        <Stack>
            <Title title={t('농부 등록')}>
                <Button variant="containedGrey">{t('취소')}</Button>
                <Button
                    variant="containedBlue"
                    onClick={() => {
                        methods.handleSubmit(onSubmit)();
                    }}
                >
                    {t('등록')}
                </Button>
            </Title>
            <PageLayout gap={'27px'}>
                <LabelAndSelect
                    labelValue={t('면장')}
                    control={methods.control}
                    fieldName="villageHeadId"
                    placeholder={t('면장 선택')}
                    selectArr={
                        villageHeadList?.map((head) => {
                            return { value: String(head.id), label: head.appUserName };
                        }) || []
                    }
                />
                <Stack gap={'12px'}>
                    <Typography fontSize={'16px'} fontWeight={700}>
                        {t('사진')}
                    </Typography>
                    <AddPhoto
                        fieldName="identificationPhoto"
                        watch={methods.watch}
                        setValue={methods.setValue}
                    />
                </Stack>
                <LabelAndInput
                    labelValue={t('이름')}
                    placeholder={t('이름')}
                    register={methods.register}
                    fieldName="name"
                />
                {/*[TODO] 문의 필요 */}
                {/* <LabelAndInput
                    labelValue={t("아이디")}
                    placeholder={t('아이디')}
                    register={methods.register}
                    fieldName="farmerId"
                /> */}
            </PageLayout>
        </Stack>
    );
};

export default FarmerRegister;
