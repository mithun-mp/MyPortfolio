"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

function WorkstationCore() {
  const coreRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.2;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.4;
      ring1Ref.current.rotation.z += delta * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.5;
      ring2Ref.current.rotation.x -= delta * 0.3;
    }
  });

  return (
    <group ref={coreRef}>
      {/* Central Supercomputer Crystal Core */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh>
          <octahedronGeometry args={[1.4, 0]} />
          <MeshWobbleMaterial
            color="#00f0ff"
            emissive="#7000ff"
            emissiveIntensity={0.8}
            wireframe
            factor={0.4}
            speed={1.5}
          />
        </mesh>
      </Float>

      {/* Orbital Tech Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.5, 0.03, 16, 100]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1} />
      </mesh>

      {/* Orbital Tech Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[3.2, 0.02, 16, 100]} />
        <meshStandardMaterial color="#7000ff" emissive="#7000ff" emissiveIntensity={1} />
      </mesh>

      {/* Floating Holographic Nodes */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 3.8;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <Float key={i} speed={3} floatIntensity={1.5}>
            <mesh position={[x, (i % 2 === 0 ? 0.5 : -0.5), z]}>
              <boxGeometry args={[0.2, 0.2, 0.2]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? "#ccff00" : "#00f0ff"}
                emissive={i % 2 === 0 ? "#ccff00" : "#00f0ff"}
                emissiveIntensity={0.9}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

function DataParticleCloud() {
  const pointsRef = useRef<THREE.Points>(null);

  const particlesCount = 200;
  const positions = React.useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, [particlesCount]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00f0ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroCanvas() {
  const [webglSupported, setWebglSupported] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }

    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) setReducedMotion(true);
  }, []);

  if (!webglSupported || reducedMotion) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-space-bg via-[#0a0f24] to-space-bg rounded-2xl border border-space-border/40 p-8 shadow-cyan-glow relative overflow-hidden">
        <div className="absolute inset-0 bg-cyber-grid bg-[size:30px_30px] opacity-30" />
        <div className="relative z-10 text-center">
          <div className="w-32 h-32 mx-auto rounded-full border-2 border-signal-cyan/60 flex items-center justify-center animate-pulse shadow-cyan-glow bg-space-bg/80">
            <div className="w-20 h-20 rounded-full border border-signal-violet bg-signal-cyan/20 flex items-center justify-center font-mono text-signal-cyan text-xs font-bold">
              CORE_OK
            </div>
          </div>
          <p className="mt-4 font-mono text-xs text-signal-cyan tracking-widest uppercase">
            PARALLEL_CORE // STATIC_2D_RENDER_MODE
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden border border-space-border/50 bg-space-bg/40 backdrop-blur-md">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#00f0ff" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#7000ff" />
        
        <WorkstationCore />
        <DataParticleCloud />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.2}
        />
      </Canvas>

      {/* Futuristic Frame Overlays */}
      <div className="absolute top-3 left-4 font-mono text-[10px] text-signal-cyan/70 tracking-widest pointer-events-none">
        [3D_WORKSTATION_CORE // ACTIVE]
      </div>
      <div className="absolute bottom-3 right-4 font-mono text-[10px] text-signal-lime/70 tracking-widest pointer-events-none">
        FPS: 60 // R3F_DREI
      </div>
    </div>
  );
}
