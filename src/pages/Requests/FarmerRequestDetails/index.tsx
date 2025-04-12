import { Box, Stack, Typography } from '@mui/material';

import { palette } from '@/themes';

import RequestDetailsLayout from './RequestDetailsLayout';

const FarmerRequestDetails = () => {
    return (
        <RequestDetailsLayout>
            <Stack sx={{ gap: '20px' }}>
                <Typography variant="h3/bold">내용</Typography>
                <Typography variant="title/semibold">농부 정보</Typography>
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
                            <Typography>관리 지역 명</Typography>
                        </Stack>
                        <Stack>
                            <Typography>섹션</Typography>
                            <Typography>섹션 명</Typography>
                        </Stack>
                        <Stack>
                            <Typography>이름</Typography>
                            <Typography>농부 이름</Typography>
                        </Stack>
                        <Stack>
                            <Typography>아이디</Typography>
                            <Typography>아이디</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </RequestDetailsLayout>
    );
};

export default FarmerRequestDetails;
