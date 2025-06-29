import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Button, Stack, TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';

import {
    GetTreeTransactionList,
    useGetTreeTransactionList,
} from '@/apis/TreeTransaction/GetTreeTransactionList';
import PageLayout from '@/components/PageLayout';
import Table from '@/components/Table';
import Title from '@/components/Title';

const TreesTransactionList = () => {
    const { t } = useTranslation();
    const { data: treeTransactionList, isLoading } = useGetTreeTransactionList();

    const navigate = useNavigate();
    const renderRow = (row: GetTreeTransactionList) => {
        return (
            <TableRow key={row.id}>
                <TableCell>{row.farmerName}</TableCell>
                <TableCell>{row.species}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{dayjs(row.receivedDate).format('YYYY-MM-DD')}</TableCell>
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
                    bodyData={treeTransactionList || []}
                    isLoading={isLoading}
                    renderRow={renderRow}
                />
            </PageLayout>
        </Stack>
    );
};

export default TreesTransactionList;
