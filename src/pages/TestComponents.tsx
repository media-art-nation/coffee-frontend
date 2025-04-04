import React from 'react';

import { Checkbox, Chip, MenuItem, Pagination, Select, Stack, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

import AddPhoto from '@/components/AddPhoto';
import CustomDatePicker from '@/components/CustomDatePicker';
import LabelAndInput from '@/components/LabelAndInput';
import SearchTextField from '@/components/SearchTextField';
import TextArea from '@/components/TextArea';

const TestComponents = () => {
    const [input, setInput] = React.useState<string>('');
    const [select, setSelect] = React.useState<string>('');
    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
    console.log(dayjs(value).format('YYYY-MM-DD'));
    return (
        <Stack sx={{ gap: '30px', padding: '50px', flex: 1 }}>
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
                    <Chip key={item} label={item} color={item as 'blue' | 'yellow' | 'red'} />
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
