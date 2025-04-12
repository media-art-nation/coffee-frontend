import { useForm } from 'react-hook-form';

import { Button, Stack, TextField, Typography } from '@mui/material';

type TLoginForm = {
    userId: string;
    password: string;
};

const Login = () => {
    const { register, handleSubmit } = useForm<TLoginForm>({
        defaultValues: {
            userId: '',
            password: '',
        },
    });

    const onSubmit = (formData: TLoginForm) => {
        console.log(formData);
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
                <TextField placeholder="패스워드" {...register('password')} />
                <Button variant="containedBlue" type="submit">
                    로그인
                </Button>
            </Stack>
        </Stack>
    );
};

export default Login;
