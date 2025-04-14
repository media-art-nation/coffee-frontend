import { Button, Stack, TableCell, TableRow } from '@mui/material';

import PageLayout from '@/components/PageLayout';
import Table from '@/components/Table';
import Title from '@/components/Title';

interface TDummy {
    id: string;
    name: string;
    section: string;
    managingCnt: number;
}
const VillageHeadList = () => {
    const dummy = [
        { id: '1', name: 'dummy', section: 'dummy', managingCnt: 5 },
        { id: '2', name: 'dummy', section: 'dummy', managingCnt: 5 },
        { id: '3', name: 'dummy', section: 'dummy', managingCnt: 5 },
    ];
    const renderRow = (row: TDummy) => {
        return (
            <TableRow>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.section}</TableCell>
                <TableCell>{row.managingCnt}</TableCell>
                <TableCell>
                    <Button variant="containedRed">삭제</Button>
                </TableCell>
            </TableRow>
        );
    };
    return (
        <Stack sx={{ width: '100%' }}>
            <Title title="면장 목록" />
            <PageLayout>
                <Table
                    headData={['아이디', '이름', '섹션명', '관리 농부 숫자', '액션']}
                    bodyData={dummy}
                    renderRow={renderRow}
                />
            </PageLayout>
        </Stack>
    );
};

export default VillageHeadList;
