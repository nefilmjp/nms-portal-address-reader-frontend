'use client';

import {
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
  Stack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useMount, useUpdateEffect } from 'react-use';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Loading } from '@/components/Loading';
import { OutputDecimal } from '@/components/OutputDecimal';
import { OutputFormatted } from '@/components/OutputFormatted';
import { OutputHex } from '@/components/OutputHex';
import { OutputImage } from '@/components/OutputImage';
import { Result } from '@/components/Result/Result';
import { SendButton } from '@/components/SendButton';
import { SourceClipboard } from '@/components/SourceClipboard';
import { SourceDownload } from '@/components/SourceDownload';
import { SourceFile } from '@/components/SourceFile';
import { SourcePreview } from '@/components/SourcePreview';
import { Unavailable } from '@/components/Unavailable';
import { API_URL, DEFAULT_SETTINGS } from '@/config';

import type { AddressArray, AppSettings } from '@/types';

export default function Home() {
  const [isAvailable, setIsAvailable] = useState<boolean>();

  const [source, setSource] = useState<string | undefined>();
  const [addrArray, setAddrArray] = useState<AddressArray | undefined>();
  const [options, setOptions] = useState<AppSettings>(DEFAULT_SETTINGS);

  const [canPaste, setCanPaste] = useState<boolean>(false);

  useUpdateEffect(() => {
    setAddrArray(undefined);
  }, [source, options.profile]);

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
          <Container maxW='2xl' mb='16' mt='6'>
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

            <SendButton
              addrArray={addrArray}
              options={options}
              setAddrArray={setAddrArray}
              source={source}
            />

            <SourcePreview source={source} />
            <Result addrArray={addrArray} setAddrArray={setAddrArray} />

            <Stack mt='6' spacing='4'>
              {!options.disableDecimal && (
                <OutputDecimal addrArray={addrArray} />
              )}
              {!options.disableHex && <OutputHex addrArray={addrArray} />}
              {options.formattedOutput && (
                <OutputFormatted addrArray={addrArray} options={options} />
              )}
              {!options.disableImage && <OutputImage addrArray={addrArray} />}
            </Stack>
          </Container>
        </Center>
      </main>
      <Footer options={options} setOptions={setOptions} />
    </>
  );
}
