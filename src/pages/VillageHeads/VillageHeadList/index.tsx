import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Button, IconButton, Menu, MenuItem, Stack, TableCell, TableRow } from '@mui/material';
import { GetVillageHeadListRes, useGetVillageHeadList } from '@/apis/AppUser/useGetVillageHeadList';
import { useDeleteVillageHead } from '@/apis/Approval/useDeleteVillageHead';
import PageLayout from '@/components/PageLayout';
import Table from '@/components/Table';
import Title from '@/components/Title';
import { useDialog } from '@/hooks/useDialog';
import { MouseEvent, useState } from 'react';
import CreateVillageHeadDialog from './create-dialog';
import { MoreHoriz } from '@mui/icons-material';
import EditVillageHeadDialog from './edit-dialog';


const VillageHeadList = () => {
    const { openDialog } = useDialog();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { data } = useGetVillageHeadList();
    const { mutate: deleteVillageHead } = useDeleteVillageHead();
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [selectedId, setSelectedId] = useState<number | null>(null);


    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleClickMenu = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleClickDelete = (id: number) => {
        openDialog({
            title: t('해당 면장을 삭제하시겠습니까?'),
            description: t('삭제하면 복구가 불가능합니다.'),
            variant: 'alert',
            primaryAction: {
                name: t('확인'),
                onClick: () => {
                    deleteVillageHead({ villageHeadId: id });

                    handleCloseMenu()
                },
            },
            secondaryAction: { name: t('취소'), onClick: () => { } },
        });
    }

    const renderRow = (row: GetVillageHeadListRes) => {
        return (
            <TableRow key={row.id} onClick={() => navigate(`/village-heads/${row.id}`)}>
                <TableCell>{row.appUserId}</TableCell>
                <TableCell>{row.appUserName}</TableCell>
                <TableCell>{row.sectionName}</TableCell>
                <TableCell>{row.farmerCount}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                    <IconButton
                        id="basic-button"
                        size='small'
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClickMenu}>
                        <MoreHoriz />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseMenu}
                        slotProps={{
                            list: {
                                'aria-labelledby': 'basic-button',
                            },
                        }}
                    >
                        <MenuItem onClick={() => {
                            setOpenEditDialog(true)
                            setSelectedId(row.id)
                            handleCloseMenu()
                        }}>수정하기</MenuItem>
                        <MenuItem onClick={() => {
                            handleClickDelete(row.id)
                            handleCloseMenu()
                        }}>삭제하기</MenuItem>
                    </Menu>
                </TableCell>
            </TableRow>
        );
    };



    return (
        <Stack sx={{ width: '100%' }}>
            <Title title={t('면장 목록')} >
                <Button
                    variant="containedBlue"
                    onClick={() => { setOpenCreateDialog(true); }}
                >
                    {t('등록')}
                </Button>
            </Title>
            <PageLayout>
                <Table
                    headData={[t('아이디'), t('이름'), t('섹션'), t('관리 농부 수'), '']}
                    bodyData={data || undefined}
                    renderRow={renderRow}
                />
            </PageLayout>

            <CreateVillageHeadDialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} />

            {selectedId && <EditVillageHeadDialog open={openEditDialog} onClose={() => {
                setOpenEditDialog(false)
                setSelectedId(null)
            }} id={String(selectedId)} />}
        </Stack>
    );
};

export default VillageHeadList;
