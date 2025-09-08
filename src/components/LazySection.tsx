import React, { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  threshold?: number;
}

const LazySection: React.FC<LazySectionProps> = ({ 
  children, 
  fallback = <div style={{ display: 'none', height: 0, width: 0, overflow: 'hidden', position: 'absolute', visibility: 'hidden' }}></div>,
  rootMargin = '100px',
  threshold = 0.1 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div ref={ref}>
      {isVisible ? children : fallback}
    </div>
  );
};

export default LazySection;
