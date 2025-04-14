import React, { PropsWithChildren } from 'react';

import { Stack, StackProps } from '@mui/material';

const PageLayout: React.FC<StackProps & PropsWithChildren> = ({ children, ...props }) => {
    return <Stack sx={{ ...props.sx, padding: '0 32px' }}>{children}</Stack>;
};

export default PageLayout;
