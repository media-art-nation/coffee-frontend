import React from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Pagination, Stack } from '@mui/material';

import Title from '@/components/Title';
import { TPageable } from '@/typings/Pageable';
import { TRequestServiceType, TRequestStatus } from '@/typings/Requests';

import RequestListFilter from './RequestListFilter';
import RequestListTable from './RequestListTable';

type TRequestListFilterForm = {
    statuses: Record<TRequestStatus, boolean>;
    serviceTypes: Record<TRequestServiceType, boolean>;
    pageable: TPageable;
};

const RequestList = () => {
    const { t } = useTranslation();
    const methods = useForm<TRequestListFilterForm>({
        defaultValues: {
            statuses: {
                PENDING: true,
                APPROVED: true,
                REJECTED: true,
            },
            serviceTypes: {
                VILLAGE_HEAD: true,
                FARMER: true,
                PURCHASE: true,
                SECTION: true,
                TREES_TRANSACTION: true,
            },
            pageable: {
                page: 0,
                size: 10,
                sort: 'id',
            },
        },
    });

    const handleChangePage = (_: React.ChangeEvent<unknown>, page: number) => {
        methods.setValue('pageable.page', page - 1);
    };

    return (
        <FormProvider {...methods}>
            <Stack sx={{ width: '100%', maxHeight: '100%', flex: '1' }} component="form">
                <Title title={t('요청 목록')} />
                <Stack
                    sx={{
                        gap: '20px',
                        padding: '0 32px',
                        flex: '1',
                        overflow: 'hidden',
                    }}
                >
                    <RequestListFilter />
                    <RequestListTable />
                    <Stack
                        sx={{
                            alignItems: 'center',
                        }}
                    >
                        <Pagination
                            count={3}
                            page={methods.watch('pageable.page') + 1}
                            onChange={handleChangePage}
                        />
                    </Stack>
                </Stack>
            </Stack>
        </FormProvider>
    );
};

export default RequestList;
