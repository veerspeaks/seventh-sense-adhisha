import { useEffect, useState, useRef, FormEvent } from "react";
import { ArrowRightIcon, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { sendHeroEmail } from "../../lib/emailService";

export const MergedHeroContent = (): JSX.Element => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const firstImageRef = useRef<HTMLImageElement>(null);
  const secondImageRef = useRef<HTMLImageElement>(null);
  const contentSectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [positions, setPositions] = useState({ docStartX: 0, docStartY: 0, docEndX: 0, docEndY: 0, endScroll: 0 });
  const [isMobile, setIsMobile] = useState(false);
  
  // Email form state
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailStatus, setEmailStatus] = useState<{
    success: boolean | null;
    message: string;
  }>({ success: null, message: "" });
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    // Only add scroll listener if not on mobile
    if (!isMobile) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isMobile]);
  
  // Handle email submission
  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setEmailStatus({
        success: false,
        message: "Please enter your email address."
      });
      return;
    }
    
    setIsSubmitting(true);
    setEmailStatus({ success: null, message: "" });
    
    try {
      const result = await sendHeroEmail(email);
      setEmailStatus({
        success: result.success,
        message: result.message
      });
      
      if (result.success) {
        setEmail(""); // Clear the form on success
      }
    } catch (error) {
      setEmailStatus({
        success: false,
        message: "Something went wrong. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Dynamically measure Sabri images and compute logo animation parameters
  useEffect(() => {
    // Skip the animation setup on mobile
    if (isMobile) return;
    
    const measurePositions = () => {
      if (firstImageRef.current && secondImageRef.current) {
        const rect1 = firstImageRef.current.getBoundingClientRect();
        const rect2 = secondImageRef.current.getBoundingClientRect();
        const logoWidth = 521;
        const logoHeight = 165;
        // page centers for each image
        const pageCenterY1 = rect1.top + window.scrollY + rect1.height / 2;
        const pageCenterY2 = rect2.top + window.scrollY + rect2.height / 2;
        // document-based logo positions
        const docStartX = rect1.left + window.scrollX + rect1.width / 2 - logoWidth / 2;
        const docStartY = pageCenterY1 - logoHeight / 2;
        const docEndX = rect2.left + window.scrollX + rect2.width / 2 - logoWidth / 2;
        const docEndY = pageCenterY2 - logoHeight / 2;
        const viewportHeight = window.innerHeight;
        const endScroll = pageCenterY2 - viewportHeight / 2;
        setPositions({ docStartX, docStartY, docEndX, docEndY, endScroll });
      }
    };
    
    measurePositions();
    window.addEventListener("resize", measurePositions);
    return () => window.removeEventListener("resize", measurePositions);
  }, [isMobile]);
  
  // Particle waves background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    type Particle = { x: number; speed: number; offset: number; size: number; opacity: number };
    interface Wave { baseY: number; amplitude: number; wavelength: number; speed: number; particles: Particle[] }

    // Define two waves
    const waves: Wave[] = [
      { baseY: canvas.height * 0.8, amplitude: 40, wavelength: canvas.width * 0.6, speed: 0.2, particles: [] },
      { baseY: canvas.height * 0.2, amplitude: 30, wavelength: canvas.width * 0.8, speed: -0.15, particles: [] }
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
  
  const isAtEnd = positions.endScroll > 0 && scrollPosition >= positions.endScroll;
  const progress = positions.endScroll > 0
    ? Math.max(0, Math.min(1, scrollPosition / positions.endScroll))
    : 0;
  const currentProgress = isAtEnd ? 1 : progress;
  const styleLeft = positions.docStartX + (positions.docEndX - positions.docStartX) * currentProgress;
  const styleTop = isAtEnd
    ? positions.docEndY
    : positions.docStartY - scrollPosition + (positions.docEndY - positions.docStartY) * currentProgress;
  
  // Calculate opacity for the content section
  const contentOpacity = progress < 0.5 ? 0 : (progress - 0.5) * 2;
  
  return (
    <>
      {/* Background Particle Waves */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />
      
      {/* Hero Section */}
      <section className="w-full h-[676px] overflow-hidden relative">
        <div className="container mx-auto h-full flex justify-center items-center">
          <div className="relative flex justify-center items-center">
            <img
              ref={firstImageRef}
              className={isMobile ? "w-[300px] h-[300px] object-cover mb-36" : "w-[500px] h-[500px] object-cover"}
              alt="Sabri"
              src="/sabri--2--1-1.svg"
            />
            
            {/* Logo in the top part only for mobile */}
            {isMobile && (
              <img
                className="absolute w-[300px] h-[95px] pointer-events-none"
                style={{
                  top: '35%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                alt="Seventh sense logo"
                src="/seventh-sense-logo-2.svg"
              />
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section ref={contentSectionRef} className="w-full bg-black py-20">
        <div className="container mx-auto px-6 md:px-8 lg:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8 mx-4 md:mx-8 lg:mx-8">
            <div 
              className="flex-1 flex flex-col gap-[60px]"
              style={{ 
                opacity: isMobile ? 1 : contentOpacity, 
                transform: isMobile ? 'none' : `translateY(${(1 - contentOpacity) * 20}px)` 
              }}
            >
              <h1 className="font-['Open_Sans',Helvetica] font-bold text-white text-4xl md:text-5xl tracking-[2.50px] leading-tight">
                EMPOWERING <span className="text-[#ffb800]">BRANDS</span> WITH STRATEGIC CREATIVITY
              </h1>

              <p className="font-['Average_Sans',Helvetica] font-normal text-[#d9d9d9e6] text-xl md:text-3xl tracking-[2.00px] leading-relaxed">
                From content creation to performance marketing, we drive results
                that matter.
              </p>

              <form onSubmit={handleEmailSubmit} className="flex flex-col gap-2">
                <div className="flex w-full max-w-md items-center justify-between px-2 py-2 rounded-2xl border border-solid border-white">
                  <Input
                    className="border-none bg-transparent font-['Open_Sans',Helvetica] font-semibold text-[#878686] text-xl focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                  />
                  <Button 
                    type="submit"
                    className={`w-16 h-12 p-0 ${
                      isSubmitting ? 'bg-gray-500' : 'bg-[#ffb800] hover:bg-[#ffb800]/90'
                    } rounded-full transition-colors`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="animate-spin h-6 w-6 border-2 border-t-transparent border-white rounded-full" />
                    ) : (
                      <ArrowRightIcon className="h-16 w-16 text-black" />
                    )}
                  </Button>
                </div>
                
                {/* Status message */}
                {emailStatus.message && (
                  <div className={`flex items-center gap-2 px-2 py-1 text-sm ${
                    emailStatus.success 
                      ? 'text-green-400' 
                      : 'text-red-400'
                  }`}>
                    {emailStatus.success ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <span>{emailStatus.message}</span>
                  </div>
                )}
              </form>
            </div>
            <div className="flex-1 flex justify-center items-center mt-10 lg:mt-0">
              <div className="relative">
                <img
                  ref={secondImageRef}
                  className="w-[500px] h-[500px] object-cover hidden md:block"
                  alt="Sabri"
                  src="/sabri--2--1.png"
                  style={{ opacity: progress }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated "SEVENTH SENSE" text that moves between the two "7" digits - only for desktop */}
      {!isMobile && (
        <img
          className={`${isAtEnd ? 'absolute' : 'fixed'} w-[521px] h-[165px] pointer-events-none z-50`}
          style={{
            top: styleTop + 'px',
            left: styleLeft + 'px',
            opacity: 1,
            display: isMobile ? 'none' : 'block',
          }}
          alt="Seventh sense logo"
          src="/seventh-sense-logo-2.svg"
        />
      )}
    </>
  );
};