import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
} from '@chakra-ui/react';

import type { AppSettings, SettingsProps } from '@/types';

export const SettingsAdditionalInput = ({ ...props }: SettingsProps) => {
  const { options, setOptions } = props;

  return (
    <>
      <FormControl
        alignItems='center'
        display='flex'
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
      {options.formattedOutput && (
        <Box ml='4'>
          <FormControl
            alignItems='center'
            display='flex'
            justifyContent='space-between'
            mt='4'
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
                  format: event.target.value as AppSettings['format'],
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
            alignItems='center'
            display='flex'
            justifyContent='space-between'
            mt='4'
          >
            <FormLabel htmlFor='options-prefix' mb='0'>
              Prefix
            </FormLabel>
            <Input
              id='options-prefix'
              value={options.prefix || ''}
              width='10em'
              onChange={(event) => {
                setOptions({
                  ...options,
                  prefix: event.target.value,
                });
              }}
            />
          </FormControl>
          <FormControl
            alignItems='center'
            display='flex'
            justifyContent='space-between'
            mt='4'
          >
            <FormLabel htmlFor='options-suffix' mb='0'>
              Suffix
            </FormLabel>
            <Input
              id='options-suffix'
              value={options.suffix || ''}
              width='10em'
              onChange={(event) => {
                setOptions({
                  ...options,
                  suffix: event.target.value,
                });
              }}
            />
          </FormControl>
          <FormControl
            alignItems='center'
            display='flex'
            justifyContent='space-between'
            mt='4'
          >
            <FormLabel htmlFor='options-delimiter' mb='0'>
              Delimiter
            </FormLabel>
            <Input
              id='options-delimiter'
              value={options.delimiter || ''}
              width='4em'
              onChange={(event) => {
                setOptions({
                  ...options,
                  delimiter: event.target.value,
                });
              }}
            />
          </FormControl>
        </Box>
      )}
    </>
  );
};
