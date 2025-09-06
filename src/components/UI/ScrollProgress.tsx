import React, { useState, useEffect } from 'react';
import './ScrollProgress.css';

const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(currentProgress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-progress-container">
      <div 
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="scroll-progress-glow" />
    </div>
  );
};

export default ScrollProgress;
