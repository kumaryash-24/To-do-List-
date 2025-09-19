import React, { useRef, useEffect } from 'react';

const FireworksAndFlowers: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationFrameId: number;

    const particles: Particle[] = [];
    const colors = ['#a855f7', '#3b82f6', '#ec4899', '#14b8a6', '#f59e0b'];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      life: number;
      gravity: number;
      isFlowerSeed: boolean;

      constructor(x: number, y: number, vx: number, vy: number, size: number, color: string, life: number, gravity = 0.05, isFlowerSeed = false) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.size = size;
        this.color = color;
        this.life = life;
        this.gravity = gravity;
        this.isFlowerSeed = isFlowerSeed;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.life -= 1;
      }

      draw() {
        if (!ctx) return;
        ctx.globalAlpha = this.life / 100;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const createExplosion = (x: number, y: number, isFlower: boolean) => {
        const particleCount = isFlower ? 50 : 100;
        const baseColor = colors[Math.floor(Math.random() * colors.length)];

        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * (isFlower ? 2 : 4) + 1;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
            const size = Math.random() * 2 + 1;
            const life = Math.random() * 50 + 50;
            const gravity = isFlower ? 0 : 0.05;
            particles.push(new Particle(x, y, vx, vy, size, baseColor, life, gravity));
        }
    }
    
    const launchFirework = (x: number, y: number) => {
        const targetX = x;
        const targetY = y - (Math.random() * height / 4 + height / 4);
        const rocket = new Particle(targetX, height, 0, -5 - Math.random() * 3, 2, '#ffffff', 100);
        rocket.isFlowerSeed = false;
        
        // This is a "dummy" rocket, we just use its life to time the explosion
        const timer = setInterval(() => {
            if (rocket.life-- <= 0) {
                clearInterval(timer);
                createExplosion(targetX, targetY, false);
            }
        }, 10);
    }
    
    const launchFlower = () => {
        const x = Math.random() * width;
        const y = Math.random() * height;
        createExplosion(x, y, true);
    }


    function animate() {
      if (!ctx) return;
      ctx.fillStyle = 'rgba(26, 26, 26, 0.1)';
      ctx.fillRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();
        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }

      if (Math.random() < 0.015) { // Randomly trigger flowers
        launchFlower();
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleClick = (e: MouseEvent) => {
        launchFirework(e.clientX, e.clientY);
    };

    // Initial burst on load to make it feel dynamic immediately
    setTimeout(() => {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const x = Math.random() * width;
                const y = Math.random() * height * 0.7; // launch in the top 70%
                createExplosion(x, y, Math.random() > 0.5);
            }, i * 150);
        }
    }, 100); // Small delay to ensure canvas is ready and animation is smooth

    window.addEventListener('resize', handleResize);
    window.addEventListener('click', handleClick);
    
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10 bg-[#1a1a1a]" />;
};

export default FireworksAndFlowers;