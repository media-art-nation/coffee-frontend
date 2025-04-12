import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { TPageable } from '@/typings/Pageable';
import { TRequestServiceType, TRequestStatus } from '@/typings/Requests';

import { axiosInstance } from '../axiosInstance';

type GetApprovalReq = {
    statuses: TRequestStatus[];
    serviceTypes: TRequestServiceType[];
    pageable: TPageable;
};

const getApproval = async (params: GetApprovalReq) => {
    const { data } = await axiosInstance.get('/approval', {
        params,
    });

    return data.response;
};

export const useGetApproval = (params: GetApprovalReq) => {
    return useQuery({
        queryKey: ['approval'],
        queryFn: async () => await getApproval(params),
    });
};
