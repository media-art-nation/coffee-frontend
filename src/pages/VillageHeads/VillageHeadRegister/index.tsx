import React from 'react';

import { Button, Stack, TextField, Typography } from '@mui/material';

import LabelAndInput from '@/components/LabelAndInput';
import LabelAndSelect from '@/components/LabelAndSelect';
import LabelAndSelectFile from '@/components/LabelAndSelectFile';
import PageLayout from '@/components/PageLayout';
import TitleWithButton from '@/components/TitleWithButton';

const VillageHeadRegister = () => {
    const [managerArea, setManagerArea] = React.useState<string>('');
    const [name, setName] = React.useState<string>('');
    const [id, setId] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [bankName, setBankName] = React.useState<string>('');
    const [account, setAccount] = React.useState<string>('');
    const [contractFile, setContractFile] = React.useState<File | null>(null);
    const [passbookFile, setPassbookFile] = React.useState<File | null>(null);

    return (
        <Stack>
            <TitleWithButton title="면장 등록">
                <Button variant="containedGrey" sx={{ width: '86px', wordBreak: 'keep-all' }}>
                    취소
                </Button>
                <Button variant="containedBlue" sx={{ width: '86px', wordBreak: 'keep-all' }}>
                    등록
                </Button>
            </TitleWithButton>
            <PageLayout gap={'10px'}>
                <LabelAndSelect
                    sx={{ width: '500px' }}
                    labelValue="관리 지역"
                    inputValue={managerArea}
                    inputOnChange={(e) => setManagerArea(e.target.value)}
                    placeholder={'관리 지역'}
                    selectArr={[
                        { value: '0', label: '경기도' },
                        { value: '1', label: '서울' },
                        { value: '2', label: '부산' },
                    ]}
                />
                <LabelAndInput
                    sx={{ width: '500px' }}
                    labelValue="이름"
                    inputValue={name}
                    inputOnChange={(e) => setName(e.target.value)}
                    placeholder="이름"
                />
                <LabelAndInput
                    sx={{ width: '500px' }}
                    labelValue="아이디"
                    inputValue={id}
                    inputOnChange={(e) => setId(e.target.value)}
                    placeholder="ID"
                />
                <LabelAndInput
                    sx={{ width: '500px' }}
                    labelValue="패스워드"
                    inputValue={password}
                    inputOnChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                />
                <Stack sx={{ gap: '12px' }}>
                    <Typography sx={{ fontSize: '14px' }}>계좌 정보</Typography>
                    <Stack direction={'row'} gap="15px">
                        <TextField
                            placeholder={'은행명'}
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                        />
                        <TextField
                            sx={{ width: '500px' }}
                            placeholder={'계좌 번호'}
                            value={account}
                            onChange={(e) => setAccount(e.target.value)}
                        />
                    </Stack>
                </Stack>
                <LabelAndSelectFile
                    labelValue="계약서"
                    fileName={contractFile?.name || ''}
                    setFile={setContractFile}
                />
                <LabelAndSelectFile
                    labelValue="통장 사본"
                    fileName={passbookFile?.name || ''}
                    setFile={setPassbookFile}
                />
            </PageLayout>
        </Stack>
    );
};

export default VillageHeadRegister;
