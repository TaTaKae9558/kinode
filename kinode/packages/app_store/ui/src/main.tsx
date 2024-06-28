import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider, http } from 'wagmi';
import {
  optimism,
  anvil,
  mainnet
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";


import '@unocss/reset/tailwind.css'
import 'uno.css'
import './index.css'

const config = getDefaultConfig({
  appName: 'Kinode App Store',
  projectId: 'YOUR_PROJECT_ID', // apparently need project_Id if using wallet_connect
  chains: [anvil], // change back to OP main once ready
  ssr: false, // If your dApp uses server side rendering (SSR)
  transports: {
    [anvil.id]: http(),
    [optimism.id]: http(),
    [mainnet.id]: http(),
  }
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
