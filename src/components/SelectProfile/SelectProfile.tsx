import { HStack, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';
import { useLocalStorage, useMount, useUpdateEffect } from 'react-use';

import { IMAGE_PROFILES } from '@/config';

interface SelectProfileProps {
  profile: string;
  setProfile: (profile: string) => void;
}

export const SelectProfile = ({ ...props }: SelectProfileProps) => {
  const { profile, setProfile } = props;

  const [storageProfile, setStorageProfile] = useLocalStorage<string>(
    'profile',
    'pc',
  );

  useMount(() => setProfile(storageProfile || 'pc'));

  useUpdateEffect(() => setStorageProfile(profile), [profile]);

  return (
    <HStack mt='1' display='flex' justifyContent='center'>
      <Text>Image profile:</Text>
      <RadioGroup defaultValue={profile} onChange={setProfile} value={profile}>
        <Stack spacing={5} direction='row'>
          {Object.entries(IMAGE_PROFILES).map(([value, label], idx) => (
            <Radio value={value} key={`image-profile-${idx}`}>
              {label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </HStack>
  );
};
