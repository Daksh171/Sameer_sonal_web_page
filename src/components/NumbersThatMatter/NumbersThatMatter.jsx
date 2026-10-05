import { motion } from 'framer-motion';
import { timeline, metrics } from '../../data/media';
import { SectionHeader } from '../ui/SectionHeader';
import { FadeUp } from '../ui/Primitives';

/* ─── Single timeline card ─── */
function TimelineItem({ item, index }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.35 }}
      style={{
        width: '280px',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 12px',
        position: 'relative',
        zIndex: 2,
        cursor: 'default',
      }}
    >
      {/* Large circular photo */}
      <div style={{
        width: '230px',
        height: '230px',
        borderRadius: '50%',
        border: '4px solid rgba(200,155,82,0.65)',
        background: '#1a1208',
        overflow: 'hidden',
        marginBottom: '22px',
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
  return (
    <section
      id="journey"
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

      {/* Section header — padded */}
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
        /* Fade edges left/right */
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
        maskImage: 'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
      }}>
        {/* Horizontal connector line — vertically centred on 230px circles */}
        <div style={{
          position: 'absolute',
          top: 'calc(20px + 115px)',
          left: 0,
          right: 0,
          height: '1px',
          background: 'rgba(200,155,82,0.28)',
          zIndex: 0,
          pointerEvents: 'none',
        }} />

        {/* Scrolling track — two identical sets for seamless infinite loop */}
        <div
          className="marquee-track"
          style={{
            display: 'flex',
            gap: '24px',
            paddingTop: '20px',
            paddingBottom: '32px',
            width: 'max-content',
            animation: 'marqueeScroll 36s linear infinite',
          }}
        >
          {/* Set A */}
          {timeline.map((item, i) => (
            <TimelineItem key={`a-${item.id}`} item={item} index={i} />
          ))}
          {/* Set B — exact duplicate so the loop joins invisibly */}
          {timeline.map((item, i) => (
            <TimelineItem key={`b-${item.id}`} item={item} index={i} />
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

        /* Pause on hover so the user can read a card */
        .marquee-track:hover {
          animation-play-state: paused;
        }

        /* Respect reduced-motion: fallback to manual scroll */
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none !important;
            overflow-x: auto;
          }
        }
      `}</style>
    </section>
  );
}
