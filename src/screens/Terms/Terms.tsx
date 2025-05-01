import { Layout } from "../../components/layout/Layout";
import { navItems } from "../../data/siteData";

export const Terms = (): JSX.Element => {
  // Create a copy of navItems but set Terms to active
  const termsNavItems = navItems.map(item => 
    item.name === "Terms" ? { ...item, active: true } : { ...item, active: false }
  );

  return (
    <Layout navItems={termsNavItems}>
      <div className="w-full bg-black min-h-screen">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 max-w-5xl">
          {/* Page title */}
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-10 text-center">
            Terms of Use
          </h1>
          
          {/* Content */}
          <div className="bg-zinc-900 rounded-2xl p-8 md:p-10 shadow-[2px_4px_30px_-3px_#ffb80030]">
            <p className="text-white text-lg mb-8">
              Welcome to SEVENTH SENSE. By accessing our website or working with us, you agree to the following terms:
            </p>
            
            <h2 className="text-[#ffb800] text-2xl font-bold mb-4">Content & Intellectual Property</h2>
            <p className="text-white text-lg mb-8">
              All content on this website, including text, visuals, and media, is the property of SEVENTH SENSE and may not be reused or redistributed without permission.
            </p>
            
            <h2 className="text-[#ffb800] text-2xl font-bold mb-4">Our Services</h2>
            <p className="text-white text-lg mb-8">
              Our services are offered with the intent of providing real value and results, and we expect mutual respect and professionalism from all collaborations.
            </p>
            
            <h2 className="text-[#ffb800] text-2xl font-bold mb-4">Agreements</h2>
            <p className="text-white text-lg mb-8">
              Any agreements regarding services, pricing, and deliverables will be shared via formal contracts or proposals.
            </p>
            
            <h2 className="text-[#ffb800] text-2xl font-bold mb-4">Changes to Terms</h2>
            <p className="text-white text-lg mb-8">
              We reserve the right to update or modify these terms at any time without prior notice.
            </p>
            
            <div className="mt-10 pt-6 border-t border-zinc-700">
              <p className="text-white text-lg">
                If you have any questions or would like to know more about our terms, feel free to get in touch at:
              </p>
              <p className="text-[#ffb800] text-lg font-medium mt-2">
                seventhsense.work@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}; 