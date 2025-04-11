import { Stack, Typography } from '@mui/material';

import { palette } from '@/themes';

import RequestDetailsLayout from '../FarmerRequestDetails/RequestDetailsLayout';

const SectionRequestDetails = () => {
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
                        <Typography>섹션 명</Typography>
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
