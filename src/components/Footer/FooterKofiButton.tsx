import {
  IconButton,
  Img,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
} from '@chakra-ui/react';
import { FaCoffee } from 'react-icons/fa';

export const FooterKofiButton = () => {
  return (
    <Menu>
      <Tooltip label='Donate' hasArrow placement='top-end'>
        <MenuButton as={IconButton} aria-label='Donate' icon={<FaCoffee />} />
      </Tooltip>
      <MenuList>
        <MenuItem justifyContent='center'>
          <Link href='https://ko-fi.com/D1D7N4R45' isExternal={true}>
            <Img
              maxHeight='36px'
              src='https://storage.ko-fi.com/cdn/kofi1.png?v=3'
              alt='Buy Me a Coffee at ko-fi.com'
            />
          </Link>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
