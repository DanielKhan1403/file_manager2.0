import React from 'react';
import { Button, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { useTranslation } from 'react-i18next'; // Импорт хука для перевода

const NotFound = () => {
    const { t } = useTranslation(); // Хук для получения функции перевода

    return (
        <Container
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',  // Занимает всю ширину экрана
                height: '100vh',  // Занимает всю высоту экрана
                textAlign: 'center',
                background: 'linear-gradient(135deg, #ff7e5f, #feb47b)',
                borderRadius: '8px',
                color: '#fff',
                padding: '20px',
                overflow: 'hidden',  // Чтобы контент не вылезал за пределы
            }}
        >
            <SentimentDissatisfiedIcon style={{ fontSize: '4rem', marginBottom: '20px' }} />
            <Typography variant="h1" style={{ fontSize: '6rem', fontWeight: 'bold' }}>
                404
            </Typography>
            <Typography variant="h4" style={{ marginBottom: '20px' }}>
                {t('notFound')} {/* Перевод сообщения о не найденной странице */}
            </Typography>
            <Typography variant="h6" style={{ marginBottom: '40px', fontStyle: 'italic' }}>
                {t('notFound')} {/* Перевод дополнительного текста */}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/"
                style={{ fontSize: '1.2rem', padding: '10px 20px' }}
            >
                {t('goHome')}
            </Button>
        </Container>
    );
};

export default NotFound;
