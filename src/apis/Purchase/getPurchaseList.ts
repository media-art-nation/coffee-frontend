import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/apis/QueryKeys';
import { axiosInstance } from '@/apis/axiosInstance';
import { TPurchase } from '@/typings/Purchase';

export type GetPurchaseList = TPurchase;

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
