import { useEffect, useRef, useState } from 'react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black py-24 md:py-32"
    >
      <div className="w-full px-6 lg:px-12 xl:px-24">
        <div className="max-w-5xl mx-auto">
          {/* Section Title */}
          <div
            className={`mb-16 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              About
            </h2>
            <div className="w-24 h-1 bg-[#C00020] mt-4" />
          </div>

          {/* Content */}
          <div
            className={`space-y-8 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light leading-relaxed">
              ZAYA Dreams ist eine Afro & Global Sound Eventreihe aus Hamburg.
            </p>
            
            <p className="text-lg md:text-xl text-white/70 leading-relaxed">
              Wir verbinden Afrobeats, Amapiano und UK Club Culture.
            </p>
            
            <p className="text-lg md:text-xl text-white/70 leading-relaxed">
              Wir stehen für Community, Energie und kulturelle Fusion.
            </p>
            
            <p className="text-lg md:text-xl text-white/70 leading-relaxed">
              Eine Plattform für kreative, internationale Menschen.
            </p>
            
            <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mt-12">
              Mehr als ein Event – eine Bewegung.
            </p>
          </div>

          {/* Decorative Element */}
          <div
            className={`mt-20 flex items-center gap-4 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="w-2 h-2 bg-[#C00020] rounded-full" />
            <div className="w-2 h-2 bg-[#C00020] rounded-full opacity-60" />
            <div className="w-2 h-2 bg-[#C00020] rounded-full opacity-30" />
          </div>
        </div>
      </div>

      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-l from-[#C00020] to-transparent" />
      </div>
    </section>
  );
};

export default About;
