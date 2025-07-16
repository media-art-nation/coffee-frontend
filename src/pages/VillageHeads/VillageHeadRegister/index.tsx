import React from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { Button, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useQueryClient } from '@tanstack/react-query';

import { getCookies } from '@/apis/AppUser/cookie';
import { useGetVillageHeadDetails } from '@/apis/AppUser/useGetVillageHeadDetails';
import {
    CreateApprovalVillageHeadRegisterReq,
    useCreateApprovalVillageHeadRegister,
} from '@/apis/Approval/useCreateApprovalVillageHeadRegister';
import { useUpdateApprovalVillageHead } from '@/apis/Approval/useUpdateApprovalVillageHead';
import { useGetArea } from '@/apis/Area/useGetArea';
import { useGetMyArea } from '@/apis/Area/useGetMyArea';
import { useGetSectionList } from '@/apis/Area/useGetSectionList';
import { QUERY_KEYS } from '@/apis/QueryKeys';
import AddPhoto from '@/components/AddPhoto';
import LabelAndInput from '@/components/LabelAndInput';
import LabelAndSelect from '@/components/LabelAndSelect';
import LabelAndSelectFile from '@/components/LabelAndSelectFile';
import LabelComponentsLayout from '@/components/LabelComponentsLayout';
import PageLayout from '@/components/PageLayout';
import Title from '@/components/Title';
import { useDialog } from '@/hooks/useDialog';
import { containerStyle } from '@/pages/Locations/LocationRegister';

type CreateApprovalVillageHeadRegisterForm = Omit<
    CreateApprovalVillageHeadRegisterReq,
    'sectionId'
