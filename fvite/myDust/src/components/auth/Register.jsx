import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid, Paper, Tabs, Tab } from '@mui/material';
import { AccountCircle, Lock, Email, DateRange } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { loginUser } from "../../store/actions/authActions/loginAction.js";
import { registerUser } from "../../store/actions/authActions/authActions.js";
import { useNavigate } from 'react-router-dom';
import '/src/assets/AuthForm.css';

const AuthForm = () => {
    const [tab, setTab] = useState(0); // 0 - Login, 1 - Register, 2 - Verify Code
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [registerData, setRegisterData] = useState({ username: '', password: '', email: '', date_of_birth: '' });
    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState([]); // Ошибки теперь будут массивом
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleTabChange = (event, newValue) => setTab(newValue);

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleRegisterChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async () => {
        try {
            await dispatch(loginUser(loginData.username, loginData.password));
            localStorage.setItem('user', JSON.stringify(loginData.username));

            navigate('/directories');
        } catch (error) {
            setError([error.message || 'Login failed.']); // Сохраняем ошибку в массив
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault(); // Останавливаем стандартное поведение формы
        try {
            // Отправляем запрос на регистрацию
            const response = await dispatch(registerUser(registerData));
            if (response.error) {
                console.log(response.error);
                const errorMessages = Object.values(response.error).flat(); // Извлекаем все ошибки из объекта
                setError(errorMessages);
                return;
            }
            // Если нет ошибок, сохраняем email в localStorage
            localStorage.setItem('email', registerData.email);
            // Переход на вкладку 2
            setTab(2);
        } catch (error) {
            console.log('Ошибка при регистрации:', error);
            setError(['Что-то пошло не так. Попробуйте еще раз.']); // Общая ошибка
        }
    };

    const handleVerificationCodeChange = async () => {
        const emailFromStorage = localStorage.getItem('email');
        const data = { email: emailFromStorage };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/auth/resend-code/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (result.message) {
                setError([result.message]);
            } else {
                setSuccessMessage('Verification code sent successfully.');
                setError([]);
            }
        } catch (error) {
            setError(['Verification failed. Please try again.']);
            setSuccessMessage('');
        }
    };

    const handleVerificationSubmit = async () => {
        const emailFromStorage = localStorage.getItem('email');
        const data = { email: emailFromStorage, code: verificationCode };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/auth/verify-code/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (result.message) {
                setError([result.message]);
                setSuccessMessage('');
            } else {
                setSuccessMessage('You have successfully verified your account.');
                setTab(0)
                setError([]);
                setTimeout(() => {
                    setTab(0);
                }, 2000);
            }
        } catch (error) {
            setError(['Verification failed. Please try again.']);
            setSuccessMessage('');
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" className="auth-container">
            <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
                <Typography variant="h4" style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
                    <span style={{ background: 'linear-gradient(to right, wheat, pink)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                        DustBase - облачное хранение данных
                    </span>
                </Typography>
                <img src={'src/assets/icons8-частичная-облачность-ночью-100.png'} alt="Cloud Icon" style={{ display: 'block', margin: '0 auto', width: '100px', height: '100px' }} />
            </Grid>
            <Grid item xs={12} sm={8} md={4}>
                <Paper elevation={3} style={{ padding: '2rem', borderRadius: '40px' }}>
                    <Tabs value={tab} onChange={handleTabChange} indicatorColor="primary" textColor="primary" variant="fullWidth">
                        <Tab label="Login" />
                        <Tab label="Register" />
                        <Tab label="Verify Code" />
                    </Tabs>

                    {tab === 0 && (
                        <Box mt={3}>
                            <Typography variant="h5" gutterBottom>Login</Typography>
                            <Box display="flex" alignItems="center" marginBottom="1rem">
                                <AccountCircle style={{ marginRight: '0.5rem' }} />
                                <TextField fullWidth label="Username" name="username" value={loginData.username} onChange={handleLoginChange} />
                            </Box>
                            <Box display="flex" alignItems="center" marginBottom="1rem">
                                <Lock style={{ marginRight: '0.5rem' }} />
                                <TextField fullWidth label="Password" name="password" type="password" value={loginData.password} onChange={handleLoginChange} />
                            </Box>
                            {error && error.map((err, index) => <Typography key={index} color="error" variant="body1" gutterBottom>{err}</Typography>)}
                            <Button fullWidth variant="contained" color="primary" onClick={handleLoginSubmit} style={{ marginTop: '1rem' }}>
                                Login
                            </Button>
                        </Box>
                    )}
                    {tab === 1 && (
                        <Box mt={3}>
                            <Typography variant="h5" gutterBottom>Register</Typography>
                            <Box display="flex" alignItems="center" marginBottom="1rem">
                                <AccountCircle style={{ marginRight: '0.5rem' }} />
                                <TextField fullWidth label="Username" name="username" value={registerData.username} onChange={handleRegisterChange} />
                            </Box>
                            <Box display="flex" alignItems="center" marginBottom="1rem">
                                <Email style={{ marginRight: '0.5rem' }} />
                                <TextField fullWidth label="Email" name="email" type="email" value={registerData.email} onChange={handleRegisterChange} />
                            </Box>
                            <Box display="flex" alignItems="center" marginBottom="1rem">
                                <Lock style={{ marginRight: '0.5rem' }} />
                                <TextField fullWidth label="Password" name="password" type="password" value={registerData.password} onChange={handleRegisterChange} />
                            </Box>
                            <Box display="flex" alignItems="center" marginBottom="1rem">
                                <DateRange style={{ marginRight: '0.5rem' }} />
                                <TextField fullWidth label="Date of Birth" name="date_of_birth" type="date" value={registerData.date_of_birth} onChange={handleRegisterChange} InputLabelProps={{ shrink: true }} />
                            </Box>
                            {error && error.map((err, index) => <Typography key={index} color="error" variant="body1" gutterBottom>{err}</Typography>)}
                            <Button fullWidth variant="contained" color="primary" onClick={handleRegisterSubmit} style={{ marginTop: '1rem' }}>
                                Register
                            </Button>
                        </Box>
                    )}
                    {tab === 2 && (
                        <Box mt={3}>
                            <Typography variant="h5" gutterBottom>Verify Code</Typography>
                            <Box display="flex" alignItems="center" marginBottom="1rem">
                                <TextField fullWidth label="Verification Code" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
                            </Box>
                            {successMessage && (
                                <Typography color="green" variant="body1" gutterBottom>
                                    {successMessage}
                                </Typography>
                            )}
                            {error && error.map((err, index) => <Typography key={index} color="error" variant="body1" gutterBottom>{err}</Typography>)}
                            <Button fullWidth variant="contained" color="primary" onClick={handleVerificationSubmit} style={{ marginBottom: '1rem' }}>
                                Submit Code
                            </Button>
                            <Button fullWidth variant="text" color="primary" onClick={handleVerificationCodeChange}>
                                Resend Code
                            </Button>
                        </Box>
                    )}
                </Paper>
            </Grid>
        </Grid>
    );
};

export default AuthForm;
