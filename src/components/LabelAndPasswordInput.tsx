import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

import { IconButton, InputAdornment, OutlinedInput, StackProps } from '@mui/material';

import LabelComponentsLayout from '@/components/LabelComponentsLayout';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type LabelAndPasswordInputProps<T extends FieldValues> = StackProps & {
    disabled?: boolean;
    register: UseFormRegister<T>;
    rules?: RegisterOptions<T, Path<T>>;
    labelValue: string;
    fieldName: Path<T>;
    placeholder?: string;
};

const LabelAndPasswordInput = <T extends FieldValues>({
    register,
    rules,
    labelValue,
    fieldName,
    placeholder = '',
    disabled = false,
    ...props
}: LabelAndPasswordInputProps<T>) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <LabelComponentsLayout {...props} labelValue={labelValue} sx={{ ...props.sx }}>

            <OutlinedInput
                {...register(fieldName, rules)}
                disabled={disabled}
                placeholder={placeholder}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label={
                                showPassword ? 'hide the password' : 'display the password'
                            }
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </LabelComponentsLayout>
    );
};

export default LabelAndPasswordInput;
