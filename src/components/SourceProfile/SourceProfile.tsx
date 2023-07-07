import { HStack, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';
import { useLocalStorage, useMount, useUpdateEffect } from 'react-use';

interface SourceProfileProps {
  profile: string;
  setProfile: (profile: string) => void;
}

export const SourceProfile = ({ ...props }: SourceProfileProps) => {
  const { profile, setProfile } = props;

  const [storageProfile, setStorageProfile] = useLocalStorage<string>(
    'profile',
    'pc',
  );

  useMount(() => setProfile(storageProfile || 'pc'));

  useUpdateEffect(() => setStorageProfile(profile), [profile]);

  return (
    <HStack mt='1' display='flex' justifyContent='center'>
      <Text>Image Profile:</Text>
      <RadioGroup defaultValue={profile} onChange={setProfile} value={profile}>
        <Stack spacing={5} direction='row'>
          <Radio value='pc'>PC/PS5</Radio>
          <Radio value='ps4'>PS4</Radio>
        </Stack>
      </RadioGroup>
    </HStack>
  );
};
