import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import { Stack } from '@mui/material';

import Title from '@/components/Title';

export const AreaDetails = () => {
    const { t } = useTranslation();
    const { id } = useParams();

    console.log('id', id);
    return (
        <Stack>
            <Title title={t('지역 상세')} />
        </Stack>
    );
};
