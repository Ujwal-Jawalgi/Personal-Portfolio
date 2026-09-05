import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const FRAME_COUNT = 150;

const ScrollyCanvas = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);

  // Preload all frames on mount
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages = [];
      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        const frameIndex = i.toString().padStart(3, '0');
        img.src = `/sequence/frame_${frameIndex}_delay-0.067s.png`;
        
        await new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve; // Continue even if one fails
        });
        
        loadedImages.push(img);
      }
      setImages(loadedImages);
    };
    loadImages();
  }, []);

  // Track scroll progress within this 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll 0-1 to frame index 0-149
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    if (images.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Render frame whenever scroll changes
    const unsubscribe = frameIndex.on("change", (latest) => {
      const currentFrame = Math.min(Math.round(latest), FRAME_COUNT - 1);
      const img = images[currentFrame];
      
      if (img && img.complete && img.naturalWidth !== 0) {
        const dpr = window.devicePixelRatio || 1;
        // Physical pixels vs CSS pixels
        const displayWidth = canvas.clientWidth;
        const displayHeight = canvas.clientHeight;
        
        // Ensure canvas internal resolution matches device resolution
        if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
          canvas.width = displayWidth * dpr;
          canvas.height = displayHeight * dpr;
        }

        // Scale by device pixel ratio for sharp rendering
        ctx.scale(dpr, dpr);

        // Object-fit: contain equivalent logic to avoid cropping
        const scale = Math.min(displayWidth / img.width, displayHeight / img.height);
        const x = (displayWidth / 2) - (img.width / 2) * scale;
        const y = (displayHeight / 2) - (img.height / 2) * scale;
        
        ctx.clearRect(0, 0, displayWidth, displayHeight);
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        
        // Reset transform to identity
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
    });

    return () => unsubscribe();
  }, [images, frameIndex]);

  // Handle canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      // Re-draw current frame on resize
      if (images.length > 0) {
        const currentFrame = Math.min(Math.round(frameIndex.get()), FRAME_COUNT - 1);
        const img = images[currentFrame];
        if (img && img.complete && img.naturalWidth !== 0) {
          const ctx = canvas.getContext('2d');
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          ctx.scale(dpr, dpr);
          const scale = Math.min(window.innerWidth / img.width, window.innerHeight / img.height);
          const x = (window.innerWidth / 2) - (img.width / 2) * scale;
          const y = (window.innerHeight / 2) - (img.height / 2) * scale;
          
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
          ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // initial set
    
    return () => window.removeEventListener('resize', handleResize);
  }, [images, frameIndex]);

  // Overlay Opacities mapped to scroll sections
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25, 0.35], [0, 1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.35, 0.5, 0.6, 0.7], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.7, 0.85, 0.95, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} style={{ height: '500vh', position: 'relative', backgroundColor: 'var(--bg-primary)' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden' }}>
        <canvas 
          ref={canvasRef} 
          style={{ display: 'block', width: '100%', height: '100%' }}
        />
        
        {/* Scrollytelling Overlays */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          <motion.div style={{ position: 'absolute', opacity: opacity1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 2rem' }}>
            <h1 style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', fontFamily: 'var(--font-heading)', color: '#ffffff', fontWeight: '900', letterSpacing: '-0.05em', lineHeight: '1', margin: 0 }}>
              Ujwal.
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', fontFamily: 'var(--font-body)', color: 'rgba(255, 255, 255, 0.7)', marginTop: '0.5rem', fontWeight: '400' }}>
              Full Stack Developer.
            </p>
          </motion.div>

          <motion.div style={{ position: 'absolute', opacity: opacity2, textAlign: 'center', padding: '0 2rem' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontFamily: 'var(--font-heading)', color: 'var(--primary)', textShadow: '0 4px 30px rgba(0,0,0,0.8)' }}>
              GenAI & RAG Engineer | React & Next.js
            </h2>
          </motion.div>

          <motion.div style={{ position: 'absolute', opacity: opacity3, textAlign: 'center', padding: '0 2rem' }}>
            <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', textShadow: '0 4px 30px rgba(0,0,0,0.8)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
              Building scalable, AI-powered web applications and intelligent systems using modern frontend, backend, and Generative AI technologies.
            </h2>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ScrollyCanvas;
