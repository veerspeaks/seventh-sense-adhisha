import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import { Button } from "../ui/button";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items?: FAQItem[];
}

export const FAQ = ({ items }: FAQProps): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const answerHeights = useRef<number[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Default FAQ items if none provided
  const defaultItems: FAQItem[] = [
    {
      question: "What Does Your Agency Do?",
      answer: "We help brands grow on social media through content creation, strategy, performance marketing, and branding. From managing your entire page to creating ads, we do it all customized to your goals."
    },
    {
      question: "Do you work with personal brands?",
      answer: "Yes! We're building out systems for creators, coaches, and influencers too. If you're trying to grow your personal brand, we've got strategies to help you build authority, aesthetics, and engagement."
    },
    {
      question: "What's your pricing?",
      answer: "No fixed packages here - everything is customized based on your needs. After a short discovery call, we create a tailored proposal with deliverables, timelines, and pricing that fits your goals."
    },
    {
      question: "How do I get started?",
      answer: "Send us a DM to book your 1:1 meeting. We'll get on a quick call, understand your vision, and build a plan that actually delivers results."
    },
    {
      question: "Do you guarantee results?",
      answer: "We don't believe in fake promises. What we do guarantee is strategy, consistency, and quality execution. Results always follow when the system is solid — and that's what we build."
    },
    {
      question: "Do you do reels/photo shoots?",
      answer: "Yes! We do shoots for clients based in Rajkot and Ahmedabad, including product shots, reels, testimonials, and business-focused visual content."
    }
  ];

  const faqItems = items || defaultItems;

  // Calculate heights of answer divs for animations
  useEffect(() => {
    // Make sure refs array is updated with the correct length
    answerRefs.current = answerRefs.current.slice(0, faqItems.length);
    
    // Need to wait a bit for the DOM to be fully rendered
    setTimeout(() => {
      answerHeights.current = answerRefs.current.map(ref => ref?.scrollHeight || 0);
    }, 100);
    
    // Recalculate heights on window resize
    const handleResize = () => {
      setTimeout(() => {
        answerHeights.current = answerRefs.current.map(ref => ref?.scrollHeight || 0);
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [faqItems]);

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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
      
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 relative z-10 max-w-7xl">
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 md:mb-16 lg:mb-20 tracking-tight pl-0 sm:pl-2 md:pl-4">
          FREQUENTLY <br />
          ASKED QUESTIONS
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-8 md:gap-10 lg:gap-16">
          <div className="w-full lg:w-2/3 space-y-4 sm:space-y-5 md:space-y-7">
            {faqItems.map((item, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
                  activeIndex === index ? "ring-2 ring-[#ffb800]" : ""
                }`}
              >
                <button 
                  className="w-full flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 md:p-6 text-left"
                  onClick={() => toggleQuestion(index)}
                  aria-expanded={activeIndex === index}
                >
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold pr-3 sm:pr-4">{item.question}</h3>
                  <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 min-w-6 sm:min-w-8 bg-gray-100 rounded-full transition-all duration-300">
                    {activeIndex === index ? (
                      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#ffb800]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                    )}
                  </div>
                </button>
                <div 
                  ref={el => answerRefs.current[index] = el}
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    activeIndex === index ? "border-t border-gray-200" : ""
                  }`}
                  style={{ 
                    maxHeight: activeIndex === index ? `${answerHeights.current[index]}px` : "0px",
                  }}
                >
                  <div className="px-4 py-4 sm:px-6 sm:py-5 md:p-6 bg-white">
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
            <div className="bg-white rounded-xl p-6 sm:p-8 md:p-10 flex flex-col justify-between h-full shadow-xl">
              <div className="text-center mb-6 sm:mb-8 md:mb-10">
                <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
                  <MessageSquare className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-[#ffb800] fill-[#ffb800] stroke-[#ffb800]" />
                </div>
                <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed">
                  Still have questions? Feel free to email us at <span className="text-[#ffb800]">seventhsense.work@gmail.com</span> and we'll get back to you as soon as possible!
                </p>
              </div>
              
              <Button 
                className="w-full py-3 sm:py-4 md:py-5 lg:py-6 text-sm sm:text-base md:text-lg font-medium bg-[#ffb800] hover:bg-[#ffb800]/80 text-black rounded-xl transition-colors shadow-md hover:shadow-lg"
              >
                Book a 1:1 Discovery Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 