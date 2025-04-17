import { Box, Stack, TableCell, TableRow, Typography } from '@mui/material';
import dayjs from 'dayjs';

import LabelValue from '@/components/LabelValue';
import PageLayout from '@/components/PageLayout';
import Table from '@/components/Table';
import Title from '@/components/Title';
import { palette } from '@/themes';

interface TDummy {
    id: number;
    tree: string;
    count: number;
    createdAt: Date;
}
const FarmerDetails = () => {
    const dummy: TDummy[] = [
        { id: 1, tree: 'apple', count: 5, createdAt: new Date() },
        { id: 2, tree: 'apple', count: 5, createdAt: new Date() },
    ];

    const renderRow = (row: TDummy) => {
        return (
            <TableRow key={row.id}>
                <TableCell>{row.tree}</TableCell>
                <TableCell>{row.count}</TableCell>
                <TableCell>{dayjs(row.createdAt).format('YYYY-MM-DD')}</TableCell>
            </TableRow>
        );
    };
    return (
        <Stack>
            <Title title="농부 상세 정보" />
            <PageLayout gap={'27px'}>
                <Stack direction={'row'} gap={'20px'}>
                    <Box sx={{ width: '120px', height: '160px', background: palette.grey[50] }} />
                    <Stack>
                        <LabelValue label="관리 지역" value="{관리 지역}" />
                        <LabelValue label="이름" value="{농부 이름}" />
                    </Stack>
                </Stack>
                <Stack gap={'27px'}>
                    <Typography variant="title/semibold">나무 수령 목록</Typography>
                    <Table
                        headData={['나무 종', '나무 수량', '수령 일자']}
                        bodyData={dummy}
                        renderRow={renderRow}
                    />
                </Stack>
            </PageLayout>
        </Stack>
    );
};

export default FarmerDetails;
