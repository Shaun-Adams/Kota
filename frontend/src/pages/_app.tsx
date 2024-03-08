// _app.tsx

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { NextUIProvider } from '@nextui-org/react';
import Sidebar from '@/components/Sidebar';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  useEffect(() => {
    const allowedPaths = ['/login', '/register'];
    const token = localStorage.getItem('token');
    if (!token && !allowedPaths.includes(router.pathname)) {
      router.push('/login'); // Redirect to login if no token and not on an allowed path
    }
  }, [router]);

  // Conditionally render the sidebar based on the presence of a token
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  return (
    <NextUIProvider>
      <div className="flex">
        {token && <Sidebar />}
        <div className={`flex-grow ${!token ? 'w-full' : ''}`}>
          <Component {...pageProps} />
        </div>
      </div>
    </NextUIProvider>
  );
}
