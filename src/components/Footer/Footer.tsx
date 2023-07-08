import { Box, IconButton, HStack, Link } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer>
      <Box pos='absolute' p='2' bottom='0' right='0' left='0'>
        <HStack justifyContent='flex-end'>
          <Link
            href='https://github.com/nefilmjp/nms-portal-address-reader-frontend'
            isExternal={true}
          >
            <IconButton aria-label='GitHub' icon={<FaGithub />} />
          </Link>
        </HStack>
      </Box>
    </footer>
  );
};
