import { useForm } from 'react-hook-form';

import { Button, Stack, Typography } from '@mui/material';

import AddPhoto from '@/components/AddPhoto';
import LabelAndInput from '@/components/LabelAndInput';
import Title from '@/components/Title';
import { useDialog } from '@/hooks/useDialog';

type TProfileEditForm = {
    username: string;
    password: string;
    idCard?: any;
};

const MyProfileEdit = () => {
    const { openDialog } = useDialog();
    const { watch, setValue, handleSubmit } = useForm<TProfileEditForm>({
        defaultValues: {
            username: '',
            password: '',
            idCard: null,
        },
    });

    const handleClickCancel = () => {
        openDialog({
            title: '계정 수정 취소',
            description: '계정 수정을 취소하시겠습니까?',
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

    const onSubmit = (formData: TProfileEditForm) => {
        console.log(formData);
        openDialog({
            title: '내 정보 수정',
            description: '정보를 수정하시겠습니까?',
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
            <Title title="내 정보 수정">
                <Stack
                    sx={{
                        'flexDirection': 'row',
                        'gap': '5px',
                        'alignItems': 'center',
                        '& .MuiButton-root': { height: '40px' },
                    }}
                >
                    <Button variant="containedGrey" onClick={handleClickCancel}>
                        취소
                    </Button>
                    <Button variant="containedBlue" type="submit">
                        수정
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
                    inputValue={watch('password')}
                    inputOnChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setValue('password', e.target.value)
                    }
                    labelValue="패스워드"
                    placeholder="password"
                    type="password"
                />

                {/* TODO: 부관리자의 경우에만 ID Card 필드 노출 */}
                <Stack gap={'10px'}>
                    <Typography sx={{ fontSize: '14px' }}>ID Card</Typography>
                    <AddPhoto />
                </Stack>
            </Stack>
        </Stack>
    );
};

export default MyProfileEdit;
