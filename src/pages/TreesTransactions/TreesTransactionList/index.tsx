import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Button, Stack, TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';

import PageLayout from '@/components/PageLayout';
import Table from '@/components/Table';
import Title from '@/components/Title';

type TDummy = {
    id: number;
    farmer: string;
    tree: string;
    count: number;
    receiptDate: Date;
};
const TreesTransactionList = () => {
    const { t } = useTranslation();
    const dummy: TDummy[] = [
        {
            id: 1,
            farmer: 'dummy',
            tree: 'dummy',
            count: 5,
            receiptDate: new Date(),
        },
        {
            id: 2,
            farmer: 'dummy',
            tree: 'dummy',
            count: 5,
            receiptDate: new Date(),
        },
        {
            id: 3,
            farmer: 'dummy',
            tree: 'dummy',
            count: 5,
            receiptDate: new Date(),
        },
    ];

    const navigate = useNavigate();
    const renderRow = (row: TDummy) => {
        return (
            <TableRow key={row.id}>
                <TableCell>{row.farmer}</TableCell>
                <TableCell>{row.tree}</TableCell>
                <TableCell>{row.count}</TableCell>
                <TableCell>{dayjs(row.receiptDate).format('YYYY-MM-DD')}</TableCell>
            </TableRow>
        );
    };
    return (
        <Stack>
            <Title title={t('나무수령 목록')}>
                <Button
                    variant="containedBlue"
                    onClick={() => navigate('/village-heads/trees-transactions/register')}
                >
                    {t('나무수령 등록')}
                </Button>
            </Title>
            <PageLayout>
                <Table
                    headData={[t('농부'), t('나무 종'), t('나무 수량'), t('수령 일자')]}
                    bodyData={dummy}
                    renderRow={renderRow}
                />
            </PageLayout>
        </Stack>
    );
};

export default TreesTransactionList;
