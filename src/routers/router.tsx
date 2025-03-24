import { createBrowserRouter } from 'react-router';

import { Stack } from '@mui/material';

import AccountRegister from '@/pages/AccountRegister/AccountRegister';
import FarmerDetails from '@/pages/FarmerDetails/FarmerDetails';
import FarmerList from '@/pages/FarmerList/FarmerList';
import FarmerRegister from '@/pages/FarmerRegister/FarmerRegister';
import Login from '@/pages/Login/Login';
import RequestList from '@/pages/RequestList/RequestList';
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
                path: 'request', // 요청
                children: [{ path: 'list', element: <RequestList /> }],
            },
            {
                path: 'village-head', // 면장
                children: [
                    { path: 'list', element: <VillageHeadList /> },
                    { path: 'list/:id', element: <VillageHeadDetails /> },
                    { path: 'register', element: <VillageHeadRegister /> },
                ],
            },
            {
                path: 'farmer', // 농부
                children: [
                    { path: 'list', element: <FarmerList /> },
                    { path: 'list/:id', element: <FarmerDetails /> },
                    { path: 'register', element: <FarmerRegister /> },
                ],
            },
            {
                path: 'trees-transaction', // 나무 수령
                children: [
                    { path: 'list', element: <TreesTransactionList /> },
                    { path: 'register', element: <TreesTransactionRegister /> },
                ],
            },
            {
                path: 'trees-purchase', // 수매
                children: [
                    { path: 'list', element: <TreesPurchaseList /> },
                    { path: 'register', element: <TreesPurchaseRegister /> },
                ],
            },
            {
                path: 'vice-admin', // 부 관리자
                children: [{ path: 'list', element: <ViceAdminList /> }],
            },
            {
                path: 'account', // 계정
                children: [{ path: 'register', element: <AccountRegister /> }],
            },
        ],
    },
]);

export default router;
