import { useNavigate } from 'react-router';

import { Button, Stack, TableCell, TableRow } from '@mui/material';

import { GetVillageHeadListRes, useGetVillageHeadList } from '@/apis/AppUser/useGetVillageHeadList';
import PageLayout from '@/components/PageLayout';
import Table from '@/components/Table';
import Title from '@/components/Title';

const VillageHeadList = () => {
    const navigate = useNavigate();
    const { data } = useGetVillageHeadList();

    const renderRow = (row: GetVillageHeadListRes) => {
        return (
            <TableRow key={row.id} onClick={() => navigate(`/village-heads/${row.id}`)}>
                <TableCell>{row.appUserId}</TableCell>
                <TableCell>{row.appUserName}</TableCell>
                <TableCell>{row.sectionName}</TableCell>
                <TableCell>{row.farmerCount}</TableCell>
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
                    bodyData={data}
                    renderRow={renderRow}
                />
            </PageLayout>
        </Stack>
    );
};

export default VillageHeadList;
