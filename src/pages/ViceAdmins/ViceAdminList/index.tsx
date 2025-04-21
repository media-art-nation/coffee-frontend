import { useNavigate } from 'react-router';

import { Stack, TableCell, TableRow } from '@mui/material';

import PageLayout from '@/components/PageLayout';
import Table from '@/components/Table';
import Title from '@/components/Title';

interface TDummy {
    id: number;
    name: string;
    userId: string;
    managingArea: string;
}

const ViceAdminList = () => {
    const dummy: TDummy[] = [
        { id: 1, name: 'dummy', userId: 'dummy', managingArea: '경기' },
        { id: 2, name: 'dummy', userId: 'dummy', managingArea: '경기' },
    ];
    const navigate = useNavigate();

    const renderRow = (row: TDummy) => {
        return (
            <TableRow key={row.id} onClick={() => navigate(`/vice-admins/${row.id}`)}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.userId}</TableCell>
                <TableCell>{row.managingArea}</TableCell>
            </TableRow>
        );
    };
    return (
        <Stack>
            <Title title={'부 관리자 목록'} />
            <PageLayout>
                <Table
                    headData={['이름', '아이디', '관리 지역']}
                    bodyData={dummy}
                    renderRow={renderRow}
                />
            </PageLayout>
        </Stack>
    );
};
export default ViceAdminList;
