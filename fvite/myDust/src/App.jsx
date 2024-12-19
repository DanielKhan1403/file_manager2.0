import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material'; // Иконки для смены темы
import { darkTheme, lightTheme } from '/src/theme.js'; // Темы
import { useTranslation } from 'react-i18next';  // Хук для локализации
import AuthForm from "./components/auth/Register.jsx";
import DirectoriesList from "./components/app/DirectoriesList.jsx";
import DirectoryDetail from "./components/app/DirectoryDetail.jsx";
import Header from "./components/Header.jsx";
import AccessLinkComponent from "./components/app/AccessLink.jsx";
import NotFound from "./components/app/NotFound.jsx";
import AccessPage from "./components/app/AccessPage.jsx"; // Новый компонент для обработки токенов

// Подключаем локализацию
import './i18n';  // Инициализация i18next

function App() {
    const [darkMode, setDarkMode] = useState(true);  // Состояние для смены темы
    const { t, i18n } = useTranslation();  // Получаем функцию для перевода и объект для смены языка

    const theme = darkMode ? darkTheme : lightTheme;  // Выбираем тему

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Сброс стилей для корректного применения темы */}
            <Router>
                <AppContent
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    t={t}
                    i18n={i18n}
                />
            </Router>
        </ThemeProvider>
    );
}

function AppContent({ darkMode, setDarkMode, t, i18n }) {
    const location = useLocation();  // Получаем текущий путь
    const showHeader = location.pathname !== '/';  // Показываем хедер, если не на главной странице

    const username = (localStorage.getItem('user') || 'User').replace(/['"]+/g, '');

    return (
        <div className="App" style={{ position: 'relative' }}>
            {showHeader && <Header username={username} i18n={i18n} />} {/* Показываем хедер */}

            {/* Кнопка для смены темы */}
            <IconButton
                onClick={() => setDarkMode(!darkMode)}
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1000,
                }}
            >
                {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

            <Routes>
                <Route path="/" element={<AuthForm />} />
                <Route path="/directories" element={<DirectoriesList />} />
                <Route path="/directories/:id" element={<DirectoryDetail />} />
                <Route path="/access-links" element={<AccessLinkComponent />} />
                <Route path="/access/:token" element={<AccessPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
