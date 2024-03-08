// _app.js or _app.tsx

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { NextUIProvider } from '@nextui-org/react';
import Sidebar from '@/components/Sidebar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow">
          <Component {...pageProps} />
        </div>
      </div>
    </NextUIProvider>
  );
}
