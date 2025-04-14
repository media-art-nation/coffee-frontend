import { PaginationItem, Shadows, createTheme } from '@mui/material';
import {
    CaretDoubleLeft,
    CaretDoubleRight,
    CaretLeft,
    CaretRight,
    DotOutline,
} from '@phosphor-icons/react';

import { palette } from '.';

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        'h1/bold': true;
        'h1/medium': true;
        'h2/bold': true;
        'h2/medium': true;
        'h3/bold': true;
        'h3/medium': true;
        'title/semibold': true;
        'title/medium': true;
        'subTitle/semibold': true;
        'subTitle/medium': true;
        'body1/semibold': true;
        'body1/medium': true;
        'body1/regular': true;
        'body2/semibold': true;
        'body2/medium': true;
        'body2/regular': true;
        'caption/semibold': true;
        'caption/medium': true;
        'caption/regular': true;
        'helperText/semibold': true;
        'helperText/regular': true;
    }
}

declare module '@mui/material/Chip' {
    interface ChipPropsColorOverrides {
        blue: true;
        red: true;
        yellow: true;
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        containedBlack: true;
        containedBlue: true;
        containedWhite: true;
        containedRed: true;
        containedGrey: true;
        //------------------------아래부터 진짜
        Primary: true;
        Secondary: true;
        Tertiary: true;
        quaternary: true;
        Warning: true;
        Warning_Text: true;
        Text: true;
    }

    interface ButtonPropsSizeOverrides {
        xSmall: true;
    }
}

