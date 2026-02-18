import { useEffect, useRef, useState } from 'react';

// Static list of images from public folder
const images = [
  '/IMG_5773.jpeg',
  '/IMG_5777.jpeg',
  '/IMG_5780.jpeg',
  '/IMG_5781.jpeg',
  '/IMG_5784.jpeg',
  '/IMG_5788.jpeg',
  '/IMG_5790.jpeg',
  '/IMG_5792.jpeg',
  '/IMG_5799.jpeg',
  '/IMG_5804.jpeg',
  '/IMG_5807.jpeg',
  '/IMG_5809.jpeg',
  '/IMG_5813.jpeg',
];

const Gallery = () => {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="gallery"
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
            Moments
          </h2>
          <div className="w-24 h-1 bg-[#C00020] mt-4 mx-auto" />
        </div>

        {/* Image Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {images.map((src, index) => (
            <div
              key={src}
              className="relative aspect-[4/5] overflow-hidden group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <img
                src={src}
                alt={`ZAYA Dreams Moment ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C00020]/30 to-transparent" />
    </section>
  );
};

export default Gallery;
