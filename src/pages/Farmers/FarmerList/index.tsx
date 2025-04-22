import { useNavigate } from 'react-router';

import { Stack, TableCell, TableRow } from '@mui/material';

import PageLayout from '@/components/PageLayout';
import Table from '@/components/Table';
import Title from '@/components/Title';

type TDummy = {
    id: number;
    name: string;
    villageHeader: string;
    section: string;
};
const FarmerList = () => {
    const navigate = useNavigate();
    const dummy = [
        { id: 1, name: 'dummy', villageHeader: 'dummy', section: 'dummy' },
        { id: 2, name: 'dummy', villageHeader: 'dummy', section: 'dummy' },
        { id: 3, name: 'dummy', villageHeader: 'dummy', section: 'dummy' },
    ];
    const renderRow = (row: TDummy) => {
        return (
            <TableRow onClick={() => navigate(`/village-heads/farmers/${row.id}`)}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.villageHeader}</TableCell>
                <TableCell>{row.section}</TableCell>
            </TableRow>
        );
    };
    return (
        <Stack>
            <Title title="농부 목록" />
            <PageLayout>
                <Table
                    headData={['이름', '관할 면장', '섹션명']}
                    bodyData={dummy}
                    renderRow={renderRow}
                />
            </PageLayout>
        </Stack>
    );
};

export default FarmerList;
