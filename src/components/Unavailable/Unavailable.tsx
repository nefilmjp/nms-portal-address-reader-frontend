import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
  Container,
  Heading,
  Icon,
  Link,
} from '@chakra-ui/react';
import { FaExternalLinkAlt } from 'react-icons/fa';

export const Unavailable = () => {
  return (
    <main>
      <Center>
        <Container maxW='2xl' mb='16' mt='6'>
          <Heading className='ff-geo' fontSize='2xl'>
            <span style={{ whiteSpace: 'nowrap' }}>No Man&#39;s Sky</span>{' '}
            <span style={{ whiteSpace: 'nowrap' }}>Portal Address Reader</span>
          </Heading>

          <Alert
            alignItems='center'
            flexDirection='column'
            height='200px'
            justifyContent='center'
            mt='6'
            status='error'
            textAlign='center'
            variant='subtle'
          >
            <AlertIcon boxSize='40px' mr={0} />
            <AlertTitle fontSize='lg' mb={1} mt={4}>
              API server is offline
            </AlertTitle>
            <AlertDescription maxWidth='sm'>
              The application is temporarily unavailable.
              <br />
              If this condition persists for over a day, please get in touch
              with{' '}
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
              .
            </AlertDescription>
          </Alert>
        </Container>
      </Center>
    </main>
  );
};
