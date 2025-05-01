import { Layout } from "../../components/layout/Layout";
import { navItems } from "../../data/siteData";

export const Privacy = (): JSX.Element => {
  // Create a copy of navItems but set Privacy to active
  const privacyNavItems = navItems.map(item => 
    item.name === "Privacy" ? { ...item, active: true } : { ...item, active: false }
  );

  return (
    <Layout navItems={privacyNavItems}>
      <div className="w-full bg-black min-h-screen">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 max-w-5xl">
          {/* Page title */}
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-10 text-center">
            Privacy Policy
          </h1>
          
          {/* Content */}
          <div className="bg-zinc-900 rounded-2xl p-8 md:p-10 shadow-[2px_4px_30px_-3px_#ffb80030]">
            <p className="text-white text-lg mb-8">
              At SEVENTH SENSE, we respect your privacy and are committed to protecting the personal information you share with us.
            </p>
            
            <h2 className="text-[#ffb800] text-2xl font-bold mb-4">What We Collect</h2>
            <p className="text-white text-lg mb-8">
              We may collect your name, email address, phone number, and any other details you provide when filling out forms, making inquiries, or working with us.
            </p>
            
            <h2 className="text-[#ffb800] text-2xl font-bold mb-4">How We Use Your Data</h2>
            <p className="text-white text-lg mb-8">
              Your information is used solely for communication, project coordination, and improving your experience with our services. We do not sell or share your information with third parties.
            </p>
            
            <h2 className="text-[#ffb800] text-2xl font-bold mb-4">Data Security</h2>
            <p className="text-white text-lg mb-8">
              We use secure systems and tools to protect your information. Any data shared with us is kept confidential and only accessible to authorized members of our team.
            </p>
            
            <p className="text-white text-lg mb-8">
              By using our website and services, you agree to the terms of this privacy policy.
            </p>
            
            <div className="mt-10 pt-6 border-t border-zinc-700">
              <p className="text-white text-lg">
                For questions or concerns, feel free to contact us at:
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