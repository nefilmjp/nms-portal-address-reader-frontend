import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';

import type { CanvasOptions } from './OutputImage';
import type { OnlyTypeKey } from '@/types';

interface OutputImageNumberInputProps {
  propName: OnlyTypeKey<CanvasOptions, number>;
  min?: number;
  max?: number;
  step?: number;
  canvasOp: CanvasOptions;
  setCanvasOp: (canvasOptions: CanvasOptions) => void;
}

export const OutputImageNumberInput = ({
  ...props
}: OutputImageNumberInputProps) => {
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
      max={max}
      min={min}
      size='xs'
      step={step}
      value={canvasOp[propName]}
      w='4em'
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
