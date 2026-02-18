import { useEffect, useRef, useState } from 'react';
import { Send, Check } from 'lucide-react';

const Newsletter = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !consent) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setName('');
    setEmail('');
    setConsent(false);
  };

  return (
    <section
      id="newsletter"
      ref={sectionRef}
      className="relative w-full bg-black py-24 md:py-32"
    >
      <div className="w-full px-6 lg:px-12 xl:px-24">
        <div className="max-w-2xl mx-auto">
          {/* Section Title */}
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Newsletter
            </h2>
            <p className="text-white/60 text-lg mt-4">
              Bleib auf dem Laufenden über kommende Events
            </p>
            <div className="w-24 h-1 bg-[#C00020] mt-6 mx-auto" />
          </div>

          {/* Form */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#C00020] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Vielen Dank!
                </h3>
                <p className="text-white/60">
                  Du hast dich erfolgreich für den Newsletter angemeldet.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="newsletter-name" className="block text-white/80 text-sm mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="newsletter-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-[#C00020] focus:outline-none transition-colors duration-200"
                    placeholder="Dein Name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="newsletter-email" className="block text-white/80 text-sm mb-2">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    id="newsletter-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-[#C00020] focus:outline-none transition-colors duration-200"
                    placeholder="deine@email.de"
                  />
                </div>

                {/* DSGVO Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                    className="mt-1 w-5 h-5 rounded border border-white/20 bg-white/5 text-[#C00020] focus:ring-[#C00020] focus:ring-offset-0 cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-white/60 text-sm leading-relaxed cursor-pointer">
                    Ich stimme der Verarbeitung meiner Daten gemäß{' '}
                    <a href="#" className="text-[#C00020] hover:underline">
                      Datenschutzerklärung
                    </a>{' '}
                    zu.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !name || !email || !consent}
                  className="w-full bg-[#C00020] hover:bg-[#E00030] disabled:bg-white/20 disabled:cursor-not-allowed text-white font-semibold px-8 py-4 text-lg tracking-wide transition-all duration-300 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <span>Anmelden...</span>
                  ) : (
                    <>
                      <span>Anmelden</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C00020]/30 to-transparent" />
    </section>
  );
};

export default Newsletter;
