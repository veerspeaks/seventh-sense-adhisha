import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";
import { FooterByAnima } from "./sections/FooterByAnima";
import { HomeByAnima } from "./sections/HomeByAnima";
import { HomeHeroByAnima } from "./sections/HomeHeroByAnima";
import { NavbarByAnima } from "./sections/NavbarByAnima";

// Video gallery data for mapping
const videoGalleryItems = [
  { id: 1, backgroundImage: "..//video-1.png" },
  { id: 2, backgroundImage: "..//video-2.png" },
  { id: 3, backgroundImage: "..//video-3.png" },
  { id: 4, backgroundImage: "..//video-4.png" },
  { id: 5, backgroundImage: "..//video-5.png" },
];

export const HomeScreen = (): JSX.Element => {
  return (
    <div className="flex flex-col items-start relative bg-white overflow-hidden">
      <NavbarByAnima />
      <HomeHeroByAnima />
      <HomeByAnima />

      {/* Our Work Section */}
      <section className="relative w-full bg-black overflow-hidden">
        <div className="relative py-14 px-4">
          {/* Decorative blur elements - reduced sizes */}
          <div className="absolute w-[450px] h-[550px] top-0 left-0 bg-[#7900004c] rounded-[293.35px/367px] blur-[90px]" />
          <div className="absolute w-[450px] h-[550px] top-[344px] right-0 bg-[#7900004c] rounded-[293.35px/367px] blur-[90px]" />

          {/* Section title - reduced size */}
          <h2 className="relative text-center mb-12 [font-family:'Raleway',Helvetica] font-bold text-[#ffb800] text-[56px] tracking-[2.8px] leading-[56px]">
            OUR WORK
          </h2>

          {/* Video gallery with horizontal scroll - reduced sizes */}
          <ScrollArea className="w-full">
            <div className="flex items-center gap-8 pb-5">
              {videoGalleryItems.map((item) => (
                <Card
                  key={item.id}
                  className="flex-shrink-0 w-[420px] h-[550px] rounded-[16px] border-0"
                >
                  <CardContent
                    className="p-0 h-full"
                    style={{
                      backgroundImage: `url(${item.backgroundImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "50% 50%",
                    }}
                  />
                </Card>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </section>

      <FooterByAnima />
    </div>
  );
};
