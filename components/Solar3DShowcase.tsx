"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Environment, 
  ContactShadows, 
  PresentationControls,
  Float,
  Text,
  MeshTransmissionMaterial
} from "@react-three/drei";
import * as THREE from "three";

// A procedural, premium-looking 3D Solar Panel
function SolarPanel(props: any) {
  const group = useRef<THREE.Group>(null);
  
  return (
    <group ref={group} {...props}>
      {/* Main Panel Frame (Aluminum) */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[3, 4, 0.1]} />
        <meshStandardMaterial 
          color="#8892b0" 
          metalness={0.8} 
          roughness={0.2} 
        />
      </mesh>

      {/* Solar Cells (Dark Blue/Glassy) */}
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[2.8, 3.8]} />
        <meshPhysicalMaterial 
          color="#0b1b3d"
          metalness={0.9}
          roughness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          envMapIntensity={2.0}
        />
      </mesh>

      {/* Grid Lines on the Solar Cells */}
      <mesh position={[0, 0, 0.07]}>
        <planeGeometry args={[2.8, 3.8]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent={true} 
          opacity={0.15} 
          wireframe={true} 
        />
      </mesh>

      {/* Glass overlay */}
      <mesh position={[0, 0, 0.08]}>
        <planeGeometry args={[2.8, 3.8]} />
        <MeshTransmissionMaterial 
          thickness={0.1}
          roughness={0}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.02}
          backside={true}
        />
      </mesh>
    </group>
  );
}

// A procedural, premium 3D Inverter
function Inverter(props: any) {
  return (
    <group {...props}>
      {/* Main Body */}
      <mesh castShadow>
        <boxGeometry args={[1.5, 2, 0.8]} />
        <meshStandardMaterial 
          color="#e2e8f0" 
          metalness={0.3} 
          roughness={0.2} 
        />
      </mesh>
      
      {/* Digital Screen */}
      <mesh position={[0, 0.4, 0.41]}>
        <planeGeometry args={[0.8, 0.4]} />
        <meshBasicMaterial color="#0f172a" />
      </mesh>
      
      {/* Glowing Text/Numbers on Screen */}
      <Text
        position={[0, 0.4, 0.42]}
        fontSize={0.15}
        color="#38bdf8"
        anchorX="center"
        anchorY="middle"
      >
        {"5.4 kW"}
      </Text>

      {/* Brand accent */}
      <mesh position={[0, -0.6, 0.41]}>
        <planeGeometry args={[1.5, 0.1]} />
        <meshStandardMaterial color="#c9933a" metalness={0.5} roughness={0.2} />
      </mesh>

      {/* Vents */}
      {[-0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6].map((y, i) => (
        <mesh key={i} position={[0.76, y, 0]}>
          <boxGeometry args={[0.02, 0.1, 0.6]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
      ))}
    </group>
  );
}

// Animated grouping that follows mouse slightly
function Scene() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      const t = state.clock.getElapsedTime();
      // Gentle floating and subtle rotation matching mouse
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y, 
        (state.mouse.x * Math.PI) / 10, 
        0.05
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x, 
        (state.mouse.y * Math.PI) / 10, 
        0.05
      );
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <SolarPanel position={[-1.2, 0, 0]} rotation={[0, Math.PI / 8, 0]} />
      </Float>
      
      <Float speed={2} rotationIntensity={0.8} floatIntensity={1.5}>
        <Inverter position={[1.5, -0.5, 0.5]} rotation={[0, -Math.PI / 6, 0]} />
      </Float>
    </group>
  );
}

export default function Solar3DShowcase() {
  return (
    <div className="w-full h-full min-h-[500px] relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-navy via-brand-blue to-black border border-white/10">
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold/10 via-transparent to-transparent opacity-50" />
      
      <Canvas shadows camera={{ position: [0, 0, 6], fov: 45 }}>
        {/* Premium Studio Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#3d6b9e" />
        
        {/* Environment map for realistic reflections (metal/glass) */}
        <Environment preset="city" />

        <PresentationControls
          global
          snap
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <Scene />
        </PresentationControls>

        {/* Soft realistic shadow on the "floor" */}
        <ContactShadows 
          position={[0, -2.5, 0]} 
          opacity={0.6} 
          scale={10} 
          blur={2.5} 
          far={4} 
          color="#0b1b3d" 
        />
      </Canvas>
      
      {/* Overlay UI elements similar to premium sites */}
      <div className="absolute bottom-6 left-6 z-20">
        <div className="flex items-center gap-2 text-white/50 text-xs tracking-widest uppercase mb-1">
          <span className="w-2 h-2 rounded-full bg-brand-gold-light animate-pulse" />
          Interactive 3D
        </div>
        <p className="text-white font-medium text-lg">Next-Gen Solar EPC</p>
      </div>
      
      <div className="absolute top-6 right-6 z-20 text-right">
        <p className="text-white/60 text-sm">Drag to rotate</p>
        <p className="text-brand-gold-light font-bold">Premium Inverters & Panels</p>
      </div>
    </div>
  );
}
