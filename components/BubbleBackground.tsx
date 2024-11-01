"use client";

import { useEffect, useRef } from 'react';

interface Bubble {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export default function BubbleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let bubbles: Bubble[] = [];
    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const createBubble = (): Bubble => ({
      x: Math.random() * width,
      y: height + Math.random() * 20,
      size: Math.random() * 15 + 5,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: -Math.random() * 0.5 - 0.5,
      opacity: Math.random() * 0.2 + 0.1,
    });

    const initBubbles = () => {
      bubbles = Array.from({ length: 50 }, createBubble);
    };

    const drawBubble = (bubble: Bubble) => {
      if (!ctx) return;

      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(173, 216, 230, ${bubble.opacity})`; // Light blue color
      ctx.fill();

      // Add shine effect with light blue gradient
      const gradient = ctx.createRadialGradient(
        bubble.x - bubble.size * 0.3,
        bubble.y - bubble.size * 0.3,
        bubble.size * 0.1,
        bubble.x,
        bubble.y,
        bubble.size
      );
      gradient.addColorStop(0, `rgba(173, 216, 230, ${bubble.opacity * 2})`);
      gradient.addColorStop(1, 'rgba(173, 216, 230, 0)');
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const updateBubble = (bubble: Bubble) => {
      bubble.x += bubble.speedX;
      bubble.y += bubble.speedY;

      // Add slight wobble
      bubble.x += Math.sin(bubble.y * 0.02) * 0.2;

      if (bubble.y < -bubble.size) {
        Object.assign(bubble, createBubble());
      }
    };

    const animate = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);

      bubbles.forEach((bubble) => {
        updateBubble(bubble);
        drawBubble(bubble);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initBubbles();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-blue-100/20 to-transparent"
    />
  );
}