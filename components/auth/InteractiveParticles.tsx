
import React, { useRef, useEffect } from 'react';

const InteractiveParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let animationFrameId: number;

    let particles: Particle[] = [];
    
    function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
        let timeout: ReturnType<typeof setTimeout> | null = null;
    
        const debounced = (...args: Parameters<F>) => {
            if (timeout !== null) {
                clearTimeout(timeout);
                timeout = null;
            }
            timeout = setTimeout(() => func(...args), waitFor);
        };
    
        return debounced as (...args: Parameters<F>) => void;
    }

    class Particle {
      x: number;
      y: number;
      baseSize: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      pulseAngle: number;
      pulseSpeed: number;

      constructor(x: number, y: number, size: number, speedX: number, speedY: number, color: string) {
        this.x = x;
        this.y = y;
        this.baseSize = size;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
        this.pulseAngle = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.04 + 0.01;
      }

      update() {
        // Wall collision
        if (this.x + this.size > width || this.x - this.size < 0) this.speedX *= -1;
        if (this.y + this.size > height || this.y - this.size < 0) this.speedY *= -1;

        this.x += this.speedX;
        this.y += this.speedY;
        
        // Mouse interaction
        let dx = mouse.current.x - this.x;
        let dy = mouse.current.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150) { 
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (150 - distance) / 150;
            const directionX = forceDirectionX * force * -1; // Repel from mouse
            const directionY = forceDirectionY * force * -1;
            this.x += directionX * 2;
            this.y += directionY * 2;
        }

        // Pulsing effect
        this.pulseAngle += this.pulseSpeed;
        this.size = this.baseSize + Math.sin(this.pulseAngle) * (this.baseSize / 3);
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    function init() {
      particles = [];
      const isMobile = width < 768;
      const particleDensity = isMobile ? 20000 : 9000;
      const numberOfParticles = (width * height) / particleDensity;
      const colors = ['rgba(168, 85, 247, 0.6)', 'rgba(59, 130, 246, 0.6)', 'rgba(99, 102, 241, 0.5)'];

      for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 3 + 1.5;
        let x = Math.random() * (width - size * 2) + size;
        let y = Math.random() * (height - size * 2) + size;
        let speedX = (Math.random() - 0.5) * 0.6;
        let speedY = (Math.random() - 0.5) * 0.6;
        let color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, size, speedX, speedY, color));
      }
    }

    function animate() {
      if (!ctx) return;
      ctx.fillStyle = 'rgba(26, 26, 26, 0.15)';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    const debouncedResize = debounce(handleResize, 250);

    const handleMouseMove = (e: MouseEvent) => {
        mouse.current.x = e.clientX;
        mouse.current.y = e.clientY;
    };

    window.addEventListener('resize', debouncedResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10 bg-[#1a1a1a]" />;
};

export default InteractiveParticles;