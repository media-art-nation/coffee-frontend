import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { axiosInstance } from '@/apis/axiosInstance';

export type CreateApprovalTreeTransactionReq = {
    quantity: number;
    receivedDate: string;
    species: string;
    farmerId: number;
};

const createApprovalTreeTransaction = async (
    param: CreateApprovalTreeTransactionReq
): Promise<AxiosResponse> => {
    return await axiosInstance.post(`/approval/trees-transaction?approverId=1`, param);
};

export const useCreateApprovalTreeTransaction = () => {
    return useMutation({
        mutationFn: (param: CreateApprovalTreeTransactionReq) =>
            createApprovalTreeTransaction(param),
    });
};
