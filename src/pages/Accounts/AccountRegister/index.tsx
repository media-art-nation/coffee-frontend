import { useForm } from 'react-hook-form';

import { Button, Stack } from '@mui/material';

import { useSignUp } from '@/apis/AppUser/useSignUp';
import { useGetArea } from '@/apis/Area/useGetArea';
import LabelAndInput from '@/components/LabelAndInput';
import LabelAndSelect from '@/components/LabelAndSelect';
import Title from '@/components/Title';
import { useDialog } from '@/hooks/useDialog';
import { TRole } from '@/typings/User';
import { showToast } from '@/utils/showToast';

export type TSignUpForm = {
    userId: string;
    username: string;
    password: string;
    passwordCheck: string;
    role: '' | TRole;
    location?: string;
    section?: string;
};

const AccountRegister = () => {
    const { openDialog } = useDialog();
    const { data: area } = useGetArea();

    const { mutateAsync: signUp } = useSignUp();
    const { control, handleSubmit, reset, register, watch } = useForm<TSignUpForm>({
        defaultValues: {
            userId: '',
            username: '',
            password: '',
            passwordCheck: '',
            role: '',
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
        openDialog({
            title: '계정 생성',
            description: '계정을 생성하시겠습니까?',
            variant: 'confirm',
            primaryAction: {
                name: '확인',
                onClick: async () => {
                    await signUp(formData).then((res) => {
                        if (res.code === 'SUCCESS') {
                            showToast.success('계정이 생성 되었습니다.');
                            reset();
                        } else showToast.error('계정 생성에 실패하였습니다.');
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
                    fieldName="username"
                    register={register}
                    labelValue="이름"
                    placeholder="username"
                />
                <LabelAndInput
                    sx={{ width: '100%' }}
                    fieldName="userId"
                    register={register}
                    labelValue="아이디"
                    placeholder="id"
                />
                <LabelAndInput
                    sx={{ width: '100%' }}
                    fieldName="password"
                    register={register}
                    labelValue="패스워드"
                    placeholder="password"
                    type="password"
                />
                <LabelAndInput
                    sx={{ width: '100%' }}
                    fieldName="passwordCheck"
                    register={register}
                    labelValue="패스워드 확인"
                    placeholder="password check"
                    type="password"
                />
                <LabelAndSelect
                    labelValue="권한"
                    fieldName="role"
                    control={control}
                    sx={{ width: '100%' }}
                    selectArr={[
                        { value: 'VICE_ADMIN_HEAD_OFFICER', label: '부 관리자(한국지사)' },
                        {
                            value: 'VICE_ADMIN_AGRICULTURE_MINISTRY_OFFICER',
                            label: '부 관리자(농림부)',
                        },
                        { value: 'VILLAGE_HEAD', label: '면장' },
                    ]}
                    placeholder="role"
                />
                <LabelAndSelect
                    labelValue="지역"
                    fieldName="location"
                    sx={{ width: '100%' }}
                    control={control}
                    selectArr={
                        area?.map((v) => {
                            return {
                                value: v.areaName,
                                label: v.areaName,
                            };
                        }) || []
                    }
                    placeholder="area"
                />
                {watch('role') === 'VILLAGE_HEAD' && (
                    <LabelAndSelect
                        labelValue="섹션"
                        fieldName="section"
                        sx={{ width: '100%' }}
                        control={control}
                        selectArr={
                            area?.map((v) => {
                                return {
                                    value: v.areaName,
                                    label: v.areaName,
                                };
                            }) || []
                        }
                        placeholder="지역을 선택하세요."
                        disabled={!watch('location')}
                    />
                )}
            </Stack>
        </Stack>
    );
};
export default AccountRegister;
