import React, { useEffect, useMemo } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { GoogleMap, Marker } from '@react-google-maps/api';

import { getCookies } from '@/apis/AppUser/cookie';
import { CreateSectionReq, useCreateSection } from '@/apis/Area/useCreateSection';
import { useCreateSectionAdmin } from '@/apis/Area/useCreateSectionAdmin';
import { useGetArea } from '@/apis/Area/useGetArea';
import LabelAndSelect from '@/components/LabelAndSelect';
import LabelComponentsLayout from '@/components/LabelComponentsLayout';
import PageLayout from '@/components/PageLayout';
import Title from '@/components/Title';
import { useDialog } from '@/hooks/useDialog';
import { containerStyle, defaultCenter } from '@/pages/Locations/LocationRegister';

const SectionRegister = () => {
    const { t } = useTranslation();
    const { openDialog } = useDialog();
    const { data: areaList } = useGetArea();
    const role = getCookies('role');
    const { mutateAsync: createSection } = useCreateSection();
    const { mutateAsync: createSectionAdmin } = useCreateSectionAdmin();

    const methods = useForm<CreateSectionReq>({
        defaultValues: {
            areaId: 0,
            latitude: defaultCenter.lat,
            longitude: defaultCenter.lng,
            sectionName: '',
        },
    });

    const { register, setValue, watch, handleSubmit, reset, control } = methods;
    const latitude = watch('latitude');
    const longitude = watch('longitude');
    const areaId = watch('areaId');
    const sectionName = watch('sectionName');

    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const autocompleteRef = React.useRef<google.maps.places.Autocomplete | null>(null);

    // 현재 선택된 지역 객체
    const selectedArea = useMemo(() => {
        return areaList?.find((area) => String(area.id) === String(areaId));
    }, [areaId, areaList]);

    const areaName = selectedArea?.areaName ?? '';

    // 지역 선택 시 sectionName 초기 설정 + 좌표도 설정
    useEffect(() => {
        if (selectedArea) {
            const newSectionName = areaName; // 초기값
            setValue('sectionName', newSectionName);
            setValue('latitude', selectedArea.latitude);
            setValue('longitude', selectedArea.longitude);
        }
    }, [selectedArea, areaName, setValue]);

    // 사용자가 입력하는 값을 제어하여 지역명은 지워지지 않도록 설정
    const handleChangeSectionName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const userInput = e.target.value;
        if (!userInput.startsWith(areaName)) {
            // 강제로 앞부분 고정
            setValue('sectionName', areaName);
            return;
        }

        setValue('sectionName', userInput);
    };

    const onSubmit = (data: CreateSectionReq) => {
        const submit = role === 'ADMIN' ? createSectionAdmin : createSection;

        submit({
            ...data,
            areaId: Number(data.areaId),
            sectionName: data.sectionName.startsWith(areaName)
                ? data.sectionName.slice(areaName.length).trim()
                : data.sectionName,
        }).then((res) => {
            if (res?.data?.code === 'SUCCESS') {
                openDialog({
                    title: t('섹션 등록 요청 성공'),
                    description:
                        role === 'ADMIN'
                            ? t('섹션 등록을 성공하였습니다.')
                            : t('관리자가 요청 승인 후 목록에서 확인 가능합니다.'),
                    variant: 'confirm',
                    primaryAction: {
                        name: t('확인'),
                        onClick: () => reset(),
                    },
                });
            } else {
                openDialog({
                    title: t('섹션 등록 요청 실패'),
                    description: t('권한 확인 또는 관리자에게 문의해주세요.'),
                    variant: 'alert',
                    primaryAction: {
                        name: t('확인'),
                        onClick: () => {},
                    },
                });
            }
        });
    };

    return (
        <Stack>
            <Title title={t('섹션 생성')}>
                <Button variant="containedGrey">{t('취소')}</Button>
                <Button variant="containedBlue" onClick={handleSubmit(onSubmit)}>
                    {t('등록')}
                </Button>
            </Title>

            <PageLayout gap="27px">
                <LabelAndSelect
                    labelValue={t('지역')}
                    control={control}
                    selectArr={
                        areaList?.map((area) => ({
                            value: String(area.id),
                            label: area.areaName ?? '',
                        })) ?? []
                    }
                    fieldName="areaId"
                    placeholder={t('지역 선택')}
                />

                <LabelComponentsLayout labelValue={t('섹션명')}>
                    <TextField
                        fullWidth
                        label={t('섹션명')}
                        variant="outlined"
                        sx={{ my: 2 }}
                        value={sectionName}
                        onChange={handleChangeSectionName}
                        inputProps={{
                            ref: (ref: HTMLInputElement | null) => {
                                if (ref && !autocompleteRef.current) {
                                    inputRef.current = ref;

                                    const autocomplete = new window.google.maps.places.Autocomplete(
                                        ref,
                                        {
                                            types: ['geocode'],
                                            componentRestrictions: { country: 'kr' },
                                        }
                                    );

                                    autocomplete.addListener('place_changed', () => {
                                        const place = autocomplete.getPlace();
                                        if (!place.geometry || !place.geometry.location) return;

                                        const lat = place.geometry.location.lat();
                                        const lng = place.geometry.location.lng();
                                        const fullAddress =
                                            place.formatted_address || place.name || '';

                                        setValue('sectionName', fullAddress);
                                        setValue('latitude', lat);
                                        setValue('longitude', lng);
                                    });

                                    autocompleteRef.current = autocomplete;
                                }
                            },
                        }}
                    />
                </LabelComponentsLayout>

                <Box sx={{ p: 2 }}>
                    <Typography variant="h6">{t('지역 위치')}</Typography>

                    {/* 숨겨진 필드 등록 */}
                    <input type="hidden" {...register('sectionName')} />
                    <input type="hidden" {...register('latitude', { valueAsNumber: true })} />
                    <input type="hidden" {...register('longitude', { valueAsNumber: true })} />

                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={{ lat: latitude, lng: longitude }}
                        zoom={13}
                    >
                        <Marker position={{ lat: latitude, lng: longitude }} />
                    </GoogleMap>

                    <Box mt={2}>
                        <Typography variant="body2">📍 {t('선택된 위치')}</Typography>
                        <Typography>
                            {t('섹션명')}: {sectionName}
                        </Typography>
                        <Typography>
                            {t('위도')}: {latitude}
                        </Typography>
                        <Typography>
                            {t('경도')}: {longitude}
                        </Typography>
                    </Box>
                </Box>
            </PageLayout>
        </Stack>
    );
};

export default SectionRegister;
