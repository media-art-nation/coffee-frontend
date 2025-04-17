import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';

import { MenuItem, Select, Stack, StackProps, Typography } from '@mui/material';

import { palette } from '@/themes';

interface LabelAndSelectProps<T extends FieldValues> extends StackProps {
    control: Control<T>;
    rules?: RegisterOptions<T, Path<T>>;
    labelValue: string;
    fieldName: Path<T>;
    placeholder?: string;
    selectArr: { value: string; label: string }[];
}

const LabelAndSelect = <T extends FieldValues>({
    control,
    rules,
    labelValue,
    fieldName,
    placeholder = '',
    selectArr,
    sx,
}: LabelAndSelectProps<T>) => {
    return (
        <Stack sx={{ ...sx, gap: '12px' }}>
            <Typography sx={{ fontSize: '14px' }}>{labelValue}</Typography>
            <Controller
                name={fieldName}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <Select
                        {...field}
                        value={field.value ?? ''}
                        renderValue={(selected) => {
                            const selectedOption = selectArr.find(
                                (item) => item.value === selected
                            );

                            return selectedOption ? (
                                <Typography sx={{ color: `${palette.common.black} !important` }}>
                                    {selectedOption.label}
                                </Typography>
                            ) : (
                                <Typography>{placeholder}</Typography>
                            );
                        }}
                    >
                        {selectArr.map((item) => (
                            <MenuItem key={item.value} value={item.value}>
                                {item.label}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            />
        </Stack>
    );
};

export default LabelAndSelect;
