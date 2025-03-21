import { Shadows, createTheme } from '@mui/material';

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

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        containedBlack: true;
        //------------------------아래부터 진짜
        Primary: true;
        Secondary: true;
        Tertiary: true;
        quaternary: true;
        Warning: true;
        Warning_Text: true;
        Text: true;
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
    typography: { fontFamily: 'Pretendard' }, //[TODO] 수정해야됨 폰트
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
                    '& .MuiOutlinedInput-root': {
                        '& input': {
                            padding: '12px 10px',
                            borderRadius: '4px',
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
                },
            },
        },
    },
});
