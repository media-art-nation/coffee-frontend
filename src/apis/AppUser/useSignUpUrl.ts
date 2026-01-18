import { useMutation } from '@tanstack/react-query';

import { TRole } from '@/typings/User';

import { axiosInstance } from '../axiosInstance';

type SignUpUrlReq = {
    userId: string;
    username: string;
    password: string;
    role: TRole;
    areaId: number;
    sectionId?: number;
    bankName?: string;
    accountInfo?: string;
    identificationPhotoUrl: string | null;
    contractFileUrl?: string | null;
    bankbookPhotoUrl?: string | null;
};

const signUpUrl = async (formData: SignUpUrlReq) => {
    const response = await axiosInstance.post('/app-user/sign-up/url', formData);
    return response.data;
};

export const useSignUpUrl = () => {
    return useMutation({
        mutationFn: signUpUrl,
    });
};
