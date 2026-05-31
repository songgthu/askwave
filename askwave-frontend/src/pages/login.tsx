import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/AskWaveLogo.png';
import '../login/login.css';
import Button from '@mui/material/Button';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.status === 200) {
        localStorage.setItem('isLoggedIn', 'true');
        alert('Logged in successfully');
        navigate('/home', { state: { username } });

      } else if (response.status === 401) {
        alert('Login failed: Invalid username or password.');
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="Login">
    <div className="LogoContainer">
      <img src={Logo} className="Logo" style={{ width: '200px', height: '200px' }} alt="Logo" />
    </div>
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <Button type="submit" variant="contained"> Login </Button>
      </div>
    </form>
  </div>
    
  );
}

export default Login;
