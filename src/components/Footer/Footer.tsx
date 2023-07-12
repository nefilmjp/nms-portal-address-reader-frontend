import { Box, HStack } from '@chakra-ui/react';
import { useLocalStorage, useMount, useUpdateEffect } from 'react-use';

import { Options } from '@/types';

import { FooterAbout } from './FooterAbout';
import { FooterColorSwitch } from './FooterColorSwitch';
import { FooterKofi } from './FooterKofi';
import { SettingsDrawer } from '../SettingsDrawer';

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
          <FooterColorSwitch />
          <SettingsDrawer options={options} setOptions={setOptions} />
          <FooterAbout />
          <FooterKofi />
        </HStack>
      </Box>
    </footer>
  );
};
