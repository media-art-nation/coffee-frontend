import { Outlet } from 'react-router';

import { Stack } from '@mui/material';

import Gnb from './Gnb';
import Lnb from './Lnb';

const Layouts = () => {
    return (
        <Stack sx={{ height: '100vh', width: '100wh' }}>
            <Gnb />
            <Stack sx={{ flexDirection: 'row', height: '100%', width: '100%' }}>
                <Lnb />
                <Outlet />
            </Stack>
        </Stack>
    );
};

export default Layouts;
