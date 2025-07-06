import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Stack, TableCell, TableRow } from '@mui/material';

import { GetVillageHeadListRes, useGetVillageHeadList } from '@/apis/AppUser/useGetVillageHeadList';
import { useDeleteVillageHead } from '@/apis/Approval/useDeleteVillageHead';
import DeleteButton from '@/components/DeleteButton';
import PageLayout from '@/components/PageLayout';
import Table from '@/components/Table';
import Title from '@/components/Title';
import { useDialog } from '@/hooks/useDialog';

const VillageHeadList = () => {
    const { openDialog } = useDialog();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { data } = useGetVillageHeadList();
    const { mutate: deleteVillageHead } = useDeleteVillageHead();
    const renderRow = (row: GetVillageHeadListRes) => {
        return (
            <TableRow key={row.id} onClick={() => navigate(`/village-heads/${row.id}`)}>
                <TableCell>{row.appUserId}</TableCell>
                <TableCell>{row.appUserName}</TableCell>
                <TableCell>{row.sectionName}</TableCell>
                <TableCell>{row.farmerCount}</TableCell>
                <TableCell>
                    <DeleteButton
                        onDelete={() => {
                            openDialog({
                                title: t('해당 면장을 삭제하시겠습니까?'),
                                description: t('삭제하면 복구가 불가능합니다.'),
                                variant: 'alert',
                                primaryAction: {
                                    name: t('확인'),
                                    onClick: () => {
                                        deleteVillageHead({ villageHeadId: row.id });
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
        <Stack sx={{ width: '100%' }}>
            <Title title={t('면장 목록')} />
            <PageLayout>
                <Table
                    headData={[t('아이디'), t('이름'), t('섹션'), t('관리 농부 수'), t('삭제')]}
                    bodyData={data || undefined}
                    renderRow={renderRow}
                />
            </PageLayout>
        </Stack>
    );
};

export default VillageHeadList;
