import { useMutation } from '@tanstack/react-query';

import { TSignUpForm } from '@/pages/Accounts/AccountRegister';

import { axiosInstance } from '../axiosInstance';

type SignUpReq = TSignUpForm;

const signUp = async (formData: SignUpReq) => {
    const response = await axiosInstance.post('/app-user/sign-up', formData);
    return response.data;
};

export const useSignUp = () => {
    return useMutation({
        mutationFn: signUp,
    });
};
