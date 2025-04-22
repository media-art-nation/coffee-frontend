import { Button, Stack, TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';

import PageLayout from '@/components/PageLayout';
import Table from '@/components/Table';
import Title from '@/components/Title';

type TDummy = {
    id: number;
    manager: string;
    purchaseDate: Date;
    count: number;
    price: number;
    totalPrice: number;
    minusPrice: number;
    payment: number;
};
const TreesPurchaseList = () => {
    const dummy = [
        {
            id: 1,
            manager: 'dummy',
            purchaseDate: new Date(),
            count: 5,
            price: 51000,
            totalPrice: 3100,
            minusPrice: 3000,
            payment: 100,
        },
        {
            id: 2,
            manager: 'dummy',
            purchaseDate: new Date(),
            count: 5,
            price: 51000,
            totalPrice: 3100,
            minusPrice: 3000,
            payment: 100,
        },
        {
            id: 3,
            manager: 'dummy',
            purchaseDate: new Date(),
            count: 5,
            price: 51000,
            totalPrice: 3100,
            minusPrice: 3000,
            payment: 100,
        },
    ];

    const renderRow = (row: TDummy) => {
        return (
            <TableRow key={row.id}>
                <TableCell>{row.manager}</TableCell>
                <TableCell>{dayjs(row.purchaseDate).format('YYYY-MM-DD')}</TableCell>
                <TableCell>{row.count}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.totalPrice}</TableCell>
                <TableCell>{row.minusPrice}</TableCell>
                <TableCell>{row.payment}</TableCell>
            </TableRow>
        );
    };
    return (
        <Stack>
            <Title title="수매 목록">
                <Button variant="containedBlue">수매 내역 등록</Button>
            </Title>
            <PageLayout>
                <Table
                    headData={['담당자', '거래일자', '수량', '단가', '총액', '차감액', '지급액']}
                    bodyData={dummy}
                    renderRow={renderRow}
                />
            </PageLayout>
        </Stack>
    );
};

export default TreesPurchaseList;
