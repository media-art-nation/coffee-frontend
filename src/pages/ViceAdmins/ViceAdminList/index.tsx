import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Stack, TableCell, TableRow } from '@mui/material';

import { GetViceAdminListRes, useGetViceAdminList } from '@/apis/AppUser/useGetViceAdminList';
import PageLayout from '@/components/PageLayout';
import Table from '@/components/Table';
import Title from '@/components/Title';

const ViceAdminList = () => {
    const { t } = useTranslation();
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
            <Title title={t('부관리자 목록')} />
            <PageLayout>
                <Table
                    headData={[t('이름'), t('아이디'), t('관리 지역')]}
                    bodyData={viceAdminList}
                    renderRow={renderRow}
                    isLoading={isLoading}
                />
            </PageLayout>
        </Stack>
    );
};
export default ViceAdminList;
