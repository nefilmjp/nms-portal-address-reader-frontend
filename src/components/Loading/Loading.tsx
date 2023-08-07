import { Box, Spinner } from '@chakra-ui/react';

export const Loading = () => {
  return (
    <main>
      <Box
        alignItems='center'
        display='flex'
        h='100dvh'
        justifyContent='center'
        w='100%'
      >
        <Spinner
          color='blue.500'
          emptyColor='gray.200'
          size='xl'
          speed='0.65s'
          thickness='4px'
        />
      </Box>
    </main>
  );
};
