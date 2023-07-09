import { Box, Spinner } from '@chakra-ui/react';

export const Loading = () => {
  return (
    <main>
      <Box
        w='100%'
        h='100dvh'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </Box>
    </main>
  );
};
