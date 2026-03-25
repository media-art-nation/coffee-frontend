import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';

import { MenuItem, Select as MuiSelect, StackProps, Typography } from '@mui/material';

import { palette } from '@/themes';

type SelectProps<T extends FieldValues> = StackProps & {
    control: Control<T>;
    rules?: RegisterOptions<T, Path<T>>;
    fieldName: Path<T>;
    placeholder?: string;
    selectArr: { value: string; label: string; disabled?: boolean }[];
    disabled?: boolean;
};

const Select = <T extends FieldValues>({
    control,
    rules,
    fieldName,
    placeholder = '',
    selectArr,
    disabled = false,
}: SelectProps<T>) => {
    return (
        <Controller
            name={fieldName}
            control={control}
            rules={rules}
            render={({ field }) => (
                <MuiSelect
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
                    disabled={disabled}
                >
                    {selectArr.map((item) => (
                        <MenuItem key={item.value} value={item.value} disabled={item.disabled}>
                            {item.label}
                        </MenuItem>
                    ))}
                </MuiSelect>
            )}
        />
    );
};

export default Select;
