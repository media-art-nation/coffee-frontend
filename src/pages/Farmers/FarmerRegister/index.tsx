import React from 'react';

import { Button, Stack, Typography } from '@mui/material';

import AddPhoto from '@/components/AddPhoto';
import LabelAndInput from '@/components/LabelAndInput';
import LabelAndSelect from '@/components/LabelAndSelect';
import PageLayout from '@/components/PageLayout';
import Title from '@/components/Title';

const FarmerRegister = () => {
    const [villageHead, setVillageHead] = React.useState<string>('');
    const [farmerName, setFarmerName] = React.useState<string>('');
    const [farmerId, setFarmerId] = React.useState<string>('');
    return (
        <Stack>
            <Title title="농부 등록">
                <Button variant="containedGrey">취소</Button>
                <Button variant="containedBlue">등록</Button>
            </Title>
            <PageLayout gap={'27px'}>
                <LabelAndSelect
                    sx={{ width: '500px' }}
                    labelValue="면장"
                    inputValue={villageHead}
                    inputOnChange={(e) => setVillageHead(e.target.value)}
                    placeholder="면장 선택"
                    selectArr={[
                        { value: '1', label: '면장1' },
                        { value: '2', label: '면장2' },
                    ]}
                />
                <Stack gap={'30px'}>
                    <Typography fontSize={'14px'}>사진</Typography>
                    <AddPhoto />
                </Stack>
                <LabelAndInput
                    sx={{ width: '500px' }}
                    labelValue="이름"
                    placeholder="이름을 적어주세요."
                    inputValue={farmerName}
                    inputOnChange={(e) => setFarmerName(e.target.value)}
                />
                <LabelAndInput
                    sx={{ width: '500px' }}
                    labelValue="아이디"
                    placeholder="아이디를 적어주세요."
                    inputValue={farmerId}
                    inputOnChange={(e) => setFarmerId(e.target.value)}
                />
            </PageLayout>
        </Stack>
    );
};

export default FarmerRegister;
