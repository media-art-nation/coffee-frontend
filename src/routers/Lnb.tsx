import { useLocation, useNavigate } from 'react-router';

import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionSummary, Stack, Typography } from '@mui/material';

import { palette } from '@/themes';

export const lnbData = [
    {
        label: '요청 관리',
        children: [{ label: '요청 목록', path: '/request/list' }],
    },
    {
        label: '면장 관리',
        children: [
            { label: '면장 목록', path: '/village-head/list' },
            { label: '면장 등록', path: '/village-head/register' },
            { label: '농부 목록', path: '/farmer/list' },
            { label: '농부 등록', path: '/farmer/register' },
            { label: '나무 수령 목록', path: '/trees-transaction/list' },
            { label: '나무 수령 등록', path: '/trees-transaction/register' },
        ],
    },
    {
        label: '수매 관리',
        children: [
            { label: '수매 목록', path: '/trees-purchase/list' },
            { label: '수매 내역 등록', path: '/trees-purchase/register' },
        ],
    },
    {
        label: '부 관리자 관리',
        children: [{ label: '부 관리자 목록', path: '/vice-admin/list' }],
    },
    {
        label: '계정 관리',
        children: [{ label: '계성 생성', path: '/account/register' }],
    },
];

const Lnb = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    console.log(pathname);

    return (
        <Stack sx={{ padding: '12px', width: '216px', gap: '5px' }}>
            {lnbData.map((v) => {
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
