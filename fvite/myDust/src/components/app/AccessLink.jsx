import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAccessLink, getAccessLinks, disableAccessLink } from '/src/store/actions/appActions/AccessLinkAction.js';
import { getDirectories } from "../../store/actions/appActions/directoriesAction.js";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, CircularProgress, IconButton, Snackbar } from '@mui/material';
import { CopyAll, Delete } from '@mui/icons-material';
import { Alert } from '@mui/material';
import { useTranslation } from 'react-i18next'; // Импортируем хук для локализации
import { useTheme } from '@mui/material/styles';  // Импортируем хук для доступа к текущей теме

const AccessLinkComponent = () => {
    const { t } = useTranslation(); // Инициализация хука перевода
    const dispatch = useDispatch();
    const { loading, accessLinks, error } = useSelector((state) => state.accessLink);
    const { directories } = useSelector((state) => state.directories);

    const [formData, setFormData] = useState({
        name: '',
        parentDirectory: '',
        isPublic: true,
        tokenType: 'view',
        expirationDate: '',
    });

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const theme = useTheme();  // Получаем текущую тему

    useEffect(() => {
        dispatch(getAccessLinks());
        dispatch(getDirectories());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            directory_id: formData.parentDirectory,
            token_type: formData.tokenType,
            expiration_date: formData.expirationDate,
        };
        dispatch(createAccessLink(data));
    };

    const handleDisable = (id) => {
        dispatch(disableAccessLink(id))
            .then(() => {
                dispatch(getAccessLinks());
            })
            .catch(error => {
                console.error("Ошибка при деактивации ссылки:", error);
            });
    };

    const handleCopy = (url) => {
        navigator.clipboard.writeText(url)
            .then(() => {
                setSnackbarMessage(t('linkCopied')); // Используем перевод
                setOpenSnackbar(true);
            })
            .catch(err => {
                console.error('Ошибка при копировании:', err);
            });
    };

    return (
        <div style={{
            background: theme.palette.background.default,  // Используем текущую тему для фона
            padding: '20px',
            borderRadius: '8px',
            maxHeight: '100vh',
            overflowY: 'auto'
        }}>
            <h2 style={{ textAlign: 'center', color: theme.palette.text.primary }}>{t('createLink')}</h2> {/* Используем текущую тему для текста */}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '16px' }}>
                    <TextField
                        fullWidth
                        label={t('name')}
                        variant="outlined"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <FormControl fullWidth>
                        <InputLabel>{t('parentDirectory')}</InputLabel>
                        <Select
                            value={formData.parentDirectory}
                            onChange={(e) => setFormData({ ...formData, parentDirectory: e.target.value })}
                            label={t('parentDirectory')}
                        >
                            <MenuItem value="">{t('selectDirectory')}</MenuItem>
                            {directories.map((directory) => (
                                <MenuItem key={directory.id} value={directory.id}>
                                    {directory.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData.isPublic}
                                onChange={() => setFormData({ ...formData, isPublic: !formData.isPublic })}
                                color="primary"
                            />
                        }
                        label={t('publicAccess')}
                    />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <FormControl fullWidth>
                        <InputLabel>{t('tokenType')}</InputLabel>
                        <Select
                            value={formData.tokenType}
                            onChange={(e) => setFormData({ ...formData, tokenType: e.target.value })}
                            label={t('tokenType')}
                        >
                            <MenuItem value="view">{t('view')}</MenuItem>
                            <MenuItem value="edit">{t('edit')}</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <TextField
                        fullWidth
                        label={t('expirationDate')}
                        variant="outlined"
                        type="datetime-local"
                        value={formData.expirationDate}
                        onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={loading}
                    fullWidth
                >
                    {loading ? <CircularProgress size={24} /> : t('createLinkButton')}
                </Button>
            </form>

            {error && <Alert severity="error" style={{ marginTop: '16px' }}>{error}</Alert>}

            <h3 style={{ marginTop: '32px', textAlign: 'center' }}>{t('accessLinks')}</h3>
            <ul style={{ padding: '0', listStyleType: 'none' }}>
                {accessLinks.map((link) => (
                    <li key={link.id} style={{ marginBottom: '16px', padding: '10px', backgroundColor: theme.palette.background.paper, borderRadius: '8px' }}>
                        <span>{link.frontend_url} - {link.directory || t('unknownDirectory')} - {link.token_type} - {link.expiration_date}</span>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                            <IconButton
                                color="primary"
                                onClick={() => handleCopy(link.frontend_url)}
                            >
                                <CopyAll />
                            </IconButton>
                            <IconButton
                                color="secondary"
                                onClick={() => handleDisable(link.token)}
                            >
                                <Delete />
                            </IconButton>
                        </div>
                    </li>
                ))}
            </ul>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default AccessLinkComponent;
