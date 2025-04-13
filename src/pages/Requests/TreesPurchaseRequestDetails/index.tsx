import { useParams } from 'react-router';

import { Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

import {
    TPurchaseApprovalDetails,
    useGetApprovalDetails,
} from '@/apis/Approval/useGetApprovalDetails';

import RequestDetailsLayout from '../FarmerRequestDetails/RequestDetailsLayout';

const TreesPurchaseRequestDetails = () => {
    const { id } = useParams();
    if (!id) return null;

    const { data: details } = useGetApprovalDetails<TPurchaseApprovalDetails>(id);

    if (!details) return null;
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
                        <Typography>{dayjs(details.purchaseDate).format('YYYY-MM-DD')}</Typography>
                    </Stack>
                    <Stack>
                        <Typography>수량</Typography>
                        <Typography>{details.quantity}</Typography>
                    </Stack>
                    <Stack>
                        <Typography>단가</Typography>
                        <Typography>{details.unitPrice}</Typography>
                    </Stack>
                    <Stack>
                        <Typography>총액</Typography>
                        <Typography>{details.totalPrice}</Typography>
                    </Stack>
                    <Stack>
                        <Typography>차감액</Typography>
                        <Typography>{details.deduction}</Typography>
                    </Stack>
                    <Stack>
                        <Typography>지급액</Typography>
                        <Typography>{details.paymentAmount}</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </RequestDetailsLayout>
    );
};

export default TreesPurchaseRequestDetails;
