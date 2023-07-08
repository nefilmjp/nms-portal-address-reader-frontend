import {
  Box,
  IconButton,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  FormControl,
  FormLabel,
  Switch,
  Tooltip,
} from '@chakra-ui/react';
import { FaGear, FaGithub } from 'react-icons/fa6';
import { useLocalStorage, useMount, useUpdateEffect } from 'react-use';

import { Options } from '@/types';

interface FooterProps {
  options: Options;
  setOptions: (options: Options) => void;
}

export const Footer = ({ ...props }: FooterProps) => {
  const { options, setOptions } = props;

  const [storageOptions, setStorageOptions] = useLocalStorage<Options>(
    'options',
    {},
  );

  useMount(() => setOptions(storageOptions || {}));

  useUpdateEffect(() => setStorageOptions(options), [options]);

  return (
    <footer>
      <Box pos='absolute' p='2' bottom='0' right='0' left='0'>
        <HStack justifyContent='flex-end'>
          <Menu computePositionOnMount={true} closeOnSelect={false}>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<FaGear />}
            />
            <MenuList>
              <MenuItem>
                <FormControl
                  display='flex'
                  alignItems='center'
                  justifyContent='space-between'
                >
                  <Tooltip
                    label='Send immediately upon image detection.'
                    hasArrow
                    openDelay={500}
                  >
                    <FormLabel htmlFor='options-send-immediately' mb='0'>
                      Send immediately
                    </FormLabel>
                  </Tooltip>
                  <Switch
                    id='options-send-immediately'
                    isChecked={options.sendImmediately || false}
                    onChange={(event) => {
                      setOptions({
                        ...options,
                        sendImmediately: event.target.checked,
                      });
                    }}
                  />
                </FormControl>
              </MenuItem>
            </MenuList>
          </Menu>
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
