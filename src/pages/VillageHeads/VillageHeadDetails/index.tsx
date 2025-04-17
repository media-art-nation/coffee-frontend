import { Button, Stack } from '@mui/material';

import AddPhoto from '@/components/AddPhoto';
import LabelValue from '@/components/LabelValue';
import PageLayout from '@/components/PageLayout';
import Title from '@/components/Title';

const VillageHeadDetails = () => {
    return (
        <Stack>
            <Stack direction={'row'} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Title title="면장 상세 정보" />
                <Stack direction={'row'} gap={'20px'} sx={{ height: '40px', paddingRight: '40px' }}>
                    <Button variant="containedGrey" sx={{ width: '86px', wordBreak: 'keep-all' }}>
                        수정
                    </Button>
                    <Button variant="containedGrey" sx={{ width: '86px', wordBreak: 'keep-all' }}>
                        승인
                    </Button>
                </Stack>
            </Stack>
            <PageLayout gap={'50px'}>
                <Stack direction={'row'} gap={'20px'} sx={{ alignItems: 'center' }}>
                    <AddPhoto />
                    <Stack
                        sx={{
                            height: '100%',
                            padding: '10px 0px',
                            justifyContent: 'space-between',
                        }}
                    >
                        <LabelValue label="섹션명" value="{섹션명}" />
                        <LabelValue label="이름" value="{이름}" />
                        <LabelValue label="아이디" value="{아이디}" />
                    </Stack>
                </Stack>
                <Stack gap={'50px'}>
                    <LabelValue label="계좌정보" value="{계좌정보}" />
                    <LabelValue label="계약서" value="계약서.pdf" />
                    <LabelValue label="통장사본" value="통장사본.pdf" />
                </Stack>
            </PageLayout>
        </Stack>
    );
};

export default VillageHeadDetails;
