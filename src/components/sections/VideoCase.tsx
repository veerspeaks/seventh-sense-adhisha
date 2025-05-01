import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Heart, MessageCircle, Send, Bookmark, Music2 } from "lucide-react";

interface VideoItem {
  id: string;
  src: string;
  thumbnail: string;
  title: string;
}

interface VideoCaseProps {
  videos: VideoItem[];
}

export const VideoCase = ({ videos }: VideoCaseProps): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(1); // Start with second video
  const [isMuted, setIsMuted] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right' | null>(null);
  const [likeCount, setLikeCount] = useState<Record<string, number>>({});
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startX = useRef<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Initialize random like counts
  useEffect(() => {
    const initialLikes: Record<string, number> = {};
    videos.forEach(video => {
      initialLikes[video.id] = Math.floor(Math.random() * 100000) + 10000;
    });
    setLikeCount(initialLikes);
  }, [videos]);

  // Preload and configure videos
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length);
    
    // Play the active video and pause others
    videoRefs.current.forEach((videoEl, index) => {
      if (!videoEl) return;
      
      if (index === activeIndex) {
        videoEl.muted = isMuted;
        videoEl.currentTime = 0;
        
        // Use play() with catch for browsers that block autoplay
        const playPromise = videoEl.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Auto-play was prevented, show a UI element to let the user manually start playback
            console.log("Autoplay prevented");
          });
        }
      } else {
        videoEl.pause();
      }
    });
  }, [activeIndex, isMuted, videos]);

  // Set up intersection observer to mute videos when scrolling away
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // If section is less than 30% visible and videos are unmuted, mute them
          if (!entry.isIntersecting && entry.intersectionRatio < 0.3 && !isMuted) {
            setIsMuted(true);
          }
        });
      },
      { threshold: [0, 0.3, 0.5, 0.7] }
    );

    observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isMuted]);

  // Handle swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    
    const swipeDistance = touchEndX - touchStartX;
    const minSwipeDistance = 50; // Minimum swipe distance to trigger a change
    
    if (swipeDistance > minSwipeDistance) {
      // Swipe right
      changeVideo(getPrevIndex(activeIndex), 'right');
    } else if (swipeDistance < -minSwipeDistance) {
      // Swipe left
      changeVideo(getNextIndex(activeIndex), 'left');
    }
    
    startX.current = null;
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Get the next index with looping
  const getNextIndex = (currentIndex: number): number => {
    return (currentIndex + 1) % videos.length;
  };

  // Get the previous index with looping
  const getPrevIndex = (currentIndex: number): number => {
    return (currentIndex - 1 + videos.length) % videos.length;
  };

  const changeVideo = (newIndex: number, direction: 'left' | 'right' | null = null) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setAnimationDirection(direction);
    setActiveIndex(newIndex);
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
      setAnimationDirection(null);
    }, 500);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Get visible videos (previous, current, next)
  const getVisibleVideos = () => {
    return [
      (getPrevIndex(getPrevIndex(activeIndex))), // Far left (behind left preview)
      getPrevIndex(activeIndex),                 // Previous (left)
      activeIndex,                               // Current (center)
      getNextIndex(activeIndex),                 // Next (right)
      (getNextIndex(getNextIndex(activeIndex)))  // Far right (behind right preview)
    ];
  };

  // Calculate position class for preview cards
  const getPositionClass = (index: number) => {
    const farPrevIndex = getPrevIndex(getPrevIndex(activeIndex));
    const prevIndex = getPrevIndex(activeIndex);
    const nextIndex = getNextIndex(activeIndex);
    const farNextIndex = getNextIndex(getNextIndex(activeIndex));
    
    if (index === farPrevIndex) return "far-left-preview";
    if (index === prevIndex) return "left-preview";
    if (index === nextIndex) return "right-preview";
    if (index === farNextIndex) return "far-right-preview";
    return "";
  };

  // Format numbers for display (e.g., 1.2k)
  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  // Single music-wave particle background effect
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
    const particles: Particle[] = [];
    const count = 100;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        speed: Math.random() * 0.2 + 0.1,
        offset: Math.random() * Math.PI * 2,
        size: Math.random() * 2 + 1,
        opacity: 0.3 + Math.random() * 0.2,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const baseY = canvas.height / 2;
      const amplitude = canvas.height * 0.2;
      const wavelength = canvas.width;

      particles.forEach(p => {
        p.x += p.speed;
        if (p.x > canvas.width) p.x = 0;
        const y = baseY + Math.sin((p.x / wavelength) * Math.PI * 2 + p.offset) * amplitude;
        ctx.beginPath();
        ctx.arc(p.x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,184,0,${p.opacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section id="services-section" ref={sectionRef} className="relative w-full py-20 bg-[#050505] overflow-hidden">
      {/* Wave canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
      <div ref={containerRef} className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10 max-w-7xl flex flex-col items-center">
        <div className="mb-8">
          <div className="relative">
            <h2 className="font-['Open_Sans',Helvetica] text-white text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              SEE HOW WE BRING <span className="text-[#ffb800]">BRANDS TO LIFE</span> 
            </h2>
          </div>
        </div>
        
        <div 
          className="relative flex items-center justify-center h-[700px] touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Control buttons for non-touch devices */}
          {/* <button 
            className="absolute left-4 z-20 bg-black/30 text-white p-4 rounded-full hover:bg-black/60 transition md:flex hidden"
            onClick={() => changeVideo(getPrevIndex(activeIndex), 'right')}
            disabled={isTransitioning}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            className="absolute right-4 z-20 bg-black/30 text-white p-4 rounded-full hover:bg-black/60 transition md:flex hidden"
            onClick={() => changeVideo(getNextIndex(activeIndex), 'left')}
            disabled={isTransitioning}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button> */}
          
          {/* Video showcase container */}
          <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
            {/* Fixed iPhone frame in the center */}
            <div className="relative w-[280px] z-10">
              <div className="relative bg-black rounded-[36px] p-3 border-4 border-gray-800 shadow-xl w-full aspect-[9/19.5]">
                {/* iPhone notch */}
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-1/2 h-6 bg-black rounded-b-2xl z-30"></div>
                
                {/* Instagram Reels container */}
                <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-black">
                  {videos.map((video, index) => (
                    <div 
                      key={`iphone-${video.id}`}
                      className={`absolute inset-0 w-full h-full transition-all duration-500 ${
                        isTransitioning && index === activeIndex
                          ? animationDirection === 'left'
                            ? 'animate-slide-from-right'
                            : 'animate-slide-from-left'
                          : ''
                      }`}
                      style={{ 
                        opacity: index === activeIndex ? 1 : 0,
                        visibility: index === activeIndex ? 'visible' : 'hidden'
                      }}
                    >
                      
                      
                      
                      
                      {/* Video */}
                      <video
                        ref={el => videoRefs.current[index] = el}
                        src={video.src}
                        poster={video.thumbnail}
                        className="absolute inset-0 w-full h-full object-cover"
                        playsInline
                        loop
                        muted={isMuted}
                      />
                      
                      {/* Instagram Reels UI - Right Side Controls */}
                      <div className="absolute right-2 bottom-16 flex flex-col gap-5 items-center">
                        <button 
                          className="text-white flex flex-col items-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Heart className="w-6 h-6" />
                          <span className="text-xs mt-1">{formatCount(likeCount[video.id] || 0)}</span>
                        </button>
                        
                        <button className="text-white flex flex-col items-center">
                          <MessageCircle className="w-6 h-6" />
                          <span className="text-xs mt-1">{formatCount(Math.floor(Math.random() * 1000) + 10)}</span>
                        </button>
                        
                        <button className="text-white flex flex-col items-center">
                          <Send className="w-6 h-6" />
                        </button>
                        
                        <button className="text-white flex flex-col items-center">
                          <Bookmark className="w-6 h-6" />
                        </button>
                        
                        <button 
                          className="text-white bg-black/40 w-8 h-8 rounded-full flex items-center justify-center" 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMute();
                          }}
                        >
                          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>
                      </div>
                      
                      {/* Instagram Reels UI - Bottom Caption and Music */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                        <h3 className="text-white text-sm font-semibold">
                          {video.title}
                        </h3>
                        
                        <div className="flex items-center mt-2">
                          <Music2 className="w-3.5 h-3.5 text-white mr-1.5" />
                          <div className="flex-1 overflow-hidden">
                            <div className="animate-marquee whitespace-nowrap">
                              <span className="text-xs text-white/80">
                                Original Audio • Seventh Sense Marketing
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Preview cards (left and right) */}
            {getVisibleVideos().map(index => {
              if (index === activeIndex) return null; // Skip active video (it's in the iPhone)
              const video = videos[index];
              const isLeft = index === getPrevIndex(activeIndex);
              const isFarLeft = index === getPrevIndex(getPrevIndex(activeIndex));
              const isFarRight = index === getNextIndex(getNextIndex(activeIndex));
              
              return (
                <div 
                  key={`preview-${video.id}-${isFarLeft ? 'far-left' : isFarLeft ? 'left' : isFarRight ? 'far-right' : 'right'}`}
                  className={`absolute w-[220px] h-[380px] rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all duration-300 ${
                    getPositionClass(index)
                  }`}
                  onClick={() => {
                    if (isFarLeft || isFarRight) return; // Disable clicks on far cards
                    changeVideo(index, isLeft ? 'right' : 'left');
                  }}
                >
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-white text-sm font-medium truncate">
                      {video.title}
                    </h3>
                  </div>
                  
                  {/* Directional indicator - only show on main previews */}
                  {!isFarLeft && !isFarRight && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
                      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d={isLeft ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} 
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Navigation dots */}
        <div className="flex justify-center mt-8 gap-2">
          {videos.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === activeIndex ? "bg-[#ffb800]" : "bg-gray-500"
              }`}
              onClick={() => changeVideo(index)}
            />
          ))}
        </div>
      </div>
      
      <style>
        {`
          .far-left-preview {
            left: calc(50% - 210px);
            transform: translateX(-100%);
            opacity: 0.5;
            z-index: 1;
            height: 300px;
          }
          .left-preview {
            left: calc(50% - 160px);
            transform: translateX(-100%);
            z-index: 2;
          }
          .right-preview {
            left: calc(50% + 160px);
            transform: translateX(0%);
            z-index: 2;
          }
          .far-right-preview {
            left: calc(50% + 210px);
            transform: translateX(0%);
            opacity: 0.5;
            z-index: 1;
            height: 300px;
          }
          @keyframes slideFromLeft {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes slideFromRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          .animate-slide-from-left {
            animation: slideFromLeft 0.5s ease forwards;
          }
          .animate-slide-from-right {
            animation: slideFromRight 0.5s ease forwards;
          }
          @keyframes progress-bar {
            0% { width: 0; }
            100% { width: 100%; }
          }
          .animate-progress-bar {
            animation: progress-bar 10s linear forwards;
          }
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: inline-block;
            animation: marquee 10s linear infinite;
          }
        `}
      </style>
    </section>
  );
}; 