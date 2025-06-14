import { useNavigate, useParams } from 'react-router';

import { Box, Button, Stack } from '@mui/material';

import { useGetVillageHeadDetails } from '@/apis/AppUser/useGetVillageHeadDetails';
import LabelValue from '@/components/LabelValue';
import PageLayout from '@/components/PageLayout';
import Title from '@/components/Title';
import { palette } from '@/themes';

const VillageHeadDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data } = useGetVillageHeadDetails(id);

    return (
        <Stack>
            <Title title="면장 상세 정보">
                <Button
                    variant="containedGrey"
                    sx={{ width: '86px', wordBreak: 'keep-all' }}
                    onClick={() => {
                        navigate(`/village-heads/edit/${id}`);
                    }}
                >
                    수정
                </Button>
                <Button variant="containedGrey" sx={{ width: '86px', wordBreak: 'keep-all' }}>
                    승인
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
                        <LabelValue label="섹션명" value={data?.sectionInfo.sectionName || ''} />
                        <LabelValue label="이름" value={data?.username || ''} />
                        <LabelValue label="아이디" value={data?.userId || ''} />
                    </Stack>
                </Stack>
                <Stack gap={'50px'}>
                    <LabelValue label="계좌정보" value={data?.accountInfo || ''} />
                    <LabelValue label="계약서" value={data?.contractFileUrl || ''} link={true} />
                    <LabelValue label="통장사본" value={data?.bankbookPhotoUrl || ''} link={true} />
                </Stack>
            </PageLayout>
        </Stack>
    );
};

export default VillageHeadDetails;
