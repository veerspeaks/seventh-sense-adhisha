import { Button } from "../ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface NavItem {
  name: string;
  active: boolean;
}

interface HeaderProps {
  navItems: NavItem[];
}

export const Header = ({ navItems }: HeaderProps): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Function to get the path for each nav item
  const getNavPath = (name: string): string => {
    if (name === "Home") return "/";
    return `/${name.toLowerCase()}`;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle navigation for Services section
  const handleNavClick = (name: string) => {
    setIsMobileMenuOpen(false);
    
    if (name === "Services") {
      if (location.pathname === "/") {
        // If already on homepage, just scroll to the section
        const section = document.getElementById("services-section");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // If on another page, navigate to home and then scroll
        navigate("/", { state: { scrollToServices: true } });
      }
    }
  };

  // Handle redirection to onboarding page
  const handleLetsTalkClick = () => {
    setIsMobileMenuOpen(false);
    navigate("/onboarding");
  };

  return (
    <header className="w-full flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-16 py-4 bg-black rounded-b-2xl shadow-[2px_4px_100px_-3px_#ffb80040] overflow-hidden relative z-50">
      <Link to="/" className="flex items-center">
        <img 
          src="/seventh-sense-logo-2.svg" 
          alt="Seventh Sense" 
          className="h-6 sm:h-8 w-auto" 
        />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex  mx-auto">
        <ul className="flex items-center justify-center gap-4 md:gap-8 lg:gap-10">
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`p-2.5 ${
                item.active
                ? "border-b-2 border-[#ffb800]"
                  : ""
              }`}
            >
              {item.name === "Services" ? (
                <button 
                  onClick={() => handleNavClick(item.name)}
                  className="font-['Inter',Helvetica] font-normal text-white text-sm whitespace-nowrap"
                >
                  {item.name}
                </button>
              ) : (
                <Link to={getNavPath(item.name)} className="font-['Inter',Helvetica] font-normal text-white text-sm whitespace-nowrap">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Navigation Toggle */}
      <button 
        className="md:hidden text-white p-2 z-50"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop CTA Button */}
      <Button 
        className="hidden md:flex items-center px-6 py-4 bg-[#ffb800] rounded-[12px] hover:bg-[#ffb800]/90"
        onClick={handleLetsTalkClick}
      >
        <span className="font-['Inter',Helvetica] text-black text-sm">
          Let&apos;s Talk
        </span>
      </Button>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-black z-40 transition-transform duration-300 ease-in-out transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <ul className="flex flex-col items-center space-y-8">
            {navItems.map((item, index) => (
              <li key={index}>
                {item.name === "Services" ? (
                  <button 
                    onClick={() => handleNavClick(item.name)}
                    className={`font-['Inter',Helvetica] font-normal text-2xl ${item.active ? 'text-[#ffb800]' : 'text-white'}`}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link 
                    to={getNavPath(item.name)} 
                    className={`font-['Inter',Helvetica] font-normal text-2xl ${item.active ? 'text-[#ffb800]' : 'text-white'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          
          <Button 
            className="mt-12 flex items-center px-8 py-4 bg-[#ffb800] rounded-[12px] hover:bg-[#ffb800]/90"
            onClick={handleLetsTalkClick}
          >
            <span className="font-['Inter',Helvetica] font-bold text-black text-lg">
              Let&apos;s Talk
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}; 