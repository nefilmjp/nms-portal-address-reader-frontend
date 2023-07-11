'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import type { ReactNode } from 'react';

const theme = {
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
};

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={extendTheme(theme)}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
