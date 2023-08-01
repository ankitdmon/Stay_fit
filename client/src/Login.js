import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Alert from './Alert';
import UserContext from './UserContext';

function Login({ login }) {
    const theme = createTheme();
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);
    const [formErrors, setFormErrors] = useState([]);
    const [loginformData, setLoginFormData] = useState({
        username: "",
        password: ""
    });
    // useEffect(() => {
    //     if (currentUser) {
    //         navigate("/bmr");
    //     }
    // }, [currentUser]);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setLoginFormData(data => ({
            ...data,
            [name]: value
        }));
    }


    async function handleSubmit(event) {
        event.preventDefault();
        console.log(loginformData);
        let result = await login(loginformData);
        if (result.success === true) {
            navigate("/bmr");
        }
        else {
            setFormErrors(result.error);
        }

    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container sx={{ height: '100vh' }}>
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
                            Log in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={loginformData.username}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={loginformData.password}
                                onChange={handleChange}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
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
                                Log In
                            </Button>

                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>

                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default Login;