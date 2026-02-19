import { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const Hero = () => { // deploy test
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleSound = () => {
    const nextMuted = !isMuted;
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
      if (!nextMuted) {
        videoRef.current.play().catch(() => {});
      }
    }
    setIsMuted(nextMuted);
  };

  const scrollToTickets = () => {
    const element = document.getElementById('tickets');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source 
            src="https://pub-c8aa1332a06e41bfa847bad1f4f84678.r2.dev/amahr%20aftermovie%204kv4-ios.mp4"
            type="video/mp4"
          />
        </video>
        
        {/* Dark Gradient Overlay */}
        <div 
          className="absolute inset-0 z-10"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.85))' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-4 animate-fade-in-up">
          ZAYA Dreams
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-white/90 font-light tracking-wide mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          The Afro & Global Sound Experience
        </p>
        <button
          onClick={scrollToTickets}
          className="bg-[#C00020] hover:bg-[#E00030] text-white font-semibold px-10 py-4 text-lg tracking-wide transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          Get Tickets
        </button>
      </div>

      {/* Sound Toggle Button */}
      <div className="absolute bottom-8 right-8 z-20">
        <button
          onClick={toggleSound}
          className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#C00020] hover:border-[#C00020] transition-all duration-300"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
