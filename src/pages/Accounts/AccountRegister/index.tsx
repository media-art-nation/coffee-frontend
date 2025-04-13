import { useState } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { Button, MenuItem, Select, Stack, Typography } from '@mui/material';

import { useSignUp } from '@/apis/AppUser/useSignUp';
import LabelAndInput from '@/components/LabelAndInput';
import Title from '@/components/Title';
import { useDialog } from '@/hooks/useDialog';
import { TRole } from '@/typings/User';

export type TSignUpForm = {
    userId: string;
    username: string;
    password: string;
    role: TRole;
};

/**
 * ADMIN, VILLAGE_HEAD
 * VICE_ADMIN_HEAD_OFFICER
 * VICE_ADMIN_AGRICULTURE_MINISTRY_OFFICER */

const AccountRegister = () => {
    const { openDialog } = useDialog();
    const [passwordCheck, setPasswordCheck] = useState('');
    const { mutateAsync: signUp } = useSignUp();
    const { watch, control, setValue, handleSubmit, reset } = useForm<TSignUpForm>({
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
                onClick: () => {
                    reset();
                },
            },
            secondaryAction: {
                name: '닫기',
                onClick: () => {},
            },
        });
    };

    const onSubmit = (formData: TSignUpForm) => {
        console.log(formData);
        openDialog({
            title: '계정 생성',
            description: '계정을 생성하시겠습니까?',
            variant: 'confirm',
            primaryAction: {
                name: '확인',
                onClick: async () => {
                    await signUp(formData).then((res) => {
                        if (res.code === 'SUCCESS') alert('계정이 생성 되었습니다.');
                        else alert('계정 생성에 실패하였습니다.');
                    });
                },
            },
            secondaryAction: {
                name: '닫기',
                onClick: () => {},
            },
        });
    };

    return (
        <Stack
            sx={{ width: '100%' }}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
        >
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
                    placeholder="username"
                />
                <LabelAndInput
                    sx={{ width: '100%' }}
                    inputValue={watch('userId')}
                    inputOnChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setValue('userId', e.target.value)
                    }
                    labelValue="아이디"
                    placeholder="id"
                />
                <LabelAndInput
                    sx={{ width: '100%' }}
                    inputValue={watch('password')}
                    inputOnChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setValue('password', e.target.value)
                    }
                    labelValue="패스워드"
                    placeholder="password"
                    type="password"
                />
                <LabelAndInput
                    sx={{ width: '100%' }}
                    inputValue={passwordCheck}
                    inputOnChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPasswordCheck(e.target.value)
                    }
                    labelValue="패스워드 확인"
                    placeholder="password check"
                    type="password"
                />
                <Stack sx={{ gap: '12px' }}>
                    <Typography sx={{ fontSize: '14px' }}>권한</Typography>
                    <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                            <Select {...field}>
                                <MenuItem value="ADMIN">총 관리자</MenuItem>
                                <MenuItem value="VICE_ADMIN_HEAD_OFFICER">
                                    {'부 관리자(한국지사)'}
                                </MenuItem>
                                <MenuItem value="VICE_ADMIN_AGRICULTURE_MINISTRY_OFFICER">
                                    {'부 관리자(농림부)'}
                                </MenuItem>
                                <MenuItem value="VILLAGE_HEAD">면장</MenuItem>
                            </Select>
                        )}
                    />
                </Stack>
                {watch('role').startsWith('VICE_ADMIN') && (
                    <Stack sx={{ gap: '12px' }}>
                        <Typography sx={{ fontSize: '14px' }}>관리 지역</Typography>
                        <Select>
                            <MenuItem value="지역 1">지역 1</MenuItem>
                            <MenuItem value="지역 2">지역 2</MenuItem>
                            <MenuItem value="지역 3">지역 3</MenuItem>
                        </Select>
                    </Stack>
                )}
            </Stack>
        </Stack>
    );
};
export default AccountRegister;
