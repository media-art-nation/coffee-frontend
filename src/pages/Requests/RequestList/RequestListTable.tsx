import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { Chip, TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';

import { useGetApproval } from '@/apis/Approval/useGetApproval';
import Table from '@/components/Table';
import { TRequestListTableRow, TRequestServiceType, TRequestStatus } from '@/typings/Requests';

import { REQUEST_METHOD, REQUEST_SERVICE_TYPE, REQUEST_STATUS } from '../constants';

const RequestListTable = () => {
    const navigate = useNavigate();
    const { watch } = useFormContext();

    const watchedValues = watch();

    const { data, isLoading } = useGetApproval({
        statuses: Object.entries(watchedValues.statuses)
            .map(([key, val]) => (val ? (key as TRequestStatus) : null))
            .filter((v) => v !== null),
        serviceTypes: Object.entries(watchedValues.serviceTypes)
            .map(([key, val]) => (val ? (key as TRequestServiceType) : null))
            .filter((v) => v !== null),
        pageable: watchedValues.pageable,
    });

    const renderRow = (row: TRequestListTableRow) => {
        return (
            <TableRow
                key={row.id}
                onClick={() => navigate(`${row.serviceType.toLocaleLowerCase()}/${row.id}`)}
            >
                <TableCell>
                    {REQUEST_SERVICE_TYPE[row.serviceType]} / {REQUEST_METHOD[row.method]}
                </TableCell>
                <TableCell>{dayjs(row.createdAt).format('YYYY-MM-DD HH:mm')}</TableCell>
                <TableCell>{row.requesterName}</TableCell>
                <TableCell>
                    <Chip
                        label={REQUEST_STATUS[row.status].label}
                        color={REQUEST_STATUS[row.status].color as 'blue' | 'yellow' | 'red'}
                    />
                </TableCell>
            </TableRow>
        );
    };

    return (
        <Table
            headData={['요청 분류', '요청 일시', '담당자', '요청 상태']}
            bodyData={data?.content}
            renderRow={renderRow}
            isLoading={isLoading}
        />
    );
};

export default RequestListTable;
