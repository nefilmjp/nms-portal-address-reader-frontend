'use client';

import {
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useMount, useUpdateEffect } from 'react-use';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Result } from '@/components/Result/Result';
import { ResultOutput } from '@/components/ResultOutput';
import { SelectProfile } from '@/components/SelectProfile';
import { SendButton } from '@/components/SendButton';
import { SourceClipboard } from '@/components/SourceClipboard';
import { SourceDownload } from '@/components/SourceDownload';
import { SourceFile } from '@/components/SourceFile';
import { SourcePreview } from '@/components/SourcePreview';

import type { AddressArray, ImageProfile, Options } from '@/types';

export default function Home() {
  const [source, setSource] = useState<string | undefined>();
  const [profile, setProfile] = useState<ImageProfile | undefined>();
  const [addrArray, setAddrArray] = useState<AddressArray | undefined>();
  const [options, setOptions] = useState<Options>({});

  const [canPaste, setCanPaste] = useState<boolean>(false);

  useUpdateEffect(() => {
    setAddrArray(undefined);
  }, [source, profile]);

  useMount(() => {
    if (typeof navigator === undefined) return;
    if (!navigator.clipboard.read) return;
    setCanPaste(true);
  });

  return (
    <>
      <main>
        <Center>
          <Container maxW='2xl' mt='6' mb='16'>
            <Header />

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

            <SelectProfile profile={profile} setProfile={setProfile} />
            <SendButton
              options={options}
              source={source}
              profile={profile || 'pc'}
              addrArray={addrArray}
              setAddrArray={setAddrArray}
            />

            <SourcePreview source={source} />
            <Result addrArray={addrArray} setAddrArray={setAddrArray} />

            <ResultOutput addrArray={addrArray} />
          </Container>
        </Center>
      </main>
      <Footer options={options} setOptions={setOptions} />
    </>
  );
}