export const theme = createTheme({
    spacing: 8,
    shadows: [
        'none',
        '0px 1px 2px 0px #1018280D',
        '0px 1px 2px 0px #1018280F,0px 1px 3px 0px #1018281A',
        '0px 2px 4px -2px #1018280F,0px 4px 8px -2px #1018281A',
        '0px 4px 6px -2px #10182808, 0px 12px 16px -4px #10182814',
        '0px 8px 8px -4px #1018280A, 0px 20px 24px -4px #10182814, 0px 0px 2px 0px #00000014',
        '0px 24px 48px -12px #10182829, 0px 4px 8px 0px #00000014, 0px 0px 2px 0px #00000014',
        '0px 32px 64px -12px #10182829, 0px 16px 20px 0px #0000000A, 0px 4px 8px 0px #00000014, 0px 0px 4px 0px #00000014',
        ...createTheme({}).shadows.slice(8),
    ] as Shadows,
    palette: palette,
    typography: { fontFamily: 'IBM Plex Sans' }, //[TODO] 수정해야됨 폰트
    components: {
        MuiTypography: {
            defaultProps: { variant: 'body1/regular' },
            variants: [
                {
                    props: { variant: 'h1/bold' },
                    style: { fontWeight: 700, fontSize: '32px', lineHeight: '42px' },
                },
                {
                    props: { variant: 'h1/medium' },
                    style: { fontWeight: 500, fontSize: '32px', lineHeight: '42px' },
                },
                {
                    props: { variant: 'h2/bold' },
                    style: { fontWeight: 700, fontSize: '28px', lineHeight: '38px' },
                },
                {
                    props: { variant: 'h2/medium' },
                    style: { fontWeight: 500, fontSize: '28px', lineHeight: '38px' },
                },
                {
                    props: { variant: 'h3/bold' },
                    style: { fontWeight: 700, fontSize: '24px', lineHeight: '32px' },
                },
                {
                    props: { variant: 'h3/medium' },
                    style: { fontWeight: 500, fontSize: '24px', lineHeight: '29px' },
                },
                {
                    props: { variant: 'title/semibold' },
                    style: { fontWeight: 600, fontSize: '20px', lineHeight: '26px' },
                },
                {
                    props: { variant: 'title/medium' },
                    style: { fontWeight: 500, fontSize: '20px', lineHeight: '24px' },
                },
                {
                    props: { variant: 'subTitle/semibold' },
                    style: { fontWeight: 600, fontSize: '18px', lineHeight: '24px' },
                },
                {
                    props: { variant: 'subTitle/medium' },
                    style: { fontWeight: 500, fontSize: '18px', lineHeight: '24px' },
                },
                {
                    props: { variant: 'body1/semibold' },
                    style: { fontWeight: 600, fontSize: '16px', lineHeight: '26px' },
                },
                {
                    props: { variant: 'body1/medium' },
                    style: { fontWeight: 500, fontSize: '16px', lineHeight: '26px' },
                },
                {
                    props: { variant: 'body1/regular' },
                    style: { fontWeight: 400, fontSize: '16px', lineHeight: '26px' },
                },
                {
                    props: { variant: 'body2/semibold' },
                    style: { fontWeight: 600, fontSize: '14px', lineHeight: '20px' },
                },
                {
                    props: { variant: 'body2/medium' },
                    style: { fontWeight: 500, fontSize: '14px', lineHeight: '20px' },
                },
                {
                    props: { variant: 'body2/regular' },
                    style: { fontWeight: 400, fontSize: '14px', lineHeight: '20px' },
                },
                {
                    props: { variant: 'caption/semibold' },
                    style: { fontWeight: 600, fontSize: '12px', lineHeight: '18px' },
                },
                {
                    props: { variant: 'caption/medium' },
                    style: { fontWeight: 500, fontSize: '12px', lineHeight: '18px' },
                },
                {
                    props: { variant: 'caption/regular' },
                    style: { fontWeight: 400, fontSize: '12px', lineHeight: '18px' },
                },
                {
                    props: { variant: 'helperText/semibold' },
                    style: { fontWeight: 600, fontSize: '10px', lineHeight: '16px' },
                },
                {
                    props: { variant: 'helperText/regular' },
                    style: { fontWeight: 400, fontSize: '10px', lineHeight: '16px' },
                },
            ],
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    'background': palette.grey[50],
                    'borderRadius': '4px',
                    'minHeight': '44px',
                    '& .MuiOutlinedInput-root': {
                        'height': '44px',
                        '& input': {
                            padding: '12px 10px',
                        },
                        '& fieldset': {
                            borderColor: 'transparent',
                        },
                        '&:hover fieldset': {
                            border: `1px solid ${palette.grey[200]}`,
                        },
                        '&.Mui-focused fieldset': {
                            border: `1px solid ${palette.grey[500]}`,
                        },
                    },
                    '& .MuiOutlinedInput-input::placeholder': {
                        color: palette.grey[400],
                        opacity: 1, // 기본적으로 placeholder는 opacity 0.54 정도로 설정되어 있음
                    },
                },
            },
        },
        MuiPagination: {
            defaultProps: {
                variant: 'outlined',
                shape: 'rounded',
                color: 'primary',
                showFirstButton: true,
                showLastButton: true,
                renderItem: (item) => (
                    <PaginationItem
                        slots={{
                            previous: CaretLeft,
                            next: CaretRight,
                            first: CaretDoubleLeft,
                            last: CaretDoubleRight,
                        }}
                        {...item}
                    />
                ),
            },
            styleOverrides: {
                root: {
                    'li > button': { width: '32px', border: `1px solid ${palette.grey[200]}` },
                    'li': {
                        '.Mui-selected': {
                            color: palette.common.white,
                            backgroundColor: palette.blue[600],
                        },
                    },

                    'svg': { width: '14px', height: '14px' },

                    '& .MuiPaginationItem-firstLast': {
                        border: 0,
                        svg: { color: palette.grey[700] },
                    },
                    '& .MuiPaginationItem-previousNext': {
                        border: 0,
                        svg: { color: palette.grey[700] },
                    },

                    '& .Mui-disabled': {
                        svg: { color: palette.grey[300] },
                    },
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    'width': 'fit-content',
                    '.MuiSvgIcon-root': {
                        color: palette.grey[400],
                    },
                    '&.Mui-checked .MuiSvgIcon-root': {
                        color: palette.grey[700],
                    },
                },
            },
        },
        MuiChip: {
            defaultProps: {
                icon: <DotOutline size={32} weight="fill" />,
            },
            styleOverrides: {
                root: {
                    'width': 'fit-content',
                    'paddingRight': '10px',
                    '& .MuiChip-label': {
                        padding: 0,
                    },
                    '& .MuiChip-icon': {
                        marginLeft: '0px',
                    },
                },
            },
            variants: [
                {
                    props: { color: 'blue' },
                    style: {
                        border: `1px solid ${palette.blue[100]}`,
                        color: palette.blue[600],
                        backgroundColor: palette.blue[50],

                        svg: {
                            color: palette.blue[600],
                        },
                    },
                },
                {
                    props: { color: 'red' },
                    style: {
                        border: `1px solid ${palette.red[100]}`,
                        color: palette.red[600],
                        backgroundColor: palette.red[50],

                        svg: {
                            color: palette.red[600],
                        },
                    },
                },
                {
                    props: { color: 'yellow' },
                    style: {
                        border: `1px solid ${palette.yellow[100]}`,
                        color: palette.yellow[600],
                        backgroundColor: palette.yellow[50],

                        svg: {
                            color: palette.yellow[600],
                        },
                    },
                },
            ],
        },
        MuiSelect: {
            defaultProps: { displayEmpty: true },
            styleOverrides: {
                root: {
                    'width': '100%',
                    'minWidth': '100%',
                    'height': '44px',
                    'backgroundColor': palette.grey[50],
                    'border': 'none',
                    'outline': 'none',
                    '& fieldset': {
                        border: 'none',
                    },
                    '&:focus': {
                        outline: 'none',
                    },
                    'span': {
                        color: palette.grey[400],
                    },
                },
                icon: {
                    color: palette.grey[700], // 아이콘 색상 변경
                    fontSize: '24px', // 아이콘 크기 변경
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: '10px 30px',
                    borderRadius: '5px',
                    fontSize: '14px',
                },
            },
            variants: [
                {
                    props: { variant: 'containedBlue' },
                    style: {
                        backgroundColor: palette.blue[600],
                        color: palette.common.white,
                    },
                },
                {
                    props: { variant: 'containedRed' },
                    style: {
                        backgroundColor: palette.red.main,
                        color: palette.common.white,
                    },
                },
                {
                    props: { variant: 'containedGrey' },
                    style: {
                        backgroundColor: palette.grey[50],
                        border: `1px solid ${palette.grey[100]}`,
                        color: palette.grey[800],
                    },
                },
                {
                    props: { variant: 'containedWhite' },
                    style: {
                        backgroundColor: palette.common.white,
                        border: `1px solid ${palette.grey[100]}`,
                        color: palette.grey[800],
                    },
                },
                {
                    props: { size: 'xSmall' },
                    style: {
                        padding: '0 16px',
                        height: '38px',
                        fontSize: '14px',
                        width: 'fit-content',
                    },
                },
            ],
        },
        MuiTable: {
            styleOverrides: {
                root: { width: '100%' },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: palette.action.hover,
                    },
                },
            },
        },
        MuiTableCell: {
            defaultProps: {
                align: 'center',
            },
            styleOverrides: {
                root: { color: palette.grey[900], fontSize: '14px' },
                head: {
                    backgroundColor: palette.grey[50],
                    fontWeight: '600',
                    borderBottom: `1px solid ${palette.grey[300]}`,
                },
                body: {
                    borderBottom: `1px solid ${palette.grey[100]}`,
                    padding: '12px',
                },
            },
        },
    },
});
