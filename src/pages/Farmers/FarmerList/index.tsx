import { Stack, TableCell, TableRow } from '@mui/material';

import PageLayout from '@/components/PageLayout';
import Table from '@/components/Table';
import Title from '@/components/Title';

interface TDummy {
    name: string;
    villageHeader: string;
    section: string;
}
const FarmerList = () => {
    const dummy = [
        { name: 'dummy', villageHeader: 'dummy', section: 'dummy' },
        { name: 'dummy', villageHeader: 'dummy', section: 'dummy' },
        { name: 'dummy', villageHeader: 'dummy', section: 'dummy' },
    ];
    const renderRow = (row: TDummy) => {
        return (
            <TableRow>
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
