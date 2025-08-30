import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

// Improved realistic drone
type DroneProps = {
  targetPosition: THREE.Vector3;
};

function RealisticDrone({ targetPosition }: DroneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const propellerRefs = [useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null)];

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth movement towards target
      groupRef.current.position.lerp(targetPosition, 0.03);
      
      // Gentle floating animation
      const floatY = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.15;
      groupRef.current.position.y += floatY;
      
      // Slight rotation when moving
      const targetRotation = (targetPosition.x - groupRef.current.position.x) * 0.1;
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotation, 0.05);
      
      // Rotate propellers
      propellerRefs.forEach((ref) => {
        if (ref.current) {
          ref.current.rotation.y += 0.8;
        }
      });
    }
  });

  return (
    <group ref={groupRef} scale={1.2}>
      {/* Main drone body - central hub */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 8]} />
        <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.9} />
      </mesh>
      
      {/* Drone arms extending from center */}
      {[
        { angle: 0, name: 'front-right' },
        { angle: Math.PI / 2, name: 'back-right' },
        { angle: Math.PI, name: 'back-left' },
        { angle: 3 * Math.PI / 2, name: 'front-left' }
      ].map((arm, i) => {
        const x = Math.cos(arm.angle) * 1.2;
        const z = Math.sin(arm.angle) * 1.2;
        
        return (
          <group key={i}>
            {/* Arm extending from center */}
            <mesh position={[x * 0.5, 0, z * 0.5]} rotation={[0, arm.angle, 0]}>
              <cylinderGeometry args={[0.03, 0.03, 1.2, 8]} />
              <meshBasicMaterial color="#00ffff" wireframe />
            </mesh>
            
            {/* Motor at end of arm */}
            <mesh position={[x, 0, z]}>
              <cylinderGeometry args={[0.15, 0.15, 0.3, 8]} />
              <meshBasicMaterial color="#00ffff" wireframe />
            </mesh>
            
            {/* Propeller blades */}
            <group position={[x, 0.2, z]} ref={propellerRefs[i]}>
              <mesh>
                <boxGeometry args={[0.02, 0.02, 0.8]} />
                <meshBasicMaterial color="#00ffff" wireframe />
              </mesh>
              <mesh rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[0.02, 0.02, 0.8]} />
                <meshBasicMaterial color="#00ffff" wireframe />
              </mesh>
            </group>
          </group>
        );
      })}
      
      {/* Camera/projector gimbal */}
      <mesh position={[0, -0.4, 0]}>
        <sphereGeometry args={[0.25, 8, 8]} />
        <meshBasicMaterial color="#ff00ff" wireframe />
      </mesh>
      
      {/* Projector lens - glowing */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 0.2, 8]} />
        <meshBasicMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

// 3D Social Media Icons
type SocialIcon3DProps = {
  position: [number, number, number];
  type: 'linkedin' | 'github' | 'email' | 'resume' | 'phone';
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
};

