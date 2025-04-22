import { useForm } from 'react-hook-form';

import { Button, Stack } from '@mui/material';

import LabelAndSelect from '@/components/LabelAndSelect';
import LabelComponentsLayout from '@/components/LabelComponentsLayout';
import PageLayout from '@/components/PageLayout';
import SearchTextField from '@/components/SearchTextField';
import Title from '@/components/Title';

interface TSectionInput {
    area: string;
    section: string;
}
const SectionRegister = () => {
    const methods = useForm<TSectionInput>();
    return (
        <Stack>
            <Title title="섹션 생성">
                <Button variant="containedGrey">취소</Button>
                <Button variant="containedBlue">등록</Button>
            </Title>
            <PageLayout gap={'27px'}>
                <LabelAndSelect
                    labelValue="지역"
                    control={methods.control}
                    selectArr={[
                        { value: '1', label: '경기도' },
                        { value: '2', label: '부산' },
                    ]}
                    fieldName="area"
                    placeholder="지역을 선택해주세요"
                />
                <LabelComponentsLayout labelValue="섹션 검색">
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

export default SectionRegister;
