import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { axiosInstance } from '@/apis/axiosInstance';

export type CreateApprovalPurchaseReq = {
    deduction: number;
    paymentAmount: number;
    purchaseDate: string;
    quantity: number;
    totalPrice: number;
    unitPrice: number;
};

const createApprovalPurchase = async (param: CreateApprovalPurchaseReq): Promise<AxiosResponse> => {
    return await axiosInstance.post(`/approval/purchase?approverId=1`, param);
};

export const useCreateApprovalPurchase = () => {
    return useMutation({
        mutationFn: (param: CreateApprovalPurchaseReq) => createApprovalPurchase(param),
    });
};