function SocialIcon3D({ position, type, isHovered, onHover, onLeave, onClick }: SocialIcon3DProps) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.y += 0.008;
      
      // Scale and elevation when hovered
      const targetScale = isHovered ? 1.5 : 1.2;
      const targetY = isHovered ? position[1] + 0.5 : position[1];
      
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.1);
    }
  });

  const getIconGeometry = () => {
    switch (type) {
      case 'linkedin':
        return (
          <group>
            {/* LinkedIn square */}
            <mesh>
              <boxGeometry args={[1.2, 1.2, 0.3]} />
              <meshBasicMaterial 
                color={isHovered ? "#0077B5" : "#444"} 
                wireframe={!isHovered}
                transparent
                opacity={isHovered ? 1 : 0.7}
              />
            </mesh>
            {/* "in" text effect */}
            <mesh position={[0, 0, 0.2]}>
              <boxGeometry args={[0.8, 0.8, 0.1]} />
              <meshBasicMaterial 
                color={isHovered ? "#ffffff" : "#00ffff"} 
                emissive={isHovered ? "#ffffff" : "#00ffff"}
                emissiveIntensity={isHovered ? 0.5 : 0.2}
              />
            </mesh>
          </group>
        );
      case 'github':
        return (
          <group>
            {/* GitHub octagon */}
            <mesh>
              <cylinderGeometry args={[0.8, 0.8, 0.3, 8]} />
              <meshBasicMaterial 
                color={isHovered ? "#333" : "#444"} 
                wireframe={!isHovered}
                transparent
                opacity={isHovered ? 1 : 0.7}
              />
            </mesh>
            {/* Cat symbol */}
            <mesh position={[0, 0, 0.2]}>
              <sphereGeometry args={[0.4, 8, 8]} />
              <meshBasicMaterial 
                color={isHovered ? "#fff" : "#00ffff"} 
                emissive={isHovered ? "#fff" : "#00ffff"}
                emissiveIntensity={isHovered ? 0.5 : 0.2}
              />
            </mesh>
          </group>
        );
      case 'email':
        return (
          <group>
            {/* Email envelope */}
            <mesh>
              <boxGeometry args={[1.4, 1, 0.2]} />
              <meshBasicMaterial 
                color={isHovered ? "#EA4335" : "#444"} 
                wireframe={!isHovered}
                transparent
                opacity={isHovered ? 1 : 0.7}
              />
            </mesh>
            {/* @ symbol */}
            <mesh position={[0, 0, 0.15]}>
              <torusGeometry args={[0.3, 0.1, 8, 16]} />
              <meshBasicMaterial 
                color={isHovered ? "#ffffff" : "#00ffff"} 
                emissive={isHovered ? "#ffffff" : "#00ffff"}
                emissiveIntensity={isHovered ? 0.5 : 0.2}
              />
            </mesh>
          </group>
        );
      case 'resume':
        return (
          <group>
            {/* Document */}
            <mesh>
              <boxGeometry args={[1, 1.4, 0.2]} />
              <meshBasicMaterial 
                color={isHovered ? "#ffffff" : "#444"} 
                wireframe={!isHovered}
                transparent
                opacity={isHovered ? 1 : 0.7}
              />
            </mesh>
            {/* Text lines */}
            {[0.3, 0, -0.3].map((y, i) => (
              <mesh key={i} position={[0, y, 0.15]}>
                <boxGeometry args={[0.7, 0.08, 0.02]} />
                <meshBasicMaterial 
                  color={isHovered ? "#333" : "#00ffff"} 
                  emissive={isHovered ? "#333" : "#00ffff"}
                  emissiveIntensity={isHovered ? 0.2 : 0.3}
                />
              </mesh>
            ))}
          </group>
        );
      case 'phone':
        return (
          <group>
            {/* Phone body */}
            <mesh>
              <boxGeometry args={[0.7, 1.3, 0.2]} />
              <meshBasicMaterial 
                color={isHovered ? "#34A853" : "#444"} 
                wireframe={!isHovered}
                transparent
                opacity={isHovered ? 1 : 0.7}
              />
            </mesh>
            {/* Phone symbol */}
            <mesh position={[0, 0, 0.15]}>
              <torusGeometry args={[0.25, 0.08, 6, 12]} />
              <meshBasicMaterial 
                color={isHovered ? "#ffffff" : "#00ffff"} 
                emissive={isHovered ? "#ffffff" : "#00ffff"}
                emissiveIntensity={isHovered ? 0.5 : 0.3}
              />
            </mesh>
          </group>
        );
    }
  };

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerEnter={onHover}
      onPointerLeave={onLeave}
      onClick={onClick}
    >
      {getIconGeometry()}
      
      {/* Glow effect when hovered */}
      {isHovered && (
        <mesh position={[0, 0, -0.1]}>
          <sphereGeometry args={[2, 16, 16]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.15} />
        </mesh>
      )}
      
      {/* Always visible wireframe outline */}
      <mesh position={[0, 0, 0]} scale={1.1}>
        <boxGeometry args={[1.5, 1.5, 0.1]} />
        <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

