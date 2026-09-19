import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, RoundedBox } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { anatomyParts } from '../data/anatomy';
import { useAnatomyStore } from '../store/useAnatomyStore';

function Bone({ position, rotation = [0, 0, 0], scale = [0.12, 1, 0.12], id = 'femur' }: { position: [number, number, number]; rotation?: [number, number, number]; scale?: [number, number, number]; id?: string }) {
  const selected = useAnatomyStore((state) => state.selectedPartId === id);
  const selectPart = useAnatomyStore((state) => state.selectPart);
  return <RoundedBox args={[1, 1, 1]} position={position} rotation={rotation} scale={scale} radius={0.3} smoothness={4} onClick={(event) => { event.stopPropagation(); selectPart(id); }}>
    <meshStandardMaterial color={selected ? '#ffffff' : '#c7d5e8'} roughness={0.48} metalness={0.05} emissive={selected ? '#4a7bd1' : '#000000'} emissiveIntensity={selected ? 0.4 : 0} />
  </RoundedBox>;
}

function Heart() {
  const ref = useRef<THREE.Group>(null);
  const active = useAnatomyStore((state) => state.activeSystems.cardiovascular);
  const selected = useAnatomyStore((state) => state.selectedPartId === 'heart');
  const running = useAnatomyStore((state) => state.simulationRunning);
  const rate = useAnatomyStore((state) => state.heartRate);
  const selectPart = useAnatomyStore((state) => state.selectPart);
  useFrame(({ clock }) => {
    if (!ref.current || !running) return;
    const pulse = 1 + Math.max(0, Math.sin(clock.elapsedTime * rate / 9)) ** 20 * 0.07;
    ref.current.scale.setScalar(pulse);
  });
  if (!active) return null;
  return <group ref={ref} position={[0.5, 1.2, 0.1]} onClick={(event) => { event.stopPropagation(); selectPart('heart'); }}>
    <mesh scale={[0.6, 0.8, 0.42]}>
      <sphereGeometry args={[0.75, 32, 32]} />
      <meshStandardMaterial color={selected ? '#ff9ab1' : '#d94e73'} roughness={0.32} metalness={0.04} emissive={selected ? '#762343' : '#250815'} emissiveIntensity={selected ? 0.45 : 0.18} />
    </mesh>
    <mesh position={[0.18, 0.54, 0.03]} rotation={[0, 0, -0.25]} scale={[0.18, 0.48, 0.18]}>
      <cylinderGeometry args={[0.14, 0.14, 1, 24]} />
      <meshStandardMaterial color="#cb3b65" roughness={0.3} />
    </mesh>
  </group>;
}

function Lungs() {
  const active = useAnatomyStore((state) => state.activeSystems.respiratory);
  const running = useAnatomyStore((state) => state.simulationRunning);
  const rate = useAnatomyStore((state) => state.breathingRate);
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current || !running) return;
    const breath = 1 + Math.sin(clock.elapsedTime * rate / 2.5) * 0.025;
    ref.current.scale.set(breath, breath, breath);
  });
  if (!active) return null;
  return <group ref={ref} position={[-0.58, 1.25, 0.04]}>
    {[-1, 1].map((side) => <mesh key={side} position={[side * 0.42, 0, 0]} scale={[0.38, 0.75, 0.28]}>
      <sphereGeometry args={[0.75, 24, 24]} />
      <meshPhysicalMaterial color="#6bc8df" roughness={0.28} transmission={0.12} transparent opacity={0.88} emissive="#092e3a" emissiveIntensity={0.15} />
    </mesh>)}
  </group>;
}

