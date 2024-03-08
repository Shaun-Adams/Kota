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
      Router.push('/login'); 
    } else {
      alert('Failed to register');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen border-2 gap-4 border-gray-300 p-4 rounded">
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
        <Button color='danger' onClick={handleRegister}>Register</Button>
        <Button className="bg-gradient-to-r from-yellow-300 to-yellow-500 backdrop-filter backdrop-blur-md text-black px-4 py-2 rounded-lg"  onClick={() => Router.push('/login')}>
            Already have an account? Log In
        </Button>
      </div>
    </div>
  );
};

export default Register;
