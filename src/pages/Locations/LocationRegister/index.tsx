import React from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from '@mui/material';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useQueryClient } from '@tanstack/react-query';

import { CreateAreaReq, useCreateArea } from '@/apis/Area/useCreateArea';
import { QUERY_KEYS } from '@/apis/QueryKeys';
import LabelComponentsLayout from '@/components/LabelComponentsLayout';
import PageLayout from '@/components/PageLayout';
import Title from '@/components/Title';
import { useDialog } from '@/hooks/useDialog';
import NarrowLayout from '@/routers/NarrowLayout';
import { Check } from '@mui/icons-material';

export const defaultCenter = {
    lat: 17.967,
    lng: 102.617,
};

export const containerStyle = {
    width: '100%',
    height: '400px',
};

const LocationRegister = () => {
    const { t } = useTranslation();
    const { openDialog } = useDialog();
    const queryClient = useQueryClient();
    const { mutateAsync: createArea } = useCreateArea();

    const methods = useForm<CreateAreaReq>({
        defaultValues: {
            areaName: '',
            latitude: defaultCenter.lat,
            longitude: defaultCenter.lng,
        },
    });
    const [selectedCountry, setSelectedCountry] = React.useState<'kr' | 'la'>('la');

    const { register, setValue, watch, handleSubmit, reset } = methods;
    const latitude = watch('latitude');
    const longitude = watch('longitude');

    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const autocompleteRef = React.useRef<google.maps.places.Autocomplete | null>(null);

    const onSubmit = async (data: CreateAreaReq) => {
        const res = await createArea(data);
        if (res?.data?.code === 'SUCCESS') {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AREA.getAreaList() });
            openDialog({
                title: t('지역 등록 성공'),
                description: t('관리자가 요청 승인 후 목록에서 확인 가능합니다.'),
                variant: 'confirm',
                primaryAction: {
                    name: t('확인'),
                    onClick: () => reset(),
                },
            });
        } else {
            openDialog({
                title: t('지역 등록 실패'),
                description: t('권한 확인 또는 관리자에게 문의해주세요.'),
                variant: 'alert',
                primaryAction: {
                    name: t('확인'),
                    onClick: () => {},
                },
            });
        }
    };

    return (
        <NarrowLayout>
            <Stack>
                <Title title={t('지역 생성')}>
                    <Button variant="outlinedBlue" onClick={handleSubmit(onSubmit)} startIcon={<Check />}>
                        {t('등록')}
                    </Button>
                </Title>

                <PageLayout gap={'16px'}>
                    <LabelComponentsLayout labelValue={t('국가 선택')}>
                        <Select
                            value={selectedCountry}
                            defaultValue="la"
                            onChange={(e) => {
                                const newCountry = e.target.value as 'kr' | 'la';
                                setSelectedCountry(newCountry);

                                // Autocomplete 업데이트
                                if (autocompleteRef.current && inputRef.current) {
                                    autocompleteRef.current.setComponentRestrictions({
                                        country: newCountry,
                                    });
                                }
                            }}
                        >
                            <MenuItem value="kr">대한민국</MenuItem>
                            <MenuItem value="la">라오스</MenuItem>
                        </Select>
                    </LabelComponentsLayout>

                    <Stack>
                        <Typography fontSize={16} fontWeight={700}>
                            {t('지역 등록')}
                        </Typography>

                        <Stack mt={2} sx={{flexDirection: 'row', gap: '10px'}}>
                            <Typography fontSize={14}>
                                📍 {`${t('선택된 위치')} - ${watch('areaName')}`}
                            </Typography>
                            <Typography fontSize={14}>
                                {`${t('위도')} : ${latitude}, ${t('경도')}: ${longitude}`}
                            </Typography>
                        </Stack>

                        <OutlinedInput
                            fullWidth
                            sx={{ my: 2 }}
                            inputProps={{
                                ref: (ref: HTMLInputElement | null) => {
                                    if (ref && !autocompleteRef.current) {
                                        inputRef.current = ref;

                                        const autocomplete =
                                            new window.google.maps.places.Autocomplete(ref, {
                                                types: ['geocode'],
                                                componentRestrictions: { country: selectedCountry },
                                            });

                                        autocomplete.addListener('place_changed', () => {
                                            const place = autocomplete.getPlace();
                                            if (!place.geometry || !place.geometry.location) return;

                                            const lat = place.geometry.location.lat();
                                            const lng = place.geometry.location.lng();
                                            const name =
                                                place.formatted_address || place.name || '';

                                            setValue('areaName', name);
                                            setValue('latitude', lat);
                                            setValue('longitude', lng);
                                        });

                                        autocompleteRef.current = autocomplete;
                                    }
                                },
                            }}
                        />

                        {/* 숨겨진 필드 등록 */}
                        <input type="hidden" {...register('areaName')} />
                        <input type="hidden" {...register('latitude', { valueAsNumber: true })} />
                        <input type="hidden" {...register('longitude', { valueAsNumber: true })} />

                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={{ lat: latitude, lng: longitude }}
                            zoom={13}
                        >
                            <Marker position={{ lat: latitude, lng: longitude }} />
                        </GoogleMap>
                    </Stack>
                </PageLayout>
            </Stack>
        </NarrowLayout>
    );
};

export default LocationRegister;
