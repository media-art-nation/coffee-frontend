import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/apis/QueryKeys';
import { axiosInstance } from '@/apis/axiosInstance';
import { TSection } from '@/typings/Area';

type GetAreaSectionListRes = {
    id: number;
    areaName: string;
    longitude: number;
    latitude: number;
    sections: TSection[];
}[];

const getAreaSectionList = async (areaId: string | undefined): Promise<GetAreaSectionListRes> => {
    if (!areaId) return [];
    return await axiosInstance.get(`/area/${areaId}/with-sections`).then((res) => {
        if (res.data.code === 'SUCCESS') {
            return res.data.response;
        }
        throw new Error('지역 및 섹션 리스트를 불러오는데 오류가 발생했습니다.');
    });
};

export const useGetAreaSectionList = (areaId: string | undefined) => {
    return useQuery({
        queryKey: QUERY_KEYS.AREA.getAreaSectionList(areaId || ''),
        queryFn: () => getAreaSectionList(areaId),
        enabled: !!areaId,
    });
};
