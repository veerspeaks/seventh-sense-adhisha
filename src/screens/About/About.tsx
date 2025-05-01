import { Layout } from "../../components/layout/Layout";
import { navItems as originalNavItems } from "../../data/siteData";
import { PageTransition } from "../../components/ui/PageTransition";
import { Target, Eye } from "lucide-react";

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
            
            {/* Mission & Vision Section */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission Card */}
              <div className="bg-gradient-to-br from-black/80 to-gray-900 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-800 transform transition-transform hover:scale-[1.02] hover:shadow-yellow-500/20">
                <div className="flex items-center mb-4">
                  <div className="bg-[#ffb800] p-3 rounded-full mr-4">
                    <Target className="text-black w-6 h-6" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Mission</h2>
                </div>
                <p className="text-white/90 leading-relaxed">
                  To help brands grow by crafting impactful content, strategies, and digital experiences 
                  that are rooted in their unique story — delivering 
                  <span className="text-[#ffb800] font-semibold"> real engagement, real value, and real results.</span>
                </p>
              </div>
              
              {/* Vision Card */}
              <div className="bg-gradient-to-br from-black/80 to-gray-900 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-800 transform transition-transform hover:scale-[1.02] hover:shadow-yellow-500/20">
                <div className="flex items-center mb-4">
                  <div className="bg-[#ffb800] p-3 rounded-full mr-4">
                    <Eye className="text-black w-6 h-6" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Vision</h2>
                </div>
                <p className="text-white/90 leading-relaxed">
                  To become a leading creative agency that redefines how businesses and personal brands 
                  connect with their audience — through 
                  <span className="text-[#ffb800] font-semibold"> content that speaks, strategies that scale, and results that matter.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
}; 