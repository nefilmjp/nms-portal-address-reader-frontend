import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react';
import clsx from 'clsx';
import { useMemo, useState } from 'react';

import styles from './Result.module.scss';
import { ResultEditor } from './ResultEditor';

import type { AddressArray } from '@/types';

interface ResultGlyphProps {
  addrArray: AddressArray;
  setAddrArray: (addrArray: AddressArray | undefined) => void;
  index: number;
}

export const ResultGlyph = ({ ...props }: ResultGlyphProps) => {
  const { addrArray, setAddrArray, index } = props;

  const [isSelected, setIsSelected] = useState<boolean>(false);

  const hex = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    () => addrArray[index]!.toString(16).toUpperCase(),
    [addrArray, index],
  );

  return (
    <Popover computePositionOnMount={true} onClose={() => setIsSelected(false)}>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <button
              className={clsx(styles.button, isSelected && styles.isSelected)}
              onClick={() => setIsSelected(!isSelected)}
            >
              <span className={styles.glyph}>{hex}</span>
              {/* <span className={styles.label}>{addrArray[index]! + 1}</span> */}
            </button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent borderColor='blue.800'>
              <PopoverArrow boxShadow='-1px -1px 0px 0 var(--chakra-colors-blue-800)' />
              <PopoverCloseButton />
              <PopoverHeader>Fix the incorrect glyph.</PopoverHeader>
              <PopoverBody>
                <ResultEditor
                  addrArray={addrArray}
                  index={index}
                  onClose={onClose}
                  setAddrArray={setAddrArray}
                />
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
};
