export const QUERY_KEYS = {
    ALL: ['coffeeProject'],
    APP_USER: {
        all: () => [...QUERY_KEYS.ALL, 'appUser'],
        my: (id: string) => [...QUERY_KEYS.ALL, 'my', id],
        getVillageHeadList: () => [...QUERY_KEYS.APP_USER.all(), 'villageHeadList'],
        getVillageHeadDetail: (param: string) => [
            ...QUERY_KEYS.APP_USER.all(),
            'villageHeadDetails',
            param,
        ],
        getViceAdminList: () => [...QUERY_KEYS.APP_USER.all(), 'viceAdminList'],
        getViceAdminDetail: (param: string) => [
            ...QUERY_KEYS.APP_USER.all(),
            'viceAdminDetail',
            param,
        ],
    },
    FARMER: {
        all: () => [...QUERY_KEYS.ALL, 'farmer'],
        getFarmerList: () => [...QUERY_KEYS.FARMER.all(), 'farmerList'],
        getFarmerDetail: (param: string) => [...QUERY_KEYS.FARMER.all(), 'farmerDetail', param],
    },
    AREA: {
        all: () => [...QUERY_KEYS.ALL, 'area'],
        getAreaList: () => [...QUERY_KEYS.AREA.all(), 'areaList'],
        getSectionList: (areaId: string) => [...QUERY_KEYS.AREA.all(), 'sectionList', areaId],
        getMyArea: () => [...QUERY_KEYS.AREA.all(), 'myArea'],
        getAreaWithSectionList: () => [...QUERY_KEYS.AREA.all(), 'areaWithSectionList'],
    },
    PURCHASE: {
        all: () => [...QUERY_KEYS.ALL, 'purchase'],
        getPurchaseList: () => [...QUERY_KEYS.PURCHASE.all(), 'purchaseList'],
    },
    TREE_TRANSACTION: {
        all: () => [...QUERY_KEYS.ALL, 'treeTransaction'],
        getTreeTransactionList: () => [...QUERY_KEYS.TREE_TRANSACTION.all(), 'treeTransactionList'],
    },
    GCS: {
        all: () => [...QUERY_KEYS.ALL, 'gcs'],
        getImagePreview: (url: string) => [...QUERY_KEYS.GCS.all(), url],
    },
};
