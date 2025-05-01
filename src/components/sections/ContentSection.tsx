import { ArrowRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const ContentSection = (): JSX.Element => {
  return (
    <section className="w-full py-16 bg-black">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-8">
        <div className="flex-1 flex flex-col gap-[60px]">
          <h1 className="font-['Open_Sans',Helvetica] font-bold text-white text-4xl md:text-5xl tracking-[2.50px] leading-tight">
            EMPOWERING BRANDS WITH <span className="text-[#ffb800]">STRATEGIC CREATIVITY</span>
          </h1>

          <p className="font-['Average_Sans',Helvetica] font-normal text-[#d9d9d9e6] text-xl md:text-3xl tracking-[2.00px] leading-relaxed">
            From content creation to performance marketing, we drive results
            that matter.
          </p>

          <div className="flex w-full max-w-md items-center justify-between px-8 py-2 rounded-2xl border border-solid border-white">
            <Input
              className="border-none bg-transparent font-['Open_Sans',Helvetica] font-semibold text-[#878686] text-xl md:text-2xl focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Your email address"
            />
            <Button className="w-16 h-12 p-0 bg-[#ffb800] rounded-full hover:bg-[#ffb800]/90">
              <ArrowRightIcon className="h-6 w-6 text-black" />
            </Button>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center relative">
          <img
            className="w-[500px] h-[500px] object-cover"
            alt="Sabri"
            src="/sabri--2--1.png"
          />
          <img
            className="absolute w-[521px] h-[165px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            alt="Seventh sense logo"
            src="/seventh-sense-logo-2.svg"
          />
        </div>
      </div>
    </section>
  );
}; 