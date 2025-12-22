import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/apis/QueryKeys';
import { axiosInstance } from '@/apis/axiosInstance';

export type GetPurchaseList = {
    id: number;
    managerId: number;
    managerName: string;
    purchaseDate: string; //YYYY-MM-DD
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    deduction: number;
    paymentAmount: number;
    remarks?: string;
};
const getPurchaseList = async (): Promise<GetPurchaseList[]> => {
    return await axiosInstance.get('/purchase').then((res) => {
        if (res.data.code === 'SUCCESS') {
            return res.data.response;
        }
    });
};

export const useGetPurchaseList = () => {
    return useQuery({
        queryKey: QUERY_KEYS.PURCHASE.getPurchaseList(),
        queryFn: () => getPurchaseList(),
    });
};
