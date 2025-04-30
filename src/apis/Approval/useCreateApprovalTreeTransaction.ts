import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { axiosInstance } from '@/apis/axiosInstance';

export type TApprovalTreeTransactionInput = {
    id: number;
    quantity: number;
    receivedDate: string;
    species: string;
    farmerId: number;
};
type CreateApprovalTreeTransactionReq = {
    approverId: number;
    param: TApprovalTreeTransactionInput;
};

const createApprovalTreeTransaction = async (
    param: CreateApprovalTreeTransactionReq
): Promise<AxiosResponse> => {
    return await axiosInstance.post(
        `/approval/trees-transaction?approverId=${param.approverId}`,
        param.param
    );
};

export const useCreateApprovalTreeTransaction = () => {
    return useMutation({
        mutationFn: (param: CreateApprovalTreeTransactionReq) =>
            createApprovalTreeTransaction(param),
    });
};
