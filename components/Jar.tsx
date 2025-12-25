'use client';
import { MeshTransmissionMaterial } from '@react-three/drei';

export default function Jar() {
  return (
    <group position={[0, 5, 0]}>
      {/* QUẢ CẦU KÍNH */}
      <mesh>
        <sphereGeometry args={[14, 64, 64]} />
        <MeshTransmissionMaterial 
          backside 
          samples={4} 
          thickness={1.0} 
          chromaticAberration={0.05} 
          anisotropy={0.1} 
          distortion={0.0} 
          transmission={1} 
          color="#ffffff"
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* ĐẾ CẦU */}
      <mesh position={[0, -13, 0]}>
        <cylinderGeometry args={[11, 12, 4, 32]} />
        <meshStandardMaterial color="#111" roughness={0.2} metalness={0.9} />
      </mesh>
    </group>
  );
}