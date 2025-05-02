import { Mail, MapPin, Instagram, Twitter, Linkedin, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = (): JSX.Element => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-[#050505] border-t border-gray-800 pt-8 sm:pt-10 md:pt-12 pb-6 sm:pb-8">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 mb-6 sm:mb-8">
          {/* Logo */}
          <div className="flex justify-center sm:justify-start">
            <img 
              src="/logo/seventh_sense.png" 
              alt="Seventh Sense" 
              className="h-10 sm:h-12 w-auto" 
            />
          </div>
          
          {/* Address & Email */}
          <div className="flex flex-col items-center sm:items-start space-y-3 text-center sm:text-left">
            <div className="flex items-start">
              <MapPin className="text-[#ffb800] mr-3 mt-1 flex-shrink-0" size={16} />
              <span className="text-gray-400 text-xs sm:text-sm">
                The Spire 2, Office 711<br />
                7th Floor, Ayodhya Chowk<br />
                Rajkot, Gujarat 360006
              </span>
            </div>
            <div className="flex items-center">
              <Mail className="text-[#ffb800] mr-3 flex-shrink-0" size={16} />
              <a href="mailto:hello@seventhsense.com" className="text-gray-400 text-xs sm:text-sm hover:text-[#ffb800] transition-colors">
              seventhsense.work@gmail.com
              </a>
            </div>
          </div>
          
          {/* Social & Legal */}
          <div className="flex flex-col items-center md:items-end space-y-4 sm:space-y-6">
            {/* Social Media */}
            <div className="flex space-x-6">
              <a href="https://www.instagram.com/_.seventhsense._?igsh=eDc2dnhpbWdnZ3oy" className="text-gray-400 hover:text-[#ffb800] transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
            
            {/* Legal Links */}
            <div className="flex space-x-4 sm:space-x-6">
              <Link to="/privacy" className="text-gray-400 text-xs hover:text-[#ffb800] transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 text-xs hover:text-[#ffb800] transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
        
        {/* Bottom bar with copyright */}
        <div className="pt-4 sm:pt-6 border-t border-gray-800 flex justify-center">
          <p className="text-gray-500 text-xs text-center">
            © {currentYear} Seventh Sense Marketing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}; 