function Vessels() {
  const active = useAnatomyStore((state) => state.activeSystems.cardiovascular);
  const nervous = useAnatomyStore((state) => state.activeSystems.nervous);
  const selected = useAnatomyStore((state) => state.selectedPartId === 'spinal-cord');
  const selectPart = useAnatomyStore((state) => state.selectPart);
  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.02, 3.9, 0.15), new THREE.Vector3(0.02, 2.5, 0.17), new THREE.Vector3(0.04, 1.25, 0.15), new THREE.Vector3(0.05, -0.8, 0.05),
  ]), []);
  return <>
    {active && <>
      <mesh><tubeGeometry args={[curve, 32, 0.045, 10, false]} /><meshStandardMaterial color="#e35b76" emissive="#4d0b1b" emissiveIntensity={0.35} /></mesh>
      <mesh position={[0.16, 0.65, 0.05]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.035, 0.035, 2.7, 10]} /><meshStandardMaterial color="#de4b68" /></mesh>
    </>}
    {nervous && <mesh position={[0, 0.2, 0.28]} onClick={(event) => { event.stopPropagation(); selectPart('spinal-cord'); }}>
      <cylinderGeometry args={[selected ? 0.07 : 0.045, selected ? 0.07 : 0.045, 4.2, 12]} />
      <meshStandardMaterial color={selected ? '#fff0a4' : '#f1c552'} emissive="#8a6510" emissiveIntensity={0.3} />
    </mesh>}
  </>;
}

function Muscles() {
  const active = useAnatomyStore((state) => state.activeSystems.muscular);
  const selected = useAnatomyStore((state) => state.selectedPartId === 'pectoralis');
  const selectPart = useAnatomyStore((state) => state.selectPart);
  if (!active) return null;
  return <group>
    {[-1, 1].map((side) => <mesh key={side} position={[side * 0.38, 1.75, 0.34]} rotation={[0, 0, side * 0.13]} scale={[0.48, 0.7, 0.16]} onClick={(event) => { event.stopPropagation(); selectPart('pectoralis'); }}>
      <sphereGeometry args={[0.7, 24, 18]} />
      <meshStandardMaterial color={selected ? '#ff9a9d' : '#c94f62'} roughness={0.5} emissive={selected ? '#6a141c' : '#24070b'} emissiveIntensity={0.25} />
    </mesh>)}
    <Bone id="femur" position={[-0.33, -1.2, 0.02]} scale={[0.14, 1.55, 0.14]} rotation={[0, 0, 0.05]} />
    <Bone id="femur" position={[0.33, -1.2, 0.02]} scale={[0.14, 1.55, 0.14]} rotation={[0, 0, -0.05]} />
  </group>;
}

function Skeleton() {
  const active = useAnatomyStore((state) => state.activeSystems.skeletal);
  if (!active) return null;
  return <group>
    <mesh position={[0, 3.42, 0]} scale={[0.48, 0.56, 0.42]}>
      <sphereGeometry args={[0.8, 24, 20]} />
      <meshStandardMaterial color="#d7e2f3" roughness={0.5} transparent opacity={0.6} />
    </mesh>
    <Bone position={[0, 2.25, 0]} scale={[0.09, 1.6, 0.09]} />
    {[...Array(6)].map((_, index) => <Bone key={index} position={[0, 2.78 - index * 0.22, 0.05]} scale={[0.72 - index * 0.045, 0.045, 0.05]} rotation={[0, 0, index % 2 === 0 ? 0.04 : -0.04]} />)}
    <Bone position={[-0.67, 2.38, 0]} scale={[0.1, 1.05, 0.1]} rotation={[0, 0, -0.4]} />
    <Bone position={[0.67, 2.38, 0]} scale={[0.1, 1.05, 0.1]} rotation={[0, 0, 0.4]} />
  </group>;
}

function BodyModel() {
  return <group position={[0, -0.35, 0]}>
    <Skeleton />
    <Muscles />
    <Lungs />
    <Heart />
    <Vessels />
  </group>;
}

export default function AnatomyCanvas() {
  return <Canvas dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: 'high-performance' }}>
    <PerspectiveCamera makeDefault position={[0, 1.4, 8.2]} fov={35} />
    <color attach="background" args={['#070b15']} />
    <ambientLight intensity={1.15} />
    <directionalLight position={[4, 6, 5]} intensity={3.2} color="#bcd5ff" />
    <pointLight position={[-4, 1, 3]} intensity={9} distance={8} color="#613bff" />
    <pointLight position={[2, 0, 3]} intensity={6} distance={6} color="#ff527d" />
    <BodyModel />
    <gridHelper args={[8, 16, '#1b2850', '#111a34']} position={[0, -3.2, 0]} rotation={[0, 0, 0]} />
    <OrbitControls enablePan={false} minDistance={5} maxDistance={12} target={[0, 0.3, 0]} />
  </Canvas>;
}
