import { useNavigate } from 'react-router';

import { Stack, TableCell, TableRow } from '@mui/material';

import { GetFarmerListRes, useGetFarmerList } from '@/apis/Farmer/useGetFarmerList';
import PageLayout from '@/components/PageLayout';
import Table from '@/components/Table';
import Title from '@/components/Title';

const FarmerList = () => {
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
            <Title title="농부 목록" />
            <PageLayout>
                <Table
                    headData={['이름', '관할 면장', '섹션명']}
                    bodyData={farmerList || undefined}
                    renderRow={renderRow}
                />
            </PageLayout>
        </Stack>
    );
};

export default FarmerList;
