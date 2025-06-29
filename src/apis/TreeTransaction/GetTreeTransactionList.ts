import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/apis/QueryKeys';
import { axiosInstance } from '@/apis/axiosInstance';

export type GetTreeTransactionList = {
    id: number;
    farmerId: number;
    farmerName: string;
    species: string;
    quantity: number;
    receivedDate: string;
};
const getTreeTransactionList = async (): Promise<GetTreeTransactionList[]> => {
    return await axiosInstance.get('/tree-transactions').then((res) => {
        if (res.data.code === 'SUCCESS') {
            return res.data.response;
        }
    });
};

export const useGetTreeTransactionList = () => {
    return useQuery({
        queryKey: QUERY_KEYS.TREE_TRANSACTION.getTreeTransactionList(),
        queryFn: () => getTreeTransactionList(),
    });
};
