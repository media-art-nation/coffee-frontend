import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { Button, Stack, TextField, Typography } from '@mui/material';

import { setCookies } from '@/apis/AppUser/cookie';
import { useSignIn } from '@/apis/AppUser/useSignIn';
import { TRole } from '@/typings/User';

export type TLoginForm = {
    userId: string;
    password: string;
};

const Login = () => {
    const navigate = useNavigate();
    const { mutateAsync: signIn } = useSignIn();
    const { register, handleSubmit } = useForm<TLoginForm>({
        defaultValues: {
            userId: '',
            password: '',
        },
    });

    const roleRouteMap: Record<TRole, string> = {
        ADMIN: '/requests',
        VICE_ADMIN_HEAD_OFFICER: '/requests',
        VICE_ADMIN_AGRICULTURE_MINISTRY_OFFICER: '/requests',
        VILLAGE_HEAD: '/village-heads/farmers',
    };

    const onSubmit = async (formData: TLoginForm) => {
        console.log(formData);
        await signIn(formData).then((res) => {
            if (res.code === 'SUCCESS') {
                setCookies('accessToken', res.response.accessToken);
                setCookies('role', res.response.role);
                setCookies('appUserId', res.response.appUserId);

                navigate(roleRouteMap[res.response.role as TRole]);
            } else {
                alert(res.message);
            }
        });
    };

    return (
        <Stack
            sx={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Stack
                sx={{
                    'gap': '30px',
                    'alignItems': 'center',
                    'width': '500px',
                    '& .MuiFormControl-root, .MuiButton-root': { width: '60%' },
                }}
            >
                <Typography variant="h1/bold">로그인</Typography>
                <TextField placeholder="아이디" {...register('userId')} />
                <TextField placeholder="패스워드" {...register('password')} type="password" />
                <Button variant="containedBlue" type="submit">
                    로그인
                </Button>
            </Stack>
        </Stack>
    );
};

export default Login;
