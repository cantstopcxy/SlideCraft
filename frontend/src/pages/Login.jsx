import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import api from '../api';
import { Container, TextField, Button, Typography, Box, Link, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Login ({ token, onTokenChange }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [loginError, setLoginError] = React.useState('');
  const navigate = useNavigate();

  if (token !== null) {
    return <Navigate to="/dashboard" />;
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (loginError) setLoginError('');
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (loginError) setLoginError('');
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = async (event) => {
    event.preventDefault();

    setLoginError('');

    try {
      const response = await api.post('/admin/auth/login', {
        email,
        password,
      });
      onTokenChange(response.data.token);
      navigate('/dashboard');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setLoginError('Invalid username or password');
      } else {
        alert('An error occurred. Please try again.');
      }
    }
  }

  return (
    <Container
      maxWidth='xs'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}
    >
      <Box
        component='form'
        onSubmit={login}
        sx={{
          textAlign: 'center',
          width: '100%',
          bgcolor: 'white',
          p: 4,
          borderRadius: 3,
          boxShadow: '10px 10px 15px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Typography variant='h4' sx={{ my: 2, fontWeight: 'bold' }}>Login</Typography>
        <TextField
          error={!!loginError}
          margin='normal'
          required
          fullWidth
          label='Email Address'
          autoFocus
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          error={!!loginError}
          helperText={loginError}
          margin='normal'
          required
          fullWidth
          label='Password'
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={togglePasswordVisibility}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Typography><Link href='#' underline='hover'>Forgot password?</Link></Typography>
        <Button
          disableElevation
          type='submit'
          fullWidth
          variant='contained'
          size='large'
          sx={{ textTransform: 'capitalize', fontSize: 18, my: 3 }}
        >
          Login
        </Button>
        <Typography sx={{ mb: 2 }}>
          Not a member yet? <Link href='/register' underline='hover'>Sign Up</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;
