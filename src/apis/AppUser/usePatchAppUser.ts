import { useMutation } from '@tanstack/react-query';

import { axiosInstance } from '../axiosInstance';

type PatchMyReq = {
    username: string;
    password: string;
    // idCardFile: File | null;
    idCardUrl: string | null;
};

const patchMy = async (formData: PatchMyReq) => {
    const response = await axiosInstance.patch('/app-user/url', formData);
    return response.data;
};

export const usePatchMy = () => {
    return useMutation({
        mutationFn: patchMy,
    });
};
