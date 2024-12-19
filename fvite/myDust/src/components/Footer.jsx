import React from 'react';
import { Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, GitHub } from '@mui/icons-material';  // Иконки социальных сетей
import logo from '/src/assets/icons8-частичная-облачность-ночью-100.png';  // Путь к изображению логотипа

const Footer = () => {
    return (
        <footer
            style={{
                background: 'linear-gradient(135deg, #00c6ff, #0072ff)',  // Градиент с акцентом на голубой
                color: '#fff',
                padding: '10px 0',
                position: 'fixed',
                bottom: 0,
                width: '100%',
                textAlign: 'center',
                zIndex: 1000,  // Обеспечивает, что футер будет поверх контента
                boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',  // Тень для футера
                transition: 'transform 0.3s ease-in-out',  // Анимация для появления футера
            }}
        >
            <Container>
                <Grid container spacing={2} justifyContent="center">
                    {/* Логотип и информация о компании */}
                    <Grid item xs={12} sm={4}>
                        <img src={logo} alt="Company Logo" style={{ width: '100px', marginBottom: '10px' }} />
                        <Typography variant="body2" style={{ marginBottom: '5px' }}>
                            Мы — инновационная компания, занимающаяся веб-разработкой.
                        </Typography>
                    </Grid>

                    {/* Социальные сети */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="body2" style={{ marginBottom: '10px' }}>
                            Подключайтесь к нам
                        </Typography>
                        <div>
                            <IconButton color="inherit" href="https://facebook.com" target="_blank" style={{ margin: '0 8px' }}>
                                <Facebook />
                            </IconButton>
                            <IconButton color="inherit" href="https://twitter.com" target="_blank" style={{ margin: '0 8px' }}>
                                <Twitter />
                            </IconButton>
                            <IconButton color="inherit" href="https://instagram.com" target="_blank" style={{ margin: '0 8px' }}>
                                <Instagram />
                            </IconButton>
                            <IconButton color="inherit" href="https://linkedin.com" target="_blank" style={{ margin: '0 8px' }}>
                                <LinkedIn />
                            </IconButton>
                            <IconButton color="inherit" href="https://github.com" target="_blank" style={{ margin: '0 8px' }}>
                                <GitHub />
                            </IconButton>
                        </div>
                    </Grid>

                    {/* Контакты */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="body2" style={{ marginBottom: '5px' }}>
                            Email: <Link href="mailto:support@company.com" color="inherit">support@company.com</Link>
                        </Typography>
                        <Typography variant="body2" style={{ marginBottom: '5px' }}>
                            Телефон: <Link href="tel:+1234567890" color="inherit">+1234567890</Link>
                        </Typography>
                    </Grid>
                </Grid>

                {/* Нижняя строка с копирайтом */}
                <Typography variant="body2" style={{ marginTop: '10px', fontSize: '0.9rem' }}>
                    © {new Date().getFullYear()} Company Name. Все права защищены.
                </Typography>
            </Container>
        </footer>
    );
};

export default Footer;
