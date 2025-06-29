import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Button, Stack, TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';

import { GetPurchaseList, useGetPurchaseList } from '@/apis/Purchase/getPurchaseList';
import PageLayout from '@/components/PageLayout';
import Table from '@/components/Table';
import Title from '@/components/Title';

const TreesPurchaseList = () => {
    const { t } = useTranslation();
    const { data: purchaseList } = useGetPurchaseList();
    const navigate = useNavigate();
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
            </TableRow>
        );
    };
    return (
        <Stack>
            <Title title={t('수매 목록')}>
                <Button
                    variant="containedBlue"
                    onClick={() => navigate('/trees-purchases/register')}
                >
                    수매 내역 등록
                </Button>
            </Title>
            <PageLayout>
                <Table
                    headData={[
                        t('담당자'),
                        t('거래일자'),
                        t('수량'),
                        t('단가'),
                        t('총액'),
                        t('차감액'),
                        t('지급액'),
                    ]}
                    bodyData={purchaseList || []}
                    renderRow={renderRow}
                />
            </PageLayout>
        </Stack>
    );
};

export default TreesPurchaseList;
