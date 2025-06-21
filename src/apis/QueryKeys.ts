export const QUERY_KEYS = {
    ALL: ['coffeeProject'],
    APP_USER: {
        all: () => [...QUERY_KEYS.ALL, 'appUser'],
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
        getAreaWithSectionList: () => [...QUERY_KEYS.AREA.all(), 'areaWithSectionList'],
        getAreaSectionList: (areaId: string) => [
            ...QUERY_KEYS.AREA.all(),
            'areaSectionList',
            areaId,
        ],
    },
};
