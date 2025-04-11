import { Chip, TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';

import Table from '@/components/Table';
import { TRequestListTableRow } from '@/typings/Requests';

import { REQUEST_METHOD, REQUEST_SERVICE_TYPE, REQUEST_STATUS } from '../constants';

const RequestListTable = () => {
    const renderRow = (row: TRequestListTableRow) => {
        return (
            <TableRow key={row.id}>
                <TableCell>
                    {REQUEST_SERVICE_TYPE[row.serviceType]} / {REQUEST_METHOD[row.method]}
                </TableCell>
                <TableCell>{dayjs(row.createdAt).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
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
            bodyData={[
                {
                    id: 0,
                    requesterName: '김유나',
                    approverName: '강종원',
                    status: 'REJECTED',
                    createdAt: new Date(),
                    serviceType: 'VILLAGE_HEAD',
                    method: 'DELETE',
                },
                {
                    id: 1,
                    requesterName: '김유나',
                    approverName: '장은희',
                    status: 'APPROVAL',
                    createdAt: new Date(),
                    serviceType: 'SECTION',
                    method: 'CREATE',
                },
                {
                    id: 2,
                    requesterName: '장은희',
                    approverName: '강종원',
                    status: 'PENDING',
                    createdAt: new Date(),
                    serviceType: 'FARMER',
                    method: 'UPDATE',
                },
            ]}
            renderRow={renderRow}
        />
    );
};

export default RequestListTable;
