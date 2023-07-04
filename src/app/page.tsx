'use client';

import { Container, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { useUpdateEffect } from 'react-use';

import { Dropzone } from '@/components/Dropzone';
import { Result } from '@/components/Result/Result';
import { SelectProfile } from '@/components/SelectProfile';
import { SendButton } from '@/components/SendButton';
import { Source } from '@/components/Source';

import styles from './page.module.scss';

export default function Home() {
  const [source, setSource] = useState<string | undefined>();
  const [profile, setProfile] = useState<string>('');
  const [addrArray, setAddrArray] = useState<number[] | undefined>();

  useUpdateEffect(() => {
    setAddrArray(undefined);
  }, [source, profile]);

  return (
    <main className={styles.container}>
      <Container maxW='2xl' mt='4' mb='4'>
        <Heading className='ff-geo' fontSize='2xl'>
          No Man&#39;s Sky Portal Address Reader (Alpha)
        </Heading>
        <Dropzone setSource={setSource} />
        <SelectProfile profile={profile} setProfile={setProfile} />
        <Source source={source} />
        <SendButton
          source={source}
          profile={profile}
          addrArray={addrArray}
          setAddrArray={setAddrArray}
        />
        <Result addrArray={addrArray} />
      </Container>
    </main>
  );
}
