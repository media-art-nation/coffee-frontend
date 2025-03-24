import { Button, Stack } from '@mui/material';

const Common = () => {
    return (
        <Stack sx={{ gap: '5px' }}>
            <Button variant="containedBlue">containedBlue</Button>
            <Button variant="containedRed">containedRed</Button>
            <Button variant="containedWhite">containedWhite</Button>
            <Button variant="containedGrey">containedGrey</Button>
        </Stack>
    );
};

export default Common;
