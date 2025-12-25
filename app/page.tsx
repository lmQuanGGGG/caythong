'use client';
import { useState, useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import PhotoTree from '@/components/PhotoTree';
import HandTracker from '@/components/HandTracker';
import Snowfall from '@/components/Snowfall';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

export default function Home() {
  const [mode, setMode] = useState<'TREE' | 'TEXT' | 'SCATTER'>('TREE');
  const [gesture, setGesture] = useState({
    cursor: { x: 0, y: 0 },
    rotation: { x: 0, y: 0 },
    isPinching: false
  });
  const [audioData, setAudioData] = useState<Uint8Array | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Hàm kích hoạt Nhạc và AI
  const handleStart = () => {
    if (!audioRef.current) return;

    // Khởi tạo AudioContext (Bắt buộc phải có tương tác người dùng)
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const analyzer = ctx.createAnalyser();
    const source = ctx.createMediaElementSource(audioRef.current);
    source.connect(analyzer);
    analyzer.connect(ctx.destination);

    const data = new Uint8Array(analyzer.frequencyBinCount);
    const update = () => {
      analyzer.getByteFrequencyData(data);
      setAudioData(new Uint8Array(data));
      requestAnimationFrame(update);
    };

    audioRef.current.play();
    update();
    setIsStarted(true);
  };

  const onGestureUpdate = useCallback((res: any) => {
    setGesture(res);

    // Victory (✌️) -> Heart mode (handled inside PhotoTree), cancel fireworks.
    if (res.isVictory) {
      setMode('TREE');
      return;
    }

    // Nắm tay (FIST) -> hiện chữ
    if (res.isFist) {
      setMode('TREE');
      return;
    }

    // Mở tay (OPEN) -> Scatter
    if (!res.isPinching) {
      if (res.isOpen) setMode('SCATTER');
      else setMode('TREE');
    }
  }, []);

  return (
    <main className="h-screen w-full bg-black relative overflow-hidden">
      {/* Deep vignette background */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(20,20,40,0.35)_0%,rgba(0,0,0,0.92)_55%,rgba(0,0,0,1)_100%)]" />

      {/* 3D Scene */}
      <Canvas
        camera={{ position: [0, 0, 50], fov: 45 }}
        onCreated={({ gl }) => {
          gl.setClearColor('#020208', 1);
        }}
      >
        {/* Subtle bloom: keep background deep black */}
        <EffectComposer>
          <Bloom
            intensity={0.18}
            luminanceThreshold={0.88}
            luminanceSmoothing={0.16}
            mipmapBlur
          />
        </EffectComposer>
        <PhotoTree mode={mode} gesture={gesture} audioData={audioData} magicOn={isStarted} />
        <Snowfall count={1500} groupRotation={gesture.rotation} />

        {/* Magic Snow Glow */}
        <ambientLight intensity={isStarted ? 0.45 : 0.3} />
        <hemisphereLight intensity={isStarted ? 0.22 : 0.16} color="#eaf6ff" groundColor="#000000" />
        <directionalLight position={[10, 18, 10]} intensity={isStarted ? 0.62 : 0.48} color="#ffffff" />
      </Canvas>

      {/* AI & Effects */}
      <HandTracker onGestureUpdate={onGestureUpdate} />

      {/* Nút bấm kích hoạt trải nghiệm */}
      {!isStarted && (
        <div className="absolute inset-0 flex items-center justify-center z-[100] bg-black/80">
          <button
            onClick={handleStart}
            className="px-12 py-5 border-2 border-[#ffd700] text-[#ffd700] hover:bg-[#ffd700] hover:text-black transition-all duration-500 font-serif text-2xl tracking-[0.2em] shadow-[0_0_30px_rgba(255,215,0,0.3)]"
          >
            OPEN MAGIC
          </button>
        </div>
      )}

      {/* Thông tin Mode khi đang chơi */}
      {isStarted && (
        <div className="absolute top-10 w-full text-center text-[#ffd700]/50 font-serif tracking-widest pointer-events-none">
          {mode} MODE
        </div>
      )}

      <audio ref={audioRef} src="/music/holiday.mp3" loop />
    </main>
  );
}