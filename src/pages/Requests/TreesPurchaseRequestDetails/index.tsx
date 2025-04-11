import { Stack, Typography } from '@mui/material';

import RequestDetailsLayout from '../FarmerRequestDetails/RequestDetailsLayout';

const TreesPurchaseRequestDetails = () => {
    return (
          <RequestDetailsLayout>
            <Stack sx={{ gap: '30px' }}>
                <Typography variant="h3/bold">내용</Typography>
                <Typography variant="title/semibold">수매 내역</Typography>
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
                        <Typography>수매 일자</Typography>
                        <Typography>수매 일자</Typography>
                    </Stack>
                    <Stack>
                        <Typography>수량</Typography>
                        <Typography>수량</Typography>
                    </Stack>
                    <Stack>
                        <Typography>단가</Typography>
                        <Typography>단가</Typography>
                    </Stack>
                    <Stack>
                        <Typography>총액</Typography>
                        <Typography>총액</Typography>
                    </Stack>
                    <Stack>
                        <Typography>차감액</Typography>
                        <Typography>차감액</Typography>
                    </Stack>
                    <Stack>
                        <Typography>지급액</Typography>
                        <Typography>지급액</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </RequestDetailsLayout>
        
    );
};

export default TreesPurchaseRequestDetails;
