import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import '../styles/main.css';
import api from '../api';

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
    <div className="auth-container">
      <header>Login</header>
      <form className="auth-form">
        <div className="field email">
          <div className="input-area">
            <input type="text" onChange={e => setEmail(e.target.value)} value = {email} placeholder="Email" id="login-email" />
          </div>
        </div>
        <div className="field password">
          <div className="input-area">
            <input type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="Password" id="login-password" />
          </div>
        </div>
        <div className="pass-txt"><a>Forgot password?</a></div>
        <button onClick={login} id="login-btn">Login</button>
      </form>
      <div className="sign-txt">Not a member yet? <a href='/register'>Sign Up</a></div>
    </div>
  );
}

export default Login;
