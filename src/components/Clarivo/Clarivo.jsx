import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FadeUp } from '../ui/Primitives';

/* ── Clean SVG icons for services ── */
const SvgIcons = {
  documentary: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A15A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2.18" />
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  ),
  shortForm: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A15A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  editing: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A15A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  ),
  strategy: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A15A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" />
    </svg>
  ),
  distribution: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A15A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  archive: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A15A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
};

/* ── Service data ── */
const services = [
  { icon: SvgIcons.documentary, title: 'Documentary Production', desc: 'In-depth films on your journey, leadership and legacy.' },
  { icon: SvgIcons.shortForm, title: 'Short-Form Content', desc: 'Reels, shorts and clips for wider reach.' },
  { icon: SvgIcons.editing, title: 'Creative Editing', desc: 'Cinematic editing with motion graphics and storytelling.' },
  { icon: SvgIcons.strategy, title: 'Content Strategy', desc: 'A long-term roadmap to grow your personal brand.' },
  { icon: SvgIcons.distribution, title: 'Multi-Platform Distribution', desc: 'YouTube, LinkedIn, Instagram and more.' },
  { icon: SvgIcons.archive, title: 'Digital Legacy Archive', desc: 'A timeless library of your most important stories.' },
];

/* ── Stat data ── */
const stats = [
  { end: 15, suffix: '+', label: 'BRANDS\nWORKED WITH' },
  { end: 100, suffix: '+', label: 'PROJECTS\nDELIVERED' },
  { end: 8, suffix: 'M+', label: 'CONTENT VIEWS\nGENERATED' },
  { end: 1.2, suffix: 'K+', label: 'VIDEOS\nEDITED', decimals: 1 },
];

/* ── Floating images ── */
const floatingImages = [
  { src: '/images/clarivo/lincoln-statue.jpg', alt: 'Abraham Lincoln statue', w: 160, h: 200, top: '0%', right: '0%', delay: 0 },
  { src: '/images/clarivo/historical-architecture.jpg', alt: 'Historical architecture', w: 140, h: 180, top: '32%', right: '8%', delay: 2 },
  { src: '/images/clarivo/editing-workspace.jpg', alt: 'Professional editing workspace', w: 170, h: 120, top: '68%', right: '2%', delay: 4 },
];

/* ── Count-up hook ── */
function useCountUp(end, duration = 2000, decimals = 0) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now) => {
            const t = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(parseFloat((eased * end).toFixed(decimals)));
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration, decimals]);

  return { ref, value };
}

/* ── Stat component (light theme) ── */
function StatItem({ end, suffix, label, decimals = 0, delay }) {
  const { ref, value } = useCountUp(end, 2000, decimals);
  return (
    <FadeUp delay={delay}>
      <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 4vw, 52px)',
          fontWeight: 800,
          color: 'var(--near-black)',
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}>
          {value}{suffix}
        </span>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '9px',
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#7a6f60',
          whiteSpace: 'pre-line',
          lineHeight: 1.4,
        }}>
          {label}
        </span>
      </div>
    </FadeUp>
  );
}

/* ── Service card (dark panel) ── */
function ServiceCard({ icon, title, desc, delay }) {
  return (
    <FadeUp delay={delay}>
      <motion.div
        whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(201,161,90,0.12)' }}
        transition={{ duration: 0.3 }}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '14px',
          padding: '16px 14px',
          background: 'rgba(201,161,90,0.04)',
          border: '1px solid rgba(201,161,90,0.12)',
          borderRadius: '12px',
          cursor: 'default',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: 'rgba(201,161,90,0.08)',
          border: '1px solid rgba(201,161,90,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          {icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '4px',
          }}>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              fontWeight: 600,
              color: '#F5F1E8',
              letterSpacing: '0.01em',
            }}>
              {title}
            </span>
            <span style={{ color: 'rgba(201,161,90,0.4)', fontSize: '14px' }}>›</span>
          </div>
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            color: '#B9B0A3',
            lineHeight: 1.5,
          }}>
            {desc}
          </span>
        </div>
      </motion.div>
    </FadeUp>
  );
}

