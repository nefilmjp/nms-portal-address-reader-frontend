import { Box, Center, Image, Text } from '@chakra-ui/react';

interface SourceProps {
  source: string | undefined;
}

export const Source = ({ ...props }: SourceProps) => {
  const { source } = props;

  return (
    <Box mt='4' border='1px' borderRadius='md' borderColor='gray.200'>
      <Center h='64px'>
        {source ? (
          <Image
            src={source}
            alt=''
            width='384'
            height='32'
            objectFit='contain'
            maxWidth='384px'
          />
        ) : (
          <Text color='gray'>Preview source image</Text>
        )}
      </Center>
    </Box>
  );
};
