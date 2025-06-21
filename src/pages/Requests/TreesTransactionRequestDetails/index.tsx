import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import { Stack, Typography } from '@mui/material';

import {
    TTreeTransactionApprovalDetails,
    useGetApprovalDetails,
} from '@/apis/Approval/useGetApprovalDetails';

import RequestDetailsLayout from '../FarmerRequestDetails/RequestDetailsLayout';

const TreesTransactionRequestDetails = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const { data: details } = useGetApprovalDetails<TTreeTransactionApprovalDetails>(id);

    if (!details) return null;
    return (
        <RequestDetailsLayout>
            <Stack sx={{ gap: '30px' }}>
                <Typography variant="h3/bold">{t('내용')}</Typography>
                <Typography variant="title/semibold">{t('면장 및 농부 정보')}</Typography>
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
                        <Typography>지역 명</Typography>
                    </Stack>
                    <Stack>
                        <Typography>{t('섹션')}</Typography>
                        <Typography>섹션 명</Typography>
                    </Stack>
                    <Stack>
                        <Typography>{t('농부')}</Typography>
                        <Typography>농부명</Typography>
                    </Stack>
                </Stack>
                <Typography variant="title/semibold">{t('나무수령 정보')}</Typography>
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
                        <Typography>{t('수령 일자')}</Typography>
                        <Typography>{details.receivedDate}</Typography>
                    </Stack>
                    <Stack>
                        <Typography>{t('나무 수량')}</Typography>
                        <Typography>{details.quantity}</Typography>
                    </Stack>
                    <Stack>
                        <Typography>{t('나무 종')}</Typography>
                        <Typography>{details.species}</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </RequestDetailsLayout>
    );
};

export default TreesTransactionRequestDetails;
