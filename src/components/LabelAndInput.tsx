import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

import { StackProps, TextField } from '@mui/material';

import LabelComponentsLayout from '@/components/LabelComponentsLayout';

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
    ...props
}: LabelAndInputProps<T>) => {
    return (
        <LabelComponentsLayout {...props} labelValue={labelValue} sx={{ ...props.sx }}>
            <TextField
                {...register(fieldName, rules)}
                placeholder={placeholder}
                slotProps={{ htmlInput: { type } }}
            />
        </LabelComponentsLayout>
    );
};

export default LabelAndInput;
