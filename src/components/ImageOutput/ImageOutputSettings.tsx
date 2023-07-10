import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  HStack,
  Switch,
  Text,
} from '@chakra-ui/react';

import { defaultCanvasOp, type CanvasOptions } from './ImageOutput';
import { ImageOutputNumberInput } from './ImageOutputNumberInput';

interface ImageOutputSettingsProps {
  canvasOp: CanvasOptions;
  setCanvasOp: (canvasOptions: CanvasOptions) => void;
}

export const ImageOutputSettings = ({ ...props }: ImageOutputSettingsProps) => {
  const { canvasOp, setCanvasOp } = props;

  return (
    <Center>
      <Box>
        <HStack flexWrap='wrap'>
          <HStack whiteSpace='nowrap'>
            <Text>Font size</Text>
            <ImageOutputNumberInput
              propName='textSize'
              min={10}
              max={256}
              canvasOp={canvasOp}
              setCanvasOp={setCanvasOp}
            />
          </HStack>
          <HStack whiteSpace='nowrap'>
            <Text>Padding</Text>
            <ImageOutputNumberInput
              propName='padding'
              min={-10}
              canvasOp={canvasOp}
              setCanvasOp={setCanvasOp}
            />
          </HStack>
          <HStack whiteSpace='nowrap'>
            <Text>Spacing</Text>
            <ImageOutputNumberInput
              propName='spacing'
              canvasOp={canvasOp}
              setCanvasOp={setCanvasOp}
            />
          </HStack>
        </HStack>
        <Text mt='4'>Text color</Text>
        <HStack mt='2' flexWrap='wrap'>
          <HStack whiteSpace='nowrap'>
            <Text fontSize='sm'>R</Text>
            <ImageOutputNumberInput
              propName='textRed'
              min={0}
              max={255}
              canvasOp={canvasOp}
              setCanvasOp={setCanvasOp}
            />
          </HStack>
          <HStack whiteSpace='nowrap'>
            <Text fontSize='sm'>G</Text>
            <ImageOutputNumberInput
              propName='textGreen'
              min={0}
              max={255}
              canvasOp={canvasOp}
              setCanvasOp={setCanvasOp}
            />
          </HStack>
          <HStack whiteSpace='nowrap'>
            <Text fontSize='sm'>B</Text>
            <ImageOutputNumberInput
              propName='textBlue'
              min={0}
              max={255}
              canvasOp={canvasOp}
              setCanvasOp={setCanvasOp}
            />
          </HStack>
          <HStack whiteSpace='nowrap'>
            <Text fontSize='sm'>Opacity (%)</Text>
            <ImageOutputNumberInput
              propName='textOpacity'
              min={0}
              max={100}
              canvasOp={canvasOp}
              setCanvasOp={setCanvasOp}
            />
          </HStack>
        </HStack>
        {/* Text shadow */}
        <HStack mt='4'>
          <Text>Text shadow</Text>
          <Switch
            size='sm'
            id='canvas-options-shadow'
            isChecked={canvasOp.shadow}
            onChange={(event) => {
              setCanvasOp({ ...canvasOp, shadow: event.target.checked });
            }}
          />
        </HStack>
        <HStack mt='2' flexWrap='wrap'>
          <HStack whiteSpace='nowrap'>
            <Text fontSize='sm'>R</Text>
            <ImageOutputNumberInput
              propName='shadowRed'
              min={0}
              max={255}
              canvasOp={canvasOp}
              setCanvasOp={setCanvasOp}
            />
          </HStack>
          <HStack whiteSpace='nowrap'>
            <Text fontSize='sm'>G</Text>
            <ImageOutputNumberInput
              propName='shadowGreen'
              min={0}
              max={255}
              canvasOp={canvasOp}
              setCanvasOp={setCanvasOp}
            />
          </HStack>
          <HStack whiteSpace='nowrap'>
            <Text fontSize='sm'>B</Text>
            <ImageOutputNumberInput
              propName='shadowBlue'
              min={0}
              max={255}
              canvasOp={canvasOp}
              setCanvasOp={setCanvasOp}
            />
          </HStack>
          <HStack whiteSpace='nowrap'>
            <Text fontSize='sm'>Opacity (%)</Text>
            <ImageOutputNumberInput
              propName='shadowOpacity'
              min={0}
              max={100}
              canvasOp={canvasOp}
              setCanvasOp={setCanvasOp}
            />
          </HStack>
        </HStack>
        <HStack mt='2' flexWrap='wrap'>
          <HStack whiteSpace='nowrap'>
            <Text fontSize='sm'>OffsetX</Text>
            <ImageOutputNumberInput
              propName='shadowOffsetX'
              canvasOp={canvasOp}
              setCanvasOp={setCanvasOp}
            />
          </HStack>
          <HStack whiteSpace='nowrap'>
            <Text fontSize='sm'>OffsetY</Text>
            <ImageOutputNumberInput
              propName='shadowOffsetY'
              canvasOp={canvasOp}
              setCanvasOp={setCanvasOp}
            />
          </HStack>
          <HStack whiteSpace='nowrap'>
            <Text fontSize='sm'>Blur</Text>
            <ImageOutputNumberInput
              propName='shadowBlur'
              min={0}
              canvasOp={canvasOp}
              setCanvasOp={setCanvasOp}
            />
          </HStack>
        </HStack>
        {/* Background color */}
        <HStack mt='4'>
          <Text>Background color</Text>
          <Switch
            size='sm'
            id='canvas-options-bg'
            isChecked={canvasOp.bg}
            onChange={(event) => {
              setCanvasOp({ ...canvasOp, bg: event.target.checked });
            }}
          />
        </HStack>
        <HStack mt='2' flexWrap='wrap'>
          <HStack whiteSpace='nowrap'>
            <Text fontSize='sm'>R</Text>
            <ImageOutputNumberInput
              propName='bgRed'
              min={0}
              max={255}
              canvasOp={canvasOp}
              setCanvasOp={setCanvasOp}
            />
          </HStack>
          <HStack whiteSpace='nowrap'>
            <Text fontSize='sm'>G</Text>
            <ImageOutputNumberInput
              propName='bgGreen'
              min={0}
              max={255}
              canvasOp={canvasOp}
              setCanvasOp={setCanvasOp}
            />
          </HStack>
          <HStack whiteSpace='nowrap'>
            <Text fontSize='sm'>B</Text>
            <ImageOutputNumberInput
              propName='bgBlue'
              min={0}
              max={255}
              canvasOp={canvasOp}
              setCanvasOp={setCanvasOp}
            />
          </HStack>
          <HStack whiteSpace='nowrap'>
            <Text fontSize='sm'>Opacity (%)</Text>
            <ImageOutputNumberInput
              propName='bgOpacity'
              min={0}
              max={100}
              canvasOp={canvasOp}
              setCanvasOp={setCanvasOp}
            />
          </HStack>
        </HStack>
        <Alert status='info' mt='4' fontSize='sm'>
          <AlertIcon />
          If the canvas is larger than the container, the preview is scaled
          down.
          <br />
          You can copy or download the image in the original size.
        </Alert>
        <Center mt='4'>
          <Button size='sm' onClick={() => setCanvasOp(defaultCanvasOp)}>
            Reset
          </Button>
        </Center>
      </Box>
    </Center>
  );
};
