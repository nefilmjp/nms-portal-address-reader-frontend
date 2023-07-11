import {
  Button,
  Icon,
  IconButton,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
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
            <Text mt='4'>Contributing</Text>
            <Text ml='4'>
              Reports, requests, and PRs are accepted on{' '}
              <Link
                href='https://github.com/nefilmjp/nms-portal-address-reader-frontend'
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