/* ── Floating image ── */
function FloatingImage({ src, alt, w, h, top, right, delay }) {
  return (
    <motion.div
      animate={{ y: [0, -6, 0, 4, 0] }}
      transition={{ duration: 8, repeat: Infinity, delay, ease: 'easeInOut' }}
      whileHover={{ scale: 1.03 }}
      style={{
        position: 'absolute',
        top, right,
        width: `${w}px`,
        height: `${h}px`,
        borderRadius: '14px',
        overflow: 'hidden',
        border: '1px solid rgba(201,161,90,0.25)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,161,90,0.06)',
        zIndex: 2,
      }}
    >
      <img src={src} alt={alt} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(201,161,90,0.08) 0%, transparent 50%, rgba(0,0,0,0.3) 100%)',
        pointerEvents: 'none',
      }} />
    </motion.div>
  );
}

/* ════════════════════════════════════════════════
   MAIN CLARIVO COMPONENT
   ════════════════════════════════════════════════ */
export function Clarivo() {
  return (
    <section
      id="clarivo"
      style={{
        background: 'var(--cream)',
        padding: 'clamp(80px, 10vw, 140px) var(--section-px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background circle — matches journey section */}
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

      {/* ═══════ Two Column Layout ═══════ */}
      <div className="clarivo-layout" style={{
        display: 'grid',
        gridTemplateColumns: '45% 55%',
        gap: 'clamp(40px, 5vw, 80px)',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* ── LEFT COLUMN ── */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>

          {/* Top label */}
          <FadeUp delay={0}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px',
            }}>
              <div style={{ width: '28px', height: '2px', background: 'rgba(201,161,90,0.5)' }} />
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#7a6f60',
              }}>
                CLARIVO × SAMEER SOMAL
              </span>
            </div>
          </FadeUp>

          {/* Luxury heading */}
          <FadeUp delay={0.1}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(42px, 5.5vw, 72px)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              color: 'var(--near-black)',
              margin: '0 0 8px 0',
            }}>
              Clarivo{' '}
              <span style={{ color: '#C9A15A' }}>×</span>
            </h2>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(42px, 5.5vw, 72px)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              color: 'var(--near-black)',
              margin: '0 0 28px 0',
            }}>
              Sameer Somal
            </h2>
          </FadeUp>

          {/* Description */}
          <FadeUp delay={0.15}>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              lineHeight: 1.7,
              color: '#7a6f60',
              maxWidth: '440px',
              marginBottom: '48px',
            }}>
              Turning a remarkable journey into impactful stories
              that inspire, educate and create a lasting legacy.
            </p>
          </FadeUp>

          {/* ── Statistics row ── */}
          <div
            className="clarivo-stats-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px',
              marginBottom: '40px',
              paddingBottom: '32px',
              borderBottom: '1px solid rgba(200,155,82,0.18)',
            }}
          >
            {stats.map((s, i) => (
              <StatItem key={s.label} {...s} delay={0.2 + i * 0.08} />
            ))}
          </div>

          {/* ── Growth Partner Card (compact) ── */}
          <FadeUp delay={0.4}>
            <div style={{
              background: 'rgba(200,155,82,0.04)',
              border: '1px solid rgba(200,155,82,0.18)',
              borderRadius: '12px',
              padding: '16px 18px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
            }}>
              {/* Small chart icon */}
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '7px',
                background: 'rgba(200,155,82,0.1)',
                border: '1px solid rgba(200,155,82,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A15A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--near-black)',
                  margin: '0 0 4px',
                }}>
                  A Growing Creative Partner
                </h4>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  lineHeight: 1.55,
                  color: '#7a6f60',
                  margin: 0,
                }}>
                  Clarivo is a young and passionate storytelling studio, committed to helping visionaries turn their experiences into timeless stories that reach millions.
                </p>
              </div>
              {/* Handwritten quote */}
              <span style={{
                fontFamily: "'Caveat', 'Segoe Script', cursive",
                fontSize: '16px',
                color: '#C9A15A',
                fontStyle: 'italic',
                lineHeight: 1.2,
                textAlign: 'right',
                flexShrink: 0,
                whiteSpace: 'nowrap',
              }}>
                New ideas.<br />
                Bolder stories.<br />
                Lasting impact.
              </span>
            </div>
          </FadeUp>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div style={{ position: 'relative' }}>

          {/* ── Services panel (stays dark for contrast) ── */}
          <FadeUp delay={0.15}>
            <div style={{
              background: 'var(--near-black)',
              border: '1px solid rgba(200,155,82,0.15)',
              borderRadius: '20px',
              padding: 'clamp(28px, 3vw, 40px)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Panel header */}
              <div style={{ marginBottom: '28px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px',
                }}>
                  <div style={{ width: '20px', height: '2px', background: '#C9A15A' }} />
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '9px',
                    fontWeight: 600,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: '#C9A15A',
                  }}>
                    WHAT WE PROVIDE
                  </span>
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(24px, 3vw, 34px)',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: '#F5F1E8',
                  margin: '0 0 10px',
                }}>
                  A Complete Content Partner<br />
                  for{' '}
                  <span style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    color: '#E4C27A',
                  }}>
                    Your Story
                  </span>
                </h3>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  lineHeight: 1.6,
                  color: '#B9B0A3',
                  margin: 0,
                  maxWidth: '420px',
                }}>
                  From strategy to storytelling — we create content that
                  preserves your journey, expands your reach, and builds a legacy.
                </p>
              </div>

              {/* Services grid */}
              <div
                className="clarivo-services-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                }}
              >
                {services.map((s, i) => (
                  <ServiceCard key={s.title} {...s} delay={0.2 + i * 0.08} />
                ))}
              </div>

              {/* Floating images */}
              <div
                className="clarivo-floating-images"
                style={{
                  position: 'absolute',
                  top: '24px',
                  right: '-180px',
                  width: '200px',
                  height: '100%',
                  pointerEvents: 'none',
                }}
              >
                {floatingImages.map((img) => (
                  <FloatingImage key={img.src} {...img} />
                ))}
              </div>
            </div>
          </FadeUp>

          {/* ── Bottom statement row ── */}
          <FadeUp delay={0.5}>
            <div
              className="clarivo-bottom-row"
              style={{
                marginTop: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                padding: '18px 22px',
                background: 'rgba(200,155,82,0.05)',
                border: '1px solid rgba(200,155,82,0.15)',
                borderRadius: '14px',
              }}
            >
              <div style={{
                width: '8px', height: '8px',
                borderRadius: '50%', background: '#C9A15A', flexShrink: 0,
              }} />
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                lineHeight: 1.6,
                color: '#7a6f60',
                margin: 0, flex: 1,
              }}>
                <strong style={{ color: 'var(--near-black)' }}>Clarivo is more than a video editing agency.</strong>{' '}
                We are a growing creative partner, committed to helping extraordinary
                individuals turn their experiences into stories that live forever.
              </p>

              {/* Clarivo logo / name */}
              <div
                className="clarivo-logo-badge"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  flexShrink: 0, gap: '2px',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '22px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: 'var(--near-black)',
                }}>
                  CLARIVO
                </span>
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '8px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(200,155,82,0.6)',
                }}>
                  STORYTELLING STUDIO
                </span>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ═══════ Responsive styles ═══════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&display=swap');

        @media (max-width: 1024px) {
          .clarivo-layout {
            grid-template-columns: 1fr !important;
          }
          .clarivo-floating-images {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          .clarivo-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }
          .clarivo-services-grid {
            grid-template-columns: 1fr !important;
          }
          .clarivo-bottom-row {
            flex-direction: column !important;
            text-align: center !important;
          }
          .clarivo-logo-badge {
            align-items: center !important;
          }
        }
      `}</style>
    </section>
  );
}
