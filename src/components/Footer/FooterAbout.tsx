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
  Tooltip,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { FaCircleInfo } from 'react-icons/fa6';

export const FooterAbout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Tooltip hasArrow label='About this app' placement='top-end'>
        <IconButton
          aria-label='About'
          icon={<FaCircleInfo />}
          onClick={onOpen}
        />
      </Tooltip>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size='xl'
        // scrollBehavior='inside'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>About</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Spec and limitations</Text>
            <UnorderedList mt='1'>
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
                    <Code>3840x2160</Code> , <Code>1280x720</Code>
                  </ListItem>
                  <ListItem>
                    Currently, due to the limitation of accuracy, other sizes
                    will be rejected
                  </ListItem>
                </UnorderedList>
              </ListItem>
              <ListItem ml='4'>
                To read from a PS4 or Switch screenshot, change the recognition
                profile to <Code>PS4, Switch</Code> in the settings (Accuracy is
                not good)
              </ListItem>
              <ListItem ml='4'>
                Send only the cropped glyphs to the server
              </ListItem>
              <ListItem ml='4'>
                When downloading a screenshot from Twitter, the original size is
                downloaded automatically
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
                Some sites/services may reject downloads of app
              </ListItem>
            </UnorderedList>
            <Text mt='4'>Contributing</Text>
            <Text ml='4' mt='1'>
              Reports, requests, and PRs are accepted on{' '}
              <Link
                color='blue.400'
                href='https://github.com/nefilmjp/nms-portal-address-reader-frontend#readme'
                isExternal={true}
              >
                GitHub
                <Icon
                  as={FaExternalLinkAlt}
                  h='0.8em'
                  ml='0.2em'
                  mr='0.2em'
                  verticalAlign='baseline'
                  w='0.8em'
                />
              </Link>
            </Text>
            <Text mt='4'>Author</Text>
            <Text ml='4' mt='1'>
              Nefilm (
              <Link
                color='blue.400'
                href='https://twitter.com/nefilm_rc'
                isExternal={true}
              >
                @nefilm_rc
                <Icon
                  as={FaExternalLinkAlt}
                  h='0.8em'
                  ml='0.2em'
                  mr='0.2em'
                  verticalAlign='baseline'
                  w='0.8em'
                />
              </Link>
              )
            </Text>
            <Text mt='4'>Special thanks</Text>
            <Text ml='4' mt='1'>
              No Man&#39;s Sky Discord Server [PC/CS] Members (Japanese
              community,{' '}
              <Link
                color='blue.400'
                href='https://disboard.org/ja/server/735105471471419463'
                isExternal={true}
              >
                Disboard
                <Icon
                  as={FaExternalLinkAlt}
                  h='0.8em'
                  ml='0.2em'
                  mr='0.2em'
                  verticalAlign='baseline'
                  w='0.8em'
                />
              </Link>
              )
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} variant='outline'>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
