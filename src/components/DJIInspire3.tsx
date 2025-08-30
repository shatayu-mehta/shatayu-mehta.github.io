import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// DJI Inspire 3 3D Model Component
function DJIInspire3() {
  const groupRef = useRef<THREE.Group>(null);
  const rotorRefs = [
    useRef<THREE.Mesh>(null), 
    useRef<THREE.Mesh>(null), 
    useRef<THREE.Mesh>(null), 
    useRef<THREE.Mesh>(null)
  ];

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.2) * 0.2;
      
      // Subtle rotation
      groupRef.current.rotation.y += 0.003;
      
      // Spinning rotors
      rotorRefs.forEach((ref) => {
        if (ref.current) {
          ref.current.rotation.y += 1.2;
        }
      });
    }
  });

  return (
    <group ref={groupRef} scale={1.5}>
      {/* Main fuselage body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.6, 2.5, 12]} />
        <meshBasicMaterial color="#ffffff" wireframe />
      </mesh>
      
      {/* Front nose */}
      <mesh position={[0, 0, 1.5]}>
        <coneGeometry args={[0.6, 0.8, 8]} />
        <meshBasicMaterial color="#ffffff" wireframe />
      </mesh>
      
      {/* Rear body extension */}
      <mesh position={[0, 0, -1.5]}>
        <cylinderGeometry args={[0.6, 0.4, 1, 8]} />
        <meshBasicMaterial color="#ffffff" wireframe />
      </mesh>
      
      {/* Landing gear legs */}
      <group position={[0, -1.2, 0]}>
        <mesh position={[-0.8, 0, 0.8]}>
          <cylinderGeometry args={[0.05, 0.05, 0.8, 6]} />
          <meshBasicMaterial color="#ffffff" wireframe />
        </mesh>
        <mesh position={[0.8, 0, 0.8]}>
          <cylinderGeometry args={[0.05, 0.05, 0.8, 6]} />
          <meshBasicMaterial color="#ffffff" wireframe />
        </mesh>
        <mesh position={[-0.8, 0, -0.8]}>
          <cylinderGeometry args={[0.05, 0.05, 0.8, 6]} />
          <meshBasicMaterial color="#ffffff" wireframe />
        </mesh>
        <mesh position={[0.8, 0, -0.8]}>
          <cylinderGeometry args={[0.05, 0.05, 0.8, 6]} />
          <meshBasicMaterial color="#ffffff" wireframe />
        </mesh>
        
        {/* Landing gear feet */}
        <mesh position={[-0.8, -0.4, 0.8]}>
          <sphereGeometry args={[0.1, 6, 6]} />
          <meshBasicMaterial color="#ffffff" wireframe />
        </mesh>
        <mesh position={[0.8, -0.4, 0.8]}>
          <sphereGeometry args={[0.1, 6, 6]} />
          <meshBasicMaterial color="#ffffff" wireframe />
        </mesh>
        <mesh position={[-0.8, -0.4, -0.8]}>
          <sphereGeometry args={[0.1, 6, 6]} />
          <meshBasicMaterial color="#ffffff" wireframe />
        </mesh>
        <mesh position={[0.8, -0.4, -0.8]}>
          <sphereGeometry args={[0.1, 6, 6]} />
          <meshBasicMaterial color="#ffffff" wireframe />
        </mesh>
      </group>
      
      {/* Rotor arms extending from body */}
      {[
        { angle: Math.PI / 4, name: 'front-right' },
        { angle: 3 * Math.PI / 4, name: 'front-left' },
        { angle: 5 * Math.PI / 4, name: 'rear-left' },
        { angle: 7 * Math.PI / 4, name: 'rear-right' }
      ].map((arm, i) => {
        const x = Math.cos(arm.angle) * 2.2;
        const z = Math.sin(arm.angle) * 2.2;
        
        return (
          <group key={i}>
            {/* Rotor arm */}
            <mesh position={[x * 0.5, 0.2, z * 0.5]} rotation={[0, arm.angle, 0]}>
              <boxGeometry args={[0.1, 0.15, 2.2]} />
              <meshBasicMaterial color="#ffffff" wireframe />
            </mesh>
            
            {/* Motor housing */}
            <mesh position={[x, 0.2, z]}>
              <cylinderGeometry args={[0.25, 0.3, 0.4, 8]} />
              <meshBasicMaterial color="#ffffff" wireframe />
            </mesh>
            
            {/* Rotor blades */}
            <group position={[x, 0.5, z]} ref={rotorRefs[i]}>
              {/* Main rotor blade */}
              <mesh>
                <boxGeometry args={[0.02, 0.02, 1.8]} />
                <meshBasicMaterial color="#ffffff" wireframe />
              </mesh>
              {/* Cross blade */}
              <mesh rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[0.02, 0.02, 1.8]} />
                <meshBasicMaterial color="#ffffff" wireframe />
              </mesh>
            </group>
          </group>
        );
      })}
      
      {/* Gimbal camera system */}
      <mesh position={[0, -0.8, 0.8]}>
        <sphereGeometry args={[0.4, 8, 8]} />
        <meshBasicMaterial color="#ffffff" wireframe />
      </mesh>
      
      {/* Camera lens */}
      <mesh position={[0, -1.1, 1.1]}>
        <cylinderGeometry args={[0.2, 0.15, 0.3, 8]} />
        <meshBasicMaterial color="#ffffff" wireframe />
      </mesh>
      
      {/* Antenna/GPS modules */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.3, 6]} />
        <meshBasicMaterial color="#ffffff" wireframe />
      </mesh>
      
      {/* Wing/Stabilizer fins */}
      <mesh position={[0, 0.3, -2]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.8, 0.02, 0.4]} />
        <meshBasicMaterial color="#ffffff" wireframe />
      </mesh>
      <mesh position={[0, 0.3, -2]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.02, 0.6, 0.4]} />
        <meshBasicMaterial color="#ffffff" wireframe />
      </mesh>
    </group>
  );
}

export default function DJIInspire3Model() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas 
        camera={{ position: [5, 3, 5], fov: 50 }} 
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.6} color="#ffffff" />
        <directionalLight position={[2, 2, 2]} intensity={0.5} color="#ffffff" />
        
        <DJIInspire3 />
        
        <OrbitControls 
          enablePan={false} 
          enableZoom={false} 
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* Model label */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(255,255,255,0.1)',
        border: '1px solid #ffffff',
        borderRadius: '6px',
        padding: '8px 16px',
        color: '#ffffff',
        fontFamily: 'monospace',
        fontSize: '0.8rem',
        textAlign: 'center',
        backdropFilter: 'blur(5px)',
      }}>
        DJI Inspire 3
      </div>
    </div>
  );
}
