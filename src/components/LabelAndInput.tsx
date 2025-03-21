import React from 'react';

import { Stack, StackProps, TextField, Typography } from '@mui/material';

interface LabelAndInputProps extends StackProps {
    labelValue: string;
    inputValue: string;
    inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

const LabelAndInput: React.FC<LabelAndInputProps> = ({
    labelValue,
    inputValue,
    inputOnChange,
    placeholder,
    sx,
}) => {
    return (
        <Stack sx={{ ...sx, gap: '12px' }}>
            <Typography sx={{ fontSize: '14px' }}>{labelValue}</Typography>
            <TextField placeholder={placeholder} value={inputValue} onChange={inputOnChange} />
        </Stack>
    );
};

export default LabelAndInput;
