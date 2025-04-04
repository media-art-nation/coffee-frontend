import { TextField, TextFieldProps } from '@mui/material';

const TextArea: React.FC<TextFieldProps> = ({ ...props }) => {
    return (
        <TextField
            sx={{
                'height': '100%',
                '& .MuiOutlinedInput-root': {
                    height: '100%',
                },
            }}
            multiline
            rows={props?.rows ? props.rows : 4}
            {...props}
        />
    );
};

export default TextArea;
