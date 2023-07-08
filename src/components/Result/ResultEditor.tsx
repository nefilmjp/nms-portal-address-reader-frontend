import { useId } from 'react';

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

  return (
    <div className={styles.editor}>
      {[...Array(16)]
        .map((_, i) => i)
        .map((_, idx) => (
          <button
            className={styles.button}
            key={`${id}-${idx}`}
            onClick={() => {
              const newAddrArray = [...addrArray] as AddressArray;
              newAddrArray.splice(index, 1, idx as GlyphNumber);
              setAddrArray(newAddrArray);
              onClose();
            }}
          >
            <span className={styles.glyph}>
              {idx.toString(16).toUpperCase()}
            </span>
            {/* <span className={styles.label}>{idx + 1}</span> */}
          </button>
        ))}
    </div>
  );
};
