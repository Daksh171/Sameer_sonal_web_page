import './index.css';
import { MotionConfig } from 'framer-motion';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { CompaniesImpact } from './components/CompaniesImpact/CompaniesImpact';
import { Documentary } from './components/Documentary/Documentary';
import { NumbersThatMatter } from './components/NumbersThatMatter/NumbersThatMatter';
import { ShortReel } from './components/ShortReel/ShortReel';
import { Clarivo } from './components/Clarivo/Clarivo';
import { RelationshipCarousel } from './components/RelationshipCarousel/RelationshipCarousel';
import { Legacy } from './components/Legacy/Legacy';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    // reducedMotion="user" → Framer Motion honours the OS reduced-motion setting site-wide
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero />
        <CompaniesImpact />
        <RelationshipCarousel />
        <ShortReel />
        <NumbersThatMatter />
        <Documentary />
        <Clarivo />
        <Legacy />
      </main>
      {/* <Footer /> */}
    </MotionConfig>
  );
}

export default App;
