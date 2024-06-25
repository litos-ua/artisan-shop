import { defaultTheme } from 'react-admin';
import { createTheme } from '@mui/material/styles';

export const lightTheme = defaultTheme;

export const darkTheme = createTheme({
    ...defaultTheme,
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#f48fb1',
        },
        background: {
            default: '#303030',
            paper: '#424242',
        },
    },
});