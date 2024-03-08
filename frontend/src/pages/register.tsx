// pages/Register.tsx

import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import Router from 'next/router';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const response = await fetch('http://localhost:8000/api/go/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      // const data = await response.json();
      // localStorage.setItem('token', data.token); // Store the token
      Router.push('/login'); // Redirect to the homepage
    } else {
      alert('Failed to log in');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-4">Register</h2>
      <div className="flex flex-col gap-4">
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleRegister} className="bg-gradient-to-r from-yellow-300 to-yellow-500 backdrop-filter backdrop-blur-md text-black px-4 py-2 rounded-lg">Register</Button>
        <Button  color='danger' onClick={() => Router.push('/login')} >
            Already have an account? Log in
        </Button>
      </div>
    </div>
  );
};

export default Register;
