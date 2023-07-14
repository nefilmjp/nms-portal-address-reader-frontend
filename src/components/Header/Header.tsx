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
        mt='4'
        borderRadius='lg'
        borderWidth='1px'
        paddingBlock='2'
        paddingInline='4'
        fontSize='sm'
      >
        <UnorderedList>
          <ListItem>Supported formats: JPEG, PNG</ListItem>
          <ListItem mt='0.5'>
            Supported resolutions:
            <br />
            1920x1080, 1920x1200, 1920x1440, 2048x1536, 2560x1440, 2560x1600,
            3840x2160, 1280x720
          </ListItem>
          <ListItem mt='0.5'>
            To read from a PS4 or Switch screenshot, change the recognition
            profile to <Code>PS4, Switch</Code> in the settings. (Accuracy is
            not good)
          </ListItem>
        </UnorderedList>
      </Box>
    </>
  );
};
