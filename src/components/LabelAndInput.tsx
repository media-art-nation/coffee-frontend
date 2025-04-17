import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

import { Stack, StackProps, TextField, Typography } from '@mui/material';

interface LabelAndInputProps<T extends FieldValues> extends StackProps {
    register: UseFormRegister<T>;
    rules?: RegisterOptions<T, Path<T>>;
    labelValue: string;
    fieldName: Path<T>;
    placeholder?: string;
    type?: string;
}

const LabelAndInput = <T extends FieldValues>({
    register,
    rules,
    labelValue,
    fieldName,
    placeholder = '',
    type = 'text',
    sx,
}: LabelAndInputProps<T>) => {
    return (
        <Stack sx={{ ...sx, gap: '12px' }}>
            <Typography sx={{ fontSize: '14px' }}>{labelValue}</Typography>
            <TextField
                {...register(fieldName, rules)}
                placeholder={placeholder}
                slotProps={{ htmlInput: { type } }}
            />
        </Stack>
    );
};

export default LabelAndInput;
