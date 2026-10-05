import './index.css';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { CompaniesImpact } from './components/CompaniesImpact/CompaniesImpact';
import { Documentary } from './components/Documentary/Documentary';
import { NumbersThatMatter } from './components/NumbersThatMatter/NumbersThatMatter';
import { ShortReel } from './components/ShortReel/ShortReel';
import { Clarivo } from './components/Clarivo/Clarivo';
import { Legacy } from './components/Legacy/Legacy';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CompaniesImpact />
        <ShortReel />
        <NumbersThatMatter />
        <Documentary />
        <Clarivo />
        <Legacy />
      </main>
      <Footer />
    </>
  );
}

export default App;
