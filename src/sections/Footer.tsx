import { Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const instagramLinks = [
    { url: 'https://www.instagram.com/zayadreams_hamburg', label: '@zayadreams_hamburg' },
    { url: 'https://www.instagram.com/prodbyarmah', label: '@prodbyarmah' },
    { url: 'https://www.instagram.com/_praixz', label: '@_praixz' },
  ];

  const legalLinks = [
    { label: 'Impressum', href: '#' },
    { label: 'Datenschutz', href: '#' },
    { label: 'AGB', href: '#' },
  ];

  return (
    <footer className="relative w-full bg-black pt-16 pb-8">
      {/* Top Border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C00020]/50 to-transparent" />

      <div className="w-full px-6 lg:px-12 xl:px-24">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div className="text-center md:text-left">
              <img
                src="/ZAYA.svg"
                alt="ZAYA Dreams"
                className="h-8 w-auto mx-auto md:mx-0 mb-4"
              />
              <p className="text-white/60 text-sm">
                Afro & Global Sound Experience
              </p>
              <p className="text-white/40 text-sm mt-1">
                Hamburg, Germany
              </p>
            </div>

            {/* Legal Links */}
            <div className="text-center">
              <h4 className="text-white font-semibold mb-4">Rechtliches</h4>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-[#C00020] text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instagram Links */}
            <div className="text-center md:text-right">
              <h4 className="text-white font-semibold mb-4">Follow Us</h4>
              <ul className="space-y-2">
                {instagramLinks.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white/60 hover:text-[#C00020] text-sm transition-colors duration-200"
                    >
                      <Instagram className="w-4 h-4" />
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/10 mb-8" />

          {/* Copyright */}
          <div className="text-center">
            <p className="text-white/40 text-sm">
              &copy; {currentYear} ZAYA Dreams. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
