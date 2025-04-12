import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { Button, MenuItem, Select, Stack, Typography } from '@mui/material';

import LabelAndInput from '@/components/LabelAndInput';
import Title from '@/components/Title';
import { useDialog } from '@/hooks/useDialog';

type TAccountForm = {
    userId: string;
    username: string;
    password: string;
    role: string;
};

/**
 * ADMIN, VILLAGE_HEAD
 * VICE_ADMIN_HEAD_OFFICER
 * VICE_ADMIN_AGRICULTURE_MINISTRY_OFFICER */

const AccountRegister = () => {
    const { openDialog } = useDialog();
    const [passwordCheck, setPasswordCheck] = useState('');
    const { watch, register, setValue, handleSubmit } = useForm<TAccountForm>({
        defaultValues: {
            userId: '',
            username: '',
            password: '',
            role: 'ADMIN',
        },
    });

    const handleClickCancel = () => {
        openDialog({
            title: '계정 생성 취소',
            description: '계정 생성을 취소하시겠습니까?',
            variant: 'alert',
            primaryAction: {
                name: '확인',
                onClick: () => {},
            },
            secondaryAction: {
                name: '닫기',
                onClick: () => {},
            },
        });
    };

    const onSubmit = (formData: TAccountForm) => {
        console.log(formData);
        openDialog({
            title: '계정 생성',
            description: '계정을 생성하시겠습니까?',
            variant: 'confirm',
            primaryAction: {
                name: '확인',
                onClick: () => {},
            },
            secondaryAction: {
                name: '닫기',
                onClick: () => {},
            },
        });
    };

    return (
        <Stack sx={{ width: '100%' }} component="form" onSubmit={handleSubmit(onSubmit)}>
            <Title title="계정 생성">
                <Stack
                    sx={{
                        'flexDirection': 'row',
                        'gap': '5px',
                        '& .MuiButton-root': { height: '40px' },
                    }}
                >
                    <Button variant="containedGrey" onClick={handleClickCancel}>
                        취소
                    </Button>
                    <Button variant="containedBlue" type="submit">
                        생성
                    </Button>
                </Stack>
            </Title>
            <Stack sx={{ gap: '20px', padding: '0 32px', width: '500px' }}>
                <LabelAndInput
                    sx={{ width: '100%' }}
                    inputValue={watch('username')}
                    inputOnChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setValue('username', e.target.value)
                    }
                    labelValue="이름"
                    placeholder="Input"
                />
                <LabelAndInput
                    sx={{ width: '100%' }}
                    inputValue={watch('userId')}
                    inputOnChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setValue('userId', e.target.value)
                    }
                    labelValue="아이디"
                    placeholder="Input"
                />
                <LabelAndInput
                    sx={{ width: '100%' }}
                    inputValue={watch('password')}
                    inputOnChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setValue('password', e.target.value)
                    }
                    labelValue="패스워드"
                    placeholder="Password"
                    type="password"
                />
                <LabelAndInput
                    sx={{ width: '100%' }}
                    inputValue={passwordCheck}
                    inputOnChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPasswordCheck(e.target.value)
                    }
                    labelValue="패스워드 확인"
                    placeholder="Password Check"
                    type="password"
                />

                <Stack sx={{ gap: '12px' }}>
                    <Typography sx={{ fontSize: '14px' }}>권한</Typography>
                    <Select {...register('role')}>
                        <MenuItem value="VICE_ADMIN_HEAD_OFFICER">{'부 관리자(한국지사)'}</MenuItem>
                        <MenuItem value="VICE_ADMIN_AGRICULTURE_MINISTRY_OFFICER">
                            {'부 관리자(농림부)'}
                        </MenuItem>
                        <MenuItem value="VILLAGE_HEAD">면장</MenuItem>
                    </Select>
                </Stack>
                {watch('role').startsWith('VICE_ADMIN') && (
                    <Stack sx={{ gap: '12px' }}>
                        <Typography sx={{ fontSize: '14px' }}>관리 지역</Typography>
                        <Select {...register('role')}>
                            <MenuItem value="지역 1">지역 1</MenuItem>
                            <MenuItem value="지역 1">지역 2</MenuItem>
                            <MenuItem value="지역 1">지역 3</MenuItem>
                        </Select>
                    </Stack>
                )}
            </Stack>
        </Stack>
    );
};
export default AccountRegister;
