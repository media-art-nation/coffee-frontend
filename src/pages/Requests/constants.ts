import { RequestMethod, RequestServiceType, RequestStatus } from '@/typings/Requests';

export const REQUEST_STATUS: Record<RequestStatus, { label: string; color: string }> = {
    PENDING: {
        label: '대기',
        color: 'yellow',
    },
    APPROVAL: {
        label: '승인',
        color: 'blue',
    },
    REJECTED: {
        label: '거절',
        color: 'red',
    },
};

export const REQUEST_SERVICE_TYPE: Record<RequestServiceType, string> = {
    VILLAGE_HEAD: '면장',
    FARMER: '농부',
    PURCHASE: '수매',
    TREES_TRANSACTION: '나무 수령',
    SECTION: '지역',
};

export const REQUEST_METHOD: Record<RequestMethod, string> = {
    CREATE: '등록',
    DELETE: '삭제',
    UPDATE: '수정',
};
