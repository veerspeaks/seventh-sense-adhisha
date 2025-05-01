export const HeroSection = (): JSX.Element => {
  return (
    <section className="w-full h-[676px] overflow-hidden relative">
      <div className="container mx-auto h-full flex justify-center items-center">
        <div className="relative flex justify-center items-center">
        <img
            className="w-[500px] h-[500px] object-cover"
          alt="Sabri"
          src="/sabri--2--1-1.svg"
        />

        <img
            className="absolute w-[521px] h-[165px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          alt="Seventh sense logo"
          src="/seventh-sense-logo-2.svg"
        />
        </div>
      </div>

      <div className="absolute top-0 right-0 w-1/4 h-full overflow-hidden">
        <div className="w-[333px] h-[416px] ml-auto mr-0 bg-[#09f0ff1a] rounded-[166.26px/208px] blur-[111.5px]" />
      </div>
    </section>
  );
}; 