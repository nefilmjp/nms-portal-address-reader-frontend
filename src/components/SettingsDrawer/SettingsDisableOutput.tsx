import { FormControl, FormLabel, Switch } from '@chakra-ui/react';

import type { SettingsProps } from '@/types';

export const SettingsDisableOutput = ({ ...props }: SettingsProps) => {
  const { options, setOptions } = props;

  return (
    <>
      <FormControl
        alignItems='center'
        display='flex'
        justifyContent='space-between'
        mt='4'
      >
        <FormLabel htmlFor='options-disable-dec' mb='0'>
          Disable decimal output
        </FormLabel>
        <Switch
          id='options-disable-dec'
          isChecked={options.disableDecimal || false}
          onChange={(event) => {
            setOptions({
              ...options,
              disableDecimal: event.target.checked,
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
        <FormLabel htmlFor='options-disable-hex' mb='0'>
          Disable hex output
        </FormLabel>
        <Switch
          id='options-disable-hex'
          isChecked={options.disableHex || false}
          onChange={(event) => {
            setOptions({
              ...options,
              disableHex: event.target.checked,
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
        <FormLabel htmlFor='options-disable-image' mb='0'>
          Disable image output
        </FormLabel>
        <Switch
          id='options-disable-image'
          isChecked={options.disableImage || false}
          onChange={(event) => {
            setOptions({
              ...options,
              disableImage: event.target.checked,
            });
          }}
        />
      </FormControl>
    </>
  );
};
