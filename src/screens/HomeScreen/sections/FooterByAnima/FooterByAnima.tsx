import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import React from "react";
import { Separator } from "../../../../components/ui/separator";

export const FooterByAnima = (): JSX.Element => {
  // Footer policy links data
  const policyLinks = [
    "Privacy Policy",
    "Terms of Use",
    "Sales and Refunds",
    "Legal",
    "Site Map",
  ];

  // Social media icons data
  const socialMedia = [
    {
      icon: <InstagramIcon className="w-3.5 h-3.5 text-white" />,
      alt: "Instagram",
    },
    {
      icon: <FacebookIcon className="w-2 h-[15px] text-white" />,
      alt: "Facebook",
    },
    { icon: <TwitterIcon className="w-3.5 h-3.5 text-white" />, alt: "Twitter" },
  ];

  // Product links data
  const productLinks = [
    "Social Media Management",
    "Content Creation",
    "Meta Ads",
    "SEO",
    "DM Automation",
  ];

  // Use cases links data
  const useCasesLinks = [
    "Influencers",
    "Marketers",
    "Small Business",
    "Website Builder",
  ];

  // Company links data
  const companyLinks = ["About Us", "Careers", "FAQs", "Teams", "Contact Us"];

  return (
    <footer className="w-full py-8 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-6">
          {/* Logo section */}
          <div className="md:col-span-1 lg:col-span-3">
            <img
              className="w-[120px] h-[120px]"
              alt="Seventh sense logo"
              src="/seventh-sense-logo-1.png"
            />
            <Separator className="w-[300px] my-5" />
            <div className="mt-3">
              <p className="font-light text-[10px] text-black">
                © 2021 All Rights Reserved
              </p>
            </div>
          </div>

          {/* Social media and contact section */}
          <div className="md:col-span-1 lg:col-span-2">
            <h3 className="font-bold text-sm text-black mb-3">Follow us</h3>
            <div className="flex items-start gap-3 mb-6">
              {socialMedia.map((social, index) => (
                <div
                  key={index}
                  className="w-5 h-5 bg-black rounded-lg flex items-center justify-center"
                >
                  {social.icon}
                </div>
              ))}
            </div>

            <h3 className="font-bold text-sm text-black mb-1.5">Call us</h3>
            <p className="font-normal text-sm text-black">+91 9687100018</p>
          </div>

          {/* Product links section */}
          <div className="md:col-span-1 lg:col-span-2">
            <h3 className="font-bold text-base text-black mb-4">Product</h3>
            <ul className="space-y-3">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="font-normal text-xs text-black">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Use cases links section */}
          <div className="md:col-span-1 lg:col-span-2">
            <h3 className="font-bold text-base text-black mb-4">Use Cases</h3>
            <ul className="space-y-3">
              {useCasesLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="font-normal text-xs text-black">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links section */}
          <div className="md:col-span-1 lg:col-span-2">
            <h3 className="font-bold text-base text-black mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="font-normal text-xs text-black">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom policy links */}
        <div className="flex flex-wrap items-start gap-8 mt-8">
          {policyLinks.map((link, index) => (
            <a key={index} href="#" className="font-normal text-xs text-black">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
