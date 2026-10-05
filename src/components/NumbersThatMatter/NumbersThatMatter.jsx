import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { timeline, metrics } from '../../data/media';
import { SectionHeader } from '../ui/SectionHeader';
import { FadeUp } from '../ui/Primitives';

/* ─── Single timeline card ─── */
function TimelineItem({ item, index, revealed }) {
  const delay = 0.25 + Math.min(index, 6) * 0.12; // sequential, capped so late items don't lag
  return (
    /* Outer: one-time reveal (opacity + scale only) */
    <div
      className="tl-item"
      style={{
        flexShrink: 0,
        position: 'relative',
        zIndex: 2,
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'scale(1)' : 'scale(0.9)',
        transition: `opacity 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}s, transform 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
      }}
    >
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.35 }}
      style={{
        width: '280px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 12px',
        cursor: 'default',
      }}
    >
      {/* Circle wrapper — scales when active; glow layer fades in (opacity only) */}
      <div className="tl-circle" style={{ position: 'relative', marginBottom: '22px' }}>
        <div className="tl-glow" aria-hidden="true" />
      {/* Large circular photo */}
      <div style={{
        position: 'relative',
        width: '230px',
        height: '230px',
        borderRadius: '50%',
        border: '4px solid rgba(200,155,82,0.65)',
        background: '#1a1208',
        overflow: 'hidden',
        flexShrink: 0,
        boxShadow: `
          0 0 0 8px rgba(200,155,82,0.08),
          0 8px 40px rgba(200,155,82,0.20),
          0 20px 60px rgba(0,0,0,0.12)
        `,
      }}>
        {item.image ? (
          <img
            src={item.image}
            alt={item.label}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
            }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--gold)' }} />
          </div>
        )}
      </div>
      </div>

      {/* Year */}
      <span style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '15px',
        fontStyle: 'italic',
        color: 'var(--gold)',
        letterSpacing: '0.08em',
        marginBottom: '8px',
        display: 'block',
      }}>
        {item.year}
      </span>

      {/* Label */}
      <h4 style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '13px',
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: '#2e2515',
        marginBottom: '8px',
        lineHeight: 1.3,
      }}>
        {item.label}
      </h4>

      {/* Gold rule */}
      <div style={{ width: '28px', height: '1px', background: 'rgba(200,155,82,0.5)', marginBottom: '10px' }} />

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '13px',
        lineHeight: 1.65,
        color: '#6a5f50',
        maxWidth: '200px',
      }}>
        {item.description}
      </p>
    </motion.div>
    </div>
  );
}

/* ─── Metric block ─── */
function MetricItem({ metric, index }) {
  return (
    <FadeUp delay={index * 0.08}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '8px',
        padding: '0 28px',
      }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 4.5vw, 60px)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--near-black)',
          lineHeight: 1,
        }}>
          {metric.value}
        </span>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#7a6f60',
        }}>
          {metric.label}
        </span>
        {metric.note && (
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '13px',
            fontStyle: 'italic',
            color: 'var(--gold)',
          }}>
            {metric.note}
          </span>
        )}
      </div>
    </FadeUp>
  );
}

/* ─── Main Section ─── */
export function NumbersThatMatter() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
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
      { threshold: 0.12, rootMargin: '-40px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  /*
   * Active milestone = the card closest to viewport centre.
   * - rAF loop runs ONLY while the section is on screen
   * - layout reads throttled to ~150ms
   * - toggles a CSS class directly → zero React re-renders
   */
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let rafId = null;
    let last = 0;
    let activeEl = null;

    const tick = (now) => {
      if (now - last > 150) {
        last = now;
        const centre = window.innerWidth / 2;
        let best = null;
        let bestDist = Infinity;
        for (const el of track.children) {
          const r = el.getBoundingClientRect();
          const d = Math.abs(r.left + r.width / 2 - centre);
          if (d < bestDist) { bestDist = d; best = el; }
        }
        if (best !== activeEl) {
          activeEl?.classList.remove('is-active');
          best?.classList.add('is-active');
          activeEl = best;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    const visObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && rafId === null) {
        rafId = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting && rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    });
    visObserver.observe(section);

    return () => {
      visObserver.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      style={{
        background: 'var(--cream)',
        padding: 'var(--section-py) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background circle */}
      <div style={{
        position: 'absolute',
        top: '-200px',
        right: '-200px',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        border: '1px solid rgba(200,155,82,0.07)',
        pointerEvents: 'none',
      }} />

      {/* Section header */}
      <div style={{ padding: '0 var(--section-px)' }}>
        <SectionHeader
          number="03"
          label="Education · Career · Achievements"
          title="A Journey"
          titleLight="of Growth"
          subtitle="From a global career in finance to founding an entrepreneur, expert witness, and community builder — Sameer Somal's journey is defined by continuous learning, bold action, and a commitment to making an impact."
          dark={false}
        />
      </div>

      {/* ── Infinite marquee timeline ── */}
      <div style={{
        position: 'relative',
        marginBottom: '80px',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
        maskImage: 'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
      }}>
        {/* ── Connector line — draws left→right on viewport entry (GPU scaleX only) ── */}
        <div style={{
          position: 'absolute',
          top: 'calc(20px + 115px)',
          left: 0,
          right: 0,
          height: '1px',
          background: 'rgba(200,155,82,0.28)',
          zIndex: 0,
          pointerEvents: 'none',
          transformOrigin: 'left center',
          transform: revealed ? 'scaleX(1)' : 'scaleX(0)',
          transition: revealed ? 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.1s' : 'none',
          willChange: 'transform',
        }} />

        {/* ── Scrolling track — fades in, then marquee starts after 1s delay ── */}
        <div
          ref={trackRef}
          className="marquee-track"
          style={{
            display: 'flex',
            gap: '24px',
            paddingTop: '20px',
            paddingBottom: '32px',
            width: 'max-content',
            /* Marquee starts once the staggered reveal has landed */
            animation: revealed ? 'marqueeScroll 36s linear 1.4s infinite' : 'none',
          }}
        >
          {/* Set A */}
          {timeline.map((item, i) => (
            <TimelineItem key={`a-${item.id}`} item={item} index={i} revealed={revealed} />
          ))}
          {/* Set B — identical duplicate for seamless loop */}
          {timeline.map((item, i) => (
            <TimelineItem key={`b-${item.id}`} item={item} index={timeline.length + i} revealed={revealed} />
          ))}
        </div>
      </div>

      {/* Numbers That Matter label */}
      <FadeUp delay={0.2}>
        <div style={{ textAlign: 'center', marginBottom: '48px', padding: '0 var(--section-px)' }}>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '9px',
            fontWeight: 600,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '8px',
          }}>
            Numbers That Matter
          </p>
          <div style={{ width: '40px', height: '1px', background: 'var(--gold)', margin: '0 auto' }} />
        </div>
      </FadeUp>

      {/* Metrics row */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '0',
        padding: '0 var(--section-px)',
      }}>
        {metrics.map((metric, i) => (
          <div key={metric.id} style={{ display: 'flex', alignItems: 'stretch' }}>
            <MetricItem metric={metric} index={i} />
            {i < metrics.length - 1 && (
              <div style={{
                width: '1px',
                background: 'rgba(200,155,82,0.2)',
                margin: '8px 0',
                alignSelf: 'stretch',
              }} />
            )}
          </div>
        ))}
      </div>

      {/* Awards / credentials strip */}
      <FadeUp delay={0.4}>
        <div style={{
          marginTop: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          flexWrap: 'wrap',
          paddingTop: '32px',
          paddingLeft: 'var(--section-px)',
          paddingRight: 'var(--section-px)',
          borderTop: '1px solid rgba(200,155,82,0.15)',
        }}>
          {['CFA', 'CFP', 'CAIA'].map((cred) => (
            <div key={cred} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)' }} />
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                color: '#4a3f2a',
              }}>
                {cred}
              </span>
            </div>
          ))}
          <div style={{ width: '1px', height: '24px', background: 'rgba(200,155,82,0.2)' }} />
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            color: '#7a6f60',
          }}>
            Inspirational Leader Award
          </span>
        </div>
      </FadeUp>

      <style>{`
        /* Infinite left-to-right marquee */
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Pause on hover so user can read cards */
        .marquee-track:hover {
          animation-play-state: paused;
        }

        /* Active milestone — subtle scale + soft gold glow (transform/opacity only) */
        .tl-circle {
          transform: scale(1);
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .tl-glow {
          position: absolute;
          inset: -14px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(200,155,82,0.32) 0%, rgba(200,155,82,0.10) 55%, transparent 72%);
          opacity: 0;
          transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }
        .tl-item.is-active .tl-circle { transform: scale(1.06); }
        .tl-item.is-active .tl-glow   { opacity: 1; }

        /* Mobile: lighter emphasis */
        @media (max-width: 768px) {
          .tl-item.is-active .tl-circle { transform: scale(1.03); }
        }

        /* Reduced-motion: disable marquee, allow manual scroll */
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none !important;
            overflow-x: auto;
          }
          .tl-item { transition: none !important; }
        }
      `}</style>
    </section>
  );
}
