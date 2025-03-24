import { Outlet } from 'react-router';

import { Stack } from '@mui/material';

import Gnb from './Gnb';
import Lnb from './Lnb';

const Layouts = () => {
    return (
        <Stack sx={{ height: '100vh' }}>
            <Gnb />
            <Stack sx={{ flexDirection: 'row', height: '100%' }}>
                <Lnb />
                <Outlet />
            </Stack>
        </Stack>
    );
};

export default Layouts;
