import { Suspense, useState } from 'react'
import StartupScreen from './components/StartupScreen'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import Scene3D from './components/Scene3D'
import Portfolio from './components/Portfolio'
import Navigation from './components/Navigation'
import EstablishContact from './components/EstablishContact'
import useCursor from './hooks/useCursor'
import './App.css'

function App() {
  const [currentSection, setCurrentSection] = useState('home')
  const [startupDone, setStartupDone] = useState(false)
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

      <Portfolio currentSection={currentSection} />
      <EstablishContact currentSection={currentSection} />
      
      {/* Cyberpunk grid overlay */}
      <div className="grid-overlay" />
      
      {/* Glitch effects */}
      <div className="glitch-overlay" />
    </div>
  )
}

export default App
