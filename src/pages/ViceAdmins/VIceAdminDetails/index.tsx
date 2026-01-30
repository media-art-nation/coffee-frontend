import { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import { Box, Button, Stack, Typography } from '@mui/material';
import { Pencil } from '@phosphor-icons/react';
import { GoogleMap, Marker } from '@react-google-maps/api';

import { useGetViceAdminDetails } from '@/apis/AppUser/useGetViceAdminDetails';
import PageLayout from '@/components/PageLayout';
import Title from '@/components/Title';
import { containerStyle } from '@/pages/Locations/LocationRegister';
import NarrowLayout from '@/routers/NarrowLayout';
import { palette } from '@/themes';

import { EditViceAdminDialog } from '../edit-dialog';
import { Loading } from '@/components/Loading';
import { Image } from '@mui/icons-material';

const ViceAdminDetails = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const { data: viceAdminDetail, isLoading } = useGetViceAdminDetails(id);
    const [openEditDialog, setOpenEditDialog] = useState(false);



    return (
        <NarrowLayout>
            <Stack>
                <Title title={t('부관리자 상세')}>
                    <Button
                        variant="outlinedBlue"
                        onClick={() => {
                            setOpenEditDialog(true);
                        }}
                        startIcon={<Pencil />}
                    >
                        {t('수정')}
                    </Button>
                </Title>
                {isLoading ? <Loading /> :
                    <PageLayout gap={'27px'}>
                        <Stack direction={'row'} gap={'20px'} sx={{ alignItems: 'center' }}>
                            {viceAdminDetail && viceAdminDetail.idCardUrl ? (
                                <Box
                                    sx={{
                                        width: '120px',
                                        height: '160px',
                                        border: '1px solid #E0E0E0',
                                    }}
                                >
                                    <img src={viceAdminDetail.idCardUrl} alt="idCard" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </Box>
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
                                    <Typography>{t('이름')}</Typography>
                                    <Typography>{viceAdminDetail?.username}</Typography>
                                </Stack>
                                <Stack>
                                    <Typography>{t('아이디')}</Typography>
                                    <Typography>{viceAdminDetail?.userId}</Typography>
                                </Stack>

                                <Stack>
                                    <Typography>{t('관리 지역')}</Typography>
                                    <Typography>{viceAdminDetail?.areaInfo.areaName}</Typography>
                                </Stack>
                            </Stack>
                        </Stack>

                        <Stack>
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={{
                                    lat: viceAdminDetail?.areaInfo.latitude || 0,
                                    lng: viceAdminDetail?.areaInfo.longitude || 0,
                                }}
                                zoom={13}
                            >
                                <Marker
                                    position={{
                                        lat: viceAdminDetail?.areaInfo.latitude || 0,
                                        lng: viceAdminDetail?.areaInfo.longitude || 0,
                                    }}
                                />
                            </GoogleMap>
                        </Stack>
                    </PageLayout>}
            </Stack>
            <EditViceAdminDialog
                open={openEditDialog}
                onClose={() => setOpenEditDialog(false)}
                viceAdminId={Number(id)}
            />
        </NarrowLayout>
    );
};

export default ViceAdminDetails;
