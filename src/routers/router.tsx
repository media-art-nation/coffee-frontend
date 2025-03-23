import { createBrowserRouter } from 'react-router';

import { Stack } from '@mui/material';

import AccountRegister from '@/pages/AccountRegister/AccountRegister';
import FarmerDetails from '@/pages/FarmerDetails/FarmerDetails';
import FarmerList from '@/pages/FarmerList/FarmerList';
import FarmerRegister from '@/pages/FarmerRegister/FarmerRegister';
import Login from '@/pages/Login/Login';
import TreesPurchaseList from '@/pages/TreesPurchaseList/TreesPurchaseList';
import TreesPurchaseRegister from '@/pages/TreesPurchaseRegister/TreesPurchaseRegister';
import TreesTransactionList from '@/pages/TreesTransactionList/TreesTransactionList';
import TreesTransactionRegister from '@/pages/TreesTransactionRegister/TreesTransactionRegister';
import ViceAdminList from '@/pages/ViceAdminList/ViceAdminList';
import VillageHeadDetails from '@/pages/VillageHeadDetails/VillageHeadDetails';
import VillageHeadList from '@/pages/VillageHeadList/VillageHeadList';
import VillageHeadRegister from '@/pages/VillageHeadRegister/VillageHeadRegister';

import Gnb from './Gnb';
import Layouts from './Layouts';

const router = createBrowserRouter([
    {
        path: 'login',
        element: (
            <Stack>
                <Gnb />
                <Login />
            </Stack>
        ),
    },
    {
        path: '/',
        element: <Layouts />,
        children: [
            {
                path: 'village-head', // 면장
                children: [
                    { path: 'list', element: <VillageHeadList /> },
                    { path: 'list/:id', element: <VillageHeadDetails /> },
                    { path: 'register', element: <VillageHeadRegister /> },
                ],
            },
            {
                path: 'farmer',
                children: [
                    { path: 'list', element: <FarmerList /> },
                    { path: 'list/:id', element: <FarmerDetails /> },
                    { path: 'register', element: <FarmerRegister /> },
                ],
            },
            {
                path: 'trees-transaction',
                children: [
                    { path: 'list', element: <TreesTransactionList /> },
                    { path: 'register', element: <TreesTransactionRegister /> },
                ],
            },
            {
                path: 'trees-purchase',
                children: [
                    { path: 'list', element: <TreesPurchaseList /> },
                    { path: 'register', element: <TreesPurchaseRegister /> },
                ],
            },
            {
                path: 'vice-admin',
                children: [{ path: 'list', element: <ViceAdminList /> }],
            },
            {
                path: 'account',
                children: [{ path: 'register', element: <AccountRegister /> }],
            },
        ],
    },
]);

export default router;
