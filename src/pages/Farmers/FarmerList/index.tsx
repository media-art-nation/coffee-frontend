import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Stack, TableCell, TableRow } from '@mui/material';

import { GetFarmerListRes, useGetFarmerList } from '@/apis/Farmer/useGetFarmerList';
import PageLayout from '@/components/PageLayout';
import Table from '@/components/Table';
import Title from '@/components/Title';

const FarmerList = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { data: farmerList } = useGetFarmerList();
    const renderRow = (row: GetFarmerListRes) => {
        return (
            <TableRow onClick={() => navigate(`/village-heads/farmers/${row.id}`)}>
                <TableCell>{row.farmerName}</TableCell>
                <TableCell>{row.villageHeadName}</TableCell>
                <TableCell>{row.sectionName}</TableCell>
            </TableRow>
        );
    };
    return (
        <Stack>
            <Title title={t('농부 목록')} />
            <PageLayout>
                <Table
                    headData={[t('이름'), t('면장'), t('섹션')]}
                    bodyData={farmerList || undefined}
                    renderRow={renderRow}
                />
            </PageLayout>
        </Stack>
    );
};

export default FarmerList;
