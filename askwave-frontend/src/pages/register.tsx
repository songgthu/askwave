import React, { useState, FormEvent } from 'react';
import Logo from '../images/AskWaveLogo.png';
import '../login/login.css';
import Button from '@mui/material/Button';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.status === 201) {
        await response.json();
        alert('User successfully registered!');
      } else if (response.status === 422) {
        await response.json();
        alert('User already exists');
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Redirect or perform other actions after successful registration
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle error, show a message, etc.
    };
  };
  
  return (
    <div className="Register">
      <div className="LogoContainer">
        <img src={Logo} className="Logo" style={{ width: '200px', height: '200px' }} alt="AskWave logo" />
      </div>
      <form onSubmit={handleRegister}>
    <h2>Register</h2>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          pattern="^.{5,30}$"
          title="Username must contain in between 5 and 30 characters."
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
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
          title="Password must contain at least one number, one uppercase letter, one lowercase letter, and at least 8 characters"
          required
        />
      </div>
      <div>
        <Button type="submit" variant="contained">Register</Button>
      </div>
    </form>
      
    </div>
  );
}

export default Register;
