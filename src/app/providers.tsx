'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';

import { nmsparTheme } from '@/config/nmsparTheme';

import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={nmsparTheme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
