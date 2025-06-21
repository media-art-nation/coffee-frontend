import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Stack } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import { CreateAreaReq, useCreateArea } from '@/apis/Area/useCreateArea';
import { QUERY_KEYS } from '@/apis/QueryKeys';
import LabelComponentsLayout from '@/components/LabelComponentsLayout';
import PageLayout from '@/components/PageLayout';
import SearchTextField from '@/components/SearchTextField';
import Title from '@/components/Title';

const LocationRegister = () => {
    const { t } = useTranslation();
    const methods = useForm<CreateAreaReq>();
    const queryClient = useQueryClient();
    const { mutateAsync: createArea } = useCreateArea();
    const onSubmit = (data: CreateAreaReq) => {
        createArea(data).then((res) => {
            if (res?.data?.code === 'SUCCESS') {
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.AREA.getAreaList(),
                });
            }
        });
    };
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
            </PageLayout>
        </Stack>
    );
};

export default LocationRegister;
