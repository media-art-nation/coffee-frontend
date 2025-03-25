import { ExpandMore } from '@mui/icons-material';
import { Select as MuiSelect, SelectProps as MuiSelectProps } from '@mui/material';

type SelectProps = MuiSelectProps;

const Select = ({ children, ...props }: SelectProps) => {
    return (
        <MuiSelect {...props} IconComponent={(props) => <ExpandMore {...props} />}>
            {children}
        </MuiSelect>
    );
};

export default Select;
