import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { DeleteOutline } from '@mui/icons-material';
import { Chip, Stack, TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';

import { useGetApproval } from '@/apis/Approval/useGetApproval';
import Table from '@/components/Table';
import { useDialog } from '@/hooks/useDialog';
import { palette } from '@/themes';
import { TRequestListTableRow, TRequestServiceType, TRequestStatus } from '@/typings/Requests';

import { REQUEST_METHOD, REQUEST_SERVICE_TYPE, REQUEST_STATUS } from '../constants';

const RequestListTable = () => {
    const navigate = useNavigate();
    const { watch } = useFormContext();
    const { openDialog } = useDialog();

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

    const handleDeleteApproval = () => {
        openDialog({
            title: '요청 삭제',
            description: '삭제된 요청은 되돌릴 수 없습니다.',
            variant: 'alert',
            primaryAction: {
                name: '확인',
                onClick: () => {},
            },
            secondaryAction: {
                name: '취소',
                onClick: () => {},
            },
        });
    };

    const renderRow = (row: TRequestListTableRow) => {
        return (
            <TableRow
                key={row.id}
                onClick={() => navigate(`${row.serviceType.toLocaleLowerCase()}/${row.id}`)}
            >
                <TableCell>
                    {REQUEST_SERVICE_TYPE[row.serviceType]} / {REQUEST_METHOD[row.method]}
                </TableCell>
                <TableCell>{dayjs(row.createdAt).format('YYYY. MM. DD HH:mm')}</TableCell>
                <TableCell>{row.requesterName}</TableCell>
                <TableCell>
                    <Chip
                        label={REQUEST_STATUS[row.status].label}
                        color={REQUEST_STATUS[row.status].color as 'blue' | 'yellow' | 'red'}
                    />
                </TableCell>
                <TableCell>
                    <Stack sx={{ justifyContent: 'center' }}>
                        <DeleteOutline
                            sx={{ width: '20px', color: palette.grey[500], cursor: 'pointer' }}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteApproval();
                            }}
                        />
                    </Stack>
                </TableCell>
            </TableRow>
        );
    };

    return (
        <Table
            headData={['요청 분류', '요청 일시', '담당자', '요청 상태', '']}
            bodyData={data?.content}
            renderRow={renderRow}
            isLoading={isLoading}
        />
    );
};

export default RequestListTable;
