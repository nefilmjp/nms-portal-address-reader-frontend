import {
  Box,
  Code,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';

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
      <Text mt='4'>The portal address reader in the screenshot.</Text>
      <Box
        borderRadius='lg'
        borderWidth='1px'
        fontSize='sm'
        mt='4'
        paddingBlock='2'
        paddingInline='4'
      >
        <UnorderedList>
          <ListItem>
            Supported formats: <Code>JPEG</Code> , <Code>PNG</Code>
          </ListItem>
          <ListItem mt='0.5'>
            Supported resolutions:
            <br />
            <Code>1920x1080</Code> , <Code>1920x1200</Code> ,{' '}
            <Code>1920x1440</Code> , <Code>2048x1536</Code> ,{' '}
            <Code>2560x1440</Code> , <Code>2560x1600</Code> ,{' '}
            <Code>3840x2160</Code> , <Code>1280x720</Code>
          </ListItem>
          <ListItem mt='0.5'>
            To read from a PS4 or Switch screenshot, change the recognition
            profile to <Code>PS4, Switch</Code> in the settings (Accuracy is not
            good)
          </ListItem>
        </UnorderedList>
      </Box>
    </>
  );
};
