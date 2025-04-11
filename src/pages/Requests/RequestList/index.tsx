import { useEffect } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { Pagination, Stack } from '@mui/material';

import Title from '@/components/Title';

import RequestListFilter from './RequestListFilter';
import RequestListTable from './RequestListTable';

type TRequestListFilterForm = {
    statuses: Record<string, boolean>;
    serviceTypes: Record<string, boolean>;
    pageable: {
        page: number;
        size: number;
        sort: string;
    };
};

const RequestList = () => {
    const methods = useForm<TRequestListFilterForm>({
        defaultValues: {
            statuses: {
                PENDING: false,
                APPROVED: false,
                REJECTED: false,
            },
            serviceTypes: {
                VILLAGE_HEAD: false,
                FARMER: false,
                PURCHASE: false,
                SECTION: false,
                TREES_TRANSACTION: false,
            },
            pageable: {
                page: 0,
                size: 0,
                sort: 'id',
            },
        },
    });

    const watchedValues = methods.watch();

    useEffect(() => {
        console.log('값 바뀜:', watchedValues);
    }, [watchedValues]);

    const onSubmit = (formData: TRequestListFilterForm) => {
        console.log(formData);
    };

    return (
        <FormProvider {...methods}>
            <Stack
                sx={{ width: '100%' }}
                component="form"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <Title title="요청 목록" />
                <Stack sx={{ gap: '20px', padding: '0 32px' }}>
                    <RequestListFilter />
                    <RequestListTable />
                    <Pagination count={3} />
                </Stack>
            </Stack>
        </FormProvider>
    );
};

export default RequestList;
