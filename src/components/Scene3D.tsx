import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Sphere, Torus, Text3D } from '@react-three/drei'
import { useBox, useSphere } from '@react-three/cannon'
import * as THREE from 'three'

interface Scene3DProps {
  currentSection: string
}

// Floating Robot Arm Component
const RobotArm: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Base */}
      <Box args={[0.3, 0.1, 0.3]} position={[0, -0.5, 0]}>
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.2} />
      </Box>
      
      {/* First Joint */}
      <Box args={[0.15, 0.4, 0.15]} position={[0, -0.2, 0]}>
        <meshStandardMaterial color="#ff0080" emissive="#ff0080" emissiveIntensity={0.2} />
      </Box>
      
      {/* Second Joint */}
      <Box args={[0.1, 0.3, 0.1]} position={[0, 0.2, 0]} rotation={[0, 0, Math.sin(Date.now() * 0.001) * 0.3]}>
        <meshStandardMaterial color="#80ff00" emissive="#80ff00" emissiveIntensity={0.2} />
      </Box>
      
      {/* End Effector */}
      <Sphere args={[0.05]} position={[0, 0.4, 0]}>
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
      </Sphere>
    </group>
  )
}

// Falling Physics Objects
const FallingBox: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const [ref] = useBox(() => ({
    mass: 1,
    position,
    args: [0.2, 0.2, 0.2]
  }))

  return (
    <Box ref={ref} args={[0.2, 0.2, 0.2]}>
      <meshStandardMaterial color="#00ffff" transparent opacity={0.8} />
    </Box>
  )
}

const FallingSphere: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const [ref] = useSphere(() => ({
    mass: 1,
    position,
    args: [0.1]
  }))

  return (
    <Sphere ref={ref} args={[0.1]}>
      <meshStandardMaterial color="#ff0080" transparent opacity={0.8} />
    </Sphere>
  )
}

// CAD-style Objects
const CADObjects: React.FC = () => {
  const torusRef = useRef<THREE.Mesh>(null)
  const boxRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.3
      torusRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
    if (boxRef.current) {
      boxRef.current.rotation.x = state.clock.elapsedTime * 0.2
      boxRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group>
      <Torus ref={torusRef} args={[0.3, 0.1, 16, 32]} position={[-2, 1, -2]}>
        <meshStandardMaterial 
          color="#80ff00" 
          wireframe 
          emissive="#80ff00" 
          emissiveIntensity={0.1} 
        />
      </Torus>
      
      <Box ref={boxRef} args={[0.4, 0.4, 0.4]} position={[2, 0.5, -2]}>
        <meshStandardMaterial 
          color="#0080ff" 
          wireframe 
          emissive="#0080ff" 
          emissiveIntensity={0.1} 
        />
      </Box>
    </group>
  )
}

// Dynamic Title based on current section
const DynamicTitle: React.FC<{ currentSection: string }> = ({ currentSection }) => {
  const titleMap: { [key: string]: string } = {
    home: 'SHATAYU',
    about: 'ENGINEER',
    experience: 'BUILDER',
    projects: 'CREATOR',
    skills: 'EXPERT',
    contact: 'CONNECT'
  }

  return (
    <Text3D
      font="/fonts/orbitron_regular.json"
      size={0.3}
      height={0.05}
      position={[-1, 2, -3]}
    >
      {titleMap[currentSection] || 'ROBOTICS'}
      <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.3} />
    </Text3D>
  )
}

// Main Scene Component
const Scene3D: React.FC<Scene3DProps> = ({ currentSection }) => {
  useEffect(() => {
    console.log('3D Scene loaded for section:', currentSection)
  }, [currentSection])

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} color="#00ffff" />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ff0080" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#80ff00" />
      <spotLight 
        position={[0, 10, 0]} 
        angle={0.3} 
        penumbra={1} 
        intensity={1} 
        color="#00ffff"
        castShadow 
      />

      {/* Dynamic Title */}
      <DynamicTitle currentSection={currentSection} />

      {/* Robot Arm */}
      <RobotArm position={[0, 0, 0]} />

      {/* CAD Objects */}
      <CADObjects />

      {/* Physics Objects */}
      <FallingBox position={[1, 5, 0]} />
      <FallingSphere position={[-1, 6, 0]} />
      <FallingBox position={[0.5, 7, -1]} />

      {/* Grid Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
        <planeGeometry args={[20, 20, 20, 20]} />
        <meshStandardMaterial 
          color="#0a0a0a" 
          wireframe 
          emissive="#00ffff" 
          emissiveIntensity={0.05} 
        />
      </mesh>

      {/* Particle System */}
      {Array.from({ length: 50 }, (_, i) => (
        <Sphere key={i} args={[0.01]} position={[
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ]}>
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#ffffff" 
            emissiveIntensity={0.5}
            transparent
            opacity={0.3}
          />
        </Sphere>
      ))}
    </>
  )
}

export default Scene3D
