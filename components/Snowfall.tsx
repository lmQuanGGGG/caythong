// components/Snowfall.tsx
'use client';
import { useRef, useMemo } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function Snowfall({ count = 1500, groupRotation }: any) {
  const instancedRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { viewport } = useThree();

  // Tải texture bông tuyết từ public
  const snowflakeTexture = useLoader(THREE.TextureLoader, '/snowflake.png');
  useMemo(() => {
    snowflakeTexture.colorSpace = THREE.SRGBColorSpace;
    snowflakeTexture.anisotropy = 8;
    snowflakeTexture.wrapS = THREE.ClampToEdgeWrapping;
    snowflakeTexture.wrapT = THREE.ClampToEdgeWrapping;
    snowflakeTexture.needsUpdate = true;
    return null;
  }, [snowflakeTexture]);

  const flakeCount = Math.min(Number(count) || 0, 900);

  const flakes = useMemo(() => {
    const data = [] as Array<{
      x: number;
      y: number;
      z: number;
      speed: number;
      drift: number;
      phase: number;
      rot: number;
      rotSpeed: number;
      scale: number;
    }>;

    const w = viewport.width;
    const h = viewport.height;
    const zMin = -18;
    const zMax = 8;
    for (let i = 0; i < flakeCount; i++) {
      data.push({
        x: (Math.random() - 0.5) * w,
        y: (Math.random() - 0.5) * h,
        z: zMin + Math.random() * (zMax - zMin),
        speed: 0.03 + Math.random() * 0.07,
        drift: 0.003 + Math.random() * 0.01,
        phase: Math.random() * 100,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        // Bông tuyết bự hơn (nhìn "như thật")
        scale: 0.9 + Math.random() * 1.8,
      });
    }
    return data;
  }, [flakeCount, viewport.width, viewport.height]);

  useFrame((state) => {
    const mesh = instancedRef.current;
    if (!mesh) return;

    const time = state.clock.getElapsedTime();
    const w = viewport.width;
    const h = viewport.height;
    const margin = 2.5;

    for (let i = 0; i < flakes.length; i++) {
      const f = flakes[i];
      f.y -= f.speed;
      f.x += Math.cos(time * 0.6 + f.phase) * f.drift;
      f.rot += f.rotSpeed;

      if (f.y < -h / 2 - margin) {
        f.y = h / 2 + margin;
        f.x = (Math.random() - 0.5) * w;
        f.z = -18 + Math.random() * 26;
        f.scale = 0.9 + Math.random() * 1.8;
        f.speed = 0.03 + Math.random() * 0.07;
        f.drift = 0.003 + Math.random() * 0.01;
      }

      dummy.position.set(f.x, f.y, f.z);
      dummy.rotation.set(0, 0, f.rot);
      dummy.scale.setScalar(f.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;

    if (groupRotation) {
      mesh.rotation.y = groupRotation.y;
    }
    mesh.rotation.z = Math.sin(time * 0.1) * 0.03;
  });

  return (
    <instancedMesh ref={instancedRef} args={[undefined as any, undefined as any, flakes.length]}>
      <planeGeometry args={[0.45, 0.45]} />
      <meshBasicMaterial
        map={snowflakeTexture}
        transparent
        opacity={0.95}
        alphaTest={0.15}
        depthWrite={false}
        toneMapped={false}
        blending={THREE.NormalBlending}
        color="#ffffff"
      />
    </instancedMesh>
  );
}