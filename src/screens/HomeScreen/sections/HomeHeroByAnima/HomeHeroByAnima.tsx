import React from "react";

export const HomeHeroByAnima = (): JSX.Element => {
  return (
    <section className="relative w-full h-screen bg-[#0a0000] overflow-hidden">
      {/* Main content container */}
      <div className="relative w-full h-full flex flex-col items-center justify-start">
        {/* Main title */}
        <div className="text-center">
          <h1 className="font-['Aboreto',Helvetica] font-normal text-white text-[150px] text-center tracking-[7px] leading-[140px] mt-20">
            SEVENTH
            <br />
            SENSE
          </h1>
        </div>

        {/* Year */}
        <div className="absolute left-[180px] bottom-[250px]">
          <div className="font-['Aboreto',Helvetica] font-normal text-[#ffb800] text-[52px] text-center tracking-[5px] leading-[47px]">
            2025
          </div>
        </div>

        {/* Central content box */}
        <div className="absolute max-w-[320px] aspect-square bg-[#6b1305] rounded-md flex flex-col items-center justify-center p-6 mt-[300px]">
          <div className="text-[#ffb800] font-['Aboreto',Helvetica] text-center">
            <div className="text-[65px] leading-[70px] tracking-wide">
              SEVENTH
              <br />
              SENSE
            </div>
            <div className="text-[16px] mt-3 tracking-wide">
              THE ONE YOU ARE MISSING
            </div>
          </div>
        </div>

        {/* Top right circular text */}
        <div className="absolute top-[210px] right-[180px] w-[130px] h-[130px]">
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <path
              id="curve-top-right"
              d="M 0,50 A 50,50 0 1,1 100,50"
              fill="transparent"
            />
            <text width="100%">
              <textPath
                href="#curve-top-right"
                className="text-[#ffb800] text-[7px] tracking-wider"
              >
                CONTENT CREATION - SEO - AUTO-DM
              </textPath>
            </text>
          </svg>
        </div>

        {/* Bottom left circular text */}
        <div className="absolute bottom-[150px] left-[90px] w-[130px] h-[130px]">
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <path
              id="curve-bottom-left"
              d="M 100,50 A 50,50 0 1,1 0,50"
              fill="transparent"
            />
            <text width="100%">
              <textPath
                href="#curve-bottom-left"
                className="text-[#ffb800] text-[7px] tracking-wider"
              >
                SOCIAL MEDIA MANAGEMENT - DM AUTOMATION
              </textPath>
            </text>
          </svg>
        </div>

        {/* Line elements connecting text to box */}
        <div className="absolute top-[250px] right-[300px] w-[120px] h-[1px] bg-[#790000] rotate-[15deg]"></div>
        <div className="absolute bottom-[190px] left-[210px] w-[120px] h-[1px] bg-[#790000] rotate-[-15deg]"></div>
      </div>
    </section>
  );
};
