import { useLocation, useNavigate } from 'react-router';

import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionSummary, Stack, Typography } from '@mui/material';

import { getCookies } from '@/apis/AppUser/cookie';
import { palette } from '@/themes';
import { TRole } from '@/typings/User';

type TLnbChild = {
    label: string;
    path: string;
};

type TLnbItem = {
    label: string;
    children: TLnbChild[];
};

const lnbData: Record<TRole, TLnbItem[]> = {
    ADMIN: [
        {
            label: '요청 관리',
            children: [{ label: '요청 목록', path: '/requests' }],
        },
        {
            label: '면장 관리',
            children: [
                { label: '면장 목록', path: '/village-heads' },
                { label: '면장 등록', path: '/village-heads/register' },
                { label: '농부 목록', path: '/village-heads/farmers' },
                { label: '농부 등록', path: '/village-heads/farmers/register' },
                { label: '나무 수령 목록', path: '/village-heads/trees-transactions' },
                { label: '나무 수령 등록', path: '/village-heads/trees-transactions/register' },
            ],
        },
        {
            label: '수매 관리',
            children: [
                { label: '수매 목록', path: '/trees-purchases' },
                { label: '수매 내역 등록', path: '/trees-purchases/register' },
            ],
        },
        {
            label: '부 관리자 관리',
            children: [{ label: '부 관리자 목록', path: '/vice-admins' }],
        },
        {
            label: '지역 관리',
            children: [
                { label: '지역 및 섹션 목록', path: '/locations' },
                { label: '지역 생성', path: '/locations/register' },
                { label: '섹션 생성', path: '/locations/register/section' },
            ],
        },
        {
            label: '계정 관리',
            children: [{ label: '계성 생성', path: '/accounts/register' }],
        },
    ],
    // 부관리자(농림부)
    VICE_ADMIN_AGRICULTURE_MINISTRY_OFFICER: [
        {
            label: '요청 관리',
            children: [{ label: '요청 목록', path: '/requests' }],
        },
        {
            label: '면장 관리',
            children: [
                { label: '면장 목록', path: '/village-heads' },
                { label: '면장 등록', path: '/village-heads/register' },
                { label: '농부 목록', path: '/village-heads/farmers' },
                { label: '농부 등록', path: '/village-heads/farmers/register' },
                { label: '나무 수령 목록', path: '/village-heads/trees-transactions' },
                { label: '나무 수령 등록', path: '/village-heads/trees-transactions/register' },
            ],
        },
        {
            label: '수매 관리',
            children: [{ label: '수매 목록', path: '/trees-purchases' }],
        },
        {
            label: '지역 관리',
            children: [
                { label: '지역 및 섹션 목록', path: '/locations' },
                { label: '섹션 생성', path: '/locations/register/section' },
            ],
        },
    ],
    // 부관리자(한국지사)
    VICE_ADMIN_HEAD_OFFICER: [
        {
            label: '요청 관리',
            children: [{ label: '요청 목록', path: '/requests' }],
        },
        {
            label: '면장 관리',
            children: [
                { label: '면장 목록', path: '/village-heads' },
                { label: '면장 등록', path: '/village-heads/register' },
                { label: '농부 목록', path: '/village-heads/farmers' },
                { label: '농부 등록', path: '/village-heads/farmers/register' },
                { label: '나무 수령 목록', path: '/village-heads/trees-transactions' },
                { label: '나무 수령 등록', path: '/village-heads/trees-transactions/register' },
            ],
        },
        {
            label: '수매 관리',
            children: [
                { label: '수매 목록', path: '/trees-purchases' },
                { label: '수매 내역 등록', path: '/trees-purchases/register' },
            ],
        },
        {
            label: '지역 관리',
            children: [
                { label: '지역 및 섹션 목록', path: '/locations' },
                { label: '섹션 생성', path: '/locations/register/section' },
            ],
        },
    ],
    VILLAGE_HEAD: [
        {
            label: '면장 관리',
            children: [{ label: '농부 목록', path: '/village-heads/farmers' }],
        },
    ],
};

const Lnb = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const role = getCookies('role') as TRole;

    return (
        <Stack
            sx={{
                padding: '12px',
                minWidth: '216px',
                gap: '5px',
                borderRight: `1px solid ${palette.grey[200]}`,
            }}
        >
            {lnbData[role].map((v) => {
                return (
                    <Accordion
                        key={v.label}
                        sx={{
                            'boxShadow': 'none',
                            '&::before': {
                                content: 'none',
                            },
                            '&.Mui-expanded': { margin: 0 },
                        }}
                        defaultExpanded
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMore sx={{ color: palette.grey[700] }} />}
                            sx={{
                                'backgroundColor': '#F9FAFB',
                                'padding': '8px',
                                'borderRadius': '4px',
                                'height': '40px',
                                'color': palette.grey[800],
                                '&.Mui-expanded': { minHeight: '40px', marginBottom: '5px' },
                            }}
                        >
                            <Typography sx={{ fontSize: '14px', color: palette.grey[800] }}>
                                {v.label}
                            </Typography>
                        </AccordionSummary>
                        {v.children && (
                            <Stack
                                sx={{
                                    gap: '4px',
                                    margin: '0px',
                                }}
                            >
                                {v.children.map((c) => {
                                    const selected = pathname === c.path;
                                    return (
                                        <Stack
                                            key={c.path}
                                            onClick={() => navigate(c.path)}
                                            sx={{
                                                'borderRadius': '4px',
                                                'height': '40px',
                                                'backgroundColor': selected
                                                    ? '#F1F9FF'
                                                    : palette.common.white,
                                                'padding': '0 0 0 20px',
                                                'flexDirection': 'row',
                                                'alignItems': 'center',
                                                'cursor': 'pointer',
                                                '&:hover': {
                                                    backgroundColor: palette.action.hover,
                                                },
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: '14px',
                                                    color: selected
                                                        ? palette.blue[700]
                                                        : palette.grey[700],
                                                }}
                                            >
                                                {c.label}
                                            </Typography>
                                        </Stack>
                                    );
                                })}
                            </Stack>
                        )}
                    </Accordion>
                );
            })}
        </Stack>
    );
};

export default Lnb;
