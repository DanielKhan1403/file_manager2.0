// src/theme.js
import { createTheme } from '@mui/material/styles';

// Создание темы с возможностью переключения
const darkTheme = createTheme({
    palette: {
        mode: 'dark', // Включаем темную тему
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#f48fb1',
        },
        background: {
            default: '#121212',
            paper: '#1d1d1d',
        },
    },
});

const lightTheme = createTheme({
    palette: {
        mode: 'light', // Включаем светлую тему
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#ff4081',
        },
        background: {
            default: '#ffffff',
            paper: '#f5f5f5',
        },
    },
});

export { darkTheme, lightTheme };
