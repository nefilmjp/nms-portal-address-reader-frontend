import {
  Box,
  Button,
  Icon,
  IconButton,
  Link,
  List,
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>About</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Author</Text>
            <Text ml='4'>
              Nefilm (
              <Link
                href='https://twitter.com/nefilm_rc'
                isExternal={true}
                color='blue.600'
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
            <Text mt='4'>Contributing</Text>
            <Text ml='4'>
              Pull Requests are accepted on{' '}
              <Link
                href='https://github.com/nefilmjp/nms-portal-address-reader-frontend'
                isExternal={true}
                color='blue.600'
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
            <Text mt='4'>Special thanks</Text>
            <Text ml='4'>
              No Man&#39;s Sky Discord Server [PC/CS] Members (Japanese
              community,{' '}
              <Link
                href='https://disboard.org/ja/server/735105471471419463'
                isExternal={true}
                color='blue.600'
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
            <Button colorScheme='blue' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
