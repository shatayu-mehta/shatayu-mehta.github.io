import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { fadeUp } from './variants';

interface RevealProps {
  children: React.ReactNode;
  variants?: Variants;
  delay?: number;
  className?: string;
  once?: boolean;
}

const Reveal: React.FC<RevealProps> = ({
  children,
  variants = fadeUp,
  delay = 0,
  className,
  once = true,
}) => {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
      variants={variants}
      custom={delay}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
