import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import { Stack } from '@mui/material';

import Title from '@/components/Title';

export const SectionDetails = () => {
    const { t } = useTranslation();
    const { id } = useParams();

    console.log('id', id);
    return (
        <Stack>
            <Title title={t('섹션 상세')} />
        </Stack>
    );
};
