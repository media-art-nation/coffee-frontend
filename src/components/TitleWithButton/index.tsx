import React, { PropsWithChildren } from 'react';

import { Stack } from '@mui/material';

import Title from '../Title';

interface TitleWithButtonProps extends PropsWithChildren {
    title: string;
}
const TitleWithButton: React.FC<TitleWithButtonProps> = ({ children, title }) => {
    return (
        <Stack direction={'row'} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Title title={title} />
            <Stack direction={'row'} gap={'20px'} sx={{ height: '40px', paddingRight: '40px' }}>
                {children}
            </Stack>
        </Stack>
    );
};

export default TitleWithButton;
