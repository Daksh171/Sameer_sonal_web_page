/**
 * Hero — cinematic multi-layer parallax
 *
 * Parallax contract (all GPU transform only):
 *   Background image:  0.15× scroll speed  (deepest layer)
 *   Gradient overlays: static              (on top of image)
 *   Text content:      0.10× scroll speed  (floats above bg)
 *   Quote card:        0.07× scroll speed  (slightly behind text)
 *
 * On mobile: parallax is disabled to avoid scroll lag.
 * All scroll calculations run in requestAnimationFrame only.
 * Zero React state updates on scroll.
 */
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { CTAButton } from '../ui/CTAButton';
import { sameerData } from '../../data/sameer';

const featuredIn = ['Forbes', 'Bloomberg', 'IBM', 'ABA', 'CFA Institute'];

/**
 * Detects mobile/reduced-motion to skip parallax.
 * Called once at component mount — not on every scroll.
 */
function shouldEnableParallax() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (window.innerWidth < 768) return false;
  return true;
}

export function Hero() {
  const sectionRef = useRef(null);
  // Evaluated once on mount — never on scroll
  const [parallax] = useState(shouldEnableParallax);
  const k = parallax ? 1 : 0; // collapses all ranges to 0 on mobile / reduced-motion

  // Framer Motion drives these as MotionValues → no React re-renders on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Text layer: 0.10×
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', `${10 * k}%`]);
  // Background image: 0.15× (deepest layer)
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', `${15 * k}%`]);
  // Subtle Ken Burns settle on the background
  const imageScale = useTransform(scrollYProgress, [0, 1], [parallax ? 1.04 : 1, 1.0]);
  // Quote card: 0.07×
  const quoteY = useTransform(scrollYProgress, [0, 1], ['0%', `${7 * k}%`]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'var(--black)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Layer 1: Background image (parallax 0.15×) ── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-10% 0',   /* extra height top/bottom so parallax doesn't expose edges */
          scale: imageScale,
          y: bgY,
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      >
        <img
          src={sameerData.heroImage}
          alt="Sameer Somal speaking"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            filter: 'brightness(0.55) contrast(1.08)',
            display: 'block',
          }}
        />

        {/* ── Layer 2: Cinematic gradients (static — on GPU compositor) ── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(105deg, rgba(8,8,8,0.90) 0%, rgba(8,8,8,0.70) 40%, rgba(8,8,8,0.20) 70%, rgba(8,8,8,0.05) 100%)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '40%',
          background: 'linear-gradient(to top, var(--black) 0%, transparent 100%)',
        }} />
      </motion.div>

      {/* ── Layer 3: Text content (parallax 0.10×) ── */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flex: 1,
          padding: 'clamp(24px, 6vw, 120px)',
          paddingTop: '120px',
          paddingBottom: '80px',
          y: textY,
          willChange: 'transform',
        }}
      >
        {/* Roles label */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '20px',
          }}
        >
          Entrepreneur · Mentor · Historian · Community Builder
        </p>

        {/* Main Name — immediate render, no 2-second staring animation */}
        <div style={{ marginBottom: '16px' }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(64px, 12vw, 140px)',
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              color: 'var(--gold)',
              margin: 0,
            }}
          >
            SAMEER
          </h1>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(64px, 12vw, 140px)',
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              color: 'var(--white)',
            }}
          >
            SOMAL
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: '28px',
          }}
        >
          People · Purpose · Legacy
        </p>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '15px',
            lineHeight: 1.7,
            color: 'var(--muted)',
            maxWidth: '420px',
            marginBottom: '40px',
          }}
        >
          {sameerData.description}
        </p>

        {/* CTAs */}
        <div
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
        >
          <CTAButton href="#documentary" variant="gold">
            ▶ Watch His Story
          </CTAButton>
          <CTAButton href="#journey" variant="outline">
            Explore Journey ↓
          </CTAButton>
        </div>
      </motion.div>

      {/* ── Layer 4: Editorial quote (parallax 0.07×) — wrapper holds the centring transform ── */}
      <div
        className="hero-quote"
        style={{
          position: 'absolute',
          top: '50%',
          right: 'clamp(24px, 5vw, 80px)',
          transform: 'translateY(-50%)',
          zIndex: 10,
          textAlign: 'right',
          maxWidth: '220px',
        }}
      >
      <motion.div
        style={{ y: quoteY }}
      >
        <span style={{
          display: 'block',
          width: '1px',
          height: '48px',
          background: 'rgba(200,155,82,0.5)',
          marginLeft: 'auto',
          marginBottom: '16px',
        }} />
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(16px, 2vw, 22px)',
          fontStyle: 'italic',
          lineHeight: 1.5,
          color: 'var(--cream)',
          fontWeight: 400,
        }}>
          "Give without remembering,
          <br />receive without forgetting."
        </p>
        <span style={{
          display: 'block',
          fontFamily: 'var(--font-sans)',
          fontSize: '10px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginTop: '10px',
        }}>
          — Sameer Somal
        </span>
      </motion.div>
      </div>

      {/* ── Featured In strip ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          borderTop: '1px solid rgba(200,155,82,0.12)',
          padding: '20px clamp(24px, 6vw, 120px)',
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          flexWrap: 'wrap',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '9px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          whiteSpace: 'nowrap',
        }}>
          Featured In
        </span>
        {featuredIn.map((name) => (
          <span
            key={name}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: 'rgba(248,246,241,0.45)',
              textTransform: 'uppercase',
            }}
          >
            {name}
          </span>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-quote { display: none; }
        }
      `}</style>
    </section>
  );
}
