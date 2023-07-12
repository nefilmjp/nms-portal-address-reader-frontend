import { Box, Heading, Text } from '@chakra-ui/react';

export const Header = () => {
  return (
    <>
      <Heading className='ff-geo' fontSize='2xl'>
        <Text as='span' whiteSpace='nowrap'>
          No Man&#39;s Sky
        </Text>{' '}
        <Text as='span' whiteSpace='nowrap'>
          Portal Address Reader
        </Text>
      </Heading>
      <Text mt='4'>Recognize portal glyphs in the screenshot.</Text>
      <Box mt='4' borderRadius='lg' borderWidth='1px' p='3' fontSize='sm'>
        <Text ml='1em' textIndent='-1em'>
          Supported formats:
          <br />
          JPEG, PNG
        </Text>
        <Text mt='0.5' ml='1em' textIndent='-1em'>
          Supported resolutions:
          <br />
          1920x1080, 1920x1200, 1920x1440, 2048x1536, 2560x1440, 2560x1600,
          3840x2160
        </Text>
      </Box>
    </>
  );
};
