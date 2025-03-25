import { Button, MenuItem, Stack } from '@mui/material';

import Select from '@/components/Select/Select';
import { useDialog } from '@/hooks/useDialog';

const Common = () => {
    const { openDialog } = useDialog();

    return (
        <Stack sx={{ gap: '5px' }}>
            <Button variant="containedBlue">containedBlue</Button>
            <Button variant="containedRed">containedRed</Button>
            <Button variant="containedWhite">containedWhite</Button>
            <Button variant="containedGrey">containedGrey</Button>
            <Button
                onClick={() => {
                    openDialog({
                        title: 'title',
                        description: 'description',
                        variant: 'confirm',
                        primaryAction: {
                            name: '확인',
                            onClick: () => {},
                        },
                        secondaryAction: {
                            name: '취소',
                            onClick: () => {},
                        },
                    });
                }}
            >
                confirm Dialog
            </Button>
            <Button
                onClick={() => {
                    openDialog({
                        title: 'title',
                        description: 'description',
                        variant: 'alert',
                        primaryAction: {
                            name: '확인',
                            onClick: () => {},
                        },
                        secondaryAction: {
                            name: '취소',
                            onClick: () => {},
                        },
                    });
                }}
            >
                alert Dialog
            </Button>
            <Select>
                <MenuItem>menu 1</MenuItem>
                <MenuItem>menu 2</MenuItem>
            </Select>
        </Stack>
    );
};

export default Common;
