import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/apis/QueryKeys';
import { showToast } from '@/utils/showToast';

import { axiosInstance } from '../axiosInstance';

type DeleteViceAdminReq = {
    viceAdminId: number;
};

const deleteViceAdmin = async ({ viceAdminId }: DeleteViceAdminReq) => {
    const response = await axiosInstance.delete(`/app-user/vice-admin/${viceAdminId}`);
    return response.data;
};

export const useDeleteViceAdmin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteViceAdmin,
        onSuccess: (res) => {
            if (res.code === 'SUCCESS') {
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.APP_USER.getViceAdminList(),
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
