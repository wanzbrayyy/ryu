import React, { useRef, useEffect } from 'react';
import { useTheme } from '@/components/ThemeProvider';

const SpaceHero = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasDimensions();

    const primaryColor = theme === 'dark' ? '97, 97, 255' : '79, 70, 229';

    const stars = [];
    const numStars = 200;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        vx: Math.floor(Math.random() * 50) - 25,
        vy: Math.floor(Math.random() * 50) - 25,
        color: `rgba(${primaryColor}, ${Math.random() * 0.5 + 0.2})`
      });
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0, x = stars.length; i < x; i++) {
        const s = stars[i];
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
      }
    }

    function update() {
      for (let i = 0, x = stars.length; i < x; i++) {
        const s = stars[i];
        s.x += s.vx / 60;
        s.y += s.vy / 60;
        if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
        if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
      }
    }

    function tick() {
      draw();
      update();
      animationFrameId = requestAnimationFrame(tick);
    }

    tick();

    window.addEventListener('resize', setCanvasDimensions);

    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />;
};

export default SpaceHero;