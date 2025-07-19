import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Button, Stack, TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';

import { getCookies } from '@/apis/AppUser/cookie';
import { useDeletePurchase } from '@/apis/Approval/useDeletePurchase';
import { GetPurchaseList, useGetPurchaseList } from '@/apis/Purchase/getPurchaseList';
import DeleteButton from '@/components/DeleteButton';
import PageLayout from '@/components/PageLayout';
import Table from '@/components/Table';
import Title from '@/components/Title';
import { useDialog } from '@/hooks/useDialog';

const TreesPurchaseList = () => {
    const { openDialog } = useDialog();
    const { t } = useTranslation();
    const { data: purchaseList } = useGetPurchaseList();
    const { mutate: deletePurchase } = useDeletePurchase();
    const navigate = useNavigate();

    const role = getCookies('role');

    const renderRow = (row: GetPurchaseList) => {
        return (
            <TableRow key={row.managerId}>
                <TableCell>{row.managerName}</TableCell>
                <TableCell>{dayjs(row.purchaseDate).format('YYYY-MM-DD')}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.unitPrice}</TableCell>
                <TableCell>{row.totalPrice}</TableCell>
                <TableCell>{row.deduction}</TableCell>
                <TableCell>{row.paymentAmount}</TableCell>
                <TableCell>{row?.remarks}</TableCell>
                {role !== 'VILLAGE_HEAD' && (
                    <TableCell>
                        <DeleteButton
                            onDelete={() => {
                                openDialog({
                                    title: t('해당 구매 내역을 삭제하시겠습니까?'),
                                    description: t('삭제하면 복구가 불가능합니다.'),
                                    variant: 'alert',
                                    primaryAction: {
                                        name: t('확인'),
                                        onClick: () => {
                                            deletePurchase({ purchaseId: row.id });
                                        },
                                    },
                                    secondaryAction: { name: t('취소'), onClick: () => {} },
                                });
                            }}
                        />
                    </TableCell>
                )}
            </TableRow>
        );
    };
    return (
        <Stack>
            <Title title={t('수매 목록')}>
                {role !== 'VILLAGE_HEAD' && (
                    <Button
                        variant="containedBlue"
                        onClick={() => navigate('/trees-purchases/register')}
                    >
                        수매 내역 등록
                    </Button>
                )}
            </Title>
            <PageLayout>
                <Table
                    headData={
                        role !== 'VILLAGE_HEAD'
                            ? [
                                  t('담당자'),
                                  t('거래일자'),
                                  t('수량'),
                                  t('단가'),
                                  t('총액'),
                                  t('차감액'),
                                  t('지급액'),
                                  t('비고'),
                                  '',
                              ]
                            : [
                                  t('담당자'),
                                  t('거래일자'),
                                  t('수량'),
                                  t('단가'),
                                  t('총액'),
                                  t('차감액'),
                                  t('지급액'),
                                  t('비고'),
                              ]
                    }
                    bodyData={purchaseList || []}
                    renderRow={renderRow}
                />
            </PageLayout>
        </Stack>
    );
};

export default TreesPurchaseList;
