import React from 'react';

import {
    Button,
    Checkbox,
    Chip,
    MenuItem,
    Pagination,
    Select,
    Stack,
    TableCell,
    TableRow,
    Typography,
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

import AddPhoto from '@/components/AddPhoto';
import CustomDatePicker from '@/components/CustomDatePicker';
import LabelAndInput from '@/components/LabelAndInput';
import SearchTextField from '@/components/SearchTextField';
import Table from '@/components/Table';
import TextArea from '@/components/TextArea';
import Title from '@/components/Title';
import { useDialog } from '@/hooks/useDialog';
import { TChipColor } from '@/typings/Chip';

const TestComponents = () => {
    const { openDialog } = useDialog();

    const renderRow = (row: { name: string; id: string }) => {
        return (
            <TableRow>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.id}</TableCell>
            </TableRow>
        );
    };

    const [input, setInput] = React.useState<string>('');
    const [select, setSelect] = React.useState<string>('');
    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
    console.log(dayjs(value).format('YYYY-MM-DD'));

    return (
        <Stack sx={{ gap: '30px', padding: '50px', flex: 1 }}>
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
            <Table headData={['header1', 'header2']} bodyData={undefined} renderRow={renderRow} />
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
            <Stack gap={'10px'}>
                <Typography>Label and input</Typography>
                <LabelAndInput
                    sx={{ width: '100%' }}
                    inputValue={input}
                    inputOnChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setInput(e.target.value)
                    }
                    labelValue="label"
                    placeholder="Label"
                />
                <Typography>Select</Typography>
                <Select
                    value={select}
                    onChange={(e) => setSelect(e.target.value)}
                    renderValue={(selected) => {
                        if (selected === '') {
                            return <Typography>Placeholder 텍스트</Typography>; // placeholder로 보여줄 내용
                        }
                        return selected;
                    }}
                >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                </Select>
                <Typography>Search</Typography>
                <SearchTextField />
                <Typography>calendar</Typography>
                <CustomDatePicker value={value} onChange={(newValue) => setValue(newValue)} />
                <Typography>Textarea</Typography>
                <TextArea />
            </Stack>

            <Stack gap={'10px'}>
                <Typography>Pagination</Typography>
                <Pagination count={3} />
            </Stack>
            <Stack gap={'10px'}>
                <Typography>Check</Typography>
                <Checkbox />
            </Stack>
            <Stack gap={'10px'}>
                <Typography>Chip</Typography>
                {['blue', 'red', 'yellow'].map((item) => (
                    <Chip key={item} label={item} color={item as TChipColor} />
                ))}
            </Stack>
            <Stack gap={'10px'}>
                <Typography>Add Photo</Typography>
                <AddPhoto />
            </Stack>
        </Stack>
    );
};

export default TestComponents;