> & { sectionId: string };
const VillageHeadRegister = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { id } = useParams();
    const { openDialog } = useDialog();
    const { data: villageHead } = useGetVillageHeadDetails(id);
    const { mutateAsync: createVillageHead } = useCreateApprovalVillageHeadRegister();
    const { mutateAsync: updateVillageHead } = useUpdateApprovalVillageHead();
    const { data: myArea } = useGetMyArea();
    const { data: getAreaList } = useGetArea();
    const [selectArea, setSelectArea] = React.useState<string>();
    const { data: sectionList } = useGetSectionList(
        myArea?.id ?? (selectArea ? Number(selectArea) : undefined)
    );
    const role = getCookies('role');
    const queryClient = useQueryClient();
    const methods = useForm<CreateApprovalVillageHeadRegisterForm>({
        defaultValues: {
            userId: villageHead?.userId,
            username: villageHead?.username,
            accountInfo: villageHead?.accountInfo,
            sectionId: JSON.stringify(villageHead?.sectionInfo.sectionId),
        },
    });
    const onSubmit = (data: CreateApprovalVillageHeadRegisterForm, mode: 'edit' | 'create') => {
        const submit = mode === 'edit' ? updateVillageHead : createVillageHead;
        submit({ ...data, sectionId: Number(data.sectionId), appUserId: id || '' })
            .then((res) => {
                if (res?.data?.code === 'SUCCESS') {
                    queryClient.invalidateQueries({
                        queryKey: QUERY_KEYS.APP_USER.getVillageHeadList(),
                    });
                    openDialog({
                        title:
                            mode === 'edit' ? t('면장 수정 요청 성공') : t('면장 등록 요청 성공'),
                        description:
                            mode === 'edit'
                                ? t('관리자가 수정 승인 후 목록에서 확인 가능합니다.')
                                : t('관리자가 요청 승인 후 목록에서 확인 가능합니다.'),
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
                    title: mode === 'edit' ? t('면장 수정 요청 실패') : t('면장 등록 요청 실패'),
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
                    title: mode === 'edit' ? t('면장 수정 요청 실패') : t('면장 등록 요청 실패'),
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

    const sectionInfo = sectionList?.[0].sections.find(
        (section) => String(section.id) === methods.watch('sectionId')
    );

    return (
        <Stack>
            <Title title={id ? t('면장 정보 수정') : t('면장 등록')}>
                <Button
                    variant="containedGrey"
                    sx={{ width: '86px', wordBreak: 'keep-all' }}
                    onClick={() => navigate(`/village-heads/${id}`)}
                >
                    {t('취소')}
                </Button>
                {id ? (
                    <Button
                        variant="containedBlue"
                        sx={{ width: '86px', wordBreak: 'keep-all' }}
                        onClick={() => methods.handleSubmit((data) => onSubmit(data, 'edit'))()}
                    >
                        {t('수정')}
                    </Button>
                ) : (
                    <Button
                        variant="containedBlue"
                        sx={{ width: '86px', wordBreak: 'keep-all' }}
                        onClick={() => methods.handleSubmit((data) => onSubmit(data, 'create'))()}
                    >
                        {t('등록')}
                    </Button>
                )}
            </Title>
            <PageLayout gap={'27px'}>
                <Stack gap={'12px'}>
                    <Typography fontSize={'16px'} fontWeight={700}>
                        {t('사진')}
                    </Typography>
                    <AddPhoto
                        fieldName={'identificationPhoto'}
                        watch={methods.watch}
                        setValue={methods.setValue}
                    />
                </Stack>
                {role === 'ADMIN' && (
                    <LabelComponentsLayout labelValue={'지역'}>
                        <Select value={selectArea} onChange={(e) => setSelectArea(e.target.value)}>
                            {getAreaList?.map((area) => (
                                <MenuItem value={String(area.id)}>{area.areaName}</MenuItem>
                            ))}
                        </Select>
                    </LabelComponentsLayout>
                )}
                <LabelAndSelect
                    labelValue={t('관리 섹션')}
                    fieldName="sectionId"
                    control={methods.control}
                    placeholder={t('관리 섹션')}
                    selectArr={
                        sectionList?.[0].sections?.map((section) => {
                            return { value: String(section.id), label: section.sectionName };
                        }) || []
                    }
                />
                <Stack>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={{
                            lat: sectionInfo?.latitude || 0,
                            lng: sectionInfo?.longitude || 0,
                        }}
                        zoom={13}
                    >
                        <Marker
                            position={{
                                lat: sectionInfo?.latitude || 0,
                                lng: sectionInfo?.longitude || 0,
                            }}
                        />
                    </GoogleMap>
                </Stack>
                <LabelAndInput
                    labelValue={t('이름')}
                    fieldName="username"
                    register={methods.register}
                    placeholder={t('이름을 입력해주세요.')}
                />
                <LabelAndInput
                    labelValue={t('아이디')}
                    fieldName="userId"
                    register={methods.register}
                    placeholder={t('아이디를 입력해주세요.')}
                />
                <LabelAndInput
                    labelValue={t('비밀번호')}
                    fieldName="password"
                    register={methods.register}
                    placeholder={t('비밀번호를 입력해주세요.')}
                />
                <Stack sx={{ gap: '12px' }}>
                    <Typography sx={{ fontSize: '14px' }}>{t('계좌 정보')}</Typography>
                    <Stack direction={'row'} gap="15px">
                        <TextField {...methods.register('bankName')} placeholder={t('은행명')} />
                        <TextField
                            sx={{ width: '500px' }}
                            {...methods.register('accountInfo')}
                            placeholder={t('계좌 번호')}
                        />
                    </Stack>
                </Stack>
                <LabelAndSelectFile
                    labelValue={t('계약서')}
                    fieldName={'contractFile'}
                    watch={methods.watch}
                    setValue={methods.setValue}
                    inputAccept="image/*,application/pdf"
                />
                <LabelAndSelectFile
                    labelValue={t('통장 사본')}
                    fieldName={'bankbookPhoto'}
                    watch={methods.watch}
                    setValue={methods.setValue}
                    inputAccept="image/*,application/pdf"
                />
            </PageLayout>
        </Stack>
    );
};

export default VillageHeadRegister;
