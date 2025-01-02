import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik } from 'formik';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {
    TextField,
    Button,
    Container,
    Paper,
    Typography,
    Box
} from '@mui/material';

const url = import.meta.env.VITE_BACKEND_URL;

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f5f5'
    },
    paper: {
        padding: '32px',
        maxWidth: '400px',
        width: '100%'
    },
    title: {
        marginBottom: '8px',
        textAlign: 'center'
    },
    subtitle: {
        marginBottom: '24px',
        textAlign: 'center',
        color: '#666'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    submitButton: {
        marginTop: '16px'
    },
    loginText: {
        marginTop: '24px',
        textAlign: 'center',
        color: '#666'
    },
    loginLink: {
        color: '#4caf50',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    }
};

const SignUp = () => {
    const navigate = useNavigate();

    return (
        <Container sx={styles.container}>
            <Paper elevation={3} sx={styles.paper}>
                <Typography variant="h4" sx={styles.title}>
                    Sign Up
                </Typography>
                <Typography variant="h6" sx={styles.subtitle}>
                    Notes App
                </Typography>

                <Formik
                    initialValues={{ username: '', email: '', password: '' }}
                    validate={(values) => {
                        const errors = {};
                        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
                        if (!values.username) {
                            errors.username = 'Required';
                        } else if (values.username.length <= 2 || values.username.length >= 20) {
                            errors.username = 'Must be more than 2 characters and less than 20 characters';
                        }
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = 'Invalid email address';
                        }
                        if (!values.password) {
                            errors.password = 'Required';
                        } else if (!passwordRegex.test(values.password)) {
                            errors.password =
                                'Password must be at least 6 characters, include at least one special character and one number';
                        }
                        return errors;
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            const { data } = await axios.post(
                                `${url}/signup`,
                                {
                                    email: values.email,
                                    password: values.password,
                                    username: values.username,
                                },
                                { withCredentials: true }
                            );
                            const { success, message, token } = data;
                            Cookies.set('token', token, { expires: 1, secure: true, sameSite: 'None' });
                            if (success) {
                                Swal.fire({
                                    title: 'Good Job!',
                                    text: 'Signup successful! Welcome to Notes',
                                    icon: 'success',
                                });
                                setTimeout(() => {
                                    navigate('/');
                                }, 1000);
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: message,
                                });
                            }
                        } catch (error) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: error.response?.data?.message || 'An error occurred. Please try again later.',
                            });
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit} style={styles.form}>
                            <TextField
                                fullWidth
                                id="username"
                                name="username"
                                label="Username"
                                variant="outlined"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.username && Boolean(errors.username)}
                                helperText={touched.username && errors.username}
                            />

                            <TextField
                                fullWidth
                                id="email"
                                name="email"
                                label="Email"
                                variant="outlined"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                            />

                            <TextField
                                fullWidth
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                variant="outlined"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                sx={styles.submitButton}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </Button>
                        </form>
                    )}
                </Formik>

                <Box sx={styles.loginText}>
                    <Typography variant="body1">
                        Already a user?{' '}
                        <a href="/login" style={styles.loginLink}>
                            Login here
                        </a>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default SignUp;