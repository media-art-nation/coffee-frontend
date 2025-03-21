import React from 'react';

import { Stack, StackProps, TextField, Typography } from '@mui/material';

import { palette } from '@/themes';

interface LabelAndInputProps extends StackProps {
    labelValue: string;
    inputValue: string;
    inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabelAndInput: React.FC<LabelAndInputProps> = ({
    labelValue,
    inputValue,
    inputOnChange,
    sx,
}) => {
    return (
        <Stack sx={{ ...sx, gap: '12px' }}>
            <Typography sx={{ fontSize: '14px' }}>{labelValue}</Typography>
            <TextField
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& input': { background: palette.grey[50] },
                    },
                }}
                value={inputValue}
                onChange={inputOnChange}
            />
        </Stack>
    );
};

export default LabelAndInput;
