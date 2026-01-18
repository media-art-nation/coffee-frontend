import { MouseEvent, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { MoreHoriz } from '@mui/icons-material';
import { Button, IconButton, Menu, MenuItem, Stack, TableCell, TableRow } from '@mui/material';
import { Plus } from '@phosphor-icons/react';

import { getCookies } from '@/apis/AppUser/cookie';
import { GetViceAdminListRes, useGetViceAdminList } from '@/apis/AppUser/useGetViceAdminList';
import PageLayout from '@/components/PageLayout';
import Table from '@/components/Table';
import Title from '@/components/Title';

import { EditViceAdminDialog } from './edit-dialog';
import { CreateViceAdminDialog } from './create-dialog';

const ViceAdminList = () => {
    const { t } = useTranslation();
    const role = getCookies('role');
    const { data: viceAdminList, isLoading } = useGetViceAdminList();
    const navigate = useNavigate();
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [viceAdminId, setViceAdminId] = useState<number | null>(null);

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

    const renderRow = (row: GetViceAdminListRes) => {
        return (
            <TableRow key={row.id} onClick={() => navigate(`/vice-admins/${row.id}`)}>
                <TableCell>{row.id.toString()}</TableCell>
                <TableCell>{row.userName}</TableCell>
                <TableCell>{row.userId}</TableCell>
                <TableCell>{row.areaInfo.areaName}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()} align="right">
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
                                setViceAdminId(row.id);
                                handleCloseMenu();
                            }}
                        >
                            수정하기
                        </MenuItem>
                    </Menu>
                </TableCell>
            </TableRow>
        );
    };

    return (
        <Stack>
            <Title title={t('부관리자 목록')}>
                {role === 'ADMIN' && (
                    <Button variant="outlinedBlue" onClick={() => {
                        setOpenCreateDialog(true);
                    }} startIcon={<Plus />}>
                        {t('등록')}
                    </Button>
                )}
            </Title>
            <PageLayout>
                <Table
                    headData={[t('ID'), t('이름'), t('아이디'), t('관리 지역'), t('')]}
                    bodyData={viceAdminList}
                    renderRow={renderRow}
                    isLoading={isLoading}
                />
            </PageLayout>
            {viceAdminId && (
                <EditViceAdminDialog
                    open={openEditDialog}
                    onClose={() => setOpenEditDialog(false)}
                    viceAdminId={viceAdminId}
                />
            )}
            {openCreateDialog && (
                <CreateViceAdminDialog
                    open={openCreateDialog}
                    onClose={() => setOpenCreateDialog(false)}
                />
            )}
        </Stack>
    );
};
export default ViceAdminList;
