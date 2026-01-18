import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, TableCell, TableRow, TextField } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

import { useGetVillageHeadList } from '@/apis/AppUser/useGetVillageHeadList';
import {
    CreateApprovalPurchaseReq,
    useCreateApprovalPurchase,
} from '@/apis/Approval/useCreateApprovalPurchase';
import CustomDatePicker from '@/components/CustomDatePicker';
import Select from '@/components/Select';
import TextArea from '@/components/TextArea';
import { useDialog } from '@/hooks/useDialog';

type CreateTreesPurchaseRowProps = {
    onClose: () => void;
};

export const CreateTreesPurchaseRow = ({ onClose }: CreateTreesPurchaseRowProps) => {
    const { t } = useTranslation();
    const { openDialog } = useDialog();
    const { mutateAsync: createPurchase } = useCreateApprovalPurchase();

    const { data: villageHeadList } = useGetVillageHeadList(); // 면장 목록

    const methods = useForm<CreateApprovalPurchaseReq>({
        defaultValues: { purchaseDate: dayjs(new Date()).format('YYYY-MM-DD') },
    });

    const onSubmit = (data: CreateApprovalPurchaseReq) => {
        createPurchase(data)
            .then((res) => {
                if (res?.data?.code === 'SUCCESS') {
                    openDialog({
                        title: t('수매 내역 등록 요청 성공'),
                        description: t('관리자가 요청 승인 후 목록에서 확인 가능합니다.'),
                        variant: 'confirm',
                        primaryAction: {
                            name: t('확인'),
                            onClick: () => {
                                methods.reset();
                            },
                        },
                    });

                    handleClose();
                    return;
                } else
                    openDialog({
                        title: t('수매 내역 등록 요청 실패'),
                        description: t('권한 확인 또는 관리자에게 문의해주세요.'),
                        variant: 'alert',
                        primaryAction: {
                            name: t('확인'),
                            onClick: () => {},
                        },
                    });
            })
            .catch((err) => {
                openDialog({
                    title: t('수매 내역 등록 요청 실패'),
                    description: `${t('에러')} : ${err}.\n 관리자에게 문의 바랍니다.`,
                    variant: 'alert',
                    primaryAction: {
                        name: t('확인'),
                        onClick: () => {
                            methods.reset();
                        },
                    },
                });
            });
    };

    const handleClose = () => {
        onClose();
        methods.reset();
    };

    return (
        <TableRow>
            <TableCell sx={{ padding: '0px' }}></TableCell>
            <TableCell sx={{ padding: '0px' }}></TableCell>
            <TableCell sx={{ minWidth: '150px', padding: '0px' }}>
                <Select
                    control={methods.control}
                    fieldName="villageHeadId"
                    placeholder={t('면장 선택')}
                    selectArr={
                        villageHeadList?.map((head) => {
                            return { value: String(head.id), label: head.appUserName };
                        }) || []
                    }
                />
            </TableCell>
            <TableCell sx={{ minWidth: '240px' }}>
                <CustomDatePicker
                    value={dayjs(methods.watch('purchaseDate'))}
                    onChange={(newValue: Dayjs | null) =>
                        methods.setValue(
                            'purchaseDate',
                            newValue?.format('YYYY-MM-DD').toString() || ''
                        )
                    }
                />
            </TableCell>
            <TableCell sx={{ minWidth: '200px' }}>
                <TextField
                    {...methods.register('quantity')}
                    placeholder={t('수량')}
                    sx={{ width: '100%' }}
                />
            </TableCell>
            <TableCell sx={{ minWidth: '200px' }}>
                <TextField
                    {...methods.register('unitPrice')}
                    placeholder={t('단가')}
                    sx={{ width: '100%' }}
                />
            </TableCell>
            <TableCell sx={{ minWidth: '200px' }}>
                <TextField
                    {...methods.register('totalPrice')}
                    placeholder={t('총액')}
                    sx={{ width: '100%' }}
                />
            </TableCell>
            <TableCell sx={{ minWidth: '200px' }}>
                <TextField
                    {...methods.register('deduction')}
                    placeholder={t('차감액')}
                    sx={{ width: '100%' }}
                />
            </TableCell>
            <TableCell sx={{ minWidth: '200px' }}>
                <TextField
                    {...methods.register('paymentAmount')}
                    placeholder={t('지급액')}
                    sx={{ width: '100%' }}
                />
            </TableCell>
            <TableCell sx={{ minWidth: '300px' }}>
                <TextField
                    {...methods.register('remarks')}
                    placeholder={t('비고')}
                    sx={{ width: '100%' }}
                />
            </TableCell>
            <TableCell sx={{ minWidth: '100px' }} align="left">
                <Button variant="containedBlue" onClick={methods.handleSubmit(onSubmit)} size="small">
                    {t('저장')}
                </Button>
            </TableCell>
        </TableRow>
    );
};
