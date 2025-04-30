import { useForm } from 'react-hook-form';

import { Button, Stack } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

import {
    TApprovalPurchaseInput,
    useCreateApprovalPurchase,
} from '@/apis/Approval/useCreateApprovalPurchase';
import CustomDatePicker from '@/components/CustomDatePicker';
import LabelAndInput from '@/components/LabelAndInput';
import LabelComponentsLayout from '@/components/LabelComponentsLayout';
import PageLayout from '@/components/PageLayout';
import Title from '@/components/Title';

const TreesPurchaseRegister = () => {
    const { mutateAsync } = useCreateApprovalPurchase();
    const methods = useForm<TApprovalPurchaseInput>();
    const onSubmit = (data: TApprovalPurchaseInput) => {
        console.log('제출 데이터:', data);
        mutateAsync({ param: data, approverId: 1 });
    };
    return (
        <Stack>
            <Title title="수매 내역 등록">
                <Button variant="containedGrey">취소</Button>
                <Button
                    variant="containedBlue"
                    onClick={() => {
                        methods.handleSubmit(onSubmit)();
                    }}
                >
                    등록
                </Button>
            </Title>
            <PageLayout gap={'27px'}>
                <LabelComponentsLayout labelValue="거래 일자">
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
                    labelValue="나무 종"
                    fieldName="tree"
                    register={methods.register}
                    placeholder="나무 종에 대해서 입력해주세요."
                /> */}
                <LabelAndInput
                    labelValue="수량"
                    fieldName="quantity"
                    register={methods.register}
                    placeholder="수량을 입력해주세요."
                />
                <LabelAndInput
                    labelValue="단가"
                    fieldName="unitPrice"
                    register={methods.register}
                    placeholder="단가를 입력해주세요."
                />
                <LabelAndInput
                    labelValue="총액"
                    fieldName="totalPrice"
                    register={methods.register}
                    placeholder="총액을 입력해주세요."
                />
                <LabelAndInput
                    labelValue="차감액"
                    fieldName="deduction"
                    register={methods.register}
                    placeholder="차감액을 입력해주세요."
                />
                <LabelAndInput
                    labelValue="지급액"
                    fieldName="paymentAmount"
                    register={methods.register}
                    placeholder="지급액을 입력해주세요."
                />
            </PageLayout>
        </Stack>
    );
};

export default TreesPurchaseRegister;
