import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { CTAButton } from '../ui/CTAButton';
import { sameerData } from '../../data/sameer';

const featuredIn = ['Forbes', 'Bloomberg', 'IBM', 'ABA', 'CFA Institute'];

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.0]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  return (
    <section
      id="hero"
      ref={ref}
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'var(--black)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Hero background image */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          scale: imageScale,
          transformOrigin: 'center center',
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
          }}
        />
        {/* Cinematic dark gradient — left side for text */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(105deg, rgba(8,8,8,0.90) 0%, rgba(8,8,8,0.70) 40%, rgba(8,8,8,0.20) 70%, rgba(8,8,8,0.05) 100%)',
        }} />
        {/* Bottom fade */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '40%',
          background: 'linear-gradient(to top, var(--black) 0%, transparent 100%)',
        }} />
      </motion.div>

      {/* Hero content */}
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
        }}
      >
        {/* Roles label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
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
        </motion.p>

        {/* Main Name */}
        <div style={{ marginBottom: '16px' }}>
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
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
          </motion.h1>
          <motion.span
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.48, ease: [0.4, 0, 0.2, 1] }}
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
          </motion.span>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.62 }}
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
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.76 }}
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
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.90 }}
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
        >
          <CTAButton href="#documentary" variant="gold">
            ▶ Watch His Story
          </CTAButton>
          <CTAButton href="#journey" variant="outline">
            Explore Journey ↓
          </CTAButton>
        </motion.div>
      </motion.div>

      {/* Editorial quote — top right overlay */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 1.1 }}
        style={{
          position: 'absolute',
          top: '50%',
          right: 'clamp(24px, 5vw, 80px)',
          transform: 'translateY(-50%)',
          zIndex: 10,
          textAlign: 'right',
          maxWidth: '220px',
        }}
        className="hero-quote"
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

      {/* Featured In strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2 }}
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
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .hero-quote { display: none; }
        }
      `}</style>
    </section>
  );
}
