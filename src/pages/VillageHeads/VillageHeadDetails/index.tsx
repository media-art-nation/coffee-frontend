import { useForm } from 'react-hook-form';

import { Button, Stack } from '@mui/material';

import AddPhoto from '@/components/AddPhoto';
import LabelValue from '@/components/LabelValue';
import PageLayout from '@/components/PageLayout';
import Title from '@/components/Title';

interface TVillageHeaderDetail {
    photo: File | null;
}
const VillageHeadDetails = () => {
    const methods = useForm<TVillageHeaderDetail>({ defaultValues: { photo: null } });
    return (
        <Stack>
            <Title title="면장 상세 정보">
                <Button variant="containedGrey" sx={{ width: '86px', wordBreak: 'keep-all' }}>
                    수정
                </Button>
                <Button variant="containedGrey" sx={{ width: '86px', wordBreak: 'keep-all' }}>
                    승인
                </Button>
            </Title>
            <PageLayout gap={'50px'}>
                <Stack direction={'row'} gap={'20px'} sx={{ alignItems: 'center' }}>
                    <AddPhoto fieldName="photo" watch={methods.watch} setValue={methods.setValue} />
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
