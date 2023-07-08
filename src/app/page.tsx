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
  Center,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { useUpdateEffect } from 'react-use';

import { Result } from '@/components/Result/Result';
import { ResultOutput } from '@/components/ResultOutput';
import { SendButton } from '@/components/SendButton';
import { SourceClipboard } from '@/components/SourceClipboard';
import { SourceDownload } from '@/components/SourceDownload';
import { SourceFile } from '@/components/SourceFile';
import { SourcePreview } from '@/components/SourcePreview';
import { SourceProfile } from '@/components/SourceProfile';

import type { AddressArray } from '@/types';

export default function Home() {
  const [source, setSource] = useState<string | undefined>();
  const [profile, setProfile] = useState<string>('');
  const [addrArray, setAddrArray] = useState<AddressArray | undefined>();

  const canPaste = useMemo(() => {
    if (typeof navigator !== undefined) return false;
    else return Boolean(navigator.clipboard.read);
  }, []);

  useUpdateEffect(() => {
    setAddrArray(undefined);
  }, [source, profile]);

  return (
    <main>
      <Center>
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
              {canPaste && <Tab>Clipboard</Tab>}
              <Tab>Download</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <SourceFile setSource={setSource} />
              </TabPanel>
              {canPaste && (
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
          <Result addrArray={addrArray} setAddrArray={setAddrArray} />

          <ResultOutput addrArray={addrArray} />
        </Container>
      </Center>{' '}
    </main>
  );
}
