import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { axiosInstance } from '@/apis/axiosInstance';

type UpdateViceAdminUrlReq = {
    viceAdminId: number;
    username: string;
    userId: string;
    areaId: number | null;
    idCardUrl: string | null;
};

const updateViceAdminUrl = async (param: UpdateViceAdminUrlReq): Promise<AxiosResponse> => {
    const { viceAdminId, ...rest } = param;
    return axiosInstance.patch(`/app-user/vice-admin/${viceAdminId}/url`, rest);
};

export const useUpdateViceAdminUrl = () => {
    return useMutation({
        mutationFn: updateViceAdminUrl,
    });
};
