import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import { Box, Stack, Typography } from '@mui/material';

import {
    TFarmerApprovalDetails,
    useGetApprovalDetails,
} from '@/apis/Approval/useGetApprovalDetails';
import { palette } from '@/themes';

import RequestDetailsLayout from './RequestDetailsLayout';

const FarmerRequestDetails = () => {
    const { t } = useTranslation();
    const { id } = useParams();

    const { data: details } = useGetApprovalDetails<TFarmerApprovalDetails>(id);
    const previewUrl =
        'https://plus.unsplash.com/premium_photo-1664640733898-d5c3f71f44e1?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    // const { data: previewUrl } = useGetGcsImage(details?.identificationPhotoUrl ?? '');

    if (!details) return null;
    return (
        <RequestDetailsLayout>
            <Stack sx={{ gap: '20px' }}>
                <Typography variant="h3/bold">{t('내용')}</Typography>
                <Typography variant="title/semibold">{t('농부 정보')}</Typography>
                <Stack sx={{ flexDirection: 'row', gap: '30px', alignItems: 'center' }}>
                    <Box
                        sx={{
                            width: '120px',
                            height: '160px',
                            backgroundColor: palette.grey[50],
                            backgroundImage: previewUrl ? `url(${previewUrl})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
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
                        <Stack>
                            <Typography>{t('이름')}</Typography>
                            <Typography>{details.name}</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </RequestDetailsLayout>
    );
};

export default FarmerRequestDetails;
