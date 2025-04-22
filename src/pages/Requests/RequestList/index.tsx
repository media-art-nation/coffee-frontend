import { FormProvider, useForm } from 'react-hook-form';

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

    return (
        <FormProvider {...methods}>
            <Stack sx={{ width: '100%' }} component="form">
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
