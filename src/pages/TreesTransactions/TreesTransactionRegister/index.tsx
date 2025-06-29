import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Stack } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

import {
    CreateApprovalTreeTransactionReq,
    useCreateApprovalTreeTransaction,
} from '@/apis/Approval/useCreateApprovalTreeTransaction';
import { useGetFarmerList } from '@/apis/Farmer/useGetFarmerList';
import CustomDatePicker from '@/components/CustomDatePicker';
import LabelAndInput from '@/components/LabelAndInput';
import LabelAndSelect from '@/components/LabelAndSelect';
import LabelComponentsLayout from '@/components/LabelComponentsLayout';
import PageLayout from '@/components/PageLayout';
import Title from '@/components/Title';
import { useDialog } from '@/hooks/useDialog';

const TreesTransactionRegister = () => {
    const { t } = useTranslation();
    const { openDialog } = useDialog();
    const { mutateAsync: createTreeTransaction } = useCreateApprovalTreeTransaction();
    const { data: farmerList } = useGetFarmerList();
    const methods = useForm<CreateApprovalTreeTransactionReq>({
        defaultValues: {
            receivedDate: dayjs(new Date()).format('YYYY-MM-DD'),
        },
    });
    const onSubmit = (data: CreateApprovalTreeTransactionReq) => {
        createTreeTransaction(data)
            .then((res) => {
                if (res?.data?.code === 'SUCCESS') {
                    openDialog({
                        title: t('나무수령 등록 요청 성공'),
                        description: t('관리자가 요청 승인 후 목록에서 확인 가능합니다.'),
                        variant: 'confirm',
                        primaryAction: {
                            name: t('확인'),
                            onClick: () => {
                                methods.reset();
                            },
                        },
                    });
                    return;
                }
                openDialog({
                    title: t('나무수령 등록 요청 실패'),
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
                    title: t('나무수령 등록 요청 실패'),
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
    return (
        <Stack>
            <Title title={t('나무수령 등록')}>
                <Button variant="containedGrey">{t('취소')}</Button>
                <Button variant="containedBlue" onClick={() => methods.handleSubmit(onSubmit)()}>
                    {t('등록')}
                </Button>
            </Title>
            <PageLayout gap={'27px'}>
                <LabelAndSelect
                    sx={{ width: '300px' }}
                    labelValue={t('농부')}
                    selectArr={
                        farmerList?.map((farmer) => {
                            return { value: farmer.id.toString(), label: farmer.farmerName };
                        }) || []
                    }
                    control={methods.control}
                    fieldName="farmerId"
                    placeholder={t('농부 선택')}
                />
                <LabelComponentsLayout labelValue={t('수령 일자')}>
                    <CustomDatePicker
                        value={dayjs(methods.watch('receivedDate'))}
                        onChange={(newValue: Dayjs | null) =>
                            methods.setValue(
                                'receivedDate',
                                newValue?.format('YYYY-MM-DD').toString() || ''
                            )
                        }
                    />
                </LabelComponentsLayout>
                <LabelAndInput
                    labelValue={t('나무 종')}
                    fieldName="species"
                    register={methods.register}
                    placeholder={t('나무 종을 입력해주세요.')}
                />
                <LabelAndInput
                    labelValue={t('수량')}
                    fieldName="quantity"
                    register={methods.register}
                    placeholder={t('수량을 입력해주세요.')}
                />
            </PageLayout>
        </Stack>
    );
};

export default TreesTransactionRegister;
