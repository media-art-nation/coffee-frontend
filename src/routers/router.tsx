import { createBrowserRouter } from 'react-router';

import { Stack } from '@mui/material';

import AccountRegister from '@/pages/AccountRegister';
import Common from '@/pages/CommonComponents';
import FarmerDetails from '@/pages/FarmerDetails';
import FarmerList from '@/pages/FarmerList';
import FarmerRegister from '@/pages/FarmerRegister';
import FarmerRequestDetails from '@/pages/FarmerRequestDetail';
import Login from '@/pages/Login';
import MyProfileEdit from '@/pages/MyProfileEdit';
import RequestList from '@/pages/RequestList';
import TreesPurchaseList from '@/pages/TreesPurchaseList';
import TreesPurchaseRegister from '@/pages/TreesPurchaseRegister';
import TreesPurchaseRequestDetails from '@/pages/TreesPurchaseRequestDetail';
import TreesTransactionList from '@/pages/TreesTransactionList';
import TreesTransactionRegister from '@/pages/TreesTransactionRegister';
import TreesTransactionRequestDetails from '@/pages/TreesTransactionRequestDetails';
import ViceAdminDetails from '@/pages/VIceAdminDetails';
import ViceAdminEdit from '@/pages/ViceAdminEdit';
import ViceAdminList from '@/pages/ViceAdminList';
import VillageHeadDetails from '@/pages/VillageHeadDetails';
import VillageHeadEdit from '@/pages/VillageHeadEdit';
import VillageHeadList from '@/pages/VillageHeadList';
import VillageHeadRegister from '@/pages/VillageHeadRegister';
import VillageHeadRequestDetails from '@/pages/VillageHeadRequestDetails';

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
