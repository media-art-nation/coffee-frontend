import { useForm } from 'react-hook-form';

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
                        title: '나무 수령 등록 요청을 성공했습니다.',
                        description: '관리자가 요청 승인 후 목록에서 확인가능합니다.',
                        variant: 'confirm',
                        primaryAction: {
                            name: '확인',
                            onClick: () => {
                                methods.reset();
                            },
                        },
                    });
                }
            })
            .catch((err) => {
                openDialog({
                    title: '나무 수령 등록 요청에 실패하였습니다.',
                    description: `에러 : ${err}.\n 관리자에게 문의 바랍니다.`,
                    variant: 'alert',
                    primaryAction: {
                        name: '확인',
                        onClick: () => {
                            methods.reset();
                        },
                    },
                });
            });
    };
    return (
        <Stack>
            <Title title="나무 수령 등록">
                <Button variant="containedGrey">취소</Button>
                <Button variant="containedBlue" onClick={() => methods.handleSubmit(onSubmit)()}>
                    등록
                </Button>
            </Title>
            <PageLayout gap={'27px'}>
                <LabelAndSelect
                    sx={{ width: '300px' }}
                    labelValue="농부"
                    selectArr={
                        farmerList?.map((farmer) => {
                            return { value: farmer.id.toString(), label: farmer.farmerName };
                        }) || []
                    }
                    control={methods.control}
                    fieldName="farmerId"
                    placeholder="선택"
                />
                <LabelComponentsLayout labelValue="수령 일자">
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
                    labelValue="나무 종"
                    fieldName="species"
                    register={methods.register}
                    placeholder="나무 종에 대해서 입력해주세요."
                />
                <LabelAndInput
                    labelValue="수량"
                    fieldName="quantity"
                    register={methods.register}
                    placeholder="수량을 입력해주세요."
                />
            </PageLayout>
        </Stack>
    );
};

export default TreesTransactionRegister;
