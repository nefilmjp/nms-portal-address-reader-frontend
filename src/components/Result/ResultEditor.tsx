import clsx from 'clsx';
import { useId, useMemo } from 'react';

import styles from './Result.module.scss';

import type { AddressArray, GlyphNumber } from '@/types';

interface ResultEditorProps {
  addrArray: AddressArray;
  setAddrArray: (addrArray: AddressArray | undefined) => void;
  index: number;
  onClose: () => void;
}

export const ResultEditor = ({ ...props }: ResultEditorProps) => {
  const { addrArray, setAddrArray, index, onClose } = props;

  const id = useId();

  const isSelected = useMemo(
    () => (idx: number) => addrArray[index] === idx,
    [addrArray, index],
  );

  return (
    <div className={styles.editor}>
      {[...Array(16)]
        .map((_, i) => i)
        .map((_, idx) => (
          <button
            key={`${id}-${idx}`}
            className={clsx(
              styles.button,
              isSelected(idx) && styles.isSelected,
            )}
            onClick={() => {
              const newAddrArray = [...addrArray] as AddressArray;
              newAddrArray.splice(index, 1, idx as GlyphNumber);
              setAddrArray(newAddrArray);
              onClose();
            }}
          >
            <span className={clsx(styles.glyph, styles.isPopover)}>
              {idx.toString(16).toUpperCase()}
            </span>
            {/* <span className={styles.label}>{idx + 1}</span> */}
          </button>
        ))}
    </div>
  );
};
