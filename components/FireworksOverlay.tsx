// components/FireworksOverlay.tsx
'use client';
import { useEffect, useRef } from 'react';

export default function FireworksOverlay({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    let particles: any[] = [];
    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      x: number; y: number; vx: number; vy: number; alpha: number; color: string; size: number; decay: number;
      constructor(x: number, y: number, color: string) {
        this.x = x; this.y = y;
        const angle = Math.random() * Math.PI * 2;
        // TĂNG TỐC ĐỘ NỔ: Bán kính nổ bự hơn
        const speed = Math.random() * 15 + 5; 
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.color = color;
        this.size = Math.random() * 3 + 1; // Hạt to nhỏ khác nhau
        this.decay = Math.random() * 0.015 + 0.005; // Tốc độ mờ ngẫu nhiên
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        this.vy += 0.08; // Trọng lực mạnh hơn chút
        this.alpha -= this.decay; // Mờ dần
      }
      draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
      }
    }

    const createFirework = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height * 0.6; // Nổ cao hơn
      const color = `hsl(${Math.random() * 360}, 100%, 60%)`; // Màu rực rỡ hơn
      // TĂNG SỐ LƯỢNG HẠT: Dày đặc và mãnh liệt
      for (let i = 0; i < 150; i++) particles.push(new Particle(x, y, color));
    };

    const animate = () => {
      // HIỆU ỨNG ĐUÔI (Motion Blur):
      // Thay vì xóa sạch (clearRect), ta phủ một lớp màu đen bán trong suốt
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'; // Độ mờ của đuôi
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter'; // Cộng màu cho rực rỡ

      // Tăng tần suất bắn khi active
      if (active && Math.random() < 0.15) createFirework(); else if (!active && Math.random() < 0.02) createFirework();

      particles = particles.filter(p => p.alpha > 0.05);
      particles.forEach(p => { p.update(); p.draw(); });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      // Xóa sạch khi unmount
      if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          ctx?.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
  }, [active]);

  return (
    <canvas 
      ref={canvasRef} 
      // Khi active thì hiện rõ, không thì mờ đi
      className={`fixed inset-0 z-[60] pointer-events-none transition-opacity duration-1000 ${active ? 'opacity-100' : 'opacity-30'}`}
    />
  );
}