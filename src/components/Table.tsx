import {
    CircularProgress,
    Table as MuiTable,
    Stack,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

import noData from '@assets/noData.svg';

type TableProps<T> = {
    headData: string[];
    bodyData: T[] | undefined;
    renderRow: (row: T) => React.ReactNode;
    isLoading?: boolean;
};

const Table = <T,>({ headData, bodyData, renderRow, isLoading }: TableProps<T>) => {
    return (
        <TableContainer sx={{ width: '100%', height: '100%' }}>
            <MuiTable sx={{ height: '100%' }} stickyHeader>
                <TableHead>
                    <TableRow>
                        {headData.map((item) => {
                            return <TableCell key={item}>{item}</TableCell>;
                        })}
                    </TableRow>
                </TableHead>
                {bodyData ? (
                    <TableBody>{bodyData.map((item) => renderRow(item))}</TableBody>
                ) : isLoading ? (
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
            </MuiTable>
        </TableContainer>
    );
};

export default Table;
