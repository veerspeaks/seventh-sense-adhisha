import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { Input } from "../../../../components/ui/input";

export const HomeByAnima = (): JSX.Element => {
  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      <div className="container mx-auto px-4 py-20 relative">
        {/* Background decorative elements - reduced sizes */}
        <div className="absolute w-[450px] h-[550px] top-[398px] right-0 bg-[#7900004c] rounded-[293.35px/367px] blur-[90px]" />
        <div className="absolute w-[450px] h-[550px] -top-[150px] -left-[150px] bg-[#7900004c] rounded-[293.35px/367px] blur-[90px]" />
        <div className="absolute w-[250px] h-[330px] bottom-0 right-0 bg-[#09f0ff1a] rounded-[166.26px/208px] blur-[90px]" />

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
          {/* Left column - Text content */}
          <div className="flex flex-col items-start gap-6 max-w-lg">
            <h1 className="font-bold text-[#ffb800] text-3xl md:text-5xl tracking-[2.5px] leading-[1.2] font-['Raleway',Helvetica]">
              EMPOWERING BRANDS WITH STRATEGIC CREATIVITY
            </h1>

            <p className="text-[#d9d9d9e6] text-lg md:text-[21px] tracking-[1px] leading-tight font-['Raleway',Helvetica]">
              From content creation to performance marketing, we drive results
              that matter.
            </p>

            {/* Email subscription form - reduced sizes */}
            <div className="flex w-full max-w-[340px] items-center border border-white rounded-[12px] overflow-hidden">
              <Input
                className="flex-grow bg-transparent border-0 text-[#878686] text-base md:text-[22px] font-semibold font-['Open_Sans',Helvetica] placeholder:text-[#878686] focus-visible:ring-0 h-auto py-3"
                placeholder="Your email address"
              />
              <button className="w-[42px] h-[40px] bg-[#790000] rounded-[21px] flex items-center justify-center flex-shrink-0 mr-1">
                <ArrowRightIcon className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Right column - Images - reduced sizes */}
          <div className="relative hidden lg:block">
            <img
              className="absolute w-[320px] h-[335px] -top-[80px] left-0 object-cover"
              alt="Video thumbnail"
              src="/video-5.png"
            />

            <img
              className="absolute w-[600px] h-[480px] top-[257px] left-0"
              alt="Rectangle image"
              src="/rectangle-23.png"
            />

            <img
              className="absolute w-[320px] h-[335px] top-[40px] right-[-80px] object-cover"
              alt="Video thumbnail"
              src="/video-1.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
