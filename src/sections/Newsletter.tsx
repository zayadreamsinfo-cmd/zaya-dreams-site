import { useRef, useState, useEffect } from 'react';
import { Check } from 'lucide-react';

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
    
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
        }),
      });

      if (!response.ok) {
        throw new Error("Newsletter subscription failed");
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      setName('');
      setEmail('');
      setConsent(false);
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setIsSubmitting(false);
    }
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
                    id="newsletter-consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                    className="w-5 h-5 mt-0.5 accent-[#C00020] cursor-pointer"
                  />
                  <label htmlFor="newsletter-consent" className="text-white/60 text-sm cursor-pointer">
                    Ich akzeptiere die Datenschutzerklärung und möchte den Newsletter erhalten.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#C00020] hover:bg-[#E00030] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                >
                  {isSubmitting ? 'Wird angemeldet...' : 'Newsletter abonnieren'}
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
