// pages/register.tsx
import Link from 'next/link';
import {TextField, Grid, Typography } from '@mui/material';
import { Button } from '@nextui-org/react';

const RegisterPage = () => {
  return (
    <Grid container direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Register
      </Typography>
      <form>
        <TextField label="Username" type="text" required fullWidth margin="normal" />
        <TextField label="Password" type="password" required fullWidth margin="normal" />
        <Button type="submit" color="danger" fullWidth style={{ marginTop: '1rem' }}>
          Register
        </Button>
      </form>
      <Typography style={{ marginTop: '1rem' }}>
        Already have an account? <Link href="/Login">Login</Link>
      </Typography>
    </Grid>
  );
};

export default RegisterPage;