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

import { defaultCanvasOp, type CanvasOptions } from './OutputImage';
import { OutputImageNumberInput } from './OutputImageNumberInput';

interface OutputImageSettingsProps {
  canvasOp: CanvasOptions;
  setCanvasOp: (canvasOptions: CanvasOptions) => void;
}

export const OutputImageSettings = ({ ...props }: OutputImageSettingsProps) => {
  const { canvasOp, setCanvasOp } = props;

  return (
    <Center>
      <Box>
        <HStack flexWrap='wrap'>
          <HStack whiteSpace='nowrap'>
            <Text>Font size</Text>
            <OutputImageNumberInput
              canvasOp={canvasOp}
              max={256}
              min={10}
              propName='textSize'
              setCanvasOp={setCanvasOp}
            />
          </HStack>
          <HStack whiteSpace='nowrap'>
            <Text>Padding</Text>
            <OutputImageNumberInput
              canvasOp={canvasOp}
              min={-10}
              propName='padding'
              setCanvasOp={setCanvasOp}
            />
          </HStack>
          <HStack whiteSpace='nowrap'>
            <Text>Spacing</Text>
            <OutputImageNumberInput
              canvasOp={canvasOp}
              propName='spacing'
              setCanvasOp={setCanvasOp}
            />
          </HStack>
        </HStack>
        <Text mt='4'>Text color</Text>
        <HStack flexWrap='wrap' mt='2'>
          <HStack whiteSpace='nowrap'>
            <Text fontSize='sm'>R</Text>
            <OutputImageNumberInput
              canvasOp={canvasOp}
              max={255}
              min={0}
              propName='textRed'
              setCanvasOp={setCanvasOp}
            />
          </HStack>
          <HStack whiteSpace='nowrap'>
            <Text fontSize='sm'>G</Text>
            <OutputImageNumberInput
              canvasOp={canvasOp}
              max={255}
              min={0}
              propName='textGreen'
              setCanvasOp={setCanvasOp}
            />
          </HStack>
          <HStack whiteSpace='nowrap'>
            <Text fontSize='sm'>B</Text>
            <OutputImageNumberInput
              canvasOp={canvasOp}
              max={255}
              min={0}
              propName='textBlue'
              setCanvasOp={setCanvasOp}
            />
          </HStack>
          <HStack whiteSpace='nowrap'>
            <Text fontSize='sm'>Opacity (%)</Text>
            <OutputImageNumberInput
              canvasOp={canvasOp}
              max={100}
              min={0}
              propName='textOpacity'
              setCanvasOp={setCanvasOp}
            />
          </HStack>
        </HStack>
        {/* Text shadow */}
        <HStack mt='4'>
          <Text>Text shadow</Text>
          <Switch
            id='canvas-options-shadow'
            isChecked={canvasOp.shadow}
            size='sm'
            onChange={(event) => {
              setCanvasOp({ ...canvasOp, shadow: event.target.checked });
            }}
          />
        </HStack>
        <HStack flexWrap='wrap' mt='2'>
          <HStack whiteSpace='nowrap'>
            <Text fontSize='sm'>R</Text>
            <OutputImageNumberInput
              canvasOp={canvasOp}
              max={255}
              min={0}
              propName='shadowRed'
              setCanvasOp={setCanvasOp}
            />
          </HStack>
          <HStack whiteSpace='nowrap'>
            <Text fontSize='sm'>G</Text>
            <OutputImageNumberInput
              canvasOp={canvasOp}
              max={255}
              min={0}
              propName='shadowGreen'
              setCanvasOp={setCanvasOp}
            />
          </HStack>
          <HStack whiteSpace='nowrap'>
            <Text fontSize='sm'>B</Text>
            <OutputImageNumberInput
              canvasOp={canvasOp}
              max={255}
              min={0}
              propName='shadowBlue'
              setCanvasOp={setCanvasOp}
            />
          </HStack>
          <HStack whiteSpace='nowrap'>
            <Text fontSize='sm'>Opacity (%)</Text>
            <OutputImageNumberInput
              canvasOp={canvasOp}
              max={100}
              min={0}
              propName='shadowOpacity'
              setCanvasOp={setCanvasOp}
            />
          </HStack>
        </HStack>
        <HStack flexWrap='wrap' mt='2'>
          <HStack whiteSpace='nowrap'>
            <Text fontSize='sm'>OffsetX</Text>
            <OutputImageNumberInput
              canvasOp={canvasOp}
              propName='shadowOffsetX'
              setCanvasOp={setCanvasOp}
            />
          </HStack>
          <HStack whiteSpace='nowrap'>
            <Text fontSize='sm'>OffsetY</Text>
            <OutputImageNumberInput
              canvasOp={canvasOp}
              propName='shadowOffsetY'
              setCanvasOp={setCanvasOp}
            />
          </HStack>
          <HStack whiteSpace='nowrap'>
            <Text fontSize='sm'>Blur</Text>
            <OutputImageNumberInput
              canvasOp={canvasOp}
              min={0}
              propName='shadowBlur'
              setCanvasOp={setCanvasOp}
            />
          </HStack>
        </HStack>
        {/* Background color */}
        <HStack mt='4'>
          <Text>Background color</Text>
          <Switch
            id='canvas-options-bg'
            isChecked={canvasOp.bg}
            size='sm'
            onChange={(event) => {
              setCanvasOp({ ...canvasOp, bg: event.target.checked });
            }}
          />
        </HStack>
        <HStack flexWrap='wrap' mt='2'>
          <HStack whiteSpace='nowrap'>
            <Text fontSize='sm'>R</Text>
            <OutputImageNumberInput
              canvasOp={canvasOp}
              max={255}
              min={0}
              propName='bgRed'
              setCanvasOp={setCanvasOp}
            />
          </HStack>
          <HStack whiteSpace='nowrap'>
            <Text fontSize='sm'>G</Text>
            <OutputImageNumberInput
              canvasOp={canvasOp}
              max={255}
              min={0}
              propName='bgGreen'
              setCanvasOp={setCanvasOp}
            />
          </HStack>
          <HStack whiteSpace='nowrap'>
            <Text fontSize='sm'>B</Text>
            <OutputImageNumberInput
              canvasOp={canvasOp}
              max={255}
              min={0}
              propName='bgBlue'
              setCanvasOp={setCanvasOp}
            />
          </HStack>
          <HStack whiteSpace='nowrap'>
            <Text fontSize='sm'>Opacity (%)</Text>
            <OutputImageNumberInput
              canvasOp={canvasOp}
              max={100}
              min={0}
              propName='bgOpacity'
              setCanvasOp={setCanvasOp}
            />
          </HStack>
        </HStack>
        <Alert fontSize='sm' mt='4' status='info'>
          <AlertIcon />
          If the canvas is larger than the container, the preview is scaled
          down.
          <br />
          You can copy or download the image in the original size.
        </Alert>
        <Center mt='4'>
          <Button
            onClick={() => setCanvasOp(defaultCanvasOp)}
            size='sm'
            variant='outline'
          >
            Reset
          </Button>
        </Center>
      </Box>
    </Center>
  );
};
