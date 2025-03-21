import React from 'react';

import { Checkbox, Chip, Pagination, Stack, Typography } from '@mui/material';

import AddPhoto from '@/components/AddPhoto';
import LabelAndInput from '@/components/LabelAndInput';

const TestComponents = () => {
    const [input, setInput] = React.useState<string>('');
    return (
        <Stack sx={{ gap: '30px' }}>
            <Stack gap={'10px'}>
                <Typography>Label and input</Typography>
                <LabelAndInput
                    sx={{ width: '400px' }}
                    inputValue={input}
                    inputOnChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setInput(e.target.value)
                    }
                    labelValue="label"
                    placeholder="Label"
                />
            </Stack>
            <Stack gap={'10px'}>
                <Typography>Pagination</Typography>
                <Pagination count={10} />
            </Stack>
            <Stack gap={'10px'}>
                <Typography>Check</Typography>
                <Checkbox />
            </Stack>
            <Stack gap={'10px'}>
                <Typography>Chip</Typography>
                {['blue', 'red', 'yellow'].map((item) => (
                    <Chip key={item} label={item} color={item as 'blue' | 'yellow' | 'red'} />
                ))}
            </Stack>
            <Stack gap={'10px'}>
                <Typography>Add Photo</Typography>
                <AddPhoto />
            </Stack>
        </Stack>
    );
};

export default TestComponents;
