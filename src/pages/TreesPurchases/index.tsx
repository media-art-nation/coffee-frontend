import { MouseEvent, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { MoreHoriz } from '@mui/icons-material';
import {
    Button,
    CircularProgress,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Table as MuiTable,
    Paper,
    Select,
    Stack,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { Plus } from '@phosphor-icons/react';
import dayjs, { Dayjs } from 'dayjs';

import noData from '@assets/noData.svg';

import { getCookies } from '@/apis/AppUser/cookie';
import { useGetVillageHeadList } from '@/apis/AppUser/useGetVillageHeadList';
import { useDeletePurchase } from '@/apis/Approval/useDeletePurchase';
import { GetPurchaseList, useGetPurchaseList } from '@/apis/Purchase/getPurchaseList';
import CustomDatePicker from '@/components/CustomDatePicker';
import PageLayout from '@/components/PageLayout';
import Title from '@/components/Title';
import { useDialog } from '@/hooks/useDialog';
import { palette } from '@/themes';
import { TPurchase } from '@/typings/Purchase';

import { CreateTreesPurchaseRow } from './create-row';
import { TreesPurchaseEditDialog } from './edit-dialog';

const TreesPurchaseList = () => {
    const { openDialog } = useDialog();
    const { t } = useTranslation();
    const { mutate: deletePurchase } = useDeletePurchase();
    const [openCreateRow, setOpenCreateRow] = useState(false);
const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedPurchaseDetail, setSelectedPurchaseDetail] = useState<TPurchase | null>(null);

    const { data: villageHeadList } = useGetVillageHeadList(); // 면장 목록
    const [villageHeadId, setVillageHeadId] = useState<string | undefined>();
    const today = dayjs();
    const [startDate, setStartDate] = useState<Dayjs | undefined>(today.subtract(1, 'month'));
    const [endDate, setEndDate] = useState<Dayjs | undefined>(today);

    const { data: purchaseList, isLoading } = useGetPurchaseList({
        startDate,
        endDate,
        villageHeadId,
    });

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
            description: t('삭제한 내용은 되돌릴 수 없습니다.'),
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
                <TableCell>{row.villageHeadName}</TableCell>
                <TableCell>{dayjs(row.purchaseDate).format('YYYY-MM-DD')}</TableCell>
                <TableCell>{row.quantity.toLocaleString()}</TableCell>
                <TableCell>{row.unitPrice.toLocaleString()}원</TableCell>
                <TableCell>{row.totalPrice.toLocaleString()}원</TableCell>
                <TableCell>{row.deduction.toLocaleString()}원</TableCell>
                <TableCell>{row.paymentAmount.toLocaleString()}원</TableCell>
                <TableCell>{row?.remarks}</TableCell>
                {role !== 'VILLAGE_HEAD' && <TableCell onClick={(e) => e.stopPropagation()} align="right">
                    <IconButton
                        id={`basic-button-${row.id}`}
                        size="small"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClickMenu(row.id)}
                    >
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
                        <MenuItem
                            onClick={() => {
                                setOpenEditDialog(true);
                                setSelectedPurchaseDetail(row);
                                handleCloseMenu();
                            }}
                        >
                            {t('수정하기')}
                        </MenuItem>
                        <Divider />
                        <MenuItem
                            onClick={() => {
                                handleClickDelete(row.id);
                                handleCloseMenu();
                            }}
                        >
                            {t('삭제하기')}
                        </MenuItem>
                    </Menu>
                </TableCell>}
            </TableRow>
        );
    };

    const totalData = purchaseList?.reduce(
        (acc, curr) => {
            return {
                quantity: acc.quantity + curr.quantity,
                unitPrice: acc.unitPrice + curr.unitPrice,
                totalPrice: acc.totalPrice + curr.totalPrice,
                deduction: acc.deduction + curr.deduction,
                paymentAmount: acc.paymentAmount + curr.paymentAmount,
            };
        },
        { quantity: 0, unitPrice: 0, totalPrice: 0, deduction: 0, paymentAmount: 0 }
    );

    const totalRow = () => {
        if (!totalData) return null;
        return (
            <TableRow sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
                <TableCell
                    colSpan={4}
                    align="center"
                    sx={{ fontWeight: 600, backgroundColor: palette.grey[50] }}
                >
                    {t('합계')}
                </TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 600 }}>
                    {totalData.quantity.toLocaleString()}
                </TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 600 }}>
                    {totalData.unitPrice.toLocaleString()}원
                </TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 600 }}>
                    {totalData.totalPrice.toLocaleString()}원
                </TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 600 }}>
                    {totalData.deduction.toLocaleString()}원
                </TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 600 }}>
                    {totalData.paymentAmount.toLocaleString()}원
                </TableCell>
                <TableCell colSpan={2} sx={{ backgroundColor: palette.grey[50] }} />
            </TableRow>
        );
    };

    const headData =
        role !== 'VILLAGE_HEAD'
            ? [
                { label: t('ID') },
                { label: t('담당자'), minWidth: '100px' },
                { label: t('면장'), minWidth: '150px' },
                { label: t('거래일자'), minWidth: '150px' },
                { label: t('수량'), minWidth: '150px' },
                { label: t('단가'), minWidth: '150px' },
                { label: t('총액'), minWidth: '150px' },
                { label: t('차감액'), minWidth: '150px' },
                { label: t('지급액'), minWidth: '150px' },
                { label: t('비고'), minWidth: '150px' },
                { label: '', minWidth: '150px' },
            ]
            : [
                { label: t('ID'), minWidth: '100px' },
                { label: t('담당자'), minWidth: '150px' },
                { label: t('면장'), minWidth: '150px' },
                { label: t('거래일자'), minWidth: '150px' },
                { label: t('수량'), minWidth: '150px' },
                { label: t('단가'), minWidth: '150px' },
                { label: t('총액'), minWidth: '150px' },
                { label: t('차감액'), minWidth: '150px' },
                { label: t('지급액'), minWidth: '150px' },
                { label: t('비고'), minWidth: '150px' },
            ];

    return (
        <>
            <Stack>
                <Title title={t('수매 목록')}>
                    {role !== 'VILLAGE_HEAD' && (
                        <Button
                            variant="outlinedBlue"
                            onClick={() => setOpenCreateRow(true)}
                            startIcon={<Plus />}
                        >
                            {t('추가')}
                        </Button>
                    )}
                </Title>
                <PageLayout gap="20px">
                    {/* 필터 영역 */}
                    <Stack
                        direction="row"
                        gap="8px"
                        alignItems="center"
                        justifyContent="flex-start"
                    >
                        <CustomDatePicker
                            value={startDate}
                            onChange={(value) => setStartDate(value ?? undefined)}
                            sx={{ width: '200px' }}
                        />
                        <Typography color={palette.grey[500]}>~</Typography>
                        <CustomDatePicker
                            value={endDate}
                            onChange={(value) => setEndDate(value ?? undefined)}
                            sx={{ width: '200px' }}
                        />

                        <Stack sx={{ width: '150px' }}>
                            <Select
                                autoWidth
                                value={villageHeadId}
                                onChange={(e) => setVillageHeadId(e.target.value)}
                                displayEmpty
                                renderValue={(selected) => {
                                    if (!selected) {
                                        return (
                                            <Typography color="text.disabled">{t('면장 선택')}</Typography>
                                        );
                                    }
                                    return (
                                        <Typography color={palette.common.black}>
                                            {
                                                villageHeadList?.find(
                                                    (head) => head.id === Number(selected)
                                                )?.appUserName
                                            }
                                        </Typography>
                                    );
                                }}
                            >
                                {villageHeadList?.map((head) => (
                                    <MenuItem key={head.id} value={head.id}>
                                        {head.appUserName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Stack>
                    </Stack>

                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ width: '100%', height: '100%', minHeight: 0 }}>
                            <MuiTable stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        {headData.map((item) => {
                                            return (
                                                <TableCell
                                                    key={item.label}
                                                    style={{
                                                        minWidth: item.minWidth
                                                            ? item.minWidth
                                                            : '',
                                                    }}
                                                >
                                                    {item.label}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                </TableHead>
                                <TableBody sx={{ '.MuiTableRow-root': { height: '60px' } }}>
                                    {openCreateRow && (
                                        <CreateTreesPurchaseRow
                                            onClose={() => setOpenCreateRow(false)}
                                        />
                                    )}
                                    {purchaseList && purchaseList.length > 0 ? (
                                        purchaseList.map((item) => renderRow(item))
                                    ) : isLoading ? (
                                        <TableRow>
                                            <TableCell colSpan={headData.length}>
                                                <Stack
                                                    sx={{
                                                        width: '100%',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <CircularProgress color="primary" size={30} />
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={headData.length}>
                                                <Stack
                                                    sx={{
                                                        width: '100%',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <img src={noData} alt="No Data" width={60} />
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>

                                <TableFooter>{totalRow()}</TableFooter>
                            </MuiTable>
                        </TableContainer>
                    </Paper>
                </PageLayout>
            </Stack>

            {selectedPurchaseDetail && (
                <TreesPurchaseEditDialog
                    open={openEditDialog}
                    onClose={() => {
                        setOpenEditDialog(false);
                        setSelectedPurchaseDetail(null);
                    }}
                    purchaseDetail={selectedPurchaseDetail}
                />
            )}
        </>
    );
};

export default TreesPurchaseList;
