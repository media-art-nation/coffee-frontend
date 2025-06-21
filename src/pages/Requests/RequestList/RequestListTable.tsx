import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { DeleteOutline } from '@mui/icons-material';
import { Chip, IconButton, TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';

import { getCookies } from '@/apis/AppUser/cookie';
import { useDeleteApproval } from '@/apis/Approval/useDeleteApproval';
import { useGetApproval } from '@/apis/Approval/useGetApproval';
import Table from '@/components/Table';
import { useDialog } from '@/hooks/useDialog';
import { palette } from '@/themes';
import { TRequestListTableRow, TRequestServiceType, TRequestStatus } from '@/typings/Requests';
import { showToast } from '@/utils/showToast';

import { REQUEST_METHOD, REQUEST_SERVICE_TYPE, REQUEST_STATUS } from '../constants';

const RequestListTable = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { watch } = useFormContext();
    const { openDialog } = useDialog();
    const appUserId = getCookies('appUserId');
    const role = getCookies('role');

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

    const { mutateAsync: deleteApproval } = useDeleteApproval();
    const handleDeleteApproval = (approvalId: number) => {
        openDialog({
            title: t('요청 삭제'),
            description: t('삭제된 요청은 되돌릴 수 없습니다.'),
            variant: 'alert',
            primaryAction: {
                name: t('확인'),
                onClick: async () => {
                    const res = await deleteApproval({ approvalId });
                    if (res.code === 'SUCCESS') {
                        showToast.success(res.message);
                    } else showToast.error(res.message);
                },
            },
            secondaryAction: {
                name: t('취소'),
                onClick: () => {},
            },
        });
    };

    console.log(data?.content);

    const renderRow = (row: TRequestListTableRow) => {
        return (
            <TableRow
                key={row.id}
                onClick={() => navigate(`${row.serviceType.toLocaleLowerCase()}/${row.id}`)}
            >
                <TableCell>
                    {REQUEST_SERVICE_TYPE[row.serviceType]} / {REQUEST_METHOD[row.method]}
                </TableCell>
                <TableCell>{dayjs(row.createdAt).format('YYYY.MM.DD HH:mm')}</TableCell>
                <TableCell>{row.requesterName}</TableCell>
                <TableCell>
                    <Chip
                        label={REQUEST_STATUS[row.status].label}
                        color={REQUEST_STATUS[row.status].color as 'blue' | 'yellow' | 'red'}
                    />
                </TableCell>
                <TableCell>
                    {row.status === 'PENDING' &&
                        (role === 'ADMIN' || row.requesterId === appUserId) && (
                            <IconButton
                                aria-label="delete"
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteApproval(row.id);
                                }}
                            >
                                <DeleteOutline sx={{ color: palette.grey[500] }} />
                            </IconButton>
                        )}
                </TableCell>
            </TableRow>
        );
    };

    return (
        <Table
            headData={[t('요청 분류'), t('요청 일시'), t('담당자'), t('요청 상태'), '']}
            bodyData={data?.content}
            renderRow={renderRow}
            isLoading={isLoading}
        />
    );
};

export default RequestListTable;
