import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { EASE_EXPO } from './variants';

interface SplitTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  charClassName?: string;
  mode?: 'words' | 'chars';
  staggerDelay?: number;
  variants?: Variants;
  once?: boolean;
}

const wordVariants: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: { duration: 0.75, ease: EASE_EXPO, delay: i * 0.06 },
  }),
};

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className,
  wordClassName,
  mode = 'words',
  staggerDelay: _staggerDelay = 0.06,
  variants = wordVariants,
  once = true,
}) => {
  const reduced = useReducedMotion();
  const tokens = useMemo(
    () => (mode === 'chars' ? text.split('') : text.split(' ')),
    [text, mode]
  );

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      aria-label={text}
      style={{ display: 'inline-block', overflow: 'hidden' }}
    >
      {tokens.map((token, i) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}
          className={wordClassName}
        >
          <motion.span
            custom={i}
            variants={variants}
            style={{ display: 'inline-block' }}
          >
            {token}
            {mode === 'words' && i < tokens.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

export default SplitText;
