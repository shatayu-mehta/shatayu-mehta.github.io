import { useState } from 'react'
import StartupScreen from './components/StartupScreen'
// import { Suspense } from 'react'
// import { Canvas } from '@react-three/fiber'
// import { Environment, OrbitControls } from '@react-three/drei'
// import { Physics } from '@react-three/cannon'
// import Scene3D from './components/Scene3D'
import Portfolio from './components/Portfolio'
import Navigation from './components/Navigation'
import EstablishContact from './components/EstablishContact'
import useCursor from './hooks/useCursor'
import './App.css'

function App() {
  const [currentSection, setCurrentSection] = useState('home')
  const [startupDone, setStartupDone] = useState(false)
  
  console.log('Current section:', currentSection) // Debug log
  
  // Custom cursor hook
  useCursor()

  if (!startupDone) {
    return (
      <StartupScreen imageUrl="/cyberpunk_city_bg.jpg" duration={3500} onComplete={() => setStartupDone(true)} />
    )
  }

  return (
    <div className="app">
      <Navigation currentSection={currentSection} setCurrentSection={setCurrentSection} />
      
      {/* Temporarily disable 3D canvas to fix crashes */}
      {/*
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <Environment preset="night" />
            <Physics>
              <Scene3D currentSection={currentSection} />
            </Physics>
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 3}
            />
          </Suspense>
        </Canvas>
      </div>
      */}

      <Portfolio currentSection={currentSection} />
      <EstablishContact currentSection={currentSection} />
      
      {/* About page background image */}
      {currentSection === 'about' && (
        <div className="about-background-image">
          <img 
            src="/For_about_page.png" 
            alt="Shatayu Mehta - Robotics Engineer" 
            className="about-bg-image"
          />
        </div>
      )}
      
      {/* Cyberpunk grid overlay */}
      {currentSection !== 'about' && <div className="grid-overlay" />}
      
      {/* Glitch effects */}
      <div className="glitch-overlay" />
    </div>
  )
}

export default App
