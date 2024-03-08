// pages/login.tsx
import Link from 'next/link';
import {TextField, Grid, Typography } from '@mui/material';
import { Button } from '@nextui-org/react';

const LoginPage = () => {
  return (
    <Grid container direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <form>
        <TextField label="Username" type="text" required fullWidth margin="normal" />
        <TextField label="Password" type="password" required fullWidth margin="normal" />
        <Button type="submit" color="danger" fullWidth style={{ marginTop: '1rem' }}>
          Login
        </Button>
      </form>
      <Typography style={{ marginTop: '1rem' }}>
        Don't have an account? <Link href="/Register">Register</Link>
      </Typography>
    </Grid>
  );
};

export default LoginPage;