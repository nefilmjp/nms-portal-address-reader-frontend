import {
  Button,
  Code,
  Icon,
  IconButton,
  Link,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { FaCircleInfo } from 'react-icons/fa6';

export const FooterAbout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton aria-label='About' icon={<FaCircleInfo />} onClick={onOpen} />

      <Modal
        isOpen={isOpen}
        size='xl'
        onClose={onClose}
        // scrollBehavior='inside'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>About</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Spec</Text>
            <UnorderedList>
              <ListItem ml='4'>
                Supported formats: <Code>JPEG</Code> , <Code>PNG</Code>
              </ListItem>
              <ListItem ml='4'>
                Supported resolutions:
                <UnorderedList>
                  <ListItem>
                    <Code>1920x1080</Code> , <Code>1920x1200</Code> ,{' '}
                    <Code>1920x1440</Code> , <Code>2048x1536</Code> ,{' '}
                    <Code>2560x1440</Code> , <Code>2560x1600</Code> ,{' '}
                    <Code>3840x2160</Code>
                  </ListItem>
                  <ListItem>
                    Currently, other sizes will reject due to limitations of
                    accuracy
                  </ListItem>
                </UnorderedList>
              </ListItem>
              <ListItem ml='4'>
                Only cropped glyphs is sent to the server
              </ListItem>
              <ListItem ml='4'>
                When downloading an image from Twitter, download the original
                size automatically
                <UnorderedList>
                  <ListItem ml='4'>
                    The app sets <Code>name</Code> parameter to{' '}
                    <Code>orig</Code>
                  </ListItem>
                </UnorderedList>
              </ListItem>
              <ListItem ml='4'>Settings can be saved (per browser)</ListItem>
              <ListItem ml='4'>
                Some browsers have limited clipboard functionality
              </ListItem>
              <ListItem ml='4'>
                Some sites/services may reject downloads by the app
              </ListItem>
            </UnorderedList>
            <Text mt='4'>Contributing</Text>
            <Text ml='4'>
              Reports, requests, and PRs are accepted on{' '}
              <Link
                href='https://github.com/nefilmjp/nms-portal-address-reader-frontend#readme'
                isExternal={true}
                color='blue.400'
              >
                GitHub
                <Icon
                  as={FaExternalLinkAlt}
                  ml='0.2em'
                  mr='0.2em'
                  w='0.8em'
                  h='0.8em'
                  verticalAlign='baseline'
                />
              </Link>
            </Text>
            <Text mt='4'>Author</Text>
            <Text ml='4'>
              Nefilm (
              <Link
                href='https://twitter.com/nefilm_rc'
                isExternal={true}
                color='blue.400'
              >
                @nefilm_rc
                <Icon
                  as={FaExternalLinkAlt}
                  ml='0.2em'
                  mr='0.2em'
                  w='0.8em'
                  h='0.8em'
                  verticalAlign='baseline'
                />
              </Link>
              )
            </Text>
            <Text mt='4'>Special thanks</Text>
            <Text ml='4'>
              No Man&#39;s Sky Discord Server [PC/CS] Members (Japanese
              community,{' '}
              <Link
                href='https://disboard.org/ja/server/735105471471419463'
                isExternal={true}
                color='blue.400'
              >
                Disboard
                <Icon
                  as={FaExternalLinkAlt}
                  ml='0.2em'
                  mr='0.2em'
                  w='0.8em'
                  h='0.8em'
                  verticalAlign='baseline'
                />
              </Link>
              )
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button variant='outline' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
