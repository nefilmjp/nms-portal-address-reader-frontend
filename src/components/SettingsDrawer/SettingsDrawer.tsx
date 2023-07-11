import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
  useDisclosure,
  IconButton,
  FormControl,
  Switch,
  FormLabel,
  Select,
  Divider,
  Box,
  Tooltip,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { FaGear } from 'react-icons/fa6';
import { useLocalStorage, useMount, useUpdateEffect } from 'react-use';

import { Options } from '@/types';

interface SettingsDrawerProps {
  options: Options;
  setOptions: (options: Options) => void;
}

export const SettingsDrawer = ({ ...props }: SettingsDrawerProps) => {
  const { options, setOptions } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  const [storageOptions, setStorageOptions] = useLocalStorage<Options>(
    'options',
    {},
  );

  useMount(() => setOptions(storageOptions || {}));

  useUpdateEffect(() => setStorageOptions(options), [options]);

  return (
    <>
      <IconButton
        aria-label='About'
        icon={<FaGear />}
        ref={btnRef}
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Settings</DrawerHeader>

          <DrawerBody>
            <FormControl
              display='flex'
              alignItems='center'
              justifyContent='space-between'
            >
              <FormLabel htmlFor='options-formatted-output' mb='0'>
                Additional output
              </FormLabel>
              <Switch
                id='options-formatted-output'
                isChecked={options.formattedOutput || false}
                onChange={(event) => {
                  setOptions({
                    ...options,
                    formattedOutput: event.target.checked,
                  });
                }}
              />
            </FormControl>
            <Box ml='4'>
              <FormControl
                mt='4'
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                // isDisabled={!options.formattedOutput}
              >
                <FormLabel htmlFor='options-format' mb='0'>
                  Format
                </FormLabel>
                <Select
                  id='options-format'
                  value={options.format || 'hexU'}
                  onChange={(event) => {
                    setOptions({
                      ...options,
                      format: event.target.value as Options['format'],
                    });
                  }}
                >
                  <option value='hexU'>Hex (upper case)</option>
                  <option value='hexL'>Hex (lower case)</option>
                  <option value='dec1'>Decimal (1-16)</option>
                  <option value='dec0'>Decimal (0-15)</option>
                </Select>
              </FormControl>
              <FormControl
                mt='4'
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                // isDisabled={!options.formattedOutput}
              >
                <FormLabel htmlFor='options-prefix' mb='0'>
                  Prefix
                </FormLabel>
                <Input
                  id='options-prefix'
                  width='10em'
                  value={options.prefix || ''}
                  onChange={(event) => {
                    setOptions({
                      ...options,
                      prefix: event.target.value,
                    });
                  }}
                />
              </FormControl>
              <FormControl
                mt='4'
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                // isDisabled={!options.formattedOutput}
              >
                <FormLabel htmlFor='options-suffix' mb='0'>
                  Suffix
                </FormLabel>
                <Input
                  id='options-suffix'
                  width='10em'
                  value={options.suffix || ''}
                  onChange={(event) => {
                    setOptions({
                      ...options,
                      suffix: event.target.value,
                    });
                  }}
                />
              </FormControl>
              <FormControl
                mt='4'
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                // isDisabled={!options.formattedOutput}
              >
                <FormLabel htmlFor='options-delimiter' mb='0'>
                  Delimiter
                </FormLabel>
                <Input
                  id='options-delimiter'
                  width='4em'
                  value={options.delimiter || ''}
                  onChange={(event) => {
                    setOptions({
                      ...options,
                      delimiter: event.target.value,
                    });
                  }}
                />
              </FormControl>
            </Box>
            <Divider mt='4' />
            <FormControl
              mt='4'
              display='flex'
              alignItems='center'
              justifyContent='space-between'
            >
              <Tooltip
                label='Send immediately upon screenshot detection.'
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
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' onClick={() => setOptions({})}>
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