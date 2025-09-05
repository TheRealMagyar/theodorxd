// app/FilmEffect.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "../home.module.css";

export default function FilmEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Grain effect parameters
    const grainDensity = 0.09; // Very low density for performance
    const grainOpacity = 0.8; // Subtle grain
    let animationFrameId: number;
    let lastFrameTime = 0;
    const frameInterval = 100; // Update every 100ms (10 FPS)

    // Draw static scratches
    const drawScratches = () => {
      ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 2; i++) {
        const x = Math.random() * canvas.width;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + (Math.random() - 0.5) * 5, canvas.height);
        ctx.stroke();
      }
    };

    // Draw animated grain
    const drawGrain = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawScratches();

      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        if (Math.random() < grainDensity) {
          const value = Math.random() * 255;
          data[i] = value; // R
          data[i + 1] = value; // G
          data[i + 2] = value; // B
          data[i + 3] = grainOpacity * 255; // A
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    // Animation loop with throttled frame rate
    const animate = (time: number) => {
      if (time - lastFrameTime < frameInterval || !isVisible || isLightboxOpen) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = time;
      drawGrain();
      animationFrameId = requestAnimationFrame(animate);
    };

    // Check for low-end devices
    const isLowEndDevice = navigator.hardwareConcurrency < 4;
    if (!isLowEndDevice) {
      animate(performance.now());
    }

    // IntersectionObserver to pause when not visible
    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // Monitor lightbox state
    const lightboxObserver = new MutationObserver(() => {
      const lightbox = document.getElementById("lightbox");
      setIsLightboxOpen(!!lightbox?.classList.contains(styles.open));
    });
    const lightbox = document.getElementById("lightbox");
    if (lightbox) {
      lightboxObserver.observe(lightbox, { attributes: true, attributeFilter: ["class"] });
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      lightboxObserver.disconnect();
    };
  }, [isLightboxOpen, isVisible]);

  return (
    <div ref={containerRef} className={styles.filmwrap} aria-hidden="true">
      <div className={styles.content}>
        <Image
          src="/background.png"
          alt=""
          className={styles.bgImg}
          aria-hidden="true"
          fill
          style={{ objectFit: "cover" }}
        />
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>
    </div>
  );
}