import { Stack, Typography } from '@mui/material';

type TitleProps = {
    title: string;
    children: React.ReactNode;
};

const Title = ({ title, children }: TitleProps) => {
    return (
        <Stack
            sx={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: '24px',
                width: '100%',
            }}
        >
            <Typography variant="h2/bold">{title}</Typography>
            <Stack>{children}</Stack>
        </Stack>
    );
};

export default Title;
