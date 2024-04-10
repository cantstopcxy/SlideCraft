import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import validator from 'email-validator';
import api from '../api';
import { Container, TextField, Button, Typography, Box, Link } from '@mui/material';

function Register ({ token, onTokenChange }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');
  const [name, setName] = React.useState('');
  const navigate = useNavigate();

  if (token !== null) {
    return <Navigate to="/dashboard" />
  }

  const register = async () => {
    event.preventDefault();

    if (!validator.validate(email)) {
      alert('invalid email');
      return;
    }

    if (password !== passwordConfirm) {
      alert('passwords do not match');
      return;
    }

    try {
      const response = await api.post('/admin/auth/register', {
        email,
        password,
        name
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
        <Typography variant='h4' sx={{ my: 2, fontWeight: 'bold' }}>Sign Up</Typography>
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
            label='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <TextField
            margin='normal'
            required
            fullWidth
            label='Confirm Password'
            type='password'
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <Button
            disableElevation
            type='submit'
            fullWidth
            variant='contained'
            size='large'
            sx={{ textTransform: 'capitalize', fontSize: 18, my: 3 }}
            onClick={register}
          >
            Create Account
          </Button>
          <Typography sx={{ mb: 2 }}>
            Already have an account? <Link href='/login' underline='hover'>Log In</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
