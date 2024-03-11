import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import Router from 'next/router';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const response = await fetch('http://localhost:8000/api/go/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      Router.push('/');
    } else {
      alert('Failed to log in');
    }
  };

  return (
  <div className="flex flex-col items-center justify-center h-screen gap-4 border-2 border-gray-300 p-4 rounded">
    <h2 className="text-3xl font-bold mb-4">Log In</h2>
    <div className="flex flex-col gap-4 ">
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
      <Button onClick={handleLogin} color='danger'>Log in</Button>
      <Button className="bg-gradient-to-r from-yellow-300 to-yellow-500 backdrop-filter backdrop-blur-md text-black px-4 py-2 rounded-lg" onClick={() => Router.push('/register')}>
            Dont have an account? Register
        </Button>
    </div>
  </div>
);
};

export default Login;
