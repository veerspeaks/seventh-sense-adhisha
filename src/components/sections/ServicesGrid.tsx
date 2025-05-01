import React from "react";
import { 
  Instagram, 
  FileText, 
  BarChart3, 
  Search, 
  MessageSquareText, 
  Camera, 
  Video, 
  Palette 
} from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => {
  return (
    <div className="relative bg-white rounded-xl p-4 sm:p-6 md:p-8 flex flex-col items-center text-center shadow-[0_0_15px_rgba(120,120,120,0.3)] transition-all duration-500 hover:bg-yellow-500 hover:shadow-[0_10px_25px_rgba(100,100,100,0.4)] hover:-translate-y-2 group overflow-hidden">
      {/* "7" image backdrop that appears on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none z-0">
        <img 
          src="/sabri--2--1-1.svg" 
          alt="" 
          className="absolute w-[200%] h-[200%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain mix-blend-multiply" 
        />
      </div>
      
      {/* Icon container */}
      <div className="bg-black rounded-full w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center mb-4 sm:mb-6 transition-all duration-500 group-hover:rotate-3 z-10 relative">
        <div className="text-white transition-colors duration-300">
          {icon}
        </div>
      </div>
      
      {/* Title */}
      <h3 className="font-['Open_Sans',Helvetica] text-xl sm:text-2xl font-bold mb-2 sm:mb-3 transition-all duration-300 group-hover:text-black relative z-10">
        {title}
      </h3>
      
      {/* Description */}
      <p className="font-['Open_Sans',Helvetica] text-sm sm:text-base text-gray-700 leading-relaxed transition-colors duration-300 group-hover:text-black/90 z-10 relative">
        {description}
      </p>
    </div>
  );
};

export const ServicesGrid: React.FC = () => {
  const services = [
    {
      title: "Social Media Management",
      description: "We manage your entire social media presence — from content planning to posting, growth strategy to engagement. Building communities and turning followers into loyal customers.",
      icon: <Instagram size={24} className="sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-8 lg:h-8" stroke="currentColor" strokeWidth={2} />
    },
    {
      title: "Content Creation",
      description: "We create high-quality content — photos, videos, reels, graphics — designed to tell your brand story, connect with your audience, and drive results.",
      icon: <FileText size={24} className="sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-8 lg:h-8" stroke="currentColor" strokeWidth={2} />
    },
    {
      title: "Meta Ads",
      description: "We run high-performing ad campaigns on Instagram and Facebook. From audience targeting to creatives, we make sure every rupee you invest delivers growth.",
      icon: <BarChart3 size={24} className="sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-8 lg:h-8" stroke="currentColor" strokeWidth={2} />
    },
    {
      title: "SEO",
      description: "We optimise your online presence so your brand ranks higher, gets discovered faster, and builds authority — not just on search engines but across social media too.",
      icon: <Search size={24} className="sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-8 lg:h-8" stroke="currentColor" strokeWidth={2} />
    },
    {
      title: "DM Automation",
      description: "We set up automated systems to respond to inquiries, book calls, and nurture leads — so you never miss a customer while focusing on what you do best.",
      icon: <MessageSquareText size={24} className="sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-8 lg:h-8" stroke="currentColor" strokeWidth={2} />
    },
    {
      title: "Business Shoots",
      description: "Professional photo and video shoots tailored to your brand's aesthetic — helping you create scroll-stopping visuals that build trust and boost sales.",
      icon: <Camera size={24} className="sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-8 lg:h-8" stroke="currentColor" strokeWidth={2} />
    },
    {
      title: "Video Editing",
      description: "Professional video editing services that transform raw footage into compelling stories. We craft videos that capture attention and leave a lasting impression.",
      icon: <Video size={24} className="sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-8 lg:h-8" stroke="currentColor" strokeWidth={2} />
    },
    {
      title: "Branding",
      description: "We develop distinctive brand identities that resonate with your target audience. From logo design to brand guidelines, we ensure your brand stands out in a crowded market.",
      icon: <Palette size={24} className="sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-8 lg:h-8" stroke="currentColor" strokeWidth={2} />
    }
  ];

  return (
    <section id="services-section" className="bg-black py-10 sm:py-14 md:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-['Open_Sans',Helvetica] text-white text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 sm:mb-6">OUR <span className="text-[#ffb800]">SERVICES</span></h2>
        <p className="font-['Open_Sans',Helvetica] text-white text-lg sm:text-xl md:text-2xl text-center mb-8 sm:mb-12 md:mb-16 max-w-3xl mx-auto">
          Comprehensive solutions tailored to your brand's unique needs.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}; 