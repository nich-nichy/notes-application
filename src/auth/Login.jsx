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
    signupText: {
        marginTop: '24px',
        textAlign: 'center',
        color: '#666'
    },
    signupLink: {
        color: '#4caf50',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    }
};

const Login = () => {
    const navigate = useNavigate();

    return (
        <Container sx={styles.container}>
            <Paper elevation={3} sx={styles.paper}>
                <Typography variant="h4" sx={styles.title}>
                    Login
                </Typography>
                <Typography variant="h6" sx={styles.subtitle}>
                    React Note's
                </Typography>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={(values) => {
                        const errors = {};
                        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
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
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        try {
                            const { data } = await axios.post(
                                `${url}/login`,
                                { email: values.email, password: values.password, isAdmin: false },
                                { withCredentials: true }
                            );
                            const { success, token } = data;
                            Cookies.set('token', token, { expires: 1, secure: true, sameSite: 'None' });
                            if (success) {
                                Swal.fire({
                                    title: 'Good Job!',
                                    text: "Hello user",
                                    icon: 'success',
                                });
                                setTimeout(() => navigate('/'), 1000);
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Login failed',
                                    text: 'Please check your email and password and try again',
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
                            resetForm();
                        }
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit} style={styles.form}>
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
                                style={{ backroundColor: "#eab308 !important" }}
                                disabled={isSubmitting}
                                sx={styles.submitButton}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </Button>
                        </form>
                    )}
                </Formik>

                <Box sx={styles.signupText}>
                    <Typography variant="body1">
                        Not a user?{' '}
                        <a href="/signup" style={styles.signupLink}>
                            Join us here
                        </a>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;