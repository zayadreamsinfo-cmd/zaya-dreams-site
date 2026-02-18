import { useEffect, useRef, useState } from 'react';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

const Tickets = () => {
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

  const handleTicketClick = () => {
    window.open('https://zaya-dreams.ticket.io', '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="tickets"
      ref={sectionRef}
      className="relative w-full bg-black py-24 md:py-32"
    >
      <div className="w-full px-6 lg:px-12 xl:px-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Title */}
          <div
            className={`mb-16 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Next Event
            </h2>
            <div className="w-24 h-1 bg-[#C00020] mt-4 mx-auto" />
          </div>

          {/* Event Details */}
          <div
            className={`space-y-8 mb-12 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Date */}
            <div className="flex items-center justify-center gap-4">
              <Calendar className="w-6 h-6 text-[#C00020]" />
              <span className="text-xl md:text-2xl text-white/90">
                Coming Soon
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center justify-center gap-4">
              <MapPin className="w-6 h-6 text-[#C00020]" />
              <span className="text-xl md:text-2xl text-white/90">
                Hamburg, Germany
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <div
            className={`transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <button
              onClick={handleTicketClick}
              className="group inline-flex items-center gap-3 bg-[#C00020] hover:bg-[#E00030] text-white font-bold px-12 py-5 text-xl tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#C00020]/20"
            >
              Get Tickets
              <ExternalLink className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            
            <p className="text-white/40 text-sm mt-6">
              Tickets available via ticket.io
            </p>
          </div>
        </div>
      </div>

      {/* Background Accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C00020]/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default Tickets;
