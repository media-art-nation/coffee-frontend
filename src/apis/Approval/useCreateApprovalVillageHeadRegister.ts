import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { axiosInstance } from '@/apis/axiosInstance';

export type CreateApprovalVillageHeadRegisterReq = {
    userId: string;
    username: string;
    password: string;
    bankName?: string;
    accountInfo?: string;
    sectionId: number;
    approverId: number;
    identificationPhoto: File;
    contractFile: File;
    bankbookPhoto: File;
};

const createApprovalVillageHeadRegister = async (
    param: CreateApprovalVillageHeadRegisterReq
): Promise<AxiosResponse> => {
    const formData = new FormData();

    formData.append('userId', param.userId);
    formData.append('username', param.username);
    formData.append('password', param.password);
    formData.append('sectionId', param.sectionId.toString());
    formData.append('approverId', 'admin'); //[TODO] 문의 필요

    if (param.bankName) formData.append('bankName', param.bankName);
    if (param.accountInfo) formData.append('accountInfo', param.accountInfo);

    formData.append('identificationPhoto', param.identificationPhoto);
    formData.append('contractFile', param.contractFile);
    formData.append('bankbookPhoto', param.bankbookPhoto);

    return await axiosInstance.post(`/approval/village-head`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const useCreateApprovalVillageHeadRegister = () => {
    return useMutation({
        mutationFn: (param: CreateApprovalVillageHeadRegisterReq) =>
            createApprovalVillageHeadRegister(param),
    });
};
