import { Stack, TableCell, TableRow } from '@mui/material';

import PageLayout from '@/components/PageLayout';
import Table from '@/components/Table';
import Title from '@/components/Title';

type TDummy = {
    id: number;
    area: string;
    section: string;
};
const LocationList = () => {
    const dummy: TDummy[] = [
        { id: 1, area: 'dummy', section: 'dummy' },
        { id: 2, area: 'dummy', section: 'dummy' },
        { id: 3, area: 'dummy', section: 'dummy' },
    ];
    const renderRow = (row: TDummy) => {
        return (
            <TableRow key={row.id}>
                <TableCell>{row.area}</TableCell>
                <TableCell>{row.section}</TableCell>
            </TableRow>
        );
    };
    return (
        <Stack>
            <Title title="지역 및 섹션 목록" />
            <PageLayout>
                <Table headData={['지역명', '섹션명']} bodyData={dummy} renderRow={renderRow} />
            </PageLayout>
        </Stack>
    );
};

export default LocationList;
