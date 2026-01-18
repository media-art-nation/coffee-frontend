import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

import { OutlinedInput, StackProps } from '@mui/material';


type InputProps<T extends FieldValues> = StackProps & {
    disabled?: boolean;
    register: UseFormRegister<T>;
    rules?: RegisterOptions<T, Path<T>>;
    fieldName: Path<T>;
    placeholder?: string;
};

const Input = <T extends FieldValues>({
    register,
    rules,
    fieldName,
    placeholder = '',
    disabled = false,
    ...props
}: InputProps<T>) => {
  
    return (
        <OutlinedInput
            sx={{ ...props.sx }}
            {...register(fieldName, rules)}
            disabled={disabled}
            placeholder={placeholder}
        />
    );
};

export default Input;
