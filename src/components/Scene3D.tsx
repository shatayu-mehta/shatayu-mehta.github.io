import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Text, Box, Sphere, Torus, Cylinder } from '@react-three/drei'
import { useBox, useSphere, usePlane } from '@react-three/cannon'
import * as THREE from 'three'

interface Scene3DProps {
  currentSection: string
}

const RobotArm = () => {
  const armRef = useRef<THREE.Group>(null)
  
  useFrame(({ clock }) => {
    if (armRef.current) {
      armRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.5) * 0.3
      armRef.current.children[1].rotation.z = Math.sin(clock.elapsedTime * 0.8) * 0.5
    }
  })

  return (
    <group ref={armRef} position={[3, 0, 0]}>
      {/* Base */}
      <Cylinder args={[0.8, 1, 0.5]} position={[0, -2, 0]}>
        <meshStandardMaterial color="#00ffff" emissive="#003333" />
      </Cylinder>
      
      {/* First joint */}
      <group position={[0, -1.5, 0]}>
        <Box args={[0.3, 1.5, 0.3]}>
          <meshStandardMaterial color="#ff0080" emissive="#330020" />
        </Box>
        
        {/* Second joint */}
        <group position={[0, 1, 0]} rotation={[0, 0, 0]}>
          <Box args={[0.25, 1.2, 0.25]}>
            <meshStandardMaterial color="#80ff00" emissive="#203300" />
          </Box>
          
          {/* End effector */}
          <group position={[0, 0.8, 0]}>
            <Sphere args={[0.15]}>
              <meshStandardMaterial color="#ffff00" emissive="#333300" />
            </Sphere>
          </group>
        </group>
      </group>
    </group>
  )
}

const FloatingCADObjects = () => {
  const objects = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 15
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
      type: i % 3
    })), []
  )

  return (
    <>
      {objects.map((obj, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <group position={obj.position} rotation={obj.rotation}>
            {obj.type === 0 && (
              <Box args={[0.5, 0.5, 0.5]}>
                <meshStandardMaterial 
                  color="#00ffff" 
                  emissive="#003333" 
                  transparent 
                  opacity={0.8} 
                />
              </Box>
            )}
            {obj.type === 1 && (
              <Torus args={[0.4, 0.15, 8, 16]}>
                <meshStandardMaterial 
                  color="#ff0080" 
                  emissive="#330020" 
                  transparent 
                  opacity={0.8} 
                />
              </Torus>
            )}
            {obj.type === 2 && (
              <Cylinder args={[0.3, 0.3, 0.8, 8]}>
                <meshStandardMaterial 
                  color="#80ff00" 
                  emissive="#203300" 
                  transparent 
                  opacity={0.8} 
                />
              </Cylinder>
            )}
          </group>
        </Float>
      ))}
    </>
  )
}

const PhysicsObjects = () => {
  const [ref1] = useBox(() => ({ 
    mass: 1, 
    position: [-4, 5, 0],
    args: [0.5, 0.5, 0.5]
  }))
  
  const [ref2] = useSphere(() => ({ 
    mass: 1, 
    position: [4, 5, 0],
    args: [0.3]
  }))

  const [floorRef] = usePlane(() => ({ 
    rotation: [-Math.PI / 2, 0, 0], 
    position: [0, -5, 0],
    material: { friction: 0.4, restitution: 0.3 }
  }))

  return (
    <>
      <mesh ref={ref1} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#ff6600" emissive="#332200" />
      </mesh>
      
      <mesh ref={ref2} castShadow>
        <sphereGeometry args={[0.3]} />
        <meshStandardMaterial color="#6600ff" emissive="#220033" />
      </mesh>
      
      {/* Physics floor */}
      <mesh ref={floorRef} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>
    </>
  )
}

const CyberpunkGrid = () => {
  const gridRef = useRef<THREE.Group>(null)
  
  useFrame(({ clock }) => {
    if (gridRef.current) {
      gridRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <group ref={gridRef} position={[0, -4, 0]}>
      <gridHelper args={[20, 20, '#00ffff', '#003333']} />
    </group>
  )
}

export default function Scene3D({ currentSection }: Scene3DProps) {
  // Dynamic title based on current section
  const getTitleText = () => {
    switch (currentSection) {
      case 'about': return 'DIGITAL ARCHITECT'
      case 'experience': return 'SYSTEM DESIGNER'
      case 'projects': return 'CODE CRAFTSMAN'
      case 'skills': return 'TECH WIZARD'
      case 'contact': return 'READY TO CONNECT'
      default: return 'SHATAYU MEHTA'
    }
  }

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff0080" />
      <spotLight 
        position={[0, 10, 0]} 
        angle={0.3} 
        penumbra={1} 
        intensity={1} 
        color="#80ff00"
        castShadow
      />

      {/* Main title */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        <Text
          position={[0, 2, 0]}
          fontSize={1.2}
          color="#00ffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/cyberpunk.woff"
        >
          {getTitleText()}
        </Text>
        
        <Text
          position={[0, 0.5, 0]}
          fontSize={0.4}
          color="#ff0080"
          anchorX="center"
          anchorY="middle"
        >
          Robotics Engineer & Control Systems Specialist
        </Text>
      </Float>

      {/* Robot arm */}
      <RobotArm />
      
      {/* Floating CAD objects */}
      <FloatingCADObjects />
      
      {/* Physics objects */}
      <PhysicsObjects />
      
      {/* Cyberpunk grid */}
      <CyberpunkGrid />
      
      {/* Particle system */}
      <group>
        {Array.from({ length: 50 }, (_, i) => (
          <Float key={i} speed={Math.random() * 2 + 1}>
            <mesh 
              position={[
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 30
              ]}
            >
              <sphereGeometry args={[0.02]} />
              <meshBasicMaterial color="#00ffff" />
            </mesh>
          </Float>
        ))}
      </group>
    </>
  )
}
