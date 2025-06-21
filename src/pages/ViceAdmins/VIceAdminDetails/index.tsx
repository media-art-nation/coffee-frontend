import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { Button, Stack, Typography } from '@mui/material';

import { useGetViceAdminDetails } from '@/apis/AppUser/useGetViceAdminDetails';
import LabelValue from '@/components/LabelValue';
import NoPhoto from '@/components/NoPhoto';
import PageLayout from '@/components/PageLayout';
import Title from '@/components/Title';

const ViceAdminDetails = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const { data: viceAdminDetail } = useGetViceAdminDetails(id);
    const navigate = useNavigate();

    return (
        <Stack>
            <Title title={t('부관리자 상세')}>
                <Button variant="containedBlue" onClick={() => navigate(`/vice-admins/edit/${id}`)}>
                    {t('수정')}
                </Button>
            </Title>
            <PageLayout gap={'27px'}>
                <LabelValue label={t('이름')} value={viceAdminDetail?.username || ''} />

                <LabelValue label={t('아이디')} value={viceAdminDetail?.userId || ''} />

                <LabelValue
                    label={t('관리 지역')}
                    value={viceAdminDetail?.areaInfo.areaName || ''}
                />
                <Stack gap={'27px'}>
                    <Typography variant="title/medium">ID Card</Typography>
                    {viceAdminDetail?.idCardUrl ? (
                        <img width={120} height={160} src={viceAdminDetail.idCardUrl} />
                    ) : (
                        <NoPhoto />
                    )}
                </Stack>
            </PageLayout>
        </Stack>
    );
};

export default ViceAdminDetails;
