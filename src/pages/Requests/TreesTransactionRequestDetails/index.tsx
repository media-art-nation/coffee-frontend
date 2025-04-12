import { Stack, Typography } from '@mui/material';

import RequestDetailsLayout from '../FarmerRequestDetails/RequestDetailsLayout';

const TreesTransactionRequestDetails = () => {
    return (
        <RequestDetailsLayout>
            <Stack sx={{ gap: '30px' }}>
                <Typography variant="h3/bold">내용</Typography>
                <Typography variant="title/semibold">면장 및 농부 정보</Typography>
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
                        <Typography>농부</Typography>
                        <Typography>농부명</Typography>
                    </Stack>
                </Stack>
                <Typography variant="title/semibold">수령 정보</Typography>
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
                        <Typography>나무 수령 일자</Typography>
                        <Typography>나무 수령 일자</Typography>
                    </Stack>
                    <Stack>
                        <Typography>나무 수량</Typography>
                        <Typography>나무 수량</Typography>
                    </Stack>
                    <Stack>
                        <Typography>나무 종</Typography>
                        <Typography>나무 종</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </RequestDetailsLayout>
    );
};

export default TreesTransactionRequestDetails;
