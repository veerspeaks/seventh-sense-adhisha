import { ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Layout } from "../../components/layout/Layout";
import { navItems } from "../../data/siteData";
import { PageTransition } from "../../components/ui/PageTransition";

export const Onboarding = (): JSX.Element => {
  // Create a copy of navItems but set Onboarding to active
  const onboardingNavItems = navItems.map(item => 
    item.name === "Onboarding" ? { ...item, active: true } : { ...item, active: false }
  );

  return (
    <Layout navItems={onboardingNavItems}>
      <PageTransition>
        <div className="w-full bg-black min-h-screen">
          <div className="container mx-auto px-6 md:px-12 lg:px-20 py-8 max-w-7xl">
            {/* Back button */}
            <div className="mb-6">
              <Button 
                className="bg-[#ffb800] hover:bg-[#ffb800]/90 text-black rounded-md px-6 py-2 flex items-center gap-2"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium">Back</span>
              </Button>
            </div>
            
            {/* Page title */}
            <h1 className="text-white text-4xl md:text-5xl font-bold text-center mb-12">
              Onboarding
            </h1>
            
            {/* Content area */}
            <div className="flex flex-col lg:flex-row gap-8 mx-2 md:mx-4">
              {/* Form section */}
              <div className="flex-1 bg-black border border-gray-800 rounded-lg p-6 md:p-8">
                <div className="mb-10">
                  <h2 className="text-white text-3xl md:text-4xl font-bold text-center mb-2">
                    Ready to transform your brand?
                  </h2>
                  <h3 className="text-white text-3xl md:text-4xl font-bold text-center">
                    Let's begin
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-white text-lg font-medium mb-2">
                      Full Name
                    </label>
                    <Input 
                      id="fullName"
                      placeholder="Virat Kohli" 
                      className="bg-transparent border border-gray-700 text-white p-3 rounded-md w-full focus-visible:ring-[#ffb800] focus-visible:ring-offset-0"
                    />
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-white text-lg font-medium mb-2">
                      Email
                    </label>
                    <Input 
                      id="email"
                      type="email" 
                      placeholder="you@company.com" 
                      className="bg-transparent border border-gray-700 text-white p-3 rounded-md w-full focus-visible:ring-[#ffb800] focus-visible:ring-offset-0"
                    />
                  </div>
                  
                  {/* Business Name */}
                  <div className="md:col-span-2">
                    <label htmlFor="businessName" className="block text-white text-lg font-medium mb-2">
                      Business Name
                    </label>
                    <Input 
                      id="businessName"
                      placeholder="One8 Commune" 
                      className="bg-transparent border border-gray-700 text-white p-3 rounded-md w-full focus-visible:ring-[#ffb800] focus-visible:ring-offset-0"
                    />
                  </div>
                  
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-white text-lg font-medium mb-2">
                      Phone Number
                    </label>
                    <Input 
                      id="phone"
                      placeholder="+91 22 1234 5678" 
                      className="bg-transparent border border-gray-700 text-white p-3 rounded-md w-full focus-visible:ring-[#ffb800] focus-visible:ring-offset-0"
                    />
                  </div>
                  
                  {/* Location */}
                  <div>
                    <label htmlFor="location" className="block text-white text-lg font-medium mb-2">
                      Location
                    </label>
                    <Input 
                      id="location"
                      placeholder="Bengaluru, Karnataka" 
                      className="bg-transparent border border-gray-700 text-white p-3 rounded-md w-full focus-visible:ring-[#ffb800] focus-visible:ring-offset-0"
                    />
                  </div>
                </div>
                
                {/* Services */}
                <div className="mt-8">
                  <h3 className="text-white text-lg font-medium mb-4">Services</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="social" 
                        className="h-4 w-4 border-gray-600 rounded"
                      />
                      <label htmlFor="social" className="ml-2 text-white">Social Media Management</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="seo" 
                        className="h-4 w-4 border-gray-600 rounded"
                      />
                      <label htmlFor="seo" className="ml-2 text-white">SEO</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="content" 
                        className="h-4 w-4 border-gray-600 rounded"
                      />
                      <label htmlFor="content" className="ml-2 text-white">Content Creation</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="automation" 
                        className="h-4 w-4 border-gray-600 rounded"
                      />
                      <label htmlFor="automation" className="ml-2 text-white">DM Automation</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="ads" 
                        className="h-4 w-4 border-gray-600 rounded"
                      />
                      <label htmlFor="ads" className="ml-2 text-white">Meta Ads</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="shoots" 
                        className="h-4 w-4 border-gray-600 rounded"
                      />
                      <label htmlFor="shoots" className="ml-2 text-white">Business Shoots</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="video" 
                        className="h-4 w-4 border-gray-600 rounded"
                      />
                      <label htmlFor="video" className="ml-2 text-white">Video Editing</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="branding" 
                        className="h-4 w-4 border-gray-600 rounded"
                      />
                      <label htmlFor="branding" className="ml-2 text-white">Branding</label>
                    </div>
                  </div>
                </div>
                
                {/* Submit button */}
                <div className="mt-10 flex justify-center">
                  <Button className="bg-[#ffb800] hover:bg-[#ffb800]/90 text-black font-semibold py-3 px-8 rounded-md text-lg">
                    Submit & Let's Connect
                  </Button>
                </div>
              </div>
              
              {/* Contact info section */}
              <div className="flex-1 flex flex-col">
                <div className="flex-1 bg-[#000000] rounded-lg p-8 mb-6 flex justify-center items-center relative hidden md:flex">
                  {/* Number 7 image */}
                  <img
                    className="w-[350px] h-auto absolute"
                    alt="Number 7"
                    src="/sabri--2--1.png"
                  />
                  {/* Seventh Sense logo */}
                  <img
                    className="w-[300px] relative z-10"
                    alt="Seventh sense logo"
                    src="/seventh-sense-logo-2.svg"
                  />
                </div>
                
                <div className="flex-1 space-y-6">
                  <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-6 mt-16">
                    <div className="flex items-center">
                      <div className="bg-[#ffb800] rounded-full p-3 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-xl">Email</h3>
                        <p className="text-white">seventhsense.work@gmail.com</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-6">
                    <div className="flex items-center">
                      <div className="bg-[#ffb800] rounded-full p-3 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-xl">Phone</h3>
                        <p className="text-white">+91 9687100018</p>
                      </div>
                    </div>
                  </div> */}
                  
                  <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-6">
                    <div className="flex items-center">
                      <div className="bg-[#ffb800] rounded-full p-3 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-xl">Instagram</h3>
                        <p className="text-white">@_.seventhsense._</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
}; 