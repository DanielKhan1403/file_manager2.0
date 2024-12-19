import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import LinkIcon from '@mui/icons-material/Link';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';  // Импортируем хук для локализации

const Header = ({ username }) => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();  // Используем хук для локализации и получения функции смены языка

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/');
    };

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                {/* Приветствие */}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {t('header.greeting', { username })}
                </Typography>

                {/* Разделы */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button
                        startIcon={<HomeIcon />}
                        color="inherit"
                        onClick={() => navigate('/directories')}
                    >
                        {t('header.home')}
                    </Button>

                    <Button
                        startIcon={<LinkIcon />}
                        color="inherit"
                        onClick={() => navigate('/access-links')}
                    >
                        {t('header.createLink')}
                    </Button>

                    {/* Кнопки для смены языка */}
                    <Button
                        variant="text"
                        color="inherit"
                        onClick={() => i18n.changeLanguage('en')}
                    >
                        EN
                    </Button>
                    <Button
                        variant="text"
                        color="inherit"
                        onClick={() => i18n.changeLanguage('ru')}
                    >
                        RU
                    </Button>

                    {/* Кнопка выхода */}
                    <IconButton color="inherit" onClick={handleLogout}>
                        <LogoutIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
