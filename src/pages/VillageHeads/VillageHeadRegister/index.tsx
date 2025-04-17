import { useForm } from 'react-hook-form';

import { Button, Stack, TextField, Typography } from '@mui/material';

import LabelAndInput from '@/components/LabelAndInput';
import LabelAndSelect from '@/components/LabelAndSelect';
import LabelAndSelectFile from '@/components/LabelAndSelectFile';
import PageLayout from '@/components/PageLayout';
import Title from '@/components/Title';

interface TVillageHeadRegister {
    managingArea: string;
    name: string;
    id: string;
    password: string;
    accountInfo: {
        bankName: string;
        account: string;
    };
    contract: File;
    passbook: File;
}
const VillageHeadRegister = () => {
    const methods = useForm<TVillageHeadRegister>();
    const onSubmit = (data: TVillageHeadRegister) => {
        console.log(data);
    };
    return (
        <Stack>
            <Title title="면장 등록">
                <Button variant="containedGrey" sx={{ width: '86px', wordBreak: 'keep-all' }}>
                    취소
                </Button>
                <Button
                    variant="containedBlue"
                    sx={{ width: '86px', wordBreak: 'keep-all' }}
                    onClick={() => methods.handleSubmit(onSubmit)()}
                >
                    등록
                </Button>
            </Title>
            <PageLayout gap={'10px'}>
                <LabelAndSelect
                    sx={{ width: '500px' }}
                    labelValue="관리 지역"
                    fieldName="managingArea"
                    control={methods.control}
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
                    fieldName="name"
                    register={methods.register}
                    placeholder="이름"
                />
                <LabelAndInput
                    sx={{ width: '500px' }}
                    labelValue="아이디"
                    fieldName="id"
                    register={methods.register}
                    placeholder="ID"
                />
                <LabelAndInput
                    sx={{ width: '500px' }}
                    labelValue="패스워드"
                    fieldName="password"
                    register={methods.register}
                    placeholder="password"
                />
                <Stack sx={{ gap: '12px' }}>
                    <Typography sx={{ fontSize: '14px' }}>계좌 정보</Typography>
                    <Stack direction={'row'} gap="15px">
                        <TextField
                            {...methods.register('accountInfo.bankName')}
                            placeholder={'은행명'}
                        />
                        <TextField
                            sx={{ width: '500px' }}
                            {...methods.register('accountInfo.account')}
                            placeholder={'계좌 번호'}
                        />
                    </Stack>
                </Stack>
                <LabelAndSelectFile
                    labelValue="계약서"
                    fieldName={'contract'}
                    watch={methods.watch}
                    setValue={methods.setValue}
                />
                <LabelAndSelectFile
                    labelValue="통장 사본"
                    fieldName={'passbook'}
                    watch={methods.watch}
                    setValue={methods.setValue}
                />
            </PageLayout>
        </Stack>
    );
};

export default VillageHeadRegister;
