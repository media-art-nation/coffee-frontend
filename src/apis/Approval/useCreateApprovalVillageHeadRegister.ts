import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { axiosInstance } from '@/apis/axiosInstance';

export type CreateApprovalVillageHeadRegisterReq = {
    id: number
    userId: string;
    username: string;
    password: string;
    bankName?: string;
    accountInfo?: string;
    sectionId: number | null;
    identificationPhotoUrl: string | null;
    contractFileUrl: string | null;
    bankbookPhotoUrl: string | null;
};

const createApprovalVillageHeadRegister = async (
    param: CreateApprovalVillageHeadRegisterReq
): Promise<AxiosResponse> => {
    return await axiosInstance.post(`/approval/village-head/url?approverId=1`, param);
};

export const useCreateApprovalVillageHeadRegister = () => {
    return useMutation({
        mutationFn: (param: CreateApprovalVillageHeadRegisterReq) =>
            createApprovalVillageHeadRegister(param),
    });
};
