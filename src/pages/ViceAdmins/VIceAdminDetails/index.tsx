import React from 'react';

import { useForm } from 'react-hook-form';

import { Box, Button, Stack, Typography } from '@mui/material';

import AddPhoto from '@/components/AddPhoto';
import LabelAndInput from '@/components/LabelAndInput';
import LabelAndSelect from '@/components/LabelAndSelect';
import LabelValue from '@/components/LabelValue';
import PageLayout from '@/components/PageLayout';
import Title from '@/components/Title';
import { palette } from '@/themes';

type TViceAdminInput = {
    name: string;
    userId: string;
    managingArea: string;
    imgSrc: string;
};
const ViceAdminDetails = () => {
    const methods = useForm<TViceAdminInput>({
        defaultValues: { name: 'dummy', userId: 'dummy', managingArea: '1' },
    });
    const [edit, setEdit] = React.useState<boolean>(false);

    return (
        <Stack>
            <Title title="부 관리자 상세">
                {edit ? (
                    <Stack gap={'10px'} direction={'row'}>
                        <Button variant="containedGrey" onClick={() => setEdit(false)}>
                            취소
                        </Button>
                        <Button variant="containedBlue" onClick={() => setEdit(false)}>
                            완료
                        </Button>
                    </Stack>
                ) : (
                    <Button variant="containedBlue" onClick={() => setEdit(true)}>
                        수정
                    </Button>
                )}
            </Title>
            <PageLayout gap={'27px'}>
                {edit ? (
                    <LabelAndInput
                        register={methods.register}
                        labelValue="이름"
                        fieldName="name"
                        placeholder="이름을 입력해주세요."
                    />
                ) : (
                    <LabelValue label="이름" value={'{이름}'} />
                )}
                {edit ? (
                    <LabelAndInput
                        register={methods.register}
                        labelValue="아이디"
                        fieldName="userId"
                        disabled={true}
                        placeholder="아이디를 입력해주세요."
                    />
                ) : (
                    <LabelValue label="아이디" value={'{아이디}'} />
                )}
                {edit ? (
                    <LabelAndSelect
                        control={methods.control}
                        labelValue="관리 지역"
                        fieldName="managingArea"
                        selectArr={[
                            { value: '1', label: '경기도' },
                            { value: '2', label: '부산' },
                            { value: '3', label: '광주' },
                        ]}
                        placeholder="관리 지역을 선택해주세요."
                    />
                ) : (
                    <LabelValue label="관리 지역" value={'{관리 지역}'} />
                )}
                <Stack gap={'27px'}>
                    <Typography variant="title/medium">ID Card</Typography>
                    {edit ? (
                        <AddPhoto
                            fieldName="imgSrc"
                            watch={methods.watch}
                            setValue={methods.setValue}
                        />
                    ) : (
                        <Box
                            sx={{ width: '120px', height: '160px', background: palette.grey[100] }}
                        />
                    )}
                </Stack>
            </PageLayout>
        </Stack>
    );
};

export default ViceAdminDetails;
