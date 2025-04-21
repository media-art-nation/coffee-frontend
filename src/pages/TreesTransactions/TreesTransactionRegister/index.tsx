import { useForm } from 'react-hook-form';

import { Stack } from '@mui/material';

import LabelAndSelect from '@/components/LabelAndSelect';
import PageLayout from '@/components/PageLayout';
import Title from '@/components/Title';

interface TTreesTransactionRegisterInput {
    farmer: string;
    receipt: string;
    tree: string;
    count: number;
}
const TreesTransactionRegister = () => {
    const methods = useForm<TTreesTransactionRegisterInput>();
    return (
        <Stack>
            <Title title="나무 수령 등록" />
            <PageLayout gap={'27px'}>
                <LabelAndSelect
                    sx={{ width: '300px' }}
                    labelValue="농부"
                    selectArr={[
                        { label: '농부1', value: '1' },
                        { label: '농부2', value: '2' },
                    ]}
                    control={methods.control}
                    fieldName="farmer"
                    placeholder="선택"
                />
            </PageLayout>
        </Stack>
    );
};

export default TreesTransactionRegister;
