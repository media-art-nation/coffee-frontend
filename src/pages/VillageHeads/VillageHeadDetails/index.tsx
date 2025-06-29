import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { Box, Button, Stack } from '@mui/material';
import { GoogleMap, Marker } from '@react-google-maps/api';

import { useGetVillageHeadDetails } from '@/apis/AppUser/useGetVillageHeadDetails';
import LabelValue from '@/components/LabelValue';
import PageLayout from '@/components/PageLayout';
import Title from '@/components/Title';
import { containerStyle } from '@/pages/Locations/LocationRegister';
import { palette } from '@/themes';

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
                <Button variant="containedGrey" sx={{ width: '86px', wordBreak: 'keep-all' }}>
                    {t('승인')}
                </Button>
            </Title>
            <PageLayout gap={'50px'}>
                <Stack direction={'row'} gap={'20px'} sx={{ alignItems: 'center' }}>
                    {/* //[TODO] 사진 요소 받아오기 api 연동*/}
                    <Box sx={{ width: '120px', height: '160px', background: palette.grey[100] }} />
                    <Stack
                        sx={{
                            height: '100%',
                            padding: '10px 0px',
                            justifyContent: 'space-between',
                        }}
                    >
                        <LabelValue label={t('섹션')} value={data?.sectionInfo.sectionName || ''} />
                        <LabelValue label={t('이름')} value={data?.username || ''} />
                        <LabelValue label={t('아이디')} value={data?.userId || ''} />
                    </Stack>
                </Stack>
                <Stack gap={'50px'}>
                    <LabelValue label={t('계좌 정보')} value={data?.accountInfo || ''} />
                    <LabelValue
                        label={t('계약서')}
                        value={data?.contractFileUrl || ''}
                        link={true}
                    />
                    <LabelValue
                        label={t('통장 사본')}
                        value={data?.bankbookPhotoUrl || ''}
                        link={true}
                    />
                    <Stack>
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
                    </Stack>
                </Stack>
            </PageLayout>
        </Stack>
    );
};

export default VillageHeadDetails;
