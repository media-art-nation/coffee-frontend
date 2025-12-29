import { useTranslation } from 'react-i18next';

import { Button, Divider, IconButton, Menu, MenuItem, Stack, TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';

import { getCookies } from '@/apis/AppUser/cookie';
import { useDeletePurchase } from '@/apis/Approval/useDeletePurchase';
import { GetPurchaseList, useGetPurchaseList } from '@/apis/Purchase/getPurchaseList';
import PageLayout from '@/components/PageLayout';
import Table from '@/components/Table';
import Title from '@/components/Title';
import { useDialog } from '@/hooks/useDialog';
import { Plus } from '@phosphor-icons/react';
import { TreesPurchaseCreateDialog } from './create-dialog';
import { MouseEvent, useState } from 'react';
import { MoreHoriz } from '@mui/icons-material';
import { TreesPurchaseEditDialog } from './edit-dialog';
import { TPurchase } from '@/typings/Purchase';

const TreesPurchaseList = () => {
    const { openDialog } = useDialog();
    const { t } = useTranslation();
    const { data: purchaseList } = useGetPurchaseList();
    const { mutate: deletePurchase } = useDeletePurchase();
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedPurchaseDetail, setSelectedPurchaseDetail] = useState<TPurchase | null>(null);

    const [menuState, setMenuState] = useState<{
        anchorEl: HTMLElement | null;
        rowId: number | null;
    }>({ anchorEl: null, rowId: null });

    const open = Boolean(menuState.anchorEl);

    const handleClickMenu = (rowId: number) => (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setMenuState({ anchorEl: e.currentTarget, rowId });
    };

    const handleCloseMenu = () => setMenuState({ anchorEl: null, rowId: null });

    const handleClickDelete = (id: number) => {
        openDialog({
            title: t('해당 구매 내역을 삭제하시겠습니까?'),
            description: t('삭제하면 복구가 불가능합니다.'),
            variant: 'alert',
            primaryAction: {
                name: t('확인'),
                onClick: () => {
                    deletePurchase({ purchaseId: id });
                },
            },
            secondaryAction: { name: t('취소'), onClick: () => { } },
        });
    };

    const role = getCookies('role');

    const renderRow = (row: GetPurchaseList) => {
        return (
            <TableRow key={row.id}>
                <TableCell>{row.id.toString()}</TableCell>
                <TableCell>{row.managerName}</TableCell>
                <TableCell>{dayjs(row.purchaseDate).format('YYYY-MM-DD')}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.unitPrice}</TableCell>
                <TableCell>{row.totalPrice}</TableCell>
                <TableCell>{row.deduction}</TableCell>
                <TableCell>{row.paymentAmount}</TableCell>
                <TableCell>{row?.remarks}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()} align="right">
                    <IconButton
                        id={`basic-button-${row.id}`}
                        size='small'
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClickMenu(row.id)}>
                        <MoreHoriz />
                    </IconButton>
                    <Menu
                        anchorEl={menuState.anchorEl}
                        open={open && menuState.rowId === row.id}
                        onClose={handleCloseMenu}
                        slotProps={{
                            list: {
                                'aria-labelledby': 'basic-button',
                            },
                        }}
                    >
                        <MenuItem onClick={() => {
                            setOpenEditDialog(true)
                            setSelectedPurchaseDetail(row)
                            handleCloseMenu()
                        }}>수정하기</MenuItem>
                        {role !== 'VILLAGE_HEAD' && <>
                            <Divider />
                            <MenuItem onClick={() => {
                                handleClickDelete(row.id)
                                handleCloseMenu()
                            }}>삭제하기</MenuItem>
                        </>}
                    </Menu>
                </TableCell>
            </TableRow>
        );
    };
    return (
        <>
            <Stack>
                <Title title={t('수매 목록')}>
                    {role !== 'VILLAGE_HEAD' && (
                        <Button
                            variant="outlinedBlue"
                            onClick={() => setOpenCreateDialog(true)}
                            startIcon={<Plus />}
                        >
                            추가
                        </Button>
                    )}
                </Title>
                <PageLayout>
                    <Table
                        headData={
                            role !== 'VILLAGE_HEAD'
                                ? [
                                    t('ID'),
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
                                    t('ID'),
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

            <TreesPurchaseCreateDialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} />

            {selectedPurchaseDetail && <TreesPurchaseEditDialog open={openEditDialog} onClose={() => {
                setOpenEditDialog(false)
                setSelectedPurchaseDetail(null)
            }} purchaseDetail={selectedPurchaseDetail} />}
        </>

    );
};

export default TreesPurchaseList;
