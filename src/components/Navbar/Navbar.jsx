import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CTAButton } from '../ui/CTAButton';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Journey', href: '#journey' },
  { label: 'Companies', href: '#companies' },
  { label: 'Impact', href: '#impact' },
  { label: 'Media', href: '#documentary' },
  { label: 'People', href: '#legacy' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '14px 40px' : '22px 40px',
        background: scrolled
          ? 'rgba(8,8,8,0.94)'
          : 'linear-gradient(to bottom, rgba(8,8,8,0.7), transparent)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(200,155,82,0.12)' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.4s ease',
      }}
    >
      {/* Left — Monogram */}
      <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <div style={{
          width: '34px', height: '34px',
          border: '1px solid rgba(200,155,82,0.5)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', color: 'var(--gold)', fontWeight: 600 }}>SS</span>
        </div>
        <span style={{
          fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 500,
          letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cream)',
        }}>
          Sameer Somal
        </span>
      </a>

      {/* Center — Nav Links (desktop) */}
      <div className="nav-links" style={{
        display: 'flex', alignItems: 'center', gap: '32px',
      }}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              color: active === link.href.slice(1) ? 'var(--gold)' : 'var(--muted)',
              textDecoration: 'none',
              transition: 'color 0.3s',
              textTransform: 'uppercase',
            }}
            onMouseEnter={(e) => { e.target.style.color = 'var(--cream)'; }}
            onMouseLeave={(e) => { e.target.style.color = active === link.href.slice(1) ? 'var(--gold)' : 'var(--muted)'; }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Right — CTA */}
      <CTAButton href="#contact" variant="gold" style={{ padding: '10px 20px', fontSize: '12px' }}>
        Get in Touch →
      </CTAButton>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="hamburger"
        style={{
          display: 'none',
          flexDirection: 'column',
          gap: '5px',
          padding: '8px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
        aria-label="Open menu"
      >
        <span style={{ width: '22px', height: '1.5px', background: 'var(--cream)', display: 'block' }} />
        <span style={{ width: '16px', height: '1.5px', background: 'var(--cream)', display: 'block' }} />
        <span style={{ width: '22px', height: '1.5px', background: 'var(--cream)', display: 'block' }} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0, right: 0,
            background: 'rgba(8,8,8,0.97)',
            padding: '32px 40px',
            borderBottom: '1px solid rgba(200,155,82,0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                letterSpacing: '0.1em',
                color: 'var(--cream)',
                textTransform: 'uppercase',
              }}
            >
              {link.label}
            </a>
          ))}
          <CTAButton href="#contact" variant="gold">Get in Touch →</CTAButton>
        </motion.div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
          nav > a:last-of-type { display: none; }
        }
      `}</style>
    </motion.nav>
  );
}
