import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Stack } from '@mui/material';

import { getCookies } from '@/apis/AppUser/cookie';
import { CreateSectionReq, useCreateSection } from '@/apis/Area/useCreateSection';
import { useCreateSectionAdmin } from '@/apis/Area/useCreateSectionAdmin';
import { useGetArea } from '@/apis/Area/useGetArea';
import LabelAndSelect from '@/components/LabelAndSelect';
import LabelComponentsLayout from '@/components/LabelComponentsLayout';
import PageLayout from '@/components/PageLayout';
import SearchTextField from '@/components/SearchTextField';
import Title from '@/components/Title';
import { useDialog } from '@/hooks/useDialog';

const SectionRegister = () => {
    const { t } = useTranslation();
    const methods = useForm<CreateSectionReq>();
    const { openDialog } = useDialog();
    const { data: areaList } = useGetArea();
    const role = getCookies('role');
    const { mutateAsync: createSection } = useCreateSection();
    const { mutateAsync: createSectionAdmin } = useCreateSectionAdmin();
    const onSubmit = (data: CreateSectionReq) => {
        if (role !== 'ADMIN') {
            createSection(data).then((res) => {
                if (res?.data?.code === 'SUCCESS') {
                    openDialog({
                        title: t('섹션 등록 요청 성공'),
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
                    title: t('섹션 등록 요청 실패'),
                    description: t('권한 확인 또는 관리자에게 문의해주세요.'),
                    variant: 'alert',
                    primaryAction: {
                        name: t('확인'),
                        onClick: () => {},
                    },
                });
            });
        } else {
            createSectionAdmin(data).then((res) => {
                if (res?.data?.code === 'SUCCESS') {
                    openDialog({
                        title: t('섹션 등록 요청 성공'),
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
                    title: t('섹션 등록 요청 실패'),
                    description: t('권한 확인 또는 관리자에게 문의해주세요.'),
                    variant: 'alert',
                    primaryAction: {
                        name: t('확인'),
                        onClick: () => {},
                    },
                });
            });
        }
    };
    return (
        <Stack>
            <Title title={t('섹션 생성')}>
                <Button variant="containedGrey">{t('취소')}</Button>
                <Button variant="containedBlue" onClick={() => methods.handleSubmit(onSubmit)()}>
                    {t('등록')}
                </Button>
            </Title>
            <PageLayout gap={'27px'}>
                <LabelAndSelect
                    labelValue={t('지역')}
                    control={methods.control}
                    selectArr={
                        areaList?.map((area) => {
                            return { value: String(area.id), label: area.areaName || '' };
                        }) || []
                    }
                    fieldName="areaId"
                    placeholder={t('지역 선택')}
                />
                <LabelComponentsLayout labelValue={t('섹션 검색')}>
                    <SearchTextField
                        fieldName="sectionName"
                        register={methods.register}
                        placeholder={t('섹션 검색')}
                    />
                </LabelComponentsLayout>
            </PageLayout>
        </Stack>
    );
};

export default SectionRegister;
