import { useEffect, useRef, useState } from 'react';

const Aftermovie = () => {
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
      id="aftermovie"
      ref={sectionRef}
      className="relative w-full bg-black py-24 md:py-32"
    >
      <div className="w-full px-6 lg:px-12 xl:px-24">
        {/* Section Title */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Relive the Energy
          </h2>
          <div className="w-24 h-1 bg-[#C00020] mt-4 mx-auto" />
        </div>

        {/* Video Container */}
        <div
          className={`max-w-5xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative w-full aspect-video bg-[#0B0B0B] overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/S16t-TtxbDQ?rel=0&modestbranding=1"
              title="ZAYA Dreams Aftermovie"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 w-full h-full"
            />
          </div>
          
          {/* Caption */}
          <p className="text-center text-white/50 text-sm mt-6">
            ZAYA Dreams – Previous Event Highlights
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C00020]/30 to-transparent" />
    </section>
  );
};

export default Aftermovie;
