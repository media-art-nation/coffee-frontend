import React from 'react';

import { Stack, Typography } from '@mui/material';

type LabelValueProps = {
    label: string;
    value: string;
};
const LabelValue: React.FC<LabelValueProps> = ({ label, value }) => {
    return (
        <Stack direction={'row'} sx={{ height: '40px' }}>
            <Typography variant="title/medium" sx={{ width: '120px' }}>
                {label}
            </Typography>
            <Typography variant="title/medium">{value}</Typography>
        </Stack>
    );
};

export default LabelValue;
