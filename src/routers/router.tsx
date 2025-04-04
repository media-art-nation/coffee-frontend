import { createBrowserRouter } from 'react-router';

import { Stack } from '@mui/material';

import AccountRegister from '@/pages/Accounts/AccountRegister';
import Login from '@/pages/Accounts/Login';
import MyProfileEdit from '@/pages/Accounts/MyProfileEdit';
import FarmerDetails from '@/pages/Farmers/FarmerDetails';
import FarmerList from '@/pages/Farmers/FarmerList';
import FarmerRegister from '@/pages/Farmers/FarmerRegister';
import LocationList from '@/pages/Locations/LocationList';
import LocationRegister from '@/pages/Locations/LocationRegister';
import SectionRegister from '@/pages/Locations/SectionRegister';
import FarmerRequestDetails from '@/pages/Requests/FarmerRequestDetails';
import RequestList from '@/pages/Requests/RequestList';
import SectionRequestDetails from '@/pages/Requests/SectionRequestDetails';
import TreesPurchaseRequestDetails from '@/pages/Requests/TreesPurchaseRequestDetails';
import TreesTransactionRequestDetails from '@/pages/Requests/TreesTransactionRequestDetails';
import VillageHeadRequestDetails from '@/pages/Requests/VillageHeadRequestDetails';
import TestComponents from '@/pages/TestComponents';
import TreesPurchaseList from '@/pages/TreesPurchases/TreesPurchaseList';
import TreesPurchaseRegister from '@/pages/TreesPurchases/TreesPurchaseRegister';
import TreesTransactionList from '@/pages/TreesTransactions/TreesTransactionList';
import TreesTransactionRegister from '@/pages/TreesTransactions/TreesTransactionRegister';
import ViceAdminDetails from '@/pages/ViceAdmins/VIceAdminDetails';
import ViceAdminEdit from '@/pages/ViceAdmins/ViceAdminEdit';
import ViceAdminList from '@/pages/ViceAdmins/ViceAdminList';
import VillageHeadDetails from '@/pages/VillageHeads/VillageHeadDetails';
import VillageHeadEdit from '@/pages/VillageHeads/VillageHeadEdit';
import VillageHeadList from '@/pages/VillageHeads/VillageHeadList';
import VillageHeadRegister from '@/pages/VillageHeads/VillageHeadRegister';

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
                    { path: 'section/:id', element: <SectionRequestDetails /> }, // 섹션 생성 요청 상세
                ],
            },
            {
                path: 'village-heads', // 면장
                children: [
                    { index: true, element: <VillageHeadList /> },
                    { path: ':id', element: <VillageHeadDetails /> },
                    { path: 'register', element: <VillageHeadRegister /> },
                    { path: 'edit', element: <VillageHeadEdit /> },
                    { path: 'farmers', element: <FarmerList /> },
                    { path: 'farmers/:id', element: <FarmerDetails /> },
                    { path: 'farmers/register', element: <FarmerRegister /> },
                    { path: 'trees-transactions', element: <TreesTransactionList /> },
                    { path: 'trees-transactions/register', element: <TreesTransactionRegister /> },
                ],
            },
            {
                path: 'trees-purchases', // 수매
                children: [
                    { index: true, element: <TreesPurchaseList /> },
                    { path: 'register', element: <TreesPurchaseRegister /> },
                ],
            },
            {
                path: 'vice-admins', // 부 관리자
                children: [
                    { index: true, element: <ViceAdminList /> },
                    { path: ':id', element: <ViceAdminDetails /> },
                    { path: 'edit', element: <ViceAdminEdit /> },
                ],
            },
            {
                path: 'locations', // 지역
                children: [
                    { index: true, element: <LocationList /> },
                    { path: 'register', element: <LocationRegister /> },
                    { path: 'register/section', element: <SectionRegister /> },
                ],
            },
            {
                path: 'accounts', // 계정
                children: [{ path: 'register', element: <AccountRegister /> }],
            },
            {
                path: 'components', // 공통 컴포넌트
                element: <TestComponents />,
            },
        ],
    },
]);

export default router;
