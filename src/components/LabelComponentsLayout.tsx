import React from 'react';

import { Stack, StackProps, Typography } from '@mui/material';

type LabelComponentsLayoutProps = StackProps & {
    labelValue: string;
    children?: React.ReactNode;
};
const LabelComponentsLayout: React.FC<LabelComponentsLayoutProps> = ({
    children,
    labelValue,
    ...props
}) => {
    return (
        <Stack {...props} sx={{ gap: '12px', ...props.sx }}>
            <Typography sx={{ fontSize: '16px', fontWeight: 700 }}>{labelValue}</Typography>
            {children}
        </Stack>
    );
};

export default LabelComponentsLayout;
