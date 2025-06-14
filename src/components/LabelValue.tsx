import React from 'react';

import { Stack, Typography } from '@mui/material';

type LabelValueProps = {
    label: string;
    value: string;
    link?: boolean;
};
const LabelValue: React.FC<LabelValueProps> = ({ label, value, link = false }) => {
    return (
        <Stack direction={'row'} sx={{ height: '40px' }}>
            <Typography variant="title/medium" sx={{ width: '120px' }}>
                {label}
            </Typography>
            <Typography
                variant="title/medium"
                component={link ? 'button' : 'p'}
                sx={{
                    ...(link && {
                        all: 'unset',
                        cursor: 'pointer',
                    }),
                }}
                onClick={() => {
                    if (link) {
                        window.location.href = value;
                    }
                }}
            >
                {value}
            </Typography>
        </Stack>
    );
};

export default LabelValue;
