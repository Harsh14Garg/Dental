import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { isWebGLSupported } from '../../lib/webgl';

interface SceneProps {
  shapeType?: 'torusKnot' | 'sphere' | 'icosahedron' | 'box';
  color?: string;
  speed?: number;
}

function AbstractShape({ shapeType = 'torusKnot', color = "#F9F6F0", speed = 2 }: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime / (4 / speed)) * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime / (2 / speed);
    }
  });

  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.5}>
        {shapeType === 'torusKnot' && <torusKnotGeometry args={[1, 0.3, 128, 32]} />}
        {shapeType === 'sphere' && <sphereGeometry args={[1, 64, 64]} />}
        {shapeType === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
        {shapeType === 'box' && <boxGeometry args={[1.5, 1.5, 1.5]} />}
        <MeshTransmissionMaterial
          backside
          samples={2}
          thickness={0.5}
          chromaticAberration={0.1}
          anisotropy={0.2}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color={color}
          attenuationDistance={0.5}
          attenuationColor="#B8860B"
        />
      </mesh>
    </Float>
  );
}

export default function Scene({ shapeType, color, speed }: SceneProps) {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setWebglSupported(isWebGLSupported());
  }, []);

  if (webglSupported === false) {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60 flex items-center justify-center">
        <div className="w-64 h-64 bg-[var(--color-brand-primary)]/5 rounded-full blur-3xl"></div>
      </div>
    );
  }

  if (webglSupported === null) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <AbstractShape shapeType={shapeType} color={color} speed={speed} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
