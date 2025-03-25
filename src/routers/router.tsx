import { createBrowserRouter } from 'react-router';

import { Stack } from '@mui/material';

import AccountRegister from '@/pages/Accounts/AccountRegister';
import Common from '@/pages/CommonComponents';
import FarmerDetails from '@/pages/Farmers/FarmerDetails';
import FarmerList from '@/pages/Farmers/FarmerList';
import FarmerRegister from '@/pages/Farmers/FarmerRegister';
import FarmerRequestDetails from '@/pages/Requests/FarmerRequestDetail';
import Login from '@/pages/Accounts/Login';
import MyProfileEdit from '@/pages/Accounts/MyProfileEdit';
import RequestList from '@/pages/Requests/RequestList';
import TreesPurchaseList from '@/pages/TreesPurchases/TreesPurchaseList';
import TreesPurchaseRegister from '@/pages/TreesPurchases/TreesPurchaseRegister';
import TreesPurchaseRequestDetails from '@/pages/Requests/TreesPurchaseRequestDetail';
import TreesTransactionList from '@/pages/TreesTransactions/TreesTransactionList';
import TreesTransactionRegister from '@/pages/TreesTransactions/TreesTransactionRegister';
import TreesTransactionRequestDetails from '@/pages/Requests/TreesTransactionRequestDetails';
import ViceAdminDetails from '@/pages/ViceAdmins/VIceAdminDetails';
import ViceAdminEdit from '@/pages/ViceAdmins/ViceAdminEdit';
import ViceAdminList from '@/pages/ViceAdmins/ViceAdminList';
import VillageHeadDetails from '@/pages/VillageHeads/VillageHeadDetails';
import VillageHeadEdit from '@/pages/VillageHeads/VillageHeadEdit';
import VillageHeadList from '@/pages/VillageHeads/VillageHeadList';
import VillageHeadRegister from '@/pages/VillageHeads/VillageHeadRegister';
import VillageHeadRequestDetails from '@/pages/Requests/VillageHeadRequestDetails';

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
                path: 'my-profile-edit', // 요청
                element: <MyProfileEdit />,
            },
            {
                path: 'requests', // 요청
                children: [
                    { index: true, element: <RequestList /> },
                    { path: 'village-head/:id', element: <VillageHeadRequestDetails /> }, // 면장 등록 요청 상세
                    { path: 'farmer/:id', element: <FarmerRequestDetails /> }, // 농부 등록 요청 상세
                    { path: 'trees-transaction/:id', element: <TreesTransactionRequestDetails /> }, // 나무 수령 승인 요청 상세
                    { path: 'trees-purchase/:id', element: <TreesPurchaseRequestDetails /> }, // 수매 승인 요청 상세
                ],
            },
            {
                path: 'village-head', // 면장
                children: [
                    { index: true, element: <VillageHeadList /> },
                    { path: ':id', element: <VillageHeadDetails /> },
                    { path: 'register', element: <VillageHeadRegister /> },
                    { path: 'edit', element: <VillageHeadEdit /> },
                ],
            },
            {
                path: 'farmer', // 농부
                children: [
                    { index: true, element: <FarmerList /> },
                    { path: ':id', element: <FarmerDetails /> },
                    { path: 'register', element: <FarmerRegister /> },
                ],
            },
            {
                path: 'trees-transaction', // 나무 수령
                children: [
                    { index: true, element: <TreesTransactionList /> },
                    { path: 'register', element: <TreesTransactionRegister /> },
                ],
            },
            {
                path: 'trees-purchase', // 수매
                children: [
                    { index: true, element: <TreesPurchaseList /> },
                    { path: 'register', element: <TreesPurchaseRegister /> },
                ],
            },
            {
                path: 'vice-admin', // 부 관리자
                children: [
                    { index: true, element: <ViceAdminList /> },
                    { path: ':id', element: <ViceAdminDetails /> },
                    { path: 'edit', element: <ViceAdminEdit /> },
                ],
            },
            {
                path: 'account', // 계정
                children: [{ path: 'register', element: <AccountRegister /> }],
            },
            {
                path: 'components', // 계정
                element: <Common />,
            },
        ],
    },
]);

export default router;
