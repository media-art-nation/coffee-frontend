import { useTranslation } from 'react-i18next';

import {
    CircularProgress,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

import noData from '@assets/noData.svg';

import { getCookies } from '@/apis/AppUser/cookie';
import { useDeleteSection } from '@/apis/Approval/useDeleteSection';
import { useDeleteAreaAdmin } from '@/apis/Area/useDeleteAreaAdmin';
import { useGetAreaWithSectionList } from '@/apis/Area/useGetAreaWithSection';
import { useDeleteSectionAdmin } from '@/apis/Section/useDeleteSectionAdmin';
import DeleteButton from '@/components/DeleteButton';
import PageLayout from '@/components/PageLayout';
import Title from '@/components/Title';
import { useDialog } from '@/hooks/useDialog';
import { TAreaWithSections } from '@/typings/Area';

const LocationList = () => {
    const { t } = useTranslation();
    const { openDialog } = useDialog();
    const { data: areaWithSectionList, isLoading: areaWithSectionListLoading } =
        useGetAreaWithSectionList();
    const { mutate: deleteSection } = useDeleteSection();
    const { mutate: deleteSectionAdmin } = useDeleteSectionAdmin();
    const { mutate: deleteAreaAdmin } = useDeleteAreaAdmin();
    const headData = [t('지역'), t('섹션'), ''];
    const role = getCookies('role');
    const renderRow = (row: TAreaWithSections) => {
        if (row.sections.length > 0) {
            return row.sections.map((item) => (
                <TableRow key={item.id}>
                    <TableCell>{row.areaName}</TableCell>
                    <TableCell>{item.sectionName}</TableCell>
                    <TableCell>
                        <DeleteButton
                            onDelete={() => {
                                openDialog({
                                    title: t('해당 섹션을 삭제하시겠습니까?'),
                                    description: t('섹션을 삭제하면 복구가 불가능합니다.'),
                                    variant: 'alert',
                                    primaryAction: {
                                        name: t('확인'),
                                        onClick: () => {
                                            const submit =
                                                role === 'ADMIN'
                                                    ? deleteSectionAdmin
                                                    : deleteSection;
                                            submit({ sectionId: item.id });
                                        },
                                    },
                                    secondaryAction: { name: t('취소'), onClick: () => {} },
                                });
                            }}
                        />
                    </TableCell>
                </TableRow>
            ));
        } else {
            return (
                <TableRow key={row.id}>
                    <TableCell>{row.areaName}</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                        {role === 'ADMIN' ? (
                            <DeleteButton
                                onDelete={() => {
                                    openDialog({
                                        title: t('해당 지역을 삭제하시겠습니까?'),
                                        description: t('섹션을 삭제하면 복구가 불가능합니다.'),
                                        variant: 'alert',
                                        primaryAction: {
                                            name: t('확인'),
                                            onClick: () => {
                                                deleteAreaAdmin({ areaId: row.id });
                                            },
                                        },
                                        secondaryAction: { name: t('취소'), onClick: () => {} },
                                    });
                                }}
                            />
                        ) : (
                            '-'
                        )}
                    </TableCell>
                </TableRow>
            );
        }
    };
    return (
        <Stack>
            <Title title={t('지역 및 섹션 목록')} />
            <PageLayout>
                <TableContainer sx={{ width: '100%', height: '100%' }}>
                    <Table sx={{ height: '100%' }} stickyHeader>
                        <TableHead>
                            <TableRow>
                                {headData.map((item) => {
                                    return <TableCell key={item}>{item}</TableCell>;
                                })}
                            </TableRow>
                        </TableHead>
                        {areaWithSectionListLoading ? (
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={headData.length}>
                                        <Stack
                                            sx={{
                                                width: '100%',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <CircularProgress color="primary" size={30} />
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        ) : areaWithSectionList && areaWithSectionList.length > 0 ? (
                            <TableBody>
                                {areaWithSectionList.map((item) => renderRow(item))}
                            </TableBody>
                        ) : (
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={headData.length}>
                                        <Stack
                                            sx={{
                                                width: '100%',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <img src={noData} alt="No Data" width={60} />
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>
            </PageLayout>
        </Stack>
    );
};

export default LocationList;
