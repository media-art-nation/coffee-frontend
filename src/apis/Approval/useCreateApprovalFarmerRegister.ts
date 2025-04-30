import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { axiosInstance } from '@/apis/axiosInstance';

export type CreateApprovalFarmerRegisterReq = {
    name: string;
    villageHeadId: number | null;
    approverId: number | null;
    identificationPhoto?: File | null;
};
const createApprovalFarmerRegister = async (
    param: CreateApprovalFarmerRegisterReq
): Promise<AxiosResponse> => {
    const formData = new FormData();

    formData.append('name', param.name);
    if (param.villageHeadId) {
        formData.append('villageHeadId', param.villageHeadId.toString());
    }
    if (param.approverId) {
        formData.append('approverId', 'admin');
    }
    if (param.identificationPhoto) {
        formData.append('identificationPhoto', param.identificationPhoto);
    }
    return await axiosInstance.post('/approval/farmer', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const useCreateApprovalFarmerRegister = () => {
    return useMutation({
        mutationFn: (param: CreateApprovalFarmerRegisterReq) => createApprovalFarmerRegister(param),
    });
};
