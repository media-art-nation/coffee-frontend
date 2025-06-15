import { useParams } from 'react-router';

import { Box, Stack, TableCell, TableRow, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { TTreeTransaction, useGetFarmerDetail } from '@/apis/Farmer/useGetFarmerDetail';
import LabelValue from '@/components/LabelValue';
import NoPhoto from '@/components/NoPhoto';
import PageLayout from '@/components/PageLayout';
import Table from '@/components/Table';
import Title from '@/components/Title';

const FarmerDetails = () => {
    const { id } = useParams();
    const { data: farmerDetails } = useGetFarmerDetail(id);

    const renderRow = (row: TTreeTransaction) => {
        return (
            <TableRow key={`${row.species}-${row.quantity}-${row.receivedDate}`}>
                <TableCell>{row.species}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{dayjs(row.receivedDate).format('YYYY-MM-DD')}</TableCell>
            </TableRow>
        );
    };
    return (
        <Stack>
            <Title title="농부 상세 정보" />
            <PageLayout gap={'27px'}>
                <Stack direction={'row'} gap={'20px'}>
                    {farmerDetails?.identificationPhotoUrl ? (
                        <Box
                            sx={{ width: '120px', height: '160px' }}
                            component={'img'}
                            src={farmerDetails.identificationPhotoUrl}
                            alt={'identification photo url'}
                        />
                    ) : (
                        <NoPhoto />
                    )}
                    <Stack>
                        <LabelValue label="관리 섹션" value={farmerDetails?.sectionName || ''} />
                        <LabelValue label="이름" value={farmerDetails?.farmerName || ''} />
                    </Stack>
                </Stack>
                <Stack gap={'27px'}>
                    <Typography variant="title/semibold">나무 수령 목록</Typography>
                    <Table
                        headData={['나무 종', '나무 수량', '수령 일자']}
                        bodyData={farmerDetails?.treesTransactions || undefined}
                        renderRow={renderRow}
                    />
                </Stack>
            </PageLayout>
        </Stack>
    );
};

export default FarmerDetails;
