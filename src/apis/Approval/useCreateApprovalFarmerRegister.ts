import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { axiosInstance } from '@/apis/axiosInstance';

export type CreateApprovalFarmerRegisterReq = {
    name: string;
    villageHeadId: number | null;
    approverId: number | null;
    identificationPhotoUrl: string | null;
};
const createApprovalFarmerRegister = async (
    param: CreateApprovalFarmerRegisterReq
): Promise<AxiosResponse> => {
    const query = new URLSearchParams({
        approverId: '1',
    }).toString();

    const formData = {
        name: param.name,
        villageHeadId: param.villageHeadId,
        identificationPhotoUrl: param.identificationPhotoUrl,
    }
 
    return await axiosInstance.post(`/approval/farmer/url?${query}`, formData, );
};

export const useCreateApprovalFarmerRegister = () => {
    return useMutation({
        mutationFn: (param: CreateApprovalFarmerRegisterReq) => createApprovalFarmerRegister(param),
    });
};
