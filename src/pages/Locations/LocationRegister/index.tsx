import { useForm } from 'react-hook-form';

import { Button, Stack } from '@mui/material';

import LabelComponentsLayout from '@/components/LabelComponentsLayout';
import PageLayout from '@/components/PageLayout';
import SearchTextField from '@/components/SearchTextField';
import Title from '@/components/Title';

interface TLocationInput {
    area: string;
}
const LocationRegister = () => {
    const methods = useForm<TLocationInput>();
    return (
        <Stack>
            <Title title="지역 생성">
                <Button variant="containedGrey">취소</Button>
                <Button variant="containedBlue">등록</Button>
            </Title>
            <PageLayout>
                <LabelComponentsLayout labelValue="지역 검색">
                    <SearchTextField
                        fieldName="area"
                        register={methods.register}
                        placeholder="지역을 검색해주세요."
                    />
                </LabelComponentsLayout>
            </PageLayout>
        </Stack>
    );
};

export default LocationRegister;
