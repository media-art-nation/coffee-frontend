import { Outlet } from 'react-router';

import { Stack } from '@mui/material';

import Gnb from './Gnb';
import Lnb from './Lnb';

const Layouts = () => {
    return (
        <Stack sx={{ height: '100vh', width: '100vw' }}>
            <Gnb />
            <Stack sx={{ flexDirection: 'row', height: '100%', width: '100%', overflow: 'hidden' }}>
                <Stack sx={{ 'overflowY': 'auto', '&::-webkit-scrollbar': { display: 'none' } }}>
                    <Lnb />
                </Stack>
                <Stack sx={{ flex: 1, overflowY: 'auto' }}>
                    <Outlet />
                </Stack>
            </Stack>
        </Stack>
    );
};

export default Layouts;
