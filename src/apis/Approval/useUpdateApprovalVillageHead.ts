import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { axiosInstance } from '@/apis/axiosInstance';

type UpdateApprovalVillageHeadReq = {
    id: number
    userId: string;
    username: string;
    password: string;
    bankName?: string;
    accountInfo?: string;
    sectionId: number | null;
    identificationPhotoUrl: string | null;
    contractFileUrl: string | null;
    bankbookPhotoUrl: string | null;
};

const updateApprovalVillageHead = async (
    param: UpdateApprovalVillageHeadReq
): Promise<AxiosResponse> => {
    return await axiosInstance.patch(`/approval/village-head/url?approverId=1`, param);
};

export const useUpdateApprovalVillageHead = () => {
    return useMutation({
        mutationFn: (param: UpdateApprovalVillageHeadReq) => updateApprovalVillageHead(param),
    });
};
