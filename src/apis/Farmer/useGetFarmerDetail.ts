import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/apis/QueryKeys';
import { axiosInstance } from '@/apis/axiosInstance';

export type TTreeTransaction = {
    species: string;
    receivedDate: string;
    quantity: number;
};
type GetFarmerDetailReq = string | undefined;
type GetFarmerDetailRes = {
    sectionName: string;
    farmerName: string;
    identificationPhotoUrl: string;
    treesTransactions: TTreeTransaction[];
};
const getFarmerDetail = async (param: GetFarmerDetailReq): Promise<GetFarmerDetailRes> => {
    return await axiosInstance.get(`/farmer/${param}`).then((res) => {
        if (res.data.code === 'SUCCESS') {
            return res.data.response;
        }
        throw new Error('농부 정보를 불러오는데 오류가 발생했습니다.');
    });
};

export const useGetFarmerDetail = (param: GetFarmerDetailReq) => {
    return useQuery({
        queryKey: QUERY_KEYS.FARMER.getFarmerDetail(JSON.stringify(param)),
        queryFn: () => getFarmerDetail(param),
        enabled: Boolean(param),
    });
};
