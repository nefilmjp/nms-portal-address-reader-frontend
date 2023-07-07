'use client';

import {
  Container,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useUpdateEffect } from 'react-use';

import { Result } from '@/components/Result/Result';
import { SendButton } from '@/components/SendButton';
import { SourceClipboard } from '@/components/SourceClipboard';
import { SourceDownload } from '@/components/SourceDownload';
import { SourceFile } from '@/components/SourceFile';
import { SourcePreview } from '@/components/SourcePreview';
import { SourceProfile } from '@/components/SourceProfile';

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
      <Container maxW='2xl' mt='6' mb='6'>
        <Heading className='ff-geo' fontSize='2xl'>
          <span style={{ whiteSpace: 'nowrap' }}>No Man&#39;s Sky</span>{' '}
          <span style={{ whiteSpace: 'nowrap' }}>
            Portal Address Reader (Alpha)
          </span>
        </Heading>
        <Text mt='4'>
          The portal address reader in the screenshot.
          <br />
          Testing is in progress.
          <br />
          Don&#39;t use a lot of it in a short time.
        </Text>
        <Text mt='4'>
          Supported resolutions:
          <br />
          1920x1080, 1920x1200, 1920x1440, 2048x1536, 2560x1440, 2560x1600,
          3840x2160
        </Text>

        <Tabs mt='6' onChange={() => setSource(undefined)}>
          <TabList>
            <Tab>File</Tab>
            {Boolean(navigator.clipboard.read) && <Tab>Clipboard</Tab>}
            <Tab>Download</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <SourceFile setSource={setSource} />
            </TabPanel>
            {Boolean(navigator.clipboard.read) && (
              <TabPanel>
                <SourceClipboard setSource={setSource} />
              </TabPanel>
            )}
            <TabPanel>
              <SourceDownload setSource={setSource} />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <SourceProfile profile={profile} setProfile={setProfile} />
        <SendButton
          source={source}
          profile={profile}
          addrArray={addrArray}
          setAddrArray={setAddrArray}
        />

        <SourcePreview source={source} />

        <Result addrArray={addrArray} />
      </Container>
    </main>
  );
}
