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
        <Stack {...props} sx={{ width: '500px', gap: '12px', ...props.sx }}>
            <Typography sx={{ fontSize: '14px' }}>{labelValue}</Typography>
            {children}
        </Stack>
    );
};

export default LabelComponentsLayout;
