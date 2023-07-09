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
  precision?: number;
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
    precision = 0,
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
      precision={precision}
      step={step}
      value={canvasOp[propName]}
      onChange={(valueString) =>
        setCanvasOp({
          ...canvasOp,
          [propName]:
            precision > 0 ? parseFloat(valueString) : parseInt(valueString, 10),
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
