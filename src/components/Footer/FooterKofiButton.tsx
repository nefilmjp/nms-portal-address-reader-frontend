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
      <Tooltip hasArrow label='Donate' placement='top-end'>
        <MenuButton aria-label='Donate' as={IconButton} icon={<FaCoffee />} />
      </Tooltip>
      <MenuList>
        <MenuItem justifyContent='center'>
          <Link href='https://ko-fi.com/D1D7N4R45' isExternal={true}>
            <Img
              alt='Buy Me a Coffee at ko-fi.com'
              maxHeight='36px'
              src='https://storage.ko-fi.com/cdn/kofi1.png?v=3'
            />
          </Link>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
