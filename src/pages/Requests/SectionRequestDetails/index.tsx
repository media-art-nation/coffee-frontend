import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import { Stack, Typography } from '@mui/material';

import {
    TSectionApprovalDetails,
    useGetApprovalDetails,
} from '@/apis/Approval/useGetApprovalDetails';
import { palette } from '@/themes';

import RequestDetailsLayout from '../FarmerRequestDetails/RequestDetailsLayout';

const SectionRequestDetails = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const { data: details } = useGetApprovalDetails<TSectionApprovalDetails>(id);

    if (!details) return null;
    return (
        <RequestDetailsLayout>
            <Stack sx={{ gap: '30px' }}>
                <Typography variant="h3/bold">{t('내용')}</Typography>
                <Typography variant="title/semibold">{t('지역 및 섹션 정보')}</Typography>
                <Stack
                    sx={{
                        'gap': '15px',
                        '& .MuiStack-root': {
                            'flexDirection': 'row',
                            'alignItems': 'center',
                            'gap': '30px',
                            '& .MuiTypography-root': {
                                minWidth: '120px',
                            },
                        },
                    }}
                >
                    <Stack>
                        <Typography>{t('지역')}</Typography>
                        <Typography>{details.areaName}</Typography>
                    </Stack>
                    <Stack>
                        <Typography>{t('섹션')}</Typography>
                        <Typography>{details.sectionName}</Typography>
                    </Stack>
                </Stack>
                <Stack sx={{ width: '900px', height: '400px', backgroundColor: palette.grey[100] }}>
                    Google Map
                </Stack>
            </Stack>
        </RequestDetailsLayout>
    );
};

export default SectionRequestDetails;