// Mouse tracking
function MouseTracker({ onMouseMove }: { onMouseMove: (position: THREE.Vector3) => void }) {
  const { camera, gl } = useThree();
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      
      // Project to z=0 plane
      const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const intersection = new THREE.Vector3();
      raycaster.ray.intersectPlane(planeZ, intersection);
      
      if (intersection) {
        onMouseMove(intersection);
      }
    };

    gl.domElement.addEventListener('mousemove', handleMouseMove);
    return () => gl.domElement.removeEventListener('mousemove', handleMouseMove);
  }, [camera, gl, onMouseMove]);

  return null;
}

const socialIcons = [
  { 
    position: [-4, 1.5, 0] as [number, number, number], 
    type: 'linkedin' as const,
    label: 'LinkedIn Profile', 
    link: 'https://linkedin.com/in/shatayu-mehta',
    id: 'linkedin'
  },
  { 
    position: [4, 1.5, 0] as [number, number, number], 
    type: 'github' as const,
    label: 'GitHub Repository', 
    link: 'https://github.com/shatayu-mehta',
    id: 'github'
  },
  { 
    position: [-4, -1.5, 0] as [number, number, number], 
    type: 'email' as const,
    label: 'Send Email', 
    link: 'mailto:shatayu@example.com',
    id: 'email'
  },
  { 
    position: [0, -1.5, 0] as [number, number, number], 
    type: 'resume' as const,
    label: 'Download Resume', 
    link: '/RESUME_S_A_M.pdf',
    id: 'resume'
  },
  { 
    position: [4, -1.5, 0] as [number, number, number], 
    type: 'phone' as const,
    label: 'Call Me', 
    link: 'tel:+1234567890',
    id: 'phone'
  },
];

export default function DroneHologram() {
  const [mousePosition, setMousePosition] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [droneTarget, setDroneTarget] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  const handleMouseMove = (position: THREE.Vector3) => {
    setMousePosition(position);
    // Constrain drone movement to reasonable bounds
    setDroneTarget(new THREE.Vector3(
      Math.max(-6, Math.min(6, position.x * 0.6)), 
      Math.max(-2, Math.min(2, position.y * 0.6)), 
      0
    ));
  };

  const handleIconHover = (iconId: string | null) => {
    setHoveredIcon(iconId);
    if (iconId) {
      const icon = socialIcons.find(i => i.id === iconId);
      if (icon) {
        // Move drone towards the hovered icon
        setDroneTarget(new THREE.Vector3(
          icon.position[0] * 0.7, 
          icon.position[1] * 0.7 + 1, // Hover above the icon
          -0.5
        ));
      }
    }
  };

  const handleIconClick = (link: string) => {
    if (link.startsWith('mailto:') || link.startsWith('tel:')) {
      window.location.href = link;
    } else {
      window.open(link, '_blank');
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 75 }} 
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[8, 8, 8]} intensity={0.8} color="#00ffff" />
        <pointLight position={[-8, -8, 8]} intensity={0.6} color="#ff00ff" />
        <directionalLight position={[0, 5, 5]} intensity={0.5} color="#ffffff" />
        
        <MouseTracker onMouseMove={handleMouseMove} />
        
        <RealisticDrone targetPosition={droneTarget} />
        
        {socialIcons.map((iconData) => (
          <SocialIcon3D
            key={iconData.id}
            position={iconData.position}
            type={iconData.type}
            isHovered={hoveredIcon === iconData.id}
            onHover={() => handleIconHover(iconData.id)}
            onLeave={() => handleIconHover(null)}
            onClick={() => handleIconClick(iconData.link)}
          />
        ))}
        
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
      </Canvas>
      
      {/* Instructions */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0,255,255,0.1)',
        border: '1px solid #00ffff',
        borderRadius: '8px',
        padding: '12px 24px',
        color: '#00ffff',
        fontFamily: 'monospace',
        fontSize: '1rem',
        textAlign: 'center',
        backdropFilter: 'blur(10px)',
      }}>
        Guide the surveillance drone with your cursor • Hover over 3D icons to investigate
      </div>
    </div>
  );
}
