import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Close } from '@mui/icons-material';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import { useSignUpUrl } from '@/apis/AppUser/useSignUpUrl';
import { useGetArea } from '@/apis/Area/useGetArea';
import { QUERY_KEYS } from '@/apis/QueryKeys';
import LabelAndInput from '@/components/LabelAndInput';
import LabelAndSelect from '@/components/LabelAndSelect';
import LabelComponentsLayout from '@/components/LabelComponentsLayout';
import { GcsDirectoryEnum } from '@/typings/Gcs';
import { RoleEnum, TRole } from '@/typings/User';
import { showToast } from '@/utils/showToast';
import AddPhotoWithGcs from '@/components/AddPhotoWithGcs';
import LabelAndPasswordInput from '@/components/LabelAndPasswordInput';

type TCreateViceAdminForm = {
    userId: string;
    username: string;
    password: string;
    role: TRole;
    areaId: number | null;
    identificationPhotoUrl: string | null;
};

type CreateViceAdminDialogProps = {
    open: boolean;
    onClose: () => void;
};

export const CreateViceAdminDialog = ({ open, onClose }: CreateViceAdminDialogProps) => {
    const { t } = useTranslation();

    const handleClose = () => {
        onClose();
    };

    const queryClient = useQueryClient();
    const { mutateAsync: signUpUrl } = useSignUpUrl();
    const { data: getAreaList } = useGetArea();
    const { control, handleSubmit, register } = useForm<TCreateViceAdminForm>({
        defaultValues: {
            userId: '',
            username: '',
            password: '',
            role: RoleEnum.VICE_ADMIN_HEAD_OFFICER,
        },
    });

    const onSubmit = async (formData: TCreateViceAdminForm) => {
        try {
            const res = await signUpUrl({
                ...formData,
                areaId: formData.areaId ? Number(formData.areaId) : null,
                identificationPhotoUrl: formData.identificationPhotoUrl || null,
            });
            if (res.code === 'SUCCESS') {
                showToast.success(t('부관리자 등록 성공'));
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.APP_USER.getViceAdminList(),
                });
                handleClose();
            } else {
                showToast.error(res.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{t('부관리자 등록')}</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <Close />
            </IconButton>
            <DialogContent>
                <Stack gap={'12px'}>
                    <LabelComponentsLayout labelValue={t('ID Card')}>
                        <Controller
                            control={control}
                            name="identificationPhotoUrl"
                            render={({ field }) => (
                                <AddPhotoWithGcs
                                    value={field.value}
                                    onChange={field.onChange}
                                    directory={GcsDirectoryEnum.VICE_ADMIN}
                                />
                            )}
                        />
                    </LabelComponentsLayout>

                    <LabelAndSelect
                        control={control}
                        labelValue={t('권한')}
                        fieldName="role"
                        selectArr={[
                            { value: RoleEnum.VICE_ADMIN_HEAD_OFFICER, label: t('부관리자(한국지사)') },
                            { value: RoleEnum.VICE_ADMIN_AGRICULTURE_MINISTRY_OFFICER, label: t('부관리자(농림부)') },
                        ]
                        }
                        placeholder={t('관리 지역을 선택해주세요.')}
                    />
                    <LabelAndInput
                        register={register}
                        labelValue={t('이름')}
                        fieldName="username"
                        placeholder={t('이름을 입력해주세요.')}
                    />
                    <LabelAndInput
                        register={register}
                        labelValue={t('아이디')}
                        fieldName="userId"
                        placeholder={t('아이디를 입력해주세요.')}
                    />
                    <LabelAndPasswordInput
                        sx={{ width: '100%' }}
                        fieldName="password"
                        register={register}
                        labelValue={t('비밀번호')}
                        placeholder={t('비밀번호를 입력해주세요.')}
                    />
                    <LabelAndSelect
                        control={control}
                        labelValue={t('관리 지역')}
                        fieldName="areaId"
                        selectArr={[
                            { value: '', label: `${t('미할당')}` },
                            ...(getAreaList?.map((area) => {
                                return { value: String(area.id), label: area.areaName };
                            }) || []),
                        ]}
                        placeholder={t('관리 지역을 선택해주세요.')}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} sx={{ flex: 1 }} variant="containedGrey">
                    {t('취소')}
                </Button>
                <Button
                    onClick={handleSubmit(onSubmit)}
                    form="edit-vice-admin-form"
                    variant="containedBlue"
                    sx={{ flex: 1 }}
                >
                    {t('확인')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
