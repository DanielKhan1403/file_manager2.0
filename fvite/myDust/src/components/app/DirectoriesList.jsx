import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getDirectories } from '/src/store/actions/appActions/directoriesAction.js';
import {
    Grid,
    CircularProgress,
    Typography,
    Container,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Импорт хука для перевода

const Directories = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { directories, loading, error } = useSelector((state) => state.directories);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const { t } = useTranslation(); // Хук для получения функции перевода

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        } else {
            dispatch(getDirectories());
        }
    }, [dispatch, isAuthenticated, navigate]);

    return (
        <Container maxWidth="md" style={{ marginTop: '20px' }}>
            <Typography variant="h4" component="h1" gutterBottom style={{ textAlign: 'center' }}>
                {t('yoursDirectories')} {/* Перевод для заголовка */}
            </Typography>
            {loading && <CircularProgress style={{ display: 'block', margin: '20px auto' }} />}
            {error && <Typography color="error">{t('error', { message: error.message })}</Typography>} {/* Перевод ошибки */}
            <Grid container spacing={3} justifyContent="center">
                {directories && directories.length > 0 ? (
                    directories.map((dir) => (
                        <Grid item key={dir.id} xs={6} sm={4} md={3} style={{ textAlign: 'center' }}>
                            <Link to={`/directories/${dir.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <FolderIcon style={{ fontSize: 64, color: '#1976d2' }} />
                                <Typography variant="body1" style={{ marginTop: '8px' }}>
                                    {dir.name}
                                </Typography>
                                <Typography variant="caption" style={{ marginTop: '4px', display: 'block' }}>
                                    {dir.item_count || 0} {t('items')} {/* Перевод для "items" */}
                                </Typography>
                            </Link>
                        </Grid>
                    ))
                ) : (
                    !loading && <Typography>{t('noDirectories')}</Typography>
                    )}
            </Grid>
        </Container>
    );
};

export default Directories;
