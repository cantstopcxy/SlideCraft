import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import validator from 'email-validator';
import '../styles/main.css';
import api from '../api';

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
    <div className='centered-content'>
      <div className="auth-container">
        <header>Sign Up</header>
        <form className="auth-form">
          <div className="field email">
            <div className="input-area">
              <input type="text" onChange={e => setEmail(e.target.value)} value={email} placeholder="Email" id="register-email" />
            </div>
          </div>
          <div className="field name">
            <div className="input-area">
              <input type="text" onChange={e => setName(e.target.value)} value={name} placeholder="Name" id="register-name" />
            </div>
          </div>
          <div className="field password">
            <div className="input-area">
              <input type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="Password" id="register-password" />
            </div>
          </div>
          <div className="field password">
            <div className="input-area">
              <input type="password" onChange={e => setPasswordConfirm(e.target.value)} value={passwordConfirm} placeholder="Confirm Password" id="password-confirm" />
            </div>
          </div>
          <button onClick={register} id="register-btn">Create Account</button>
        </form>
        <div className="sign-txt">Already have an account? <a href='/login'>Log In</a></div>
      </div>
    </div>
  );
}

export default Register;
