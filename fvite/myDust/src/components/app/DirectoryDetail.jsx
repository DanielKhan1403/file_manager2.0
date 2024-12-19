import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDirectoryDetail } from '/src/store/actions/appActions/directoryDetailAction.js';
import {
    CircularProgress,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Container,
    Button,
    Stack,
} from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useTranslation } from 'react-i18next'; // Импорт хука для перевода

const DirectoryDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { directory, loading, error } = useSelector((state) => state.directoryDetail);
    const { t } = useTranslation(); // Хук для получения функции перевода

    useEffect(() => {
        dispatch(getDirectoryDetail(id));
    }, [dispatch, id]);

    return (
        <Container maxWidth="md" style={{ marginTop: '20px' }}>
            {loading && <CircularProgress style={{ display: 'block', margin: '20px auto' }} />}
            {error && <Typography color="error">{t('error', { message: error.detail })}</Typography>} {/* Перевод ошибки */}
            {directory && (
                <>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {directory.name}
                    </Typography>
                    <List>
                        {directory.files.map((file) => (
                            <ListItem key={file.id}>
                                <ListItemIcon>
                                    <InsertDriveFileIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary={file.name}
                                    secondary={`${t('size')}: ${(file.file_size / 1024).toFixed(2)} KB`}
                                />
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
                </>
            )}
        </Container>
    );
};

export default DirectoryDetail;
