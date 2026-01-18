import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { axiosInstance } from '@/apis/axiosInstance';

export type UpdateApprovalFarmerReq = {
    name: string;
    villageHeadId: string | null;
    identificationPhotoUrl: string | null;
    farmerId: number | null;
};

const updateApprovalFarmer = async (param: UpdateApprovalFarmerReq): Promise<AxiosResponse> => {
    const formData = {
        name: param.name,
        villageHeadId: String(param.villageHeadId),
        identificationPhotoUrl: param.identificationPhotoUrl,
    };

    return await axiosInstance.patch(`/approval/farmer/${param.farmerId}/url?approverId=1`, formData);
};

export const useUpdateApprovalFarmer = () => {
    return useMutation({
        mutationFn: (param: UpdateApprovalFarmerReq) => updateApprovalFarmer(param),
    });
};
