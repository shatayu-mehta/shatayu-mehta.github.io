import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen: React.FC = () => {
  const [loadingText, setLoadingText] = useState<string>('INITIALIZING');
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const loadingSteps = [
      { text: 'INITIALIZING SYSTEMS', duration: 500 },
      { text: 'LOADING COMPONENTS', duration: 800 },
      { text: 'ESTABLISHING CONNECTIONS', duration: 600 },
      { text: 'CALIBRATING SENSORS', duration: 400 },
      { text: 'READY FOR DEPLOYMENT', duration: 300 },
    ];

    let currentStep = 0;
    let currentProgress = 0;

    const updateLoading = () => {
      if (currentStep < loadingSteps.length) {
        setLoadingText(loadingSteps[currentStep].text);
        
        const targetProgress = ((currentStep + 1) / loadingSteps.length) * 100;
        
        const progressInterval = setInterval(() => {
          currentProgress += 2;
          setProgress(Math.min(currentProgress, targetProgress));
          
          if (currentProgress >= targetProgress) {
            clearInterval(progressInterval);
            setTimeout(() => {
              currentStep++;
              updateLoading();
            }, loadingSteps[currentStep].duration);
          }
        }, 20);
      }
    };

    updateLoading();
  }, []);

  return (
    <div className="loading-screen">
      <div className="loading-container">
        {/* Circuit Animation Background */}
        <div className="circuit-background">
          <div className="circuit-line circuit-line-1"></div>
          <div className="circuit-line circuit-line-2"></div>
          <div className="circuit-line circuit-line-3"></div>
        </div>

        {/* Main Logo/Icon */}
        <div className="loading-logo">
          <div className="logo-ring">
            <div className="logo-inner">
              <span className="logo-text">SM</span>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="loading-text-container">
          <h2 className="loading-title gradient-text">SHATAYU MEHTA</h2>
          <p className="loading-subtitle">ROBOTICS ENGINEER</p>
          <div className="loading-status">
            <span className="status-text text-mono">{loadingText}</span>
            <span className="status-dots">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="loading-progress">
          <div className="progress-container">
            <div 
              className="progress-bar"
              style={{ width: `${progress}%` }}
            />
            <div className="progress-glow" />
          </div>
          <div className="progress-text">
            <span className="text-mono">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Particle Effects */}
        <div className="particle-container">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
