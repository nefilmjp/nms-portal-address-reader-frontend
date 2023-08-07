import { FormControl, FormLabel, Switch, Tooltip } from '@chakra-ui/react';

import type { SettingsProps } from '@/types';

export const SettingsSendImmediately = ({ ...props }: SettingsProps) => {
  const { options, setOptions } = props;

  return (
    <FormControl
      alignItems='center'
      display='flex'
      justifyContent='space-between'
      mt='4'
    >
      <Tooltip
        hasArrow
        label='Send immediately upon screenshot detection.'
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
  );
};
