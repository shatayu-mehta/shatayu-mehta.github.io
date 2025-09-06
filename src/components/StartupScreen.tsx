import { useState, useEffect } from 'react'

interface StartupScreenProps {
  imageUrl: string
  duration: number
  onComplete: () => void
}

const StartupScreen: React.FC<StartupScreenProps> = ({ imageUrl, duration, onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('INITIALIZING SYSTEM...')

  const loadingMessages = [
    'INITIALIZING SYSTEM...',
    'LOADING ROBOTIC PROTOCOLS...',
    'CALIBRATING SENSORS...',
    'ESTABLISHING NEURAL NETWORK...',
    'IMPORTING CAD LIBRARIES...',
    'OPTIMIZING PERFORMANCE...',
    'SYSTEM READY'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (duration / 100))
        
        // Update loading text based on progress
        const messageIndex = Math.floor((newProgress / 100) * (loadingMessages.length - 1))
        setLoadingText(loadingMessages[messageIndex] || loadingMessages[0])
        
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 500)
          return 100
        }
        return newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [duration, onComplete])

  return (
    <div className="startup-screen">
      <div 
        className="startup-background" 
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="startup-overlay" />
      <div className="startup-grid" />
      
      <div className="startup-content">
        <div className="startup-logo">
          <h1 className="logo-text glitch" data-text="SHATAYU">
            SHATAYU
          </h1>
          <p className="logo-subtitle">ROBOTICS ENGINEER</p>
        </div>
        
        <div className="loading-container">
          <div className="loading-text">{loadingText}</div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="progress-text">{Math.round(progress)}%</div>
        </div>
      </div>
    </div>
  )
}

export default StartupScreen
