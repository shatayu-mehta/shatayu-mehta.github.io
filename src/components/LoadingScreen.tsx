import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: () => void
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('INITIALIZING...')

  const loadingSteps = [
    'INITIALIZING...',
    'LOADING NEURAL NETWORKS...',
    'CALIBRATING ROBOTICS SYSTEMS...',
    'RENDERING CAD MODELS...',
    'ESTABLISHING CONNECTION...',
    'WELCOME TO THE MATRIX'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15
        const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length)
        setLoadingText(loadingSteps[Math.min(stepIndex, loadingSteps.length - 1)])
        
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 1000)
          return 100
        }
        return newProgress
      })
    }, 200)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div 
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="loading-content">
        <motion.h1 
          className="loading-title"
          animate={{ 
            textShadow: [
              '0 0 5px #00ffff',
              '0 0 20px #00ffff, 0 0 30px #ff0080',
              '0 0 5px #00ffff'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="glitch" data-text="SHATAYU.EXE">SHATAYU.EXE</span>
        </motion.h1>
        
        <div className="loading-bar-container">
          <div className="loading-bar">
            <motion.div 
              className="loading-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="loading-percentage">{Math.floor(progress)}%</span>
        </div>
        
        <motion.p 
          className="loading-text"
          key={loadingText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {loadingText}
        </motion.p>
        
        <div className="loading-matrix">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.span
              key={i}
              className="matrix-char"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ 
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            >
              {String.fromCharCode(65 + Math.random() * 26)}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default LoadingScreen
