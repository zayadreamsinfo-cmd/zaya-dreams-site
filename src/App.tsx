import { Analytics } from "@vercel/analytics/react";
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Gallery from './sections/Gallery';
import Aftermovie from './sections/Aftermovie';
import Tickets from './sections/Tickets';
import Newsletter from './sections/Newsletter';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Aftermovie />
        <Tickets />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
