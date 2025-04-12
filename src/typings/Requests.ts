export type TRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type TRequestMethod = 'CREATE' | 'DELETE' | 'UPDATE';

export type TRequestServiceType =
    | 'VILLAGE_HEAD'
    | 'FARMER'
    | 'PURCHASE'
    | 'SECTION'
    | 'TREES_TRANSACTION';

export type TRequestListTableRow = {
    id: number;
    requesterName: string;
    approverName: string;
    status: TRequestStatus;
    method: TRequestMethod;
    serviceType: TRequestServiceType;
    createdAt: Date;
};
