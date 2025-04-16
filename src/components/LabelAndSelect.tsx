import React from 'react';

import { MenuItem, Select, SelectChangeEvent, Stack, StackProps, Typography } from '@mui/material';

import { palette } from '@/themes';

interface LabelAndSelectProps extends StackProps {
    labelValue: string;
    inputValue: string;
    inputOnChange: (e: SelectChangeEvent<string>) => void;
    placeholder: string;
    selectArr: { value: string; label: string }[];
}

const LabelAndSelect: React.FC<LabelAndSelectProps> = ({
    labelValue,
    inputValue,
    inputOnChange,
    placeholder,
    selectArr,
    sx,
}) => {
    return (
        <Stack sx={{ ...sx, gap: '12px' }}>
            <Typography sx={{ fontSize: '14px' }}>{labelValue}</Typography>
            <Select
                value={inputValue}
                onChange={inputOnChange}
                renderValue={(selected) => {
                    console.log({ selected });
                    if (selected === '') {
                        return <Typography>{placeholder}</Typography>;
                    }
                    const selectedOption = selectArr.find((item) => item.value === selected);
                    return (
                        <Typography sx={{ color: `${palette.common.black} !important` }}>
                            {selectedOption ? selectedOption.label : selected}
                        </Typography>
                    );
                }}
            >
                {selectArr.map((item) => (
                    <MenuItem value={item.value}>{item.label}</MenuItem>
                ))}
            </Select>
        </Stack>
    );
};

export default LabelAndSelect;
