import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, CircularProgress, Container, List, ListItem, ListItemText, Button, Stack, ListItemIcon } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useTranslation } from 'react-i18next'; // Импорт хука для перевода

const AccessPage = () => {
    const { token } = useParams();
    const [directory, setDirectory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t } = useTranslation(); // Хук для получения функции перевода

    useEffect(() => {
        const fetchDirectory = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/v1/app/access-links/${token}/`);
                setDirectory(response.data);
                console.log(response.data);
            } catch (err) {
                setError(err.response?.data?.detail || t('error')); // Используем перевод для ошибки
            } finally {
                setLoading(false);
            }
        };

        fetchDirectory();
    }, [token, t]); // Добавили t в зависимости

    if (loading) {
        return <CircularProgress style={{ display: 'block', margin: '20px auto' }} />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>{directory.name}</Typography> {/* Название директории */}

            {/* Если есть файлы, выводим их в списке */}
            {directory.files && directory.files.length > 0 ? (
                <List>
                    {directory.files.map((file) => (
                        <ListItem key={file.id}>
                            <ListItemIcon>
                                <InsertDriveFileIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={file.name} secondary={`Size: ${(file.file_size / 1024).toFixed(2)} KB`} />
                            <Stack direction="row" spacing={1}>
                                {/* Кнопка для просмотра */}
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    href={file.file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {t('view')} {/* Перевод для кнопки "Просмотреть" */}
                                </Button>
                                {/* Кнопка для скачивания */}
                                <a
                                    href={`/download/${file.file}`}
                                    download={`${file.name}.${file.file.split('.').pop()}`}
                                >
                                    {t('download')} {/* Перевод для кнопки "Скачать" */}
                                </a>
                            </Stack>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography variant="body1">{t('noFiles')}</Typography>
                )}
        </Container>
    );
};

export default AccessPage;
