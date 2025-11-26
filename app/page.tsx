"use client";

import { useEffect, useRef } from "react";

interface Flake {
  x: number;
  y: number;
  radius: number;
  speed: number;
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    canvas.width = width;
    canvas.height = height;

    const FLAKES = 200;
    const flakes: Flake[] = [];

    for (let i = 0; i < FLAKES; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 1 + Math.random() * 3,
        speed: 0.5 + Math.random() * 1.2,
      });
    }
   
    const update = () => {
      for (const f of flakes) {
        f.y += f.speed;

        if (f.y > height) {
          f.y = -5;
          f.x = Math.random() * width;
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = "white";
      ctx.beginPath();

      for (const f of flakes) {
        ctx.moveTo(f.x + f.radius, f.y);
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
      }

      ctx.fill();
    };

    let id: number;
    const loop = () => {
      update();
      draw();
      id = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    // <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    <main className="relative flex justify-center items-center w-full h-screen"> 
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>
      <div className="absolute flex flex-col items-center">
        <p className="text-[#edf9ff] font-bold text-9xl text-shadow-lg">End of Fall 2025 Semester</p>
        <p className="text-[#f0fffd] text-2xl mt-4 text-shadow-md">this page was made using the nextjs framework alongside react + typescript and styled using tailwindcss.</p>
        <p className="text-[#f0fffd] text-2xl mt-4 text-shadow-md">the page is then hosted on vercel using the github deployments + vercel integration.</p>
        <p className="text-[#f0fffd] text-2xl mt-4 text-shadow-md">there were not many issues other than fighting the ts compiler and implementing the draw loop</p>
      </div>
    </main>
    //</div>
  );
}
