import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import api from '../api';
import { Container, TextField, Button, Typography, Box, Link } from '@mui/material';

function Login ({ token, onTokenChange }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  if (token !== null) {
    return <Navigate to="/dashboard" />
  }

  const login = async () => {
    event.preventDefault();
    try {
      const response = await api.post('/admin/auth/login', {
        email,
        password,
      });
      onTokenChange(response.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response.data.error);
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
        <Box component='form'>
          <TextField
            margin='normal'
            required
            fullWidth
            label='Email Address'
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            label='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography><Link href='#' underline='hover'>Forgot password?</Link></Typography>
          <Button
            disableElevation
            type='submit'
            fullWidth
            variant='contained'
            size='large'
            sx={{ textTransform: 'capitalize', fontSize: 18, my: 3 }}
            onClick={login}
          >
            Login
          </Button>
        </Box>
        <Typography sx={{ mb: 2 }}>
          Not a member yet? <Link href='/register' underline='hover'>Sign Up</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;
