import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { NextUIProvider } from '@nextui-org/react';
import Sidebar from '@/components/Sidebar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);

    const allowedPaths = ['/login', '/register'];
    if (!storedToken && !allowedPaths.includes(router.pathname)) {
      router.push('/login'); 
    }
  }, [router]);

  return (
    <NextUIProvider>
      <div className="flex">
        {token && <Sidebar />}
        <div className={`flex-grow ${!token ? 'w-full' : ''}`}>
          {router.isReady && token !== undefined ? <Component {...pageProps} /> : null}
        </div>
      </div>
    </NextUIProvider>
  );
}
