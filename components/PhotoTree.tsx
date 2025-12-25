'use client';
import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// --- COMPONENT: ÔNG GIÀ NOEL (SANTA) - 3D đẹp ---
function Santa({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} scale={1.2}>
      {/* Body - red coat */}
      <mesh position={[0, 0.6, 0]}>
        <capsuleGeometry args={[0.45, 0.7, 4, 8]} />
        <meshStandardMaterial color="#d42426" roughness={0.4} metalness={0.15} />
      </mesh>
      {/* White belt */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.46, 0.46, 0.15, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.3} />
      </mesh>
      {/* Gold buckle */}
      <mesh position={[0, 0.55, 0.45]}>
        <boxGeometry args={[0.15, 0.12, 0.06]} />
        <meshStandardMaterial color="#ffd700" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Head - skin */}
      <mesh position={[0, 1.25, 0]}>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshStandardMaterial color="#ffe0bd" roughness={0.5} />
      </mesh>
      {/* Beard */}
      <mesh position={[0, 1.1, 0.18]}>
        <sphereGeometry args={[0.24, 12, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.6} />
      </mesh>
      {/* Hat - red */}
      <mesh position={[0, 1.55, 0]} rotation={[0.15, 0, 0]}>
        <coneGeometry args={[0.28, 0.55, 16]} />
        <meshStandardMaterial color="#d42426" roughness={0.4} metalness={0.15} />
      </mesh>
      {/* Hat trim - white */}
      <mesh position={[0, 1.32, 0]}>
        <cylinderGeometry args={[0.29, 0.29, 0.08, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.6} />
      </mesh>
      {/* Hat pom-pom */}
      <mesh position={[0.08, 1.8, 0.1]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.7} />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.5, 0.75, 0]} rotation={[0, 0, 0.6]}>
        <capsuleGeometry args={[0.12, 0.4, 4, 8]} />
        <meshStandardMaterial color="#d42426" roughness={0.4} />
      </mesh>
      <mesh position={[0.5, 0.75, 0]} rotation={[0, 0, -0.6]}>
        <capsuleGeometry args={[0.12, 0.4, 4, 8]} />
        <meshStandardMaterial color="#d42426" roughness={0.4} />
      </mesh>
    </group>
  );
}

