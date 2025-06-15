import {
    Button,
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

import { useGetAreaWithSectionList } from '@/apis/Area/useGetAreaWithSection';
import PageLayout from '@/components/PageLayout';
import Title from '@/components/Title';
import { TAreaWithSections } from '@/typings/Area';

const LocationList = () => {
    const { data: areaWithSectionList, isLoading: areaWithSectionListLoading } =
        useGetAreaWithSectionList();
    const headData = ['지역명', '섹션명', '삭제'];
    const renderRow = (row: TAreaWithSections) => {
        if (row.sections.length > 0) {
            return row.sections.map((item) => (
                <TableRow key={item.id}>
                    <TableCell>{row.areaName}</TableCell>
                    <TableCell>{item.sectionName}</TableCell>
                    <TableCell>
                        <Button variant="containedRed">삭제</Button>
                    </TableCell>
                </TableRow>
            ));
        } else {
            return (
                <TableRow key={row.id}>
                    <TableCell>{row.areaName}</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                        <Button variant="containedRed">삭제</Button>
                    </TableCell>
                </TableRow>
            );
        }
    };
    return (
        <Stack>
            <Title title="지역 및 섹션 목록" />
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
                        {areaWithSectionList && areaWithSectionList.length > 0 ? (
                            <TableBody>
                                {areaWithSectionList.map((item) => renderRow(item))}
                            </TableBody>
                        ) : areaWithSectionListLoading ? (
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
