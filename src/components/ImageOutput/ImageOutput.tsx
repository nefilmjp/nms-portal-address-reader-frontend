import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  HStack,
} from '@chakra-ui/react';
import { useMemo, useRef, useState } from 'react';
import { useLocalStorage, useMount, useUpdateEffect } from 'react-use';

import styles from './ImageOutput.module.scss';
import { ImageOutputSettings } from './ImageOutputSettings';

import type { AddressArray } from '@/types';

interface ImageOutputProps {
  addrArray: AddressArray | undefined;
}

export interface CanvasOptions {
  padding: number; // コンテナ
  spacing: number; // ≒字間
  // Background
  bg: boolean; // falseならtransparent
  bgRed: number;
  bgGreen: number;
  bgBlue: number;
  bgOpacity: number;
  // Text
  textSize: number;
  textRed: number;
  textGreen: number;
  textBlue: number;
  textOpacity: number;
  // Text shadow
  shadow: boolean;
  shadowRed: number;
  shadowGreen: number;
  shadowBlue: number;
  shadowOpacity: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
  shadowBlur: number;
}

export const defaultCanvasOp: CanvasOptions = {
  padding: 0,
  spacing: 0,
  bg: true,
  bgRed: 0,
  bgGreen: 0,
  bgBlue: 0,
  bgOpacity: 100,
  textSize: 48,
  textRed: 255,
  textGreen: 255,
  textBlue: 255,
  textOpacity: 100,
  shadow: true,
  shadowRed: 255,
  shadowGreen: 255,
  shadowBlue: 255,
  shadowOpacity: 100,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowBlur: 5,
};

export const ImageOutput = ({ ...props }: ImageOutputProps) => {
  const { addrArray } = props;

  // const isOpen = useRef<boolean>(false);
  const [canCopy, setCanCopy] = useState<boolean>(false);

  // Options
  const [canvasOp, setCanvasOp] = useState<CanvasOptions>(defaultCanvasOp);
  const [storageCanvasOp, setStorageCanvasOp] = useLocalStorage(
    'canvas',
    defaultCanvasOp,
  );

  useMount(() => setCanvasOp(storageCanvasOp || defaultCanvasOp));

  useUpdateEffect(() => setStorageCanvasOp(canvasOp), [canvasOp]);

  // Canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getCanvas = useMemo(
    () => () => {
      const canvas = canvasRef.current;
      if (!canvas) return [null, null];
      const ctx = canvas.getContext('2d');
      if (!ctx) return [null, null];
      return [canvas, ctx] as [HTMLCanvasElement, CanvasRenderingContext2D];
    },
    [],
  );

  const canvasWidth = useMemo(
    () =>
      canvasOp
        ? canvasOp.textSize * 12 + canvasOp.padding * 2 + canvasOp.spacing * 11
        : 0,
    [canvasOp],
  );

  const canvasHeight = useMemo(
    () => (canvasOp ? canvasOp.textSize + canvasOp.padding * 2 : 0),
    [canvasOp],
  );

  // Initialize
  useMount(() => {
    // Can browser use navigator.clipboard.write
    if (
      typeof navigator !== undefined &&
      typeof navigator.clipboard.write === 'function'
    )
      setCanCopy(true);

    // Init canvas
    const [canvas, ctx] = getCanvas();
    if (!canvas || !ctx) return;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Preload webfont
    ctx.font = '10px NMSGlyphsMono';
    ctx.textBaseline = 'hanging';
    ctx.fillStyle = 'transparent';
    ctx.fillText('0123456789ABCDEF', 0, 0);
  });

  const reset = useMemo(
    () => () => {
      const [canvas, ctx] = getCanvas();
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // Draw
  const draw = useMemo(
    () =>
      (
        addrArray: AddressArray,
        canvasWidth: number,
        canvasHeight: number,
        op: CanvasOptions,
      ) => {
        const [canvas, ctx] = getCanvas();
        if (!canvas || !ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        // Background
        if (op.bg) {
          ctx.fillStyle = `rgba(${op.bgRed}, ${op.bgGreen}, ${op.bgBlue}, ${
            op.bgOpacity * 0.01
          })`;
          ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        }

        if (op.shadow) {
          ctx.shadowColor = `rgba(${op.shadowRed}, ${op.shadowGreen}, ${
            op.shadowBlue
          }, ${op.shadowOpacity * 0.01})`;
          ctx.shadowOffsetX = op.shadowOffsetX;
          ctx.shadowOffsetY = op.shadowOffsetY;
          ctx.shadowBlur = op.shadowBlur;
        }

        ctx.font = `400 ${op.textSize}px NMSGlyphsMono`;
        ctx.textBaseline = 'top';
        ctx.fillStyle = `rgba(${op.textRed}, ${op.textGreen}, ${op.textBlue}, ${
          op.textOpacity * 0.01
        })`;
        addrArray.forEach((dec, idx) => {
          ctx.fillText(
            dec.toString(16).toUpperCase(),
            op.padding + op.textSize * idx + op.spacing * idx,
            op.padding,
          );
        });
      },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // Repaint
  useUpdateEffect(() => {
    // if (!isOpen.current) return;
    if (addrArray) draw(addrArray, canvasWidth, canvasHeight, canvasOp);
    else reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addrArray, canvasOp]);

  return (
    <Accordion
      mt='4'
      allowToggle
      // onChange={(idx) => (isOpen.current = idx === -1 ? false : true)}
    >
      <AccordionItem>
        <AccordionButton>
          <Box as='span' flex='1' textAlign='left'>
            Image
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <canvas ref={canvasRef} className={styles.canvas} />
          <HStack mt='4' spacing='4' justifyContent='center'>
            {canCopy && (
              <Button
                size='lg'
                isDisabled={!addrArray}
                colorScheme='blue'
                onClick={async () => {
                  const [canvas] = getCanvas();
                  if (!canvas) return;
                  canvas.toBlob(async (blob) => {
                    if (!blob) return;
                    const item = new ClipboardItem({ 'image/png': blob });
                    await navigator.clipboard.write([item]);
                  });
                }}
              >
                Copy
              </Button>
            )}
            <Button
              size='lg'
              isDisabled={!addrArray}
              colorScheme='blue'
              onClick={() => {
                const anchor = document.createElement('a');
                const [canvas] = getCanvas();
                if (!canvas) return;
                anchor.href = canvas.toDataURL('image/png');
                anchor.download = 'address.png';
                anchor.click();
              }}
            >
              Download
            </Button>
          </HStack>
          <Accordion mt='4' allowToggle borderWidth='1px' borderRadius='md'>
            <AccordionItem border='none'>
              <AccordionButton>
                <Box as='span' flex='1' textAlign='left'>
                  Settings
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel mt='2'>
                <ImageOutputSettings
                  canvasOp={canvasOp}
                  setCanvasOp={setCanvasOp}
                />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
