import { useParams } from 'react-router';

import { Stack, Typography } from '@mui/material';

import {
    TSectionApprovalDetails,
    useGetApprovalDetails,
} from '@/apis/Approval/useGetApprovalDetails';
import { palette } from '@/themes';

import RequestDetailsLayout from '../FarmerRequestDetails/RequestDetailsLayout';

const SectionRequestDetails = () => {
    const { id } = useParams();
    const { data: details } = useGetApprovalDetails<TSectionApprovalDetails>(id);
    if (!id) return null;

    if (!details) return null;
    return (
        <RequestDetailsLayout>
            <Stack sx={{ gap: '30px' }}>
                <Typography variant="h3/bold">내용</Typography>
                <Typography variant="title/semibold">지역 및 섹션 정보</Typography>
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
                        <Typography>관리 지역 명</Typography>
                    </Stack>
                    <Stack>
                        <Typography>섹션</Typography>
                        <Typography>{details.sectionName}</Typography>
                    </Stack>
                </Stack>
                <Stack sx={{ width: '900px', height: '400px', backgroundColor: palette.grey[100] }}>
                    구글맵
                </Stack>
            </Stack>
        </RequestDetailsLayout>
    );
};

export default SectionRequestDetails;
