'use client';

import { Container, Heading, Text } from '@chakra-ui/react';
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
        <Text mt='4'>
          Read portal address from game screenshot.
          <br />
          Now under testing. Do not use large quantities in a short time.
        </Text>
        <Text mt='2'>
          Supported resolutions:
          <br />
          1920x1080, 1920x1200, 1920x1440, 2048x1536, 2560x1440, 2560x1600,
          3840x2160
        </Text>
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
