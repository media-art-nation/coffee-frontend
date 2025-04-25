import { useQuery } from '@tanstack/react-query';

import { TRequestServiceType, TRequestStatus } from '@/typings/Requests';

import { axiosInstance } from '../axiosInstance';

type GetApprovalDetailsReq = string | undefined;
type GetApprovalDetailsRes =
    | TVillageHeadApprovalDetails
    | TFarmerApprovalDetails
    | TSectionApprovalDetails;

type TApprovalBase = {
    id: number | null;
    rejectedReason: string | null;
    serviceType: TRequestServiceType;
    status: TRequestStatus;
};

export type TFarmerApprovalDetails = TApprovalBase & {
    identificationPhotoUrl: string | null;
    name: string;
    villageHeadId: 9;
};

export type TVillageHeadApprovalDetails = TApprovalBase & {
    accountInfo: string;
    bankName: string;
    bankbookPhotoUrl: string | null;
    contractFileUrl: string | null;
    identificationPhotoUrl: string | null;
    sectionId: number;
    userId: string;
    username: string;
};

export type TSectionApprovalDetails = TApprovalBase & {
    areaId: number;
    latitude: number;
    longitude: number;
    sectionName: string;
};

export type TPurchaseApprovalDetails = TApprovalBase & {
    deduction: number;
    paymentAmount: number;
    purchaseDate: Date;
    quantity: number;
    totalPrice: number;
    unitPrice: number;
};

const getApprovalDetails = async <T = GetApprovalDetailsRes>(
    approvalId: GetApprovalDetailsReq
): Promise<T> => {
    const { data } = await axiosInstance.get(`/approval/${approvalId}`);

    return data.response;
};

export const useGetApprovalDetails = <T = GetApprovalDetailsRes>(
    approvalId: GetApprovalDetailsReq
) => {
    return useQuery<T>({
        queryKey: ['approval', approvalId],
        queryFn: async () => await getApprovalDetails(approvalId),
        enabled: !!approvalId,
    });
};
