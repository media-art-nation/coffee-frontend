import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Stack } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

import {
    CreateApprovalPurchaseReq,
    useCreateApprovalPurchase,
} from '@/apis/Approval/useCreateApprovalPurchase';
import CustomDatePicker from '@/components/CustomDatePicker';
import LabelAndInput from '@/components/LabelAndInput';
import LabelComponentsLayout from '@/components/LabelComponentsLayout';
import PageLayout from '@/components/PageLayout';
import Title from '@/components/Title';
import { useDialog } from '@/hooks/useDialog';

const TreesPurchaseRegister = () => {
    const { t } = useTranslation();
    const { openDialog } = useDialog();
    const { mutateAsync: createPurchase } = useCreateApprovalPurchase();
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
                }
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
    return (
        <Stack>
            <Title title={t('수매 내역 등록')}>
                <Button variant="containedGrey">{t('취소')}</Button>
                <Button
                    variant="containedBlue"
                    onClick={() => {
                        methods.handleSubmit(onSubmit)();
                    }}
                >
                    {t('등록')}
                </Button>
            </Title>
            <PageLayout gap={'27px'}>
                <LabelComponentsLayout labelValue={t('거래일자')}>
                    <CustomDatePicker
                        value={dayjs(methods.watch('purchaseDate'))}
                        onChange={(newValue: Dayjs | null) =>
                            methods.setValue(
                                'purchaseDate',
                                newValue?.format('YYYY-MM-DD').toString() || ''
                            )
                        }
                    />
                </LabelComponentsLayout>
                {/* <LabelAndInput
                    labelValue={t("나무 종")}
                    fieldName="tree"
                    register={methods.register}
                    placeholder={t("나무 종을 입력해주세요.")}
                /> */}
                <LabelAndInput
                    labelValue={t('수량')}
                    fieldName="quantity"
                    register={methods.register}
                    placeholder={t('수량을 입력해주세요.')}
                />
                <LabelAndInput
                    labelValue={t('단가')}
                    fieldName="unitPrice"
                    register={methods.register}
                    placeholder={t('단가를 입력해주세요.')}
                />
                <LabelAndInput
                    labelValue={t('총액')}
                    fieldName="totalPrice"
                    register={methods.register}
                    placeholder={t('총액을 입력해주세요.')}
                />
                <LabelAndInput
                    labelValue={t('차감액')}
                    fieldName="deduction"
                    register={methods.register}
                    placeholder={t('차감액을 입력해주세요.')}
                />
                <LabelAndInput
                    labelValue={t('지급액')}
                    fieldName="paymentAmount"
                    register={methods.register}
                    placeholder={t('지급액을 입력해주세요.')}
                />
            </PageLayout>
        </Stack>
    );
};

export default TreesPurchaseRegister;
