import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { Box, Button, Stack, Typography } from '@mui/material';
import { GoogleMap, Marker } from '@react-google-maps/api';

import { useGetVillageHeadDetails } from '@/apis/AppUser/useGetVillageHeadDetails';
import PageLayout from '@/components/PageLayout';
import Title from '@/components/Title';
import { containerStyle } from '@/pages/Locations/LocationRegister';
import { palette } from '@/themes';
import { getFileName } from '@/utils/getFileName';

const VillageHeadDetails = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const { data } = useGetVillageHeadDetails(id);

    return (
        <Stack>
            <Title title={t('면장 상세')}>
                <Button
                    variant="containedGrey"
                    sx={{ width: '86px', wordBreak: 'keep-all' }}
                    onClick={() => {
                        navigate(`/village-heads/edit/${id}`);
                    }}
                >
                    {t('수정')}
                </Button>
            </Title>
            <PageLayout gap={'50px'}>
                <Stack direction={'row'} gap={'20px'} sx={{ alignItems: 'center' }}>
                    {data?.identificationPhotoUrl ? (
                        <Box
                            sx={{
                                width: '120px',
                                height: '160px',
                                backgroundImage: `url(${data.identificationPhotoUrl})`,
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
                            <Typography>{t('섹션')}</Typography>
                            <Typography>{data?.sectionInfo.sectionName}</Typography>
                        </Stack>
                        <Stack>
                            <Typography>{t('이름')}</Typography>
                            <Typography>{data?.username}</Typography>
                        </Stack>
                        <Stack>
                            <Typography>{t('아이디')}</Typography>
                            <Typography>{data?.userId}</Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack
                    sx={{
                        'gap': '20px',
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
                        <Typography>{t('계좌 정보')}</Typography>
                        <Typography>{data?.accountInfo}</Typography>
                    </Stack>
                    <Stack>
                        <Typography>{t('계약서')}</Typography>
                        {data?.contractFileUrl ? (
                            <Typography
                                sx={{
                                    'cursor': 'pointer',
                                    '&:hover': { textDecoration: 'underline' },
                                }}
                                onClick={() => {
                                    if (!data?.contractFileUrl) return;
                                    window.open(data?.contractFileUrl, '_blank');
                                }}
                            >
                                {getFileName(data?.contractFileUrl)}
                            </Typography>
                        ) : (
                            <Typography>-</Typography>
                        )}
                    </Stack>
                    <Stack>
                        <Typography>{t('통장 사본')}</Typography>
                        {data?.bankbookPhotoUrl ? (
                            <Typography
                                sx={{
                                    'cursor': 'pointer',
                                    '&:hover': { textDecoration: 'underline' },
                                }}
                                onClick={() => {
                                    if (!data?.bankbookPhotoUrl) return;
                                    window.open(data?.bankbookPhotoUrl, '_blank');
                                }}
                            >
                                {getFileName(data?.bankbookPhotoUrl)}
                            </Typography>
                        ) : (
                            <Typography>-</Typography>
                        )}
                    </Stack>
                </Stack>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={{
                        lat: data?.sectionInfo.latitude || 0,
                        lng: data?.sectionInfo.longitude || 0,
                    }}
                    zoom={13}
                >
                    <Marker
                        position={{
                            lat: data?.sectionInfo.latitude || 0,
                            lng: data?.sectionInfo.longitude || 0,
                        }}
                    />
                </GoogleMap>
            </PageLayout>
        </Stack>
    );
};

export default VillageHeadDetails;
