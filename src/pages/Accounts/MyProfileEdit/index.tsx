import { useForm } from 'react-hook-form';

import { Button, Stack, Typography } from '@mui/material';

import { getCookies } from '@/apis/AppUser/cookie';
import AddPhoto from '@/components/AddPhoto';
import LabelAndInput from '@/components/LabelAndInput';
import Title from '@/components/Title';
import { useDialog } from '@/hooks/useDialog';

type TProfileEditForm = {
    username: string;
    password: string;
    passwordCheck: string;
    idCard?: File | null;
};

const MyProfileEdit = () => {
    const { openDialog } = useDialog();
    const role = getCookies('role');
    console.log(role, 'role');
    const { watch, setValue, handleSubmit, register } = useForm<TProfileEditForm>({
        defaultValues: {
            username: '',
            password: '',
            passwordCheck: '',
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
                    fieldName="username"
                    register={register}
                    labelValue="이름"
                    placeholder="username"
                />
                <LabelAndInput
                    sx={{ width: '100%' }}
                    fieldName="password"
                    register={register}
                    labelValue="비밀번호 확인"
                    placeholder="password"
                    type="password"
                />
                <LabelAndInput
                    sx={{ width: '100%' }}
                    fieldName="passwordCheck"
                    register={register}
                    labelValue="비밀번호 확인"
                    placeholder="password check"
                    type="password"
                />
                {/* 부관리자의 경우에만 IDCard 노출 */}
                {role.startsWith('VICE_ADMIN') && (
                    <Stack gap={'10px'}>
                        <Typography sx={{ fontSize: '14px' }}>ID Card</Typography>
                        <AddPhoto fieldName="idCard" watch={watch} setValue={setValue} />
                    </Stack>
                )}
            </Stack>
        </Stack>
    );
};

export default MyProfileEdit;
