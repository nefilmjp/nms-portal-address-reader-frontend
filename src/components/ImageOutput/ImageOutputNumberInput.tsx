import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';

import type { CanvasOptions } from './ImageOutput';
import type { OnlyTypeKey } from '@/types';

interface ImageOutputNumberInputProps {
  propName: OnlyTypeKey<CanvasOptions, number>;
  min?: number;
  max?: number;
  step?: number;
  canvasOp: CanvasOptions;
  setCanvasOp: (canvasOptions: CanvasOptions) => void;
}

export const ImageOutputNumberInput = ({
  ...props
}: ImageOutputNumberInputProps) => {
  const {
    propName,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    step = 1,
    canvasOp,
    setCanvasOp,
  } = props;

  return (
    <NumberInput
      size='xs'
      w='4em'
      min={min}
      max={max}
      step={step}
      value={canvasOp[propName]}
      onChange={(valueString) =>
        setCanvasOp({
          ...canvasOp,
          [propName]: parseInt(valueString, 10),
        })
      }
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};
