import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
  Container,
  Heading,
  Link,
} from '@chakra-ui/react';

export const Unavailable = () => {
  return (
    <main>
      <Center>
        <Container maxW='2xl' mt='6' mb='16'>
          <Heading className='ff-geo' fontSize='2xl'>
            <span style={{ whiteSpace: 'nowrap' }}>No Man&#39;s Sky</span>{' '}
            <span style={{ whiteSpace: 'nowrap' }}>Portal Address Reader</span>
          </Heading>

          <Alert
            mt='6'
            status='error'
            variant='subtle'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            height='200px'
          >
            <AlertIcon boxSize='40px' mr={0} />
            <AlertTitle mt={4} mb={1} fontSize='lg'>
              API server is offline
            </AlertTitle>
            <AlertDescription maxWidth='sm'>
              The application is temporarily unavailable.
              <br />
              If this condition persists for over a day, please get in touch
              with{' '}
              <Link href='https://twitter.com/nefilm_rc' isExternal={true}>
                @nefilm_rc
              </Link>
              .
            </AlertDescription>
          </Alert>
        </Container>
      </Center>
    </main>
  );
};
