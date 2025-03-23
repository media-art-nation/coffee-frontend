import { Outlet } from 'react-router';

import { Stack } from '@mui/material';

import Gnb from './Gnb';
import Lnb from './Lnb';

const Layouts = () => {
    return (
        <Stack>
            <Gnb />
            <Stack sx={{ flexDirection: 'row' }}>
                <Lnb />
                <Outlet />
            </Stack>
        </Stack>
    );
};

export default Layouts;
