import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Stack } from '@mui/material';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useQueryClient } from '@tanstack/react-query';

import { CreateAreaReq, useCreateArea } from '@/apis/Area/useCreateArea';
import { QUERY_KEYS } from '@/apis/QueryKeys';
import LabelComponentsLayout from '@/components/LabelComponentsLayout';
import PageLayout from '@/components/PageLayout';
import SearchTextField from '@/components/SearchTextField';
import Title from '@/components/Title';
import { useDialog } from '@/hooks/useDialog';

const LocationRegister = () => {
    const { t, i18n } = useTranslation();
    const methods = useForm<CreateAreaReq>();
    const { openDialog } = useDialog();
    const queryClient = useQueryClient();
    const { mutateAsync: createArea } = useCreateArea();

    const onSubmit = (data: CreateAreaReq) => {
        createArea(data).then((res) => {
            if (res?.data?.code === 'SUCCESS') {
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.AREA.getAreaList(),
                });
                openDialog({
                    title: t('지역 등록 요청 성공'),
                    description: t('관리자가 요청 승인 후 목록에서 확인 가능합니다.'),
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
                title: t('지역 등록 요청 실패'),
                description: t('권한 확인 또는 관리자에게 문의해주세요.'),
                variant: 'alert',
                primaryAction: {
                    name: t('확인'),
                    onClick: () => {},
                },
            });
        });
    };

    // google map api
    const containerStyle = {
        width: '100%',
        height: '400px',
    };

    const center = {
        lng: 95.956,
        lat: 21.9162,
    };

    console.log(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);

    return (
        <Stack>
            <Title title={t('지역 생성')}>
                <Button variant="containedGrey">{t('취소')}</Button>
                <Button variant="containedBlue" onClick={() => methods.handleSubmit(onSubmit)()}>
                    {t('등록')}
                </Button>
            </Title>
            <PageLayout>
                <LabelComponentsLayout labelValue={t('지역 검색')}>
                    <SearchTextField
                        fieldName="areaName"
                        register={methods.register}
                        placeholder={t('지역을 검색해주세요.')}
                    />
                </LabelComponentsLayout>
                <LoadScript
                    googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                    language={i18n.language}
                >
                    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                        {/* 마커, 경로 등 여기에 추가 */}
                    </GoogleMap>
                </LoadScript>
            </PageLayout>
        </Stack>
    );
};

export default LocationRegister;
