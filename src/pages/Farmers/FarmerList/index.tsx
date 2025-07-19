import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Stack, TableCell, TableRow } from '@mui/material';

import { getCookies } from '@/apis/AppUser/cookie';
import { useDeleteFarmer } from '@/apis/Approval/useDeleteFarmer';
import { GetFarmerListRes, useGetFarmerList } from '@/apis/Farmer/useGetFarmerList';
import DeleteButton from '@/components/DeleteButton';
import PageLayout from '@/components/PageLayout';
import Table from '@/components/Table';
import Title from '@/components/Title';
import { useDialog } from '@/hooks/useDialog';

const FarmerList = () => {
    const { openDialog } = useDialog();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { data: farmerList } = useGetFarmerList();
    const { mutate: deleteFarmer } = useDeleteFarmer();

    const role = getCookies('role');

    const renderRow = (row: GetFarmerListRes) => {
        return (
            <TableRow key={row.id} onClick={() => navigate(`/village-heads/farmers/${row.id}`)}>
                <TableCell>{row.farmerName}</TableCell>
                <TableCell>{row.villageHeadName}</TableCell>
                <TableCell>{row.sectionName}</TableCell>
                {role !== 'VILLAGE_HEAD' && (
                    <TableCell>
                        <DeleteButton
                            onDelete={() => {
                                openDialog({
                                    title: t('해당 농부를 삭제하시겠습니까?'),
                                    description: t(
                                        '해당 농부에 속한 나무 수령 목록도 삭제 됩니다.'
                                    ),
                                    variant: 'alert',
                                    primaryAction: {
                                        name: t('확인'),
                                        onClick: () => {
                                            deleteFarmer({ farmerId: row.id });
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
            <Title title={t('농부 목록')} />
            <PageLayout>
                <Table
                    headData={
                        role !== 'VILLAGE_HEAD'
                            ? [t('이름'), t('면장'), t('섹션'), '']
                            : [t('이름'), t('면장'), t('섹션')]
                    }
                    bodyData={farmerList || undefined}
                    renderRow={renderRow}
                />
            </PageLayout>
        </Stack>
    );
};

export default FarmerList;
