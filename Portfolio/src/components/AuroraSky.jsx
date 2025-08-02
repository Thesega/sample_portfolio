import React, { useRef, useEffect } from 'react';

const AuroraSky = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr); // Scale context to device pixels

    const auroras = [
      {
        offset: 0,
        amplitude: 80 + Math.random() * 40,
        speed: 0.5 + Math.random() * 0.3,
        phase: 0,
        colors: [
          'rgba(0,255,255,0.15)',
          'rgba(0,200,255,0.12)',
          'rgba(0,128,255,0.10)',
          'rgba(0,255,180,0.08)',
        ]
      },
      {
        offset: 100,
        amplitude: 90 + Math.random() * 40,
        speed: 0.6 + Math.random() * 0.3,
        phase: Math.PI,
        colors: [
          'rgba(255,100,255,0.15)',
          'rgba(200,0,200,0.12)',
          'rgba(150,0,255,0.10)',
          'rgba(255,128,255,0.08)',
        ]
      },
      {
        offset: 200,
        amplitude: 100 + Math.random() * 40,
        speed: 0.7 + Math.random() * 0.3,
        phase: Math.random() * 2 * Math.PI,
        colors: [
          'rgba(100,255,255,0.15)',
          'rgba(128,255,255,0.12)',
          'rgba(0,255,128,0.10)',
          'rgba(255,255,255,0.08)',
        ]
      },
    ];

    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.6,
      r: Math.random() * 1.4,
      opacity: Math.random(),
      twinkle: 0.002 + Math.random() * 0.005,
    }));

    const shootingStars = [];

    const createShootingStar = () => {
      const startX = Math.random() * width * 0.8;
      const startY = Math.random() * height * 0.5;

      shootingStars.push({
        x: startX,
        y: startY,
        vx: 6 + Math.random() * 3,
        vy: 4 + Math.random() * 2,
        length: 120 + Math.random() * 40,
        opacity: 1,
        frontSize: 3 + Math.random() * 2,
      });
    };

    const scheduleNextStar = () => {
      createShootingStar();
      const nextTime = 3000 + Math.random() * 3000;
      setTimeout(scheduleNextStar, nextTime);
    };
    scheduleNextStar();

    let frame = 0;

    const drawAurora = () => {
      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#050018');
      gradient.addColorStop(1, '#000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      auroras.forEach((aurora, layerIndex) => {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 10) {
          const y = height - (
            Math.sin((x + frame * aurora.speed + aurora.offset) * 0.005 + aurora.phase)
            * aurora.amplitude + 100 + layerIndex * 60
          );
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        const auroraGradient = ctx.createLinearGradient(0, 0, width, 0);
        aurora.colors.forEach((color, i) =>
          auroraGradient.addColorStop(i / aurora.colors.length, color)
        );

        ctx.fillStyle = auroraGradient;
        ctx.fill();
      });

      stars.forEach((star) => {
        star.opacity += star.twinkle;
        if (star.opacity > 1 || star.opacity < 0) star.twinkle *= -1;

        ctx.beginPath();
        ctx.globalAlpha = star.opacity;
        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
      });

      shootingStars.forEach((star, index) => {
        ctx.beginPath();
        ctx.globalAlpha = star.opacity;
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.length * 0.8, star.y - star.length * 0.5);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.frontSize, 0, 2 * Math.PI);
        const glowGradient = ctx.createRadialGradient(
          star.x, star.y, 0, star.x, star.y, star.frontSize * 2
        );
        glowGradient.addColorStop(0, 'rgba(255,255,255,0.9)');
        glowGradient.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = glowGradient;
        ctx.fill();

        star.x += star.vx;
        star.y += star.vy;
        star.opacity -= 0.01;

        if (star.x > width || star.y > height || star.opacity <= 0) {
          shootingStars.splice(index, 1);
        }
      });

      ctx.globalAlpha = 1;
      frame++;
      requestAnimationFrame(drawAurora);
    };

    drawAurora();

    // Resize canvas on screen resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 z-0"
    />
  );
};

export default AuroraSky;
