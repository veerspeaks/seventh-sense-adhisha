import React, { useEffect, useRef } from "react";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "../ui/button";

interface ServicesSectionProps {
  serviceItems1: string[];
  serviceItems2: string[];
}

export const ServicesSection = ({ serviceItems1, serviceItems2 }: ServicesSectionProps): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Create and inject the animation CSS
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      .ribbon-container1 {
        position: absolute;
        width: 2459px;
        height: 104px;
        top: 850px;
        left: -319px;
        background-color: #FAFAFA;
        transform: rotate(44.71deg);
        overflow: hidden;
      }
      
      .ribbon-container2 {
        position: absolute;
        width: 2499px;
        height: 144px;
        top: 278px;
        left: -4px;
        background-color: black;
        border: 10px solid black;
        transform: rotate(-12.95deg);
        overflow: hidden;
      }
      
      .ribbon-content {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 81px;
        position: absolute;
        white-space: nowrap;
        width: max-content;
      }
      
      .ribbon-content1 {
        top: 38px;
        left: 0;
        animation: moveRibbon1 60s linear infinite;
      }
      
      .ribbon-content2 {
        top: 40px;
        left: 0;
        animation: moveRibbon2 60s linear infinite;
      }
      
      @keyframes moveRibbon1 {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      
      @keyframes moveRibbon2 {
        0% { transform: translateX(-50%); }
        100% { transform: translateX(0); }
      }
      
      .service-item {
        font-family: 'Roboto', Helvetica;
        font-weight: normal;
        font-size: 32px;
        line-height: normal;
        white-space: nowrap;
      }
      
      .service-item1 {
        color: #212121;
      }
      
      .service-item2 {
        color: white;
      }
      
      .service-dot {
        width: 16px;
        height: 17px;
        background-color: #FFB800;
        border-radius: 8px/8.5px;
        transform: rotate(12.95deg);
      }

      .growth-button {
        transition: all 0.3s ease;
      }
      
      .growth-button:hover {
        background-color: #FFB800;
      }
      
      .growth-button:hover .icon-circle {
        background-color: #000000;
      }
      
      .growth-button:hover .arrow-icon {
        color: #FFB800;
      }
      
      .growth-button:hover .button-text {
        color: #000000;
      }
    `;
    document.head.appendChild(styleEl);
    
    return () => {
      document.head.removeChild(styleEl);
    };
  }, [serviceItems1, serviceItems2]);

  // Multiply items to ensure a seamless infinite loop
  // Quadruple the items for a smoother infinite effect
  const extendedItems1 = [...serviceItems1, ...serviceItems1, ...serviceItems1, ...serviceItems1, ...serviceItems1, ...serviceItems1];
  const extendedItems2 = [...serviceItems2, ...serviceItems2, ...serviceItems2, ...serviceItems2, ...serviceItems2, ...serviceItems2];

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-[500px] -mt-[40px] overflow-hidden overflow-x-clip overflow-y-hidden [background:linear-gradient(136deg,rgba(33,33,33,1)_0%,rgba(0,0,0,1)_100%)] z-10 hidden md:block"
    >
      <div className="relative w-screen max-w-[200vw] h-[1822px] top-[-902px] left-1/2 -translate-x-1/2 overflow-x-hidden ">
        <img
          className="absolute w-[296px] top-[1000px] left-[10%] [filter:grayscale(100%)] opacity-20"
          src="/sabri--2--1-1.svg"
          alt="Hero image"
        />

        <h2 className="absolute w-[880px] top-[1044px] left-[80px] [font-family:'Open_Sans',Helvetica] font-bold text-white md:text-[35px] tracking-[2.50px] leading-[50.6px]">
          At Seventh Sense, we blend creativity with strategy to elevate brands nationally & globally.
        </h2>

        <div className="absolute w-[120vw] h-[1804px] top-0 left-[10%] -translate-x-[10%]">
          <div className="relative h-[1804px] overflow-hidden">
            {/* White ribbon container */}
            <div className="ribbon-container1 w-[120vw]">
              {/* Scrolling content inside ribbon */}
              <div className="ribbon-content ribbon-content1">
                {extendedItems1.map((service, index) => (
                  <React.Fragment key={`service1-${index}`}>
                    <div className="service-item service-item1">{service}</div>
                    <div className="service-dot"></div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute w-[200vw] h-[784px] top-[869px] left-[5%] -translate-x-[5%] rotate-[-7.65deg]">
          <div className="relative w-[120vw] h-[700px]">
            {/* Black ribbon container */}
            <div className="ribbon-container2 w-[120vw]">
              {/* Scrolling content inside ribbon */}
              <div className="ribbon-content ribbon-content2">
                {extendedItems2.map((service, index) => (
                  <React.Fragment key={`service2-${index}`}>
                    <div className="service-item service-item2">{service}</div>
                    <div className="service-dot"></div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Button className="flex w-[263px] h-[55px] items-center gap-[10.21px] p-[4.08px] absolute top-[1250px] left-[5%] bg-white rounded-[102.09px] border-[1.02px] border-solid border-[#d9d6d6] hover:bg-[#ffb800] growth-button"
        onClick={() => {
          window.location.href = '/onboarding';
        }}
        >
          <div className="relative w-[45.91px] h-[47.68px] mt-[-0.55px] mb-[-0.55px] bg-[#ffb800] rounded-[22.96px/23.84px] icon-circle">
            <ArrowRightIcon className="absolute w-[24px] h-[24px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black arrow-icon" />
          </div>
          <span className="relative w-fit [font-family:'Open_Sans',Helvetica] font-semibold text-black text-[14.1px] tracking-[0] leading-[24.0px] whitespace-nowrap button-text">
            Start Your Growth Strategy
          </span>
        </Button>
      </div>
    </section>
  );
}; 