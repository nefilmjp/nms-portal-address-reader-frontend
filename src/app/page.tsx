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
import { ImageOutput } from '@/components/ImageOutput';
import { Loading } from '@/components/Loading';
import { Result } from '@/components/Result/Result';
import { ResultOutput } from '@/components/ResultOutput';
import { SelectProfile } from '@/components/SelectProfile';
import { SendButton } from '@/components/SendButton';
import { SourceClipboard } from '@/components/SourceClipboard';
import { SourceDownload } from '@/components/SourceDownload';
import { SourceFile } from '@/components/SourceFile';
import { SourcePreview } from '@/components/SourcePreview';
import { Unavailable } from '@/components/Unavailable';
import { API_URL } from '@/config';

import type { AddressArray, ImageProfile, Options } from '@/types';

export default function Home() {
  const [isAvailable, setIsAvailable] = useState<boolean>();

  const [source, setSource] = useState<string | undefined>();
  const [profile, setProfile] = useState<ImageProfile | undefined>();
  const [addrArray, setAddrArray] = useState<AddressArray | undefined>();
  const [options, setOptions] = useState<Options>({});

  const [canPaste, setCanPaste] = useState<boolean>(false);

  useUpdateEffect(() => {
    setAddrArray(undefined);
  }, [source, profile]);

  useMount(async () => {
    // Can browser use navigator.clipboard.write
    if (
      typeof navigator !== undefined &&
      typeof navigator.clipboard.read === 'function'
    )
      setCanPaste(true);

    // Health check
    const result = await fetch(`${API_URL}/api/health`)
      .then((res) => {
        if (res.ok) return res.json();
        return false;
      })
      .catch(() => false);

    setIsAvailable(result);
  });

  if (isAvailable === undefined) return <Loading />;

  if (!isAvailable) return <Unavailable />;

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
            <ImageOutput addrArray={addrArray} />
          </Container>
        </Center>
      </main>
      <Footer options={options} setOptions={setOptions} />
    </>
  );
}
