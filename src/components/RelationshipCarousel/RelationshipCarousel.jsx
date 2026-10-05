import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';
import { FadeUp } from '../ui/Primitives';

/* ── Slide data ── */
const slides = [
  { src: '/images/carousel/intro.png',   alt: 'Relationship Building Principles – Introduction' },
  { src: '/images/carousel/1_slide.png', alt: 'Principle 1 – Show Up and Listen' },
  { src: '/images/carousel/2_slide.png', alt: 'Principle 2 – Give Before You Ask' },
  { src: '/images/carousel/3_slide.png', alt: 'Principle 3 – Be Consistent' },
  { src: '/images/carousel/4_slide.png', alt: 'Principle 4 – Build Real Rapport' },
  { src: '/images/carousel/5_slide.png', alt: 'Principle 5 – Think Long-Term' },
];

/* ── Single carousel card ── */
function CarouselCard({ slide, index, revealed }) {
  const delay = 0.2 + Math.min(index, 6) * 0.1;
  return (
    <div
      className="rel-card"
      style={{
        flexShrink: 0,
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'scale(1)' : 'scale(0.92)',
        transition: `opacity 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}s, transform 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
      }}
    >
      <motion.div
        whileHover={{ y: -8, scale: 1.03 }}
        transition={{ duration: 0.4 }}
        style={{
          width: 'clamp(280px, 26vw, 380px)',
          borderRadius: '24px',
          overflow: 'hidden',
          background: '#0A0A0A',
          border: '1px solid rgba(200,155,82,0.12)',
          cursor: 'pointer',
          position: 'relative',
          willChange: 'transform',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(200,155,82,0.06)',
        }}
        className="rel-card-inner"
      >
        <img
          src={slide.src}
          alt={slide.alt}
          loading="lazy"
          draggable={false}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            userSelect: 'none',
          }}
        />
      </motion.div>
    </div>
  );
}

/* ── Main section ── */
export function RelationshipCarousel() {
  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  /* Trigger once when section enters viewport */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(section);
        }
      },
      { threshold: 0.1, rootMargin: '-40px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="relationship-principles"
      ref={sectionRef}
      style={{
        background: 'var(--near-black)',
        padding: 'var(--section-py) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background accent */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(ellipse at 50% 40%, rgba(200,155,82,0.04) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Section header */}
      <div style={{ padding: '0 var(--section-px)', position: 'relative', zIndex: 1 }}>
        <SectionHeader
          number="02"
          label="Philosophy"
          title="Building Relationships"
          titleLight="That Last"
          subtitle="Insights inspired by Sameer Somal's relationship-first business philosophy and adapted through Clarivo's creative approach."
          align="center"
          dark={true}
        />
      </div>

      {/* ── Infinite marquee carousel — same pattern as Journey section ── */}
      <div
        style={{
          position: 'relative',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
          maskImage:
            'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
        }}
      >
        {/* Scrolling track — items duplicate for seamless infinite loop */}
        <div
          className="rel-marquee-track"
          style={{
            display: 'flex',
            gap: 'clamp(16px, 2vw, 28px)',
            paddingTop: '8px',
            paddingBottom: '24px',
            width: 'max-content',
            /* Marquee starts once the staggered reveal has landed */
            animation: revealed
              ? 'relMarqueeScroll 50s linear 1.2s infinite'
              : 'none',
          }}
        >
          {/* Set A */}
          {slides.map((slide, i) => (
            <CarouselCard
              key={`a-${i}`}
              slide={slide}
              index={i}
              revealed={revealed}
            />
          ))}
          {/* Set B — identical duplicate for seamless loop */}
          {slides.map((slide, i) => (
            <CarouselCard
              key={`b-${i}`}
              slide={slide}
              index={slides.length + i}
              revealed={revealed}
            />
          ))}
        </div>
      </div>

      {/* ── Bottom gold accent line ── */}
      <FadeUp delay={0.4}>
        <div
          style={{
            width: '40px',
            height: '1px',
            background: 'var(--gold)',
            margin: '32px auto 0',
            opacity: 0.5,
          }}
        />
      </FadeUp>

      {/* ── Styles ── */}
      <style>{`
        /* Infinite left-to-right marquee — matches Journey section pattern */
        @keyframes relMarqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Pause on hover so user can view cards */
        .rel-marquee-track:hover {
          animation-play-state: paused;
        }

        /* Gold glow on hover */
        .rel-card-inner:hover {
          box-shadow:
            0 20px 60px rgba(200,155,82,0.15),
            0 0 0 1px rgba(200,155,82,0.25) !important;
          border-color: rgba(212,175,55,0.3) !important;
        }

        /* Mobile: smaller cards */
        @media (max-width: 640px) {
          .rel-card-inner {
            width: clamp(240px, 72vw, 300px) !important;
          }
        }

        /* Reduced-motion: disable marquee, allow manual scroll */
        @media (prefers-reduced-motion: reduce) {
          .rel-marquee-track {
            animation: none !important;
            overflow-x: auto;
          }
          .rel-card {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
