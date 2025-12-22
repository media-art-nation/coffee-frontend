import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import { Box, Stack, TableCell, TableRow, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { TTreeTransaction, useGetFarmerDetail } from '@/apis/Farmer/useGetFarmerDetail';
import PageLayout from '@/components/PageLayout';
import Table from '@/components/Table';
import Title from '@/components/Title';
import { palette } from '@/themes';

const FarmerDetails = () => {
    const { t } = useTranslation();
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
            <Title title={t('농부 상세 정보')} />
            <PageLayout gap={'27px'}>
                <Stack direction={'row'} gap={'20px'}>
                    {farmerDetails?.identificationPhotoUrl ? (
                        <Box
                            sx={{
                                width: '120px',
                                height: '160px',
                                backgroundImage: `url(${farmerDetails.identificationPhotoUrl})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                            }}
                        />
                    ) : (
                        <Stack
                            sx={{
                                width: '120px',
                                height: '160px',
                                backgroundColor: palette.grey[50],
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Typography color={palette.grey[400]}>No Image</Typography>
                        </Stack>
                    )}
                    <Stack
                        sx={{
                            'gap': '15px',
                            '& .MuiStack-root': {
                                'flexDirection': 'row',
                                'alignItems': 'center',
                                'gap': '30px',
                                '& .MuiTypography-root': {
                                    minWidth: '120px',
                                },
                            },
                        }}
                    >
                        <Stack>
                            <Typography>{t('관리 섹션')}</Typography>
                            <Typography>{farmerDetails?.sectionName}</Typography>
                        </Stack>
                        <Stack>
                            <Typography>{t('이름')}</Typography>
                            <Typography>{farmerDetails?.farmerName}</Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack gap={'27px'}>
                    <Typography variant="title/semibold">{t('나무수령 목록')}</Typography>
                    <Table
                        headData={[t('나무 종'), t('나무 수량'), t('수령 일자')]}
                        bodyData={farmerDetails?.treesTransactions || undefined}
                        renderRow={renderRow}
                    />
                </Stack>
            </PageLayout>
        </Stack>
    );
};

export default FarmerDetails;
