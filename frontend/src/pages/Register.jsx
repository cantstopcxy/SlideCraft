import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import validator from 'email-validator';
import api from '../api';
import { Container, TextField, Button, Typography, Paper, Link } from '@mui/material';

function Register ({ token, onTokenChange }) {
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [name, setName] = React.useState('');
  const navigate = useNavigate();

  if (token !== null) {
    return <Navigate to="/dashboard" />
  }

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (validator.validate(value)) {
      setEmailError('');
    } else {
      setEmailError('Invalid email');
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError('');
  };

  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
    if (passwordError) setPasswordError('');
  };

  const register = async (event) => {
    event.preventDefault();

    if (!validator.validate(email)) {
      setEmailError('Invalid email');
      return;
    }

    if (password !== passwordConfirm) {
      setPasswordError('Passwords do not match');
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
      if (err.response && err.response.status === 400) {
        setEmailError('This email is already registered')
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
      <Paper
        component='form'
        onSubmit={register}
        elevation={18}
        sx={{
          textAlign: 'center',
          bgcolor: 'white',
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant='h4' sx={{ my: 2, fontWeight: 'bold' }}>Sign Up</Typography>
        <TextField
          error={!!emailError}
          helperText={emailError}
          margin='normal'
          required
          fullWidth
          label='Email Address'
          autoFocus
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          label='Name'
          value={name}
          onChange={handleNameChange}
        />
        <TextField
          error={!!passwordError}
          margin='normal'
          required
          fullWidth
          label='Password'
          type='password'
          value={password}
          onChange={handlePasswordChange}
        />
        <TextField
          error={!!passwordError}
          helperText={passwordError}
          margin='normal'
          required
          fullWidth
          label='Confirm Password'
          type='password'
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange}
        />
        <Button
          disableElevation
          type='submit'
          fullWidth
          variant='contained'
          size='large'
          sx={{ textTransform: 'capitalize', fontSize: 18, my: 3 }}
        >
          Create Account
        </Button>
        <Typography sx={{ mb: 2 }}>
          Already have an account? <Link href='/login' underline='hover'>Log In</Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Register;