// --- COMPONENT: TUẦN LỘC (REINDEER) - 3D đẹp ---
function Reindeer({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Body - brown fur */}
      <mesh position={[0, 0.55, 0]}>
        <capsuleGeometry args={[0.35, 0.8, 6, 10]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>
      {/* Legs with hooves */}
      {[[-0.25, 0.15, 0.2], [0.25, 0.15, 0.2], [-0.25, 0.15, -0.2], [0.25, 0.15, -0.2]].map((p, i) => (
        <group key={i}>
          <mesh position={p as any}>
            <cylinderGeometry args={[0.06, 0.05, 0.55]} />
            <meshStandardMaterial color="#8B4513" roughness={0.7} />
          </mesh>
          <mesh position={[p[0], 0, p[2]] as any}>
            <cylinderGeometry args={[0.07, 0.06, 0.08]} />
            <meshStandardMaterial color="#3d2817" roughness={0.3} metalness={0.2} />
          </mesh>
        </group>
      ))}
      {/* Neck and head */}
      <group position={[0.45, 0.85, 0]} rotation={[0, 0, -0.35]}>
        {/* Neck */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.15, 0.18, 0.5, 12]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>
        {/* Head */}
        <mesh position={[0, 0.55, 0]}>
          <boxGeometry args={[0.28, 0.35, 0.22]} />
          <meshStandardMaterial color="#8B4513" roughness={0.7} />
        </mesh>
        {/* Snout */}
        <mesh position={[0.1, 0.5, 0]}>
          <capsuleGeometry args={[0.08, 0.12, 3, 6]} />
          <meshStandardMaterial color="#6d3913" roughness={0.6} />
        </mesh>
        {/* Red nose (Rudolph style) */}
        <mesh position={[0.22, 0.5, 0]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.8} roughness={0.3} />
        </mesh>
        {/* Ears */}
        <mesh position={[-0.05, 0.7, 0.12]} rotation={[0.3, 0, 0.2]}>
          <coneGeometry args={[0.08, 0.15, 8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>
        <mesh position={[-0.05, 0.7, -0.12]} rotation={[-0.3, 0, 0.2]}>
          <coneGeometry args={[0.08, 0.15, 8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>
        {/* Antlers - more detailed */}
        <group position={[0, 0.72, 0]}>
          {/* Left antler */}
          <mesh position={[0, 0.15, 0.1]} rotation={[0.3, 0, 0.4]}>
            <cylinderGeometry args={[0.03, 0.04, 0.35]} />
            <meshStandardMaterial color="#d4a574" roughness={0.6} />
          </mesh>
          <mesh position={[-0.08, 0.28, 0.15]} rotation={[0.5, 0, 0.8]}>
            <cylinderGeometry args={[0.02, 0.03, 0.18]} />
            <meshStandardMaterial color="#d4a574" roughness={0.6} />
          </mesh>
          {/* Right antler */}
          <mesh position={[0, 0.15, -0.1]} rotation={[-0.3, 0, 0.4]}>
            <cylinderGeometry args={[0.03, 0.04, 0.35]} />
            <meshStandardMaterial color="#d4a574" roughness={0.6} />
          </mesh>
          <mesh position={[-0.08, 0.28, -0.15]} rotation={[-0.5, 0, 0.8]}>
            <cylinderGeometry args={[0.02, 0.03, 0.18]} />
            <meshStandardMaterial color="#d4a574" roughness={0.6} />
          </mesh>
        </group>
      </group>
      {/* Tail */}
      <mesh position={[-0.45, 0.6, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.9} />
      </mesh>
    </group>
  );
}

export default function PhotoTree({ mode, gesture, audioData, magicOn }: any) {
  const rootGroupRef = useRef<THREE.Group>(null);
  const mainGroupRef = useRef<THREE.Group>(null);
  const ledRef = useRef<THREE.Group>(null);
  const ornamentsRef = useRef<THREE.InstancedMesh>(null);
  // 1. THÊM REF CHO TUẦN LỘC CHẠY
  const animatedReindeerRef = useRef<THREE.Group>(null);
  const flyingSantaRef = useRef<THREE.Group>(null);
  const loveTextRef = useRef<THREE.Mesh>(null);
  const starMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const starFlareRef = useRef<THREE.Mesh>(null);
  const ornamentsColorAttrRef = useRef<THREE.InstancedBufferAttribute | null>(null);
  const iceGlitterRef = useRef<THREE.Points>(null);
  const iceNeedlesRef = useRef<THREE.InstancedMesh>(null);
  const iceHaloRef = useRef<THREE.Points>(null);
  const iceNeedlesInitRef = useRef(false);
  const ornamentsCurrentPosRef = useRef<THREE.Vector3[]>([]);
  const iceLayersRef = useRef<THREE.Group>(null);

  const { camera, gl, viewport } = useThree();
  const [textures, setTextures] = useState<THREE.Texture[]>([]);
  const focusTargetIdx = useRef<number | null>(null);

  // (Phần load texture giữ nguyên)
  useEffect(() => {
    fetch('/api/photos').then(res => res.json()).then(urls => {
      const loader = new THREE.TextureLoader();
      const maxA = gl.capabilities.getMaxAnisotropy();
      setTextures(urls.map((url: string) => {
        const t = loader.load(url);
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = maxA;
        return t;
      }));
    });
  }, [gl]);

  // (Phần tạo tọa độ points giữ nguyên)
  const { photoPoints, ledPoints, heartPhotoPoints, heartLedPoints, textPhotoPoints, textLedPoints, textOrnamentPoints, ornaments, garlands, iceGlitterPositions, iceNeedleInstances, iceHaloPositions } = useMemo(() => {
    const pPoints = [];
    const lPoints = [];
    const hpPoints: { pos: THREE.Vector3 }[] = [];
    const hlPoints: { pos: THREE.Vector3 }[] = [];
    const tpPoints: { pos: THREE.Vector3 }[] = [];
    const tlPoints: { pos: THREE.Vector3 }[] = [];
    const toPoints: { pos: THREE.Vector3 }[] = [];
    const ornamentPoints: Array<{ pos: THREE.Vector3; color: THREE.Color; scale: number; phase: number }> = [];
    const garlandGeoms: Array<{ geom: THREE.TubeGeometry; color: string; emissive: string }> = [];
    const icePos = new Float32Array(2200 * 3);
    const iceNeedles: Array<{ pos: THREE.Vector3; rot: THREE.Euler; scale: number; phase: number }> = [];
    const iceHalo = new Float32Array(1400 * 3);
    const layers = 18;
    const photosPerLayer = 78;
    const ledsPerLayer = 42;

    const mulberry32 = (seed: number) => {
      let t = seed >>> 0;
      return () => {
        t += 0x6d2b79f5;
        let r = Math.imul(t ^ (t >>> 15), 1 | t);
        r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
        return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
      };
    };

    const heartPoint3D = (u: number, v: number) => {
      // 2D heart curve in X-Y (param), then extrude into Z using v.
      // Scaled to roughly match the tree footprint.
      const t = u * Math.PI * 2;
      const x2 = 16 * Math.pow(Math.sin(t), 3);
      const y2 =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);

      const scale = 0.55;
      const x = x2 * scale;
      const y = y2 * scale;

      // Thickness: slightly bulged extrusion.
      const depth = 5.5;
      const z = (v - 0.5) * depth;

      // Place heart around mid-height of the tree.
      const centerY = -2.0;
      return new THREE.Vector3(x, centerY + y, z);
    };

    const makeTextTargets = (count: number) => {
      const canvas = document.createElement('canvas');
      canvas.width = 2000;
      canvas.height = 900;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return Array.from({ length: count }, () => ({ pos: new THREE.Vector3(0, 0, 0) }));
      }

      // IMPORTANT: keep background transparent so alpha can be used to detect text.
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // 3 lines: MERRY / CHRISTMAS / PINKIE
      const lines = ['MERRY', 'CHRISTMAS', 'PINKIE'];
      const sizes = [200, 245, 245];
      const ys = [220, 475, 725];

      for (let i = 0; i < lines.length; i++) {
        ctx.font = `900 ${sizes[i]}px system-ui, -apple-system, Segoe UI, Arial`;
        ctx.fillStyle = 'white';
        ctx.fillText(lines[i], canvas.width / 2, ys[i]);
      }

      const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels: Array<{ x: number; y: number }> = [];

      // Sample pixels (stride for speed)
      const stride = 2;
      for (let y = 0; y < canvas.height; y += stride) {
        for (let x = 0; x < canvas.width; x += stride) {
          const idx = (y * canvas.width + x) * 4;
          const a = img.data[idx + 3];
          // Background is transparent => only text has alpha.
          if (a > 40) pixels.push({ x, y });
        }
      }

      // Map pixels -> world (bigger + thinner for readability)
      const textWidth = 68;
      const textHeight = 36;
      const depth = 0.45;
      const centerY = 1.0;
      const out: { pos: THREE.Vector3 }[] = [];
      for (let i = 0; i < count; i++) {
        const p = pixels[(Math.random() * pixels.length) | 0] ?? { x: canvas.width / 2, y: canvas.height / 2 };
        const nx = p.x / canvas.width - 0.5;
        const ny = 0.5 - p.y / canvas.height;
        const x = nx * textWidth;
        const y = centerY + ny * textHeight;
        const z = (Math.random() - 0.5) * depth;
        out.push({ pos: new THREE.Vector3(x, y, z) });
      }
      return out;
    };

    const pickWarmLedColor = () => {
      // Vivid gold + vivid red like the reference (avoid pale whites/blues).
      const r = Math.random();
      // ~78% gold/red, ~18% green/ice accents, ~4% warm accents.
      if (r < 0.60) return new THREE.Color('#ffcc3a'); // vivid gold
      if (r < 0.78) return new THREE.Color('#ff2a2a'); // vivid red
      if (r < 0.88) return new THREE.Color('#32ff6a'); // vivid green (10%)
      if (r < 0.96) return new THREE.Color('#45c8ff'); // icy blue (8%)
      if (r < 0.98) return new THREE.Color('#ff8a2a'); // warm orange (2%)
      return new THREE.Color('#ffd36a'); // softer gold (2%)
    };

    const createTinselRing = (
      y: number,
      radius: number,
      tubeRadius: number,
      radialJitter: number,
      yJitter: number
    ) => {
      const pts: THREE.Vector3[] = [];
      const segs = 80;
      for (let i = 0; i < segs; i++) {
        const t = i / segs;
        const ang = t * Math.PI * 2;
        const r = radius + (Math.random() - 0.5) * radialJitter;
        pts.push(new THREE.Vector3(
          Math.cos(ang) * r,
          y + (Math.random() - 0.5) * yJitter,
          Math.sin(ang) * r
        ));
      }
      const curve = new THREE.CatmullRomCurve3(pts, true, 'catmullrom', 0.6);
      return new THREE.TubeGeometry(curve, 260, tubeRadius, 10, true);
    };

    for (let layer = 0; layer < layers; layer++) {
      const progress = layer / (layers - 1);
      // More tree-like: clearly conical, narrower top.
      const maxRadius = 15.0;
      const radius = maxRadius * Math.pow(1 - progress, 1.08);
      const y = THREE.MathUtils.lerp(-12.8, 14.2, progress);

      for (let i = 0; i < photosPerLayer; i++) {
        const angle = (i / photosPerLayer) * Math.PI * 2 + layer * 0.35;
        // Tree volume: mostly outer surface + some inner fill.
        const outer = Math.random() < 0.75;
        const fill = outer ? (0.82 + Math.random() * 0.18) : (0.45 + Math.random() * 0.35);
        const r = radius * fill;
        const jitter = 0.45 * (1 - progress);
        pPoints.push({
          pos: new THREE.Vector3(
            Math.cos(angle) * r + (Math.random() - 0.5) * jitter,
            y + (Math.random() - 0.5) * 0.25,
            Math.sin(angle) * r + (Math.random() - 0.5) * jitter
          ),
          scatter: new THREE.Vector3().randomDirection().multiplyScalar(40),
          texIdx: (layer * photosPerLayer + i) % (textures.length || 1)
        });

        const idx = layer * photosPerLayer + i;
        const rnd = mulberry32(idx + 1337);
        // u distributes along curve; v distributes thickness + subtle jitter.
        const u = (idx + rnd()) / (layers * photosPerLayer);
        const v = rnd();
        const hp = heartPoint3D(u, v);
        hp.add(new THREE.Vector3((rnd() - 0.5) * 0.35, (rnd() - 0.5) * 0.35, (rnd() - 0.5) * 0.35));
        hpPoints.push({ pos: hp });
      }

      for (let j = 0; j < ledsPerLayer; j++) {
        const angle = (j / ledsPerLayer) * Math.PI * 2;
        const rLed = radius * (0.92 + Math.random() * 0.18);
        lPoints.push({
          pos: new THREE.Vector3(Math.cos(angle) * rLed, y + Math.random(), Math.sin(angle) * rLed),
          color: pickWarmLedColor(),
          phase: Math.random() * Math.PI * 2,
          size: 0.12 + Math.random() * 0.16,
          sparkle: Math.random(),
        });

        const idx = layer * ledsPerLayer + j;
        const rnd = mulberry32(idx + 4242);
        const u = (idx + rnd()) / (layers * ledsPerLayer);
        const v = rnd();
        const hl = heartPoint3D(u, v);
        hl.add(new THREE.Vector3((rnd() - 0.5) * 1.1, (rnd() - 0.5) * 1.1, (rnd() - 0.5) * 1.1));
        hlPoints.push({ pos: hl });
      }

      // Ornaments (shiny balls) - dense, mostly gold.
      const ornamentsPerLayer = 18;
      for (let k = 0; k < ornamentsPerLayer; k++) {
        const ang = (k / ornamentsPerLayer) * Math.PI * 2 + layer * 0.22 + Math.random() * 0.25;
        const fill = 0.55 + Math.random() * 0.5;
        const r = radius * fill;
        const pos = new THREE.Vector3(
          Math.cos(ang) * r,
          y + 0.25 + Math.random() * 0.95,
          Math.sin(ang) * r
        );
        const c = Math.random() < 0.82 ? new THREE.Color('#ffd36a') : new THREE.Color('#ff3b3b');
        const s = 0.18 + Math.random() * 0.22;
        ornamentPoints.push({ pos, color: c, scale: s, phase: Math.random() * Math.PI * 2 });
      }
    }

    // Ice glitter layer hugging the tree volume
    for (let i = 0; i < 2200; i++) {
      const t = Math.random();
      const y = THREE.MathUtils.lerp(-12.2, 14.2, t);
      const taper = Math.pow(1 - t, 0.7);
      const r = 15.6 * taper * (0.55 + Math.random() * 0.55);
      const ang = Math.random() * Math.PI * 2;
      const x = Math.cos(ang) * r + (Math.random() - 0.5) * 0.25;
      const z = Math.sin(ang) * r + (Math.random() - 0.5) * 0.25;
      icePos[i * 3] = x;
      icePos[i * 3 + 1] = y + (Math.random() - 0.5) * 0.25;
      icePos[i * 3 + 2] = z;
    }

    // Frosty needles / tinsel leaves (reference-like frosty branches)
    const needleCount = 1800;
    for (let i = 0; i < needleCount; i++) {
      const t = Math.random();
      const y = THREE.MathUtils.lerp(-12.1, 14.0, t);
      const taper = Math.pow(1 - t, 0.7);
      const rOuter = 15.7 * taper;
      const rInner = rOuter * (0.55 + Math.random() * 0.45);
      const ang = Math.random() * Math.PI * 2;
      const x = Math.cos(ang) * rInner;
      const z = Math.sin(ang) * rInner;
      const outward = new THREE.Vector3(x, 0, z).normalize();
      const yaw = Math.atan2(outward.x, outward.z);
      iceNeedles.push({
        pos: new THREE.Vector3(x, y + (Math.random() - 0.5) * 0.25, z),
        rot: new THREE.Euler((Math.random() - 0.5) * 0.25, yaw + Math.PI, (Math.random() - 0.5) * 0.6),
        scale: 0.6 + Math.random() * 1.25,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Sparkling ice halo ring (single ring, like reference)
    for (let i = 0; i < 1400; i++) {
      const a = (i / 1400) * Math.PI * 2;
      const r = 11.4 + (Math.random() - 0.5) * 0.22;
      const y = -2.2 + (Math.random() - 0.5) * 0.08;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      iceHalo[i * 3] = x;
      iceHalo[i * 3 + 1] = y;
      iceHalo[i * 3 + 2] = z;
    }

    // Garland (tinsel) rings by tiers (match reference more than spirals)
    const yMin = -12.3;
    const yMax = 13.8;
    const ringCount = 15;
    for (let i = 0; i < ringCount; i++) {
      const t = i / (ringCount - 1);
      const y = THREE.MathUtils.lerp(yMin + 0.2, yMax - 0.3, t);
      const taper = Math.pow(1 - t, 0.7);
      const rBase = 15.6 * taper;
      const r = rBase * (1.05 + (Math.random() - 0.5) * 0.03);
      const thick = 0.08 + (1 - t) * 0.03;
      const isBlue = i % 2 === 0;
      garlandGeoms.push({
        geom: createTinselRing(y, r, thick, 0.55 * (1 - t), 0.18),
        color: isBlue ? '#bfe9ff' : '#eaf6ff',
        emissive: isBlue ? '#7ecbff' : '#bfe9ff',
      });
    }

    // Text targets: share the same points so photos + LEDs + ornaments truly merge
    const sharedText = makeTextTargets(Math.max(pPoints.length, lPoints.length, ornamentPoints.length));
    tpPoints.push(...sharedText.slice(0, pPoints.length));
    tlPoints.push(...sharedText.slice(0, lPoints.length));
    toPoints.push(...sharedText.slice(0, ornamentPoints.length));

    return {
      photoPoints: pPoints,
      ledPoints: lPoints,
      heartPhotoPoints: hpPoints,
      heartLedPoints: hlPoints,
      textPhotoPoints: tpPoints,
      textLedPoints: tlPoints,
      textOrnamentPoints: toPoints,
      ornaments: ornamentPoints,
      garlands: garlandGeoms,
      iceGlitterPositions: icePos,
      iceNeedleInstances: iceNeedles,
      iceHaloPositions: iceHalo,
    };
  }, [textures.length]);

  const snowflakeTex = useMemo(() => {
    const t = new THREE.TextureLoader().load('/snowflake.png');
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    t.needsUpdate = true;
    return t;
  }, []);

  const ledGlowTex = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 256;
    c.height = 256;
    const ctx = c.getContext('2d');
    if (!ctx) return null;
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, 'rgba(255,255,255,0.95)');
    g.addColorStop(0.12, 'rgba(255,240,200,0.65)');
    g.addColorStop(0.35, 'rgba(255,200,80,0.28)');
    g.addColorStop(0.62, 'rgba(255,80,80,0.14)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.needsUpdate = true;
    return t;
  }, []);

  const tinselTexture = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 256;
    c.height = 64;
    const ctx = c.getContext('2d');
    if (!ctx) return null;
    ctx.clearRect(0, 0, c.width, c.height);

    // Many thin icy strands + sparkles
    for (let i = 0; i < 520; i++) {
      const x = Math.random() * c.width;
      const y = Math.random() * c.height;
      const len = 10 + Math.random() * 40;
      const a = -0.2 + Math.random() * 0.4;
      const x2 = x + Math.cos(a) * len;
      const y2 = y + Math.sin(a) * len * 0.08;
      const g = ctx.createLinearGradient(x, y, x2, y2);
      g.addColorStop(0, 'rgba(234, 246, 255, 0.0)');
      g.addColorStop(0.35, 'rgba(191, 233, 255, 0.55)');
      g.addColorStop(0.7, 'rgba(126, 203, 255, 0.38)');
      g.addColorStop(1, 'rgba(234, 246, 255, 0.0)');
      ctx.strokeStyle = g;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    for (let i = 0; i < 160; i++) {
      const x = Math.random() * c.width;
      const y = Math.random() * c.height;
      ctx.fillStyle = `rgba(255,255,255,${0.15 + Math.random() * 0.35})`;
      ctx.beginPath();
      ctx.arc(x, y, 1 + Math.random() * 1.6, 0, Math.PI * 2);
      ctx.fill();
    }

    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    t.needsUpdate = true;
    return t;
  }, []);

  const starFlareTexture = useMemo(() => null as THREE.Texture | null, []);

  const starGlowTexture = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 256;
    c.height = 256;
    const ctx = c.getContext('2d');
    if (!ctx) return null;
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, 'rgba(235, 250, 255, 0.95)');
    g.addColorStop(0.2, 'rgba(180, 235, 255, 0.55)');
    g.addColorStop(0.55, 'rgba(120, 200, 255, 0.18)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.needsUpdate = true;
    return t;
  }, []);

  const loveTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Base glow layers
    ctx.font = 'bold 140px serif';
    ctx.fillStyle = 'rgba(255, 210, 80, 0.95)';
    ctx.shadowColor = 'rgba(255, 80, 80, 0.95)';
    ctx.shadowBlur = 35;
    ctx.fillText('I LOVE YOU', canvas.width / 2, canvas.height / 2);

    ctx.shadowColor = 'rgba(255, 220, 120, 0.95)';
    ctx.shadowBlur = 22;
    ctx.fillStyle = 'rgba(255,255,255,0.98)';
    ctx.fillText('I LOVE YOU', canvas.width / 2, canvas.height / 2);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }, []);

  useFrame((state) => {
    if (!mainGroupRef.current || textures.length === 0) return;
    const bass = audioData ? audioData[0] / 255 : 0;
    const time = state.clock.getElapsedTime();
    const isVictory = !!gesture?.isVictory;
    const isFist = !!gesture?.isFist;
    const isMagicOn = !!magicOn;
    const isIcy = isMagicOn && !isFist && !isVictory;

    if (iceGlitterRef.current) {
      iceGlitterRef.current.visible = isIcy;
    }

    if (iceLayersRef.current) {
      iceLayersRef.current.visible = isIcy;
      // subtle shimmer
      iceLayersRef.current.children.forEach((m, idx) => {
        const mesh = m as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat) {
          mat.opacity = 0.16 + 0.04 * Math.sin(time * 1.6 + idx * 0.7);
        }
      });
    }

    // Xoay 2 trục (X + Y) theo tay
    if (rootGroupRef.current && gesture?.rotation) {
      // In fist mode we keep the text front-facing for readability.
      const desiredY = isFist ? 0 : gesture.rotation.y;
      const desiredX = isFist ? 0 : gesture.rotation.x;
      rootGroupRef.current.rotation.y += (desiredY - rootGroupRef.current.rotation.y) * 0.06;
      rootGroupRef.current.rotation.x += (desiredX - rootGroupRef.current.rotation.x) * 0.06;
    }

    // (Logic Zoom/Pinch giữ nguyên)
    if (gesture?.isPinching) {
      if (focusTargetIdx.current == null) {
        const t = Math.min(1, Math.max(0, (gesture.cursor.x + 1) / 2));
        focusTargetIdx.current = Math.floor(t * (photoPoints.length - 1));
      }
    } else focusTargetIdx.current = null;

    // (Logic cập nhật Ảnh giữ nguyên)
    mainGroupRef.current.children.forEach((wrapper, i) => {
      let targetPos = photoPoints[i].pos;
      let targetScale = 1;
      const isTargeted = gesture?.isPinching && focusTargetIdx.current === i;

      if (mode === 'SCATTER') targetPos = photoPoints[i].scatter;
      else if (isVictory) targetPos = heartPhotoPoints[i]?.pos ?? targetPos;
      else if (isFist) targetPos = textPhotoPoints[i]?.pos ?? targetPos;

      if (isTargeted) {
        const camDir = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
        targetPos = new THREE.Vector3().copy(camera.position).add(camDir.multiplyScalar(10));
        targetScale = 8;
        wrapper.lookAt(camera.position);
      } else wrapper.rotation.set(0, 0, 0);

      if (isFist && !isTargeted) {
        // Keep planes facing camera so letters read clearly.
        wrapper.lookAt(camera.position);
        targetScale = 0.62;
      }

      wrapper.position.lerp(targetPos, 0.1);
      const fistScaleBoost = isFist ? 1.0 : 1;
      wrapper.scale.lerp(new THREE.Vector3(targetScale * fistScaleBoost, targetScale * fistScaleBoost, targetScale * fistScaleBoost), 0.1);

      const photoMesh = wrapper.children[0] as THREE.Mesh;
      const mat = photoMesh.material as THREE.MeshBasicMaterial;
      mat.transparent = true;
      // Slightly dim photos to avoid glare; fist mode very dim so text LEDs stand out.
      mat.opacity = isFist ? (0.22 + bass * 0.06) : (0.66 + bass * 0.18);
      // Darken the texture a touch (multiplier) so bloom doesn't catch photos as much.
      if (!isFist) {
        const k = isIcy ? 0.86 : 0.90;
        mat.color.setRGB(k, k, k);
      } else {
        mat.color.setRGB(1, 1, 1);
      }
    });

    // (Logic cập nhật LED giữ nguyên)
    if (ledRef.current) {
      ledRef.current.children.forEach((ledObj, i) => {
        const p = ledPoints[i];
        if (!p) return;

        // Move LEDs too (TREE <-> HEART)
        const desired = isVictory
          ? (heartLedPoints[i]?.pos ?? p.pos)
          : isFist
            ? (textLedPoints[i]?.pos ?? p.pos)
            : p.pos;
        const group = ledObj as THREE.Group;
        group.position.lerp(desired, 0.1);

        const sphere = group.children[0] as THREE.Mesh | undefined;
        const glow = group.children[1] as THREE.Sprite | undefined;

        if (sphere) {
          const baseSize = (p as any).size ?? 0.16;
          const sparkle = (p as any).sparkle ?? 0.5;
          const pulse = 1 + 0.25 * Math.sin(time * 6 + p.phase) + bass * 0.35;
          const pop = sparkle > 0.9 ? (1 + 0.35 * Math.sin(time * 10 + p.phase * 2)) : 1;
          const mult = isFist ? 2.65 : isIcy ? 1.85 : 1.6;
          const s = baseSize * pulse * pop * mult;
          sphere.scale.lerp(new THREE.Vector3(s, s, s), 0.12);
        }

        const sphereMat = sphere?.material as THREE.MeshStandardMaterial | undefined;
        if (sphereMat) {
          // In text mode, force warm-gold so the sentence is readable.
          if (isFist) {
            const warm = new THREE.Color('#ffd36a');
            sphereMat.color.copy(warm);
            sphereMat.emissive.copy(warm);
            sphereMat.emissiveIntensity = 2.8 + Math.sin(time * 6 + p.phase) * 0.8 + bass * 1.4;
          } else if (isIcy) {
            // Keep vivid gold/red even in icy mode.
            sphereMat.color.copy(p.color);
            sphereMat.emissive.copy(p.color);
            // Bright but controlled (no bloom)
            sphereMat.emissiveIntensity = 3.2 + Math.sin(time * 4 + p.phase) * 0.8 + bass * 1.8;
          } else {
            sphereMat.color.copy(p.color);
            sphereMat.emissive.copy(p.color);
            const baseBoost = isMagicOn ? 1.8 : 1;
            const intensity = (1.0 + Math.sin(time * 3 + p.phase) * 0.9 + bass * 2.4) * baseBoost;
            sphereMat.emissiveIntensity = intensity * 1.25;
          }

          // Specular pop
          sphereMat.roughness = 0.16;
          sphereMat.metalness = 0.25;
        }

        if (glow && glow.material instanceof THREE.SpriteMaterial) {
          glow.position.set(0, 0, 0);
          const sparkle = (p as any).sparkle ?? 0.5;
          const isBig = sparkle > 0.9;
          const op = (isFist ? 0.18 : isIcy ? 0.36 : 0.34) * (0.75 + 0.25 * Math.sin(time * 5 + p.phase));
          glow.material.opacity = isBig ? op * 1.2 : op;
          glow.material.color.copy(isFist ? new THREE.Color('#ffd36a') : p.color);
          const base = (p as any).size ?? 0.16;
          const halo = (isFist ? 1.2 : isIcy ? 1.9 : 1.8) * (isBig ? 1.15 : 1);
          glow.scale.set(base * 22 * halo, base * 22 * halo, 1);
        }
      });
    }

    // Init & animate icy needles and halo
    if (iceNeedlesRef.current) {
      iceNeedlesRef.current.visible = isIcy;
      const mat = iceNeedlesRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = 0.62 + 0.16 * Math.sin(time * 1.8);
      }

      if (isIcy && !iceNeedlesInitRef.current) {
        const dummy = new THREE.Object3D();
        for (let i = 0; i < iceNeedleInstances.length; i++) {
          const n = iceNeedleInstances[i];
          dummy.position.copy(n.pos);
          dummy.rotation.copy(n.rot);
          dummy.scale.set(n.scale, n.scale, 1);
          dummy.updateMatrix();
          iceNeedlesRef.current.setMatrixAt(i, dummy.matrix);
        }
        iceNeedlesRef.current.instanceMatrix.needsUpdate = true;
        iceNeedlesInitRef.current = true;
      }
    }

    if (iceHaloRef.current) {
      iceHaloRef.current.visible = isIcy;
      if (isIcy) {
        iceHaloRef.current.rotation.y = time * 0.25;
      }
    }

    if (starMatRef.current) {
      const boost = isMagicOn ? 1.35 : 1;
      starMatRef.current.emissiveIntensity = 7.5 * boost + bass * 4.2;
    }

    if (starFlareRef.current) {
      starFlareRef.current.position.set(0, 16.2, 0);
      starFlareRef.current.lookAt(camera.position);
      const base = isMagicOn ? 1.15 : 0.9;
      const pulse = 0.08 * Math.sin(time * 4.2) + 0.06 * bass;
      const s = 10.5 * (base + pulse);
      starFlareRef.current.scale.set(s, s, 1);
      const m = starFlareRef.current.material as THREE.MeshBasicMaterial;
      if (m) m.opacity = isMagicOn ? 0.45 : 0.32;
    }

    // Ornaments sparkle (subtle)
    if (ornamentsRef.current) {
      const dummy = new THREE.Object3D();
      for (let i = 0; i < ornaments.length; i++) {
        const o = ornaments[i];
        const basePos = ornamentsCurrentPosRef.current[i] ?? (ornamentsCurrentPosRef.current[i] = o.pos.clone());
        const target = isFist ? (textOrnamentPoints[i]?.pos ?? o.pos) : o.pos;
        basePos.lerp(target, 0.1);

        const tw = 1 + 0.07 * Math.sin(time * 4 + o.phase) + bass * 0.08;
        dummy.position.copy(basePos);
        dummy.rotation.set(0, (time * 0.15 + o.phase) * 0.15, 0);
        const fistShrink = isFist ? 0.6 : 1;
        dummy.scale.setScalar(o.scale * tw * fistShrink);
        dummy.updateMatrix();
        ornamentsRef.current.setMatrixAt(i, dummy.matrix);
      }
      ornamentsRef.current.instanceMatrix.needsUpdate = true;

      if (!ornamentsColorAttrRef.current) {
        const colors = new Float32Array(ornaments.length * 3);
        for (let i = 0; i < ornaments.length; i++) {
          const c = ornaments[i].color;
          colors[i * 3] = c.r;
          colors[i * 3 + 1] = c.g;
          colors[i * 3 + 2] = c.b;
        }
        const attr = new THREE.InstancedBufferAttribute(colors, 3);
        ornamentsRef.current.geometry.setAttribute('instanceColor', attr);
        ornamentsColorAttrRef.current = attr;
      }
    }

    // 2. LOGIC HOẠT HÌNH CHO TUẦN LỘC CHẠY
    if (animatedReindeerRef.current) {
        const runRadius = 16; // Bán kính chạy (rộng hơn cây một chút)
        const runSpeed = 0.8; // Tốc độ chạy (radian/giây)
        const angle = time * runSpeed;

        // Tính vị trí mới theo hình tròn
        const x = Math.cos(angle) * runRadius;
        const z = Math.sin(angle) * runRadius;
        
        // Cập nhật vị trí (độ cao y = -13 để sát mặt đất)
        animatedReindeerRef.current.position.set(x, -13, z);

        // Cập nhật góc xoay để tuần lộc luôn hướng về phía trước khi chạy
        // Hướng tiếp tuyến quỹ đạo (tangent). Offset nhỏ để khớp hướng model.
        animatedReindeerRef.current.rotation.y = -angle + Math.PI / 2;
    }

    // Santa riding reindeer: fly across the screen
    if (flyingSantaRef.current) {
      const w = viewport.width;
      const margin = 6;
      const period = w + margin * 2;
      const speed = 2.2; // world units/sec
      const x = ((time * speed) % period) - (period / 2);
      const y = 10.5 + Math.sin(time * 0.9) * 0.9;
      const z = 10.0;

      flyingSantaRef.current.position.set(x, y, z);
      flyingSantaRef.current.rotation.set(0, -Math.PI / 2, 0);
      // subtle bob + slight roll
      flyingSantaRef.current.rotation.z = Math.sin(time * 1.2) * 0.06;
    }

    // Love text sparkle
    if (loveTextRef.current) {
      loveTextRef.current.visible = isVictory;
      if (isVictory) {
        const m = loveTextRef.current.material as THREE.MeshBasicMaterial;
        if (m) {
          m.transparent = true;
          m.depthWrite = false;
          m.opacity = 0.65 + 0.35 * Math.sin(time * 10) + bass * 0.25;
        }
        loveTextRef.current.position.set(0, 8.5, 0);
        loveTextRef.current.lookAt(camera.position);
        const s = 10 + 1.2 * Math.sin(time * 6 + 1.3) + bass * 2.2;
        loveTextRef.current.scale.set(s, s * 0.25, 1);
      }
    }
  });

  return (
    <group ref={rootGroupRef}>
      {/* Ice layers shaped like the tree (tiered frustums) */}
      <group ref={iceLayersRef} visible={false}>
        {Array.from({ length: 11 }).map((_, i) => {
          const t = i / 10;
          const y = THREE.MathUtils.lerp(-11.6, 13.2, t);
          const taper = Math.pow(1 - t, 1.08);
          const rBottom = 15.8 * taper;
          const rTop = Math.max(0.2, rBottom * 0.72);
          const h = 0.9 + (1 - t) * 0.35;
          return (
            <mesh key={i} position={[0, y, 0]}>
              <cylinderGeometry args={[rTop, rBottom, h, 26, 1, true]} />
              <meshStandardMaterial
                color="#bfe9ff"
                emissive="#7ecbff"
                emissiveIntensity={0.22}
                metalness={0.15}
                roughness={0.12}
                transparent
                opacity={0.18}
                depthWrite={false}
                toneMapped={false}
              />
            </mesh>
          );
        })}
      </group>

      {/* Frosty needles (tinsel-like leaves) */}
      <instancedMesh ref={iceNeedlesRef} args={[undefined as any, undefined as any, iceNeedleInstances.length]}>
        <planeGeometry args={[0.9, 0.22]} />
        <meshBasicMaterial
          map={(tinselTexture ?? undefined) as any}
          transparent
          opacity={0.65}
          alphaTest={0.08}
          depthWrite={false}
          toneMapped={false}
          color="#d9f2ff"
        />
      </instancedMesh>

      {/* Sparkling ice halo ring */}
      <points ref={iceHaloRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[iceHaloPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={snowflakeTex}
          transparent
          opacity={0.8}
          alphaTest={0.12}
          depthWrite={false}
          size={0.22}
          sizeAttenuation
          toneMapped={false}
          color="#eaf6ff"
        />
      </points>

      {/* Ice glitter (snow on branches) */}
      <points ref={iceGlitterRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[iceGlitterPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={snowflakeTex}
          transparent
          opacity={0.55}
          alphaTest={0.15}
          depthWrite={false}
          size={0.19}
          sizeAttenuation
          color={magicOn ? '#bfe9ff' : '#ffffff'}
        />
      </points>
      {/* 1. LAYER ẢNH */}
      <group ref={mainGroupRef}>
        {photoPoints.map((p, i) => (
          <group key={i}>
            <mesh>
              <planeGeometry args={[0.7, 0.7]} />
              <meshBasicMaterial map={textures[p.texIdx]} transparent side={THREE.DoubleSide} />
            </mesh>
          </group>
        ))}
      </group>

      {/* 2. LAYER ĐÈN LED */}
      <group ref={ledRef}>
        {ledPoints.map((p, i) => (
          <group key={i} position={p.pos}>
            <mesh>
              <sphereGeometry args={[0.12, 12, 12]} />
              <meshStandardMaterial
                color={p.color}
                emissive={p.color}
                emissiveIntensity={2.8}
                toneMapped={false}
              />
            </mesh>
            {ledGlowTex && (
              <sprite>
                <spriteMaterial
                  map={ledGlowTex}
                  transparent
                  opacity={0.32}
                  depthWrite={false}
                  toneMapped={false}
                  color={p.color}
                  blending={THREE.AdditiveBlending}
                />
              </sprite>
            )}
          </group>
        ))}
      </group>

      {/* 2.5 GARLANDS (Tinsel) */}
      <group visible={!gesture?.isFist && !magicOn}>
        {garlands.map((g, idx) => (
          <mesh key={idx} geometry={g.geom}>
            <meshStandardMaterial
              color={g.color}
              emissive={g.emissive}
              emissiveIntensity={magicOn ? 0.35 : 0.18}
              roughness={0.16}
              metalness={0.55}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>

      {/* 2.6 ORNAMENTS */}
      <instancedMesh ref={ornamentsRef} args={[undefined as any, undefined as any, ornaments.length]}>
        <sphereGeometry args={[1, 14, 14]} />
        <meshStandardMaterial
          color="#ffd36a"
          emissive="#ffd36a"
          emissiveIntensity={0.35}
          metalness={0.9}
          roughness={0.18}
          toneMapped={false}
          vertexColors
        />
      </instancedMesh>

      {/* 3. TRANG TRÍ NHÂN VẬT TĨNH */}
      <Santa position={[-8, -13, 5]} />
      <Reindeer position={[8, -13, 8]} rotation={[0, -Math.PI / 4, 0]} />
      <Reindeer position={[10, -13, 4]} rotation={[0, -Math.PI / 6, 0]} />

      {/* 4. NGÔI SAO TRÊN ĐỈNH */}
      <mesh position={[0, 15, 0]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial ref={starMatRef} color="#ffd700" emissive="#ffd700" emissiveIntensity={5} toneMapped={false} />
      </mesh>

      {/* Controlled star glow (no bloom) */}
      {starGlowTexture && (
        <mesh position={[0, 15, 0]}>
          <planeGeometry args={[8, 8]} />
          <meshBasicMaterial
            map={starGlowTexture}
            transparent
            opacity={magicOn ? 0.28 : 0.18}
            depthWrite={false}
            toneMapped={false}
            blending={THREE.NormalBlending}
          />
        </mesh>
      )}

      {/* Star flare */}
      {starFlareTexture && (
        <mesh ref={starFlareRef}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={starFlareTexture}
            transparent
            opacity={0.32}
            depthWrite={false}
            toneMapped={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Victory: LOVE TEXT */}
      {loveTexture && (
        <mesh ref={loveTextRef} visible={false}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial map={loveTexture} transparent toneMapped={false} />
        </mesh>
      )}

      {/* 5. TUẦN LỘC CHẠY QUANH (ANIMATED REINDEER) */}
      <group ref={animatedReindeerRef}>
         {/* Tái sử dụng component Reindeer, đặt về vị trí gốc 0,0,0 trong group của nó */}
         <Reindeer position={[0, 0, 0]} rotation={[0, 0, 0]} />
      </group>

      {/* 6. SANTA CƯỠI TUẦN LỘC BAY QUA MÀN HÌNH */}
      <group ref={flyingSantaRef} scale={1.25}>
        <Reindeer position={[0, 0, 0]} rotation={[0, 0, 0]} />
        <group position={[-0.4, 0.95, 0]} scale={0.85} rotation={[0, 0, 0.05]}>
          <Santa position={[0, 0, 0]} />
        </group>
      </group>
    </group>
  );
}