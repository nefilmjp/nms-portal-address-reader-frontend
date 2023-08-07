import { FormControl, FormLabel, Select } from '@chakra-ui/react';

import { IMAGE_PROFILES } from '@/config';

import type { AppSettings, SettingsProps } from '@/types';

export const SettingsRecognitionProfile = ({ ...props }: SettingsProps) => {
  const { options, setOptions } = props;

  return (
    <FormControl
      alignItems='center'
      display='flex'
      justifyContent='space-between'
      mt='4'
    >
      <FormLabel htmlFor='options-profile' mb='0'>
        Recognition profile
      </FormLabel>
      <Select
        id='options-profile'
        value={options.profile || 'pc'}
        w='10em'
        onChange={(event) => {
          setOptions({
            ...options,
            profile: (event.target.value as AppSettings['profile']) || 'pc',
          });
        }}
      >
        {Object.entries(IMAGE_PROFILES).map(([value, label]) => (
          <option key={`recognition-profile-${value}`} value={value}>
            {label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};
