import { Layout } from "../../components/layout/Layout";
import { navItems as originalNavItems } from "../../data/siteData";
import { PageTransition } from "../../components/ui/PageTransition";

export const About = (): JSX.Element => {
  // Create a copy of navItems but set About to active
  const aboutNavItems = originalNavItems.map(item => 
    item.name === "About" ? { ...item, active: true } : { ...item, active: false }
  );

  return (
    <Layout navItems={aboutNavItems}>
      <PageTransition>
        <div className="w-full px-4 sm:px-6 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
              About <span className="text-[#ffb800]">SEVENTH SENSE</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-8">
              At SEVENTH SENSE, we don't just manage social media — we tell stories that grow brands.
            </p>
            
            <div className="text-white/80 space-y-6">
              <p>
                Founded by 18-year-old Rudra Shah with a passion for digital creativity and strategy, 
                SEVENTH SENSE is a new-age social media marketing agency built to bring brands closer 
                to the people who matter most.
              </p>
              
              <p>
                We combine storytelling, design, performance marketing, and powerful content to help 
                businesses and creators grow with intention — not just noise. From content creation 
                to full-scale strategy and execution, our team of designers, editors, copywriters, 
                and ad experts deliver real results with a bold, confident voice.
              </p>
              
              <p>
                Based in Gujarat and working with clients across India, we believe in quality over 
                quantity, and building trust through authentic, ROI-driven work.
              </p>
              
              <p>
                Whether you're a growing business or a personal brand ready to scale — we're here 
                to make sure your audience doesn't just see you… they remember you.
              </p>
            </div>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
}; 