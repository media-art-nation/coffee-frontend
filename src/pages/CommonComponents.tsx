import { Button, MenuItem, Stack, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

import Select from '@/components/Select/Select';
import Table from '@/components/Table';
import Title from '@/components/Title';
import { useDialog } from '@/hooks/useDialog';

const Common = () => {
    const { openDialog } = useDialog();

    const renderRow = (row: { name: string; id: string }) => {
        return (
            <>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.id}</TableCell>
            </>
        );
    };

    return (
        <Stack sx={{ gap: '5px', width: '100%' }}>
            <Title title="Title">
                <Stack>
                    <Button variant="containedBlue" size="xSmall">
                        containedBlue
                    </Button>
                </Stack>
            </Title>
            <Table
                headData={['header1', 'header2']}
                bodyData={[
                    { name: 'dummy1', id: 'dummy1' },
                    { name: 'dummy2', id: 'dummy2' },
                ]}
                renderRow={renderRow}
            />
            <Table
                headData={['header1', 'header2']}
                bodyData={undefined}
                renderRow={renderRow}
            />
            <Button variant="containedBlue">containedBlue</Button>
            <Button variant="containedRed">containedRed</Button>
            <Button variant="containedWhite">containedWhite</Button>
            <Button variant="containedGrey">containedGrey</Button>
            <Button
                onClick={() => {
                    openDialog({
                        title: 'title',
                        description: 'description',
                        variant: 'confirm',
                        primaryAction: {
                            name: '확인',
                            onClick: () => {},
                        },
                        secondaryAction: {
                            name: '취소',
                            onClick: () => {},
                        },
                    });
                }}
            >
                confirm Dialog
            </Button>
            <Button
                onClick={() => {
                    openDialog({
                        title: 'title',
                        description: 'description',
                        variant: 'alert',
                        primaryAction: {
                            name: '확인',
                            onClick: () => {},
                        },
                        secondaryAction: {
                            name: '취소',
                            onClick: () => {},
                        },
                    });
                }}
            >
                alert Dialog
            </Button>
            <Select>
                <MenuItem>menu 1</MenuItem>
                <MenuItem>menu 2</MenuItem>
            </Select>
        </Stack>
    );
};

export default Common;
