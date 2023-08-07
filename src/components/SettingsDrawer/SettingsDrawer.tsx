import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Divider,
  Tooltip,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { FaGear } from 'react-icons/fa6';
import { useLocalStorage, useMount, useUpdateEffect } from 'react-use';

import { DEFAULT_SETTINGS } from '@/config';

import { SettingsAdditionalInput } from './SettingsAdditionalInput';
import { SettingsDisableOutput } from './SettingsDisableOutput';
import { SettingsRecognitionProfile } from './SettingsRecognitionProfile';
import { SettingsSendImmediately } from './SettingsSendImmediately';

import type { AppSettings } from '@/types';

interface SettingsDrawerProps {
  options: AppSettings;
  setOptions: (options: AppSettings) => void;
}

export const SettingsDrawer = ({ ...props }: SettingsDrawerProps) => {
  const { options, setOptions } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  const [storageOptions, setStorageOptions] = useLocalStorage<AppSettings>(
    'options',
    DEFAULT_SETTINGS,
  );

  useMount(() => setOptions(storageOptions || DEFAULT_SETTINGS));

  useUpdateEffect(() => setStorageOptions(options), [options]);

  return (
    <>
      <Tooltip hasArrow label='Settings'>
        <IconButton
          aria-label='About'
          icon={<FaGear />}
          onClick={onOpen}
          ref={btnRef}
        />
      </Tooltip>
      <Drawer
        finalFocusRef={btnRef}
        isOpen={isOpen}
        onClose={onClose}
        placement='right'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Settings</DrawerHeader>

          <DrawerBody>
            <SettingsAdditionalInput
              options={options}
              setOptions={setOptions}
            />
            <Divider mt='4' />
            <SettingsDisableOutput options={options} setOptions={setOptions} />
            <Divider mt='4' />
            <SettingsRecognitionProfile
              options={options}
              setOptions={setOptions}
            />
            <Divider mt='4' />
            <SettingsSendImmediately
              options={options}
              setOptions={setOptions}
            />
          </DrawerBody>

          <DrawerFooter>
            <Button
              onClick={() => setOptions(DEFAULT_SETTINGS)}
              variant='outline'
            >
              Reset
            </Button>
            <Button ml='4' onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
