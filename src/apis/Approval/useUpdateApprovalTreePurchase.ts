import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { axiosInstance } from '@/apis/axiosInstance';

export type UpdateApprovalTreePurchaseReq = {
    id: number;
    villageHeadId: number;
    deduction: number;
    paymentAmount: number;
    purchaseDate: string;
    quantity: number;
    totalPrice: number;
    unitPrice: number;
    remarks: string;
};

const updateApprovalTreePurchase = async (
    param: UpdateApprovalTreePurchaseReq
): Promise<AxiosResponse> => {

    const requestBody = {
        id: String(param.id),
        villageHeadId: String(param.villageHeadId),
        deduction: String(param.deduction),
        paymentAmount: String(param.paymentAmount),
        purchaseDate: param.purchaseDate,
        quantity: String(param.quantity),
        totalPrice: String(param.totalPrice),
        unitPrice: String(param.unitPrice),
        remarks: param.remarks,
    };

    return await axiosInstance.patch(`/approval/purchase?approverId=1&purchaseId=${param.id}`, requestBody);
};

export const useUpdateApprovalTreePurchase = () => {
    return useMutation({
        mutationFn: (param: UpdateApprovalTreePurchaseReq) => updateApprovalTreePurchase(param),
        onSuccess: () => {}
    });
};
