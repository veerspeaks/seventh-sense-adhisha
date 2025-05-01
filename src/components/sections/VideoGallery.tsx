import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { useEffect, useRef, useState } from "react";

interface VideoItem {
  id: number;
  background: string;
}

interface VideoGalleryProps {
  videoItems: VideoItem[];
}

export const VideoGallery = ({ videoItems }: VideoGalleryProps): JSX.Element => {
  const [isMobile, setIsMobile] = useState(false);
  const [cardWidth, setCardWidth] = useState(380);
  const [cardHeight, setCardHeight] = useState(520);
  
  // Create triple the items to ensure enough content for infinite scroll
  const extendedItems = [...videoItems, ...videoItems, ...videoItems];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      
      // Adjust card dimensions based on screen size
      if (width < 640) {
        setCardWidth(250); // Smallest screens
        setCardHeight(350);
      } else if (width < 768) {
        setCardWidth(300); // Small screens
        setCardHeight(420);
      } else if (width < 1024) {
        setCardWidth(340); // Medium screens
        setCardHeight(470);
      } else {
        setCardWidth(380); // Large screens (default)
        setCardHeight(520);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  useEffect(() => {
    // Calculate the animation distance (width of one item set)
    const gapWidth = 24;  // Gap between cards
    const totalWidth = videoItems.length * (cardWidth + gapWidth);
    
    // Create and inject the animation CSS
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @keyframes scroll {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-${totalWidth}px);
        }
      }
      .animate-scroll {
        animation: scroll 60s linear infinite;
      }
    `;
    document.head.appendChild(styleEl);
    
    // Clean up on unmount
    return () => {
      document.head.removeChild(styleEl);
    };
  }, [videoItems, cardWidth]);

  // Particle waves background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    type Particle = { x: number; speed: number; offset: number; size: number; opacity: number };
    interface Wave { baseY: number; amplitude: number; wavelength: number; speed: number; particles: Particle[] }

    // Define two waves
    const waves: Wave[] = [
      { baseY: canvas.height * 0.9, amplitude: 40, wavelength: canvas.width * 0.6, speed: 0.2, particles: [] },
      { baseY: canvas.height * 0.1, amplitude: 30, wavelength: canvas.width * 0.8, speed: -0.15, particles: [] }
    ];
    const counts = [80, 60];
    waves.forEach((wave, i) => {
      for (let j = 0; j < counts[i]; j++) {
        const x = Math.random() * canvas.width;
        wave.particles.push({
          x,
          speed: wave.speed * (0.5 + Math.random() * 0.5),
          offset: Math.random() * Math.PI * 2,
          size: Math.random() * 2 + 1,
          opacity: 0.3 + Math.random() * 0.2,
        });
      }
    });

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      waves.forEach(wave => {
        wave.particles.forEach(p => {
          p.x += p.speed;
          if (p.speed > 0 && p.x > canvas.width) p.x = 0;
          if (p.speed < 0 && p.x < 0) p.x = canvas.width;
          const y = wave.baseY + Math.sin((p.x / wave.wavelength) * Math.PI * 2 + p.offset) * wave.amplitude;
          ctx.beginPath();
          ctx.arc(p.x, y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,184,0,${p.opacity})`;
          ctx.fill();
        });
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section ref={containerRef} className="w-full py-10 sm:py-14 md:py-20 bg-black overflow-hidden relative">
      {/* Wave canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="overflow-hidden">
          <div 
            className="flex items-center gap-3 sm:gap-4 md:gap-6 animate-scroll"
            style={{
              width: "max-content"
            }}
          >
            {extendedItems.map((video, index) => (
              <Card
                key={`${video.id}-${index}`}
                className="rounded-[20px] flex-shrink-0"
                style={{ 
                  backgroundImage: `url(${video.background})`, 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center',
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 