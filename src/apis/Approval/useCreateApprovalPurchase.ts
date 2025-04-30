import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { axiosInstance } from '@/apis/axiosInstance';

export type TApprovalPurchaseInput = {
    id: number;
    deduction: number;
    paymentAmount: number;
    purchaseDate: string;
    quantity: number;
    totalPrice: number;
    unitPrice: number;
};
type CreateApprovalPurchaseReq = {
    param: TApprovalPurchaseInput;
    approverId: number;
};

const createApprovalPurchase = async (param: CreateApprovalPurchaseReq): Promise<AxiosResponse> => {
    return await axiosInstance.post(
        `/approval/purchase?approverId=${param.approverId}`,
        param.param
    );
};

export const useCreateApprovalPurchase = () => {
    return useMutation({
        mutationFn: (param: CreateApprovalPurchaseReq) => createApprovalPurchase(param),
    });
};
