import { Layout } from "../../components/layout/Layout";
import { MergedHeroContent } from "../../components/sections/MergedHeroContent";
import { VideoGallery } from "../../components/sections/VideoGallery";
import { VideoCase } from "../../components/sections/VideoCase";
import { ServicesGrid } from "../../components/sections/ServicesGrid";
import { navItems as originalNavItems, serviceItems1, serviceItems2, videoItems } from "../../data/siteData";
import { videoItems as caseVideos } from "../../data/videoData";
import { ServicesSection } from "../../components/sections/ServicesSection";
import { FAQ } from "../../components/sections/FAQ";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const Home = (): JSX.Element => {
  // Create a copy of navItems but set Home to active
  const homeNavItems = originalNavItems.map(item => 
    item.name === "Home" ? { ...item, active: true } : { ...item, active: false }
  );
  
  const location = useLocation();
  
  // Handle scrolling to services section if coming from another page
  useEffect(() => {
    // Check if we need to scroll to services section
    if (location.state && (location.state as any).scrollToServices) {
      setTimeout(() => {
        const servicesSection = document.getElementById("services-section");
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Small delay to ensure the page is fully loaded
    }
  }, [location]);

  return (
    <Layout navItems={homeNavItems}>
      <MergedHeroContent />
      <VideoCase videos={caseVideos} />
      <div className="relative">
        <VideoGallery videoItems={videoItems} />
        <ServicesGrid />
        <FAQ />
        <ServicesSection serviceItems1={serviceItems1} serviceItems2={serviceItems2} />
      </div>
    </Layout>
  );
};