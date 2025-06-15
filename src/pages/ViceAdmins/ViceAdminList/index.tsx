import { useNavigate } from 'react-router';

import { Stack, TableCell, TableRow } from '@mui/material';

import { GetViceAdminListRes, useGetViceAdminList } from '@/apis/AppUser/useGetViceAdminList';
import PageLayout from '@/components/PageLayout';
import Table from '@/components/Table';
import Title from '@/components/Title';

const ViceAdminList = () => {
    const { data: viceAdminList, isLoading } = useGetViceAdminList();
    const navigate = useNavigate();

    const renderRow = (row: GetViceAdminListRes) => {
        return (
            <TableRow key={row.id} onClick={() => navigate(`/vice-admins/${row.id}`)}>
                <TableCell>{row.userName}</TableCell>
                <TableCell>{row.userId}</TableCell>
                <TableCell>{row.areaInfo.areaName}</TableCell>
            </TableRow>
        );
    };
    return (
        <Stack>
            <Title title={'부 관리자 목록'} />
            <PageLayout>
                <Table
                    headData={['이름', '아이디', '관리 지역']}
                    bodyData={viceAdminList}
                    renderRow={renderRow}
                    isLoading={isLoading}
                />
            </PageLayout>
        </Stack>
    );
};
export default ViceAdminList;
