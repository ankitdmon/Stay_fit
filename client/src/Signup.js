import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useState, useEffect, useContext } from 'react';
import Alert from './Alert';
import UserContext from './UserContext';
import { useNavigate } from "react-router-dom";

function Signup({ signUp }) {

    const theme = createTheme();
    const { currentUser } = useContext(UserContext);
    const INTIAL_DATA = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    }
    // useEffect(() => {
    //     if (currentUser) {
    //         navigate("/bmr");
    //     }
    // }, [currentUser]);

    const [signUpFormData, setSignUpFromData] = useState(INTIAL_DATA);
    const [formErrors, setFormErrors] = useState([]);

    const navigate = useNavigate();

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setSignUpFromData(data => ({
            ...data,
            [name]: value
        }));
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = await signUp(signUpFormData);
        if (result.success === true) {
            navigate('/bmr');
            setSignUpFromData(INTIAL_DATA);
        }
        else {
            setFormErrors(result.error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{ margin: "auto" }}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        value={signUpFormData.firstName}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        value={signUpFormData.lastName}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                        autoComplete="username"
                                        value={signUpFormData.username}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        value={signUpFormData.password}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={signUpFormData.email}
                                        onChange={handleChange}
                                    />
                                </Grid>

                            </Grid>
                            {formErrors ?
                                formErrors.length
                                    ? <Alert type="danger" messages={formErrors} />
                                    : null
                                : null}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        Already have an account? Log in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );

}

export default Signup;