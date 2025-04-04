import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { MagnifyingGlass, X } from '@phosphor-icons/react';

import { palette } from '@/themes';

const SearchTextField: React.FC<TextFieldProps> = ({ sx, ...props }) => {
    return (
        <TextField
            {...props}
            sx={{ ...sx }}
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <MagnifyingGlass color={palette.grey[500]} />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <X color={palette.grey[500]} />
                        </InputAdornment>
                    ),
                },
            }}
        />
    );
};

export default SearchTextField;
