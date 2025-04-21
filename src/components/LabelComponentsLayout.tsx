import React from 'react';

import { Stack, StackProps, Typography } from '@mui/material';

interface LabelComponentsLayoutProps extends StackProps {
    labelValue: string;
    children?: React.ReactNode;
}
const LabelComponentsLayout: React.FC<LabelComponentsLayoutProps> = ({
    children,
    labelValue,
    ...props
}) => {
    return (
        <Stack {...props} sx={{ ...props.sx, gap: '12px' }}>
            <Typography sx={{ fontSize: '14px' }}>{labelValue}</Typography>
            {children}
        </Stack>
    );
};

export default LabelComponentsLayout;
