import { useParams } from 'react-router';

import { Box, Stack, Typography } from '@mui/material';

import {
    TVillageHeadApprovalDetails,
    useGetApprovalDetails,
} from '@/apis/Approval/useGetApprovalDetails';
import { palette } from '@/themes';
import { getFileName } from '@/utils/getFileName';

import RequestDetailsLayout from '../FarmerRequestDetails/RequestDetailsLayout';

const VillageHeadRequestDetails = () => {
    const { id } = useParams();

    const { data: details } = useGetApprovalDetails<TVillageHeadApprovalDetails>(id);

    console.log(details);
    if (!details) return null;
    return (
        <RequestDetailsLayout>
            <Stack sx={{ gap: '30px' }}>
                <Typography variant="h3/bold">내용</Typography>
                <Typography variant="title/semibold">면장 정보</Typography>
                <Stack sx={{ flexDirection: 'row', gap: '30px', alignItems: 'center' }}>
                    <Box
                        sx={{
                            width: '120px',
                            height: '160px',
                            backgroundColor: palette.grey[50],
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
                            <Typography>관리 지역</Typography>
                            <Typography>{details.areaName}</Typography>
                        </Stack>
                        <Stack>
                            <Typography>섹션</Typography>
                            <Typography>섹션 명</Typography>
                        </Stack>
                        <Stack>
                            <Typography>이름</Typography>
                            <Typography>{details.username}</Typography>
                        </Stack>
                        <Stack>
                            <Typography>아이디</Typography>
                            <Typography>{details.userId}</Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack
                    sx={{
                        'gap': '20px',
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
                        <Typography>계좌 정보</Typography>
                        <Typography>
                            {details.bankName} / {details.accountInfo}
                        </Typography>
                    </Stack>
                    <Stack>
                        <Typography>계약서</Typography>
                        <Typography>{getFileName(details.contractFileUrl)}</Typography>
                    </Stack>
                    <Stack>
                        <Typography>통장 사본</Typography>
                        <Typography>통장 사본.pdf</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </RequestDetailsLayout>
    );
};

export default VillageHeadRequestDetails;
