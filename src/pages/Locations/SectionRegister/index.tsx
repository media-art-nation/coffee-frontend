import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Stack } from '@mui/material';

import { useGetArea } from '@/apis/Area/useGetArea';
import LabelAndSelect from '@/components/LabelAndSelect';
import LabelComponentsLayout from '@/components/LabelComponentsLayout';
import PageLayout from '@/components/PageLayout';
import SearchTextField from '@/components/SearchTextField';
import Title from '@/components/Title';

type TSectionInput = {
    area: string;
    section: string;
};
const SectionRegister = () => {
    const { t } = useTranslation();
    const methods = useForm<TSectionInput>();
    const { data: areaList } = useGetArea();
    return (
        <Stack>
            <Title title={t('섹션 생성')}>
                <Button variant="containedGrey">{t('취소')}</Button>
                <Button variant="containedBlue">{t('등록')}</Button>
            </Title>
            <PageLayout gap={'27px'}>
                <LabelAndSelect
                    labelValue={t('지역')}
                    control={methods.control}
                    selectArr={
                        areaList?.map((area) => {
                            return { value: String(area.id), label: area.areaName || '' };
                        }) || []
                    }
                    fieldName="area"
                    placeholder={t('지역 선택')}
                />
                <LabelComponentsLayout labelValue={t('섹션 검색')}>
                    <SearchTextField
                        fieldName="area"
                        register={methods.register}
                        placeholder={t('섹션 검색')}
                    />
                </LabelComponentsLayout>
            </PageLayout>
        </Stack>
    );
};

export default SectionRegister;
