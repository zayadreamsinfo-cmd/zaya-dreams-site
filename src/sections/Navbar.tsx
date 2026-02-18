import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const leftLinks = [
    { label: 'About', id: 'about' },
    { label: 'Aftermovie', id: 'aftermovie' },
  ];

  const rightLinks = [
    { label: 'Tickets', id: 'tickets' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Left Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-end pr-12">
            {leftLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-white text-sm font-medium tracking-wide hover:text-[#C00020] transition-colors duration-200 uppercase"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Logo - Centered */}
          <div className="flex-shrink-0 flex justify-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center justify-center"
            >
              <img
                src="/ZAYA.svg"
                alt="ZAYA Dreams"
                className="h-10 w-auto"
              />
            </button>
          </div>

          {/* Right Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-start pl-12">
            {rightLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-white text-sm font-medium tracking-wide hover:text-[#C00020] transition-colors duration-200 uppercase"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden absolute right-6">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-[#C00020] transition-colors duration-200"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-black/98 backdrop-blur-md transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-6 space-y-4">
          {[...leftLinks, ...rightLinks].map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="block w-full text-left text-white text-lg font-medium tracking-wide hover:text-[#C00020] transition-colors duration-200 uppercase py-2"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
