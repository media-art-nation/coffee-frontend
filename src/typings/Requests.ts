export type RequestStatus = 'PENDING' | 'APPROVAL' | 'REJECTED';

export type RequestMethod = 'CREATE' | 'DELETE' | 'UPDATE';

export type RequestServiceType =
    | 'VILLAGE_HEAD'
    | 'FARMER'
    | 'PURCHASE'
    | 'SECTION'
    | 'TREES_TRANSACTION';

export type TRequestListTableRow = {
    id: number;
    requesterName: string;
    approverName: string;
    status: RequestStatus;
    method: RequestMethod;
    serviceType: RequestServiceType;
    createdAt: Date;
};
