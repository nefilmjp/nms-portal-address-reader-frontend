import { Box, HStack } from '@chakra-ui/react';
import { useLocalStorage, useMount, useUpdateEffect } from 'react-use';

import { DEFAULT_SETTINGS } from '@/config';

import { FooterAbout } from './FooterAbout';
import { FooterColorSwitch } from './FooterColorSwitch';
import { FooterKofiWidget } from './FooterKofiWidget';
import { SettingsDrawer } from '../SettingsDrawer';

import type { AppSettings } from '@/types';

interface FooterProps {
  options: AppSettings;
  setOptions: (options: AppSettings) => void;
}

export const Footer = ({ ...props }: FooterProps) => {
  const { options, setOptions } = props;

  const [storageOptions, setStorageOptions] = useLocalStorage<AppSettings>(
    'options',
    DEFAULT_SETTINGS,
  );

  useMount(() => setOptions(storageOptions || DEFAULT_SETTINGS));

  useUpdateEffect(() => setStorageOptions(options), [options]);

  return (
    <footer>
      <Box bottom='0' left='0' p='2' pos='absolute' right='0'>
        <HStack justifyContent='flex-end'>
          <FooterColorSwitch />
          <SettingsDrawer options={options} setOptions={setOptions} />
          <FooterAbout />
          <FooterKofiWidget />
        </HStack>
      </Box>
    </footer>
  );
};
