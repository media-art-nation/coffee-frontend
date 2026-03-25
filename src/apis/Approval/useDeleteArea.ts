import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/apis/QueryKeys';
import { showToast } from '@/utils/showToast';

import { axiosInstance } from '../axiosInstance';

type DeleteAreaReq = {
    areaId: number;
};

const deleteArea = async ({ areaId }: DeleteAreaReq) => {
    const response = await axiosInstance.delete(`/area/${areaId}`, {
        params: { approverId: 1 },
    });
    return response.data;
};

export const useDeleteArea = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteArea,
        onSuccess: (res) => {
            if (res.code === 'SUCCESS') {
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.AREA.getAreaWithSectionList(),
                });
                showToast.success('삭제되었습니다.');
                return;
            }
            showToast.error('삭제되지 않았습니다.');
            return;
        },
        onError: (res) => {
            showToast.error('삭제되지 않았습니다.' + `\n${res.message ?? ''}`);
        },
    });
};
