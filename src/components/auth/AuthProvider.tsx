"use client"
import '@rainbow-me/rainbowkit/styles.css';
import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  base,
  baseSepolia
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { APP_NAME, WALLETCONNECT_KEY, SATELITE_ID } from '@/utils/env';
import { initJuno } from '@junobuild/core-peer';
import { useEffect } from 'react';

const config = getDefaultConfig({
  appName: APP_NAME,
  projectId: WALLETCONNECT_KEY,
  chains: [base, baseSepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    (async () =>
      await initJuno({
        satelliteId: SATELITE_ID,
      }))();
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
        {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default AuthProvider