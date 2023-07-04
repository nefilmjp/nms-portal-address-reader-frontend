import { Box, Center, Text, useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import {
  getAddressBase64,
  isFileValid,
  loadImage,
} from '@/utils/fileValidator';

import styles from './Dropzone.module.scss';

interface DropzoneProps {
  setSource: (base64: string | undefined) => void;
}

export const Dropzone = ({ ...props }: DropzoneProps) => {
  const { setSource } = props;

  const toast = useToast();

  const onDrop = useCallback(async (acceptedFiles: unknown) => {
    if (
      !acceptedFiles ||
      !Array.isArray(acceptedFiles) ||
      acceptedFiles.length < 1
    ) {
      setSource(undefined);
      return;
    }
    const acceptedFile = acceptedFiles[0];
    if (
      !acceptedFile ||
      !(acceptedFile instanceof File) ||
      !isFileValid(acceptedFile)
    ) {
      console.error('Invalid type', acceptedFile.type);
      toast({
        title: 'Invalid type.',
        description: 'Only JPEG or PNG can be accepted.',
        status: 'error',
        duration: 10000,
        isClosable: true,
      });
      setSource(undefined);
      return;
    }
    const img = await loadImage(acceptedFile);
    const base64 = getAddressBase64(img);
    if (base64) setSource(base64);
    else {
      toast({
        title: 'Invalid image.',
        description:
          'The image does not acceptable. Mostly, the size is wrong.',
        status: 'error',
        duration: 10000,
        isClosable: true,
      });
      setSource(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <>
      <Box
        mt='6'
        h='100px'
        borderRadius='lg'
        bgColor='gray.100'
        className={styles.container}
      >
        <div {...getRootProps()} className={styles.dropzone}>
          <Center h='100px' p='4'>
            <input {...getInputProps()} />
            {isDragActive ? (
              <Text align='center' fontSize='lg'>
                Drop the file here ...
              </Text>
            ) : (
              <Text align='center' fontSize='lg'>
                Drop a screenshot here, or click to select a file.
              </Text>
            )}
          </Center>
        </div>
      </Box>
      <Center>
        <Text mt='4'>
          Supported resolutions:
          <br />
          1920x1080, 1920x1200, 1920x1440, 2048x1536, 2560x1440, 2560x1600,
          3840x2160
        </Text>
      </Center>
    </>
  );
};
