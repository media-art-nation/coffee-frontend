import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Button, Stack, TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';

import { useDeleteTreeTransaction } from '@/apis/Approval/useDeleteTreeTransaction';
import {
    GetTreeTransactionList,
    useGetTreeTransactionList,
} from '@/apis/TreeTransaction/GetTreeTransactionList';
import DeleteButton from '@/components/DeleteButton';
import PageLayout from '@/components/PageLayout';
import Table from '@/components/Table';
import Title from '@/components/Title';
import { useDialog } from '@/hooks/useDialog';

const TreesTransactionList = () => {
    const { openDialog } = useDialog();
    const { t } = useTranslation();
    const { data: treeTransactionList, isLoading } = useGetTreeTransactionList();
    const { mutate: deleteTreeTransaction } = useDeleteTreeTransaction();
    const navigate = useNavigate();
    const renderRow = (row: GetTreeTransactionList) => {
        return (
            <TableRow key={row.id}>
                <TableCell>{row.farmerName}</TableCell>
                <TableCell>{row.species}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{dayjs(row.receivedDate).format('YYYY-MM-DD')}</TableCell>
                <TableCell>
                    <DeleteButton
                        onDelete={() => {
                            openDialog({
                                title: t('해당 거래 내역을 삭제하시겠습니까?'),
                                description: t('삭제하면 복구가 불가능합니다.'),
                                variant: 'alert',
                                primaryAction: {
                                    name: t('확인'),
                                    onClick: () => {
                                        deleteTreeTransaction({ transactionId: row.id });
                                    },
                                },
                                secondaryAction: { name: t('취소'), onClick: () => {} },
                            });
                        }}
                    />
                </TableCell>
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
                    headData={[t('농부'), t('나무 종'), t('나무 수량'), t('수령 일자'), t('삭제')]}
                    bodyData={treeTransactionList || []}
                    isLoading={isLoading}
                    renderRow={renderRow}
                />
            </PageLayout>
        </Stack>
    );
};

export default TreesTransactionList;
