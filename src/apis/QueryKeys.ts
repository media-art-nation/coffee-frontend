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
    },
};
