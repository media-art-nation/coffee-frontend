import { Color, PaletteOptions } from '@mui/material';

type CustomColor = Omit<Color, 'A100' | 'A200' | 'A400' | 'A700'> & {
    main: string;
};

type CustomPaletteOptions = PaletteOptions & {
    blue: CustomColor;
    grey: CustomColor;
    success: CustomColor;
    red: CustomColor;
    yellow: CustomColor;
    divider: string;
    text: { primary: string };
    common: { black: string; white: string };
    action: { hover: string; focus: string; selected: string };
};

export const palette: CustomPaletteOptions = {
    blue: {
        main: '#2196f3', // 500
        50: '#e3f2fd',
        100: '#bbdefb',
        200: '#90caf9',
        300: '#64b5f6',
        400: '#42a5f5',
        500: '#2196f3',
        600: '#1e88e5',
        700: '#1976d2',
        800: '#1565c0',
        900: '#0d47a1',
    },
    grey: {
        main: '#607D8B', // 500
        50: '#ECEFF1',
        100: '#CFD8DC',
        200: '#B0BEC5',
        300: '#90A4AE',
        400: '#78909C',
        500: '#607D8B',
        600: '#546E7A',
        700: '#455A64',
        800: '#37474F',
        900: '#263238',
    },
    success: {
        main: '#0E9F6E', // 500
        50: '#F3FAF7',
        100: '#DEF7EC',
        200: '#BCF0DA',
        300: '#84E1BC',
        400: '#31C48D',
        500: '#0E9F6E',
        600: '#057A55',
        700: '#046C4E',
        800: '#03543F',
        900: '#014737',
    },
    red: {
        main: '#F05252', // 500
        50: '#FDF2F2',
        100: '#FDE8E8',
        200: '#FBD5D5',
        300: '#F8B4B4',
        400: '#F98080',
        500: '#F05252',
        600: '#E02424',
        700: '#C81E1E',
        800: '#9B1C1C',
        900: '#771D1D',
    },
    yellow: {
        main: '#ffeb3b', // 500
        50: '#fffde7',
        100: '#fff9c4',
        200: '#fff59d',
        300: '#fff176',
        400: '#ffee58',
        500: '#ffeb3b',
        600: '#fdd835',
        700: '#fbc02d',
        800: '#f9a825',
        900: '#f57f17',
    },
    divider: '#E5E7EB',
    text: { primary: '#111928' },
    common: { black: '#000000', white: '#FFFFFF' },
    action: { hover: '#0000000A', focus: '#0000000A', selected: '#EBF5FF' },
};
