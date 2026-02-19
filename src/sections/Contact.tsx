import { useEffect, useRef, useState } from 'react';
import { Send, Mail, Check } from 'lucide-react';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Fehler beim Senden.");
      }

      setIsSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setError(err.message || "Etwas ist schiefgelaufen.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
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
              Contact
            </h2>
            <div className="w-24 h-1 bg-[#C00020] mt-6 mx-auto" />
          </div>

          {/* Email Display */}
          <div
            className={`text-center mb-12 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <a
              href="mailto:zaya.dreams.info@gmail.com"
              className="inline-flex items-center gap-3 text-white/80 hover:text-[#C00020] transition-colors duration-200"
            >
              <Mail className="w-5 h-5" />
              <span className="text-lg">zaya.dreams.info@gmail.com</span>
            </a>
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
                  Nachricht gesendet!
                </h3>
                <p className="text-white/60">
                  Wir melden uns so schnell wie möglich bei dir.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="contact-name" className="block text-white/80 text-sm mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-[#C00020] focus:outline-none transition-colors duration-200"
                    placeholder="Dein Name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="contact-email" className="block text-white/80 text-sm mb-2">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-[#C00020] focus:outline-none transition-colors duration-200"
                    placeholder="deine@email.de"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="contact-message" className="block text-white/80 text-sm mb-2">
                    Nachricht
                  </label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-[#C00020] focus:outline-none transition-colors duration-200 resize-none"
                    placeholder="Deine Nachricht..."
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm">
                    {error}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !name || !email || !message}
                  className="w-full bg-[#C00020] hover:bg-[#E00030] disabled:bg-white/20 disabled:cursor-not-allowed text-white font-semibold px-8 py-4 text-lg tracking-wide transition-all duration-300 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <span>Senden...</span>
                  ) : (
                    <>
                      <span>Senden</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
