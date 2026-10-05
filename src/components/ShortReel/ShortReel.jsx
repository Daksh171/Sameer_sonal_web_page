import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';
import { CTAButton } from '../ui/CTAButton';
import { FadeUp } from '../ui/Primitives';

export function ShortReel() {
  return (
    <section
      id="reel"
      style={{
        background: '#0a0a0a',
        padding: 'var(--section-py) var(--section-px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background radial accent */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(ellipse at 70% 50%, rgba(200,155,82,0.05) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div
        className="reel-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.6fr',
          gap: 'clamp(40px, 6vw, 96px)',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ── Left — text ── */}
        <div>
          <SectionHeader
            number="04"
            label="Short Reel"
            title="Moments That Matter"
            dark={true}
          />
          <FadeUp delay={0.2}>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              lineHeight: 1.75,
              color: 'var(--muted)',
              marginBottom: '40px',
              maxWidth: '360px',
            }}>
              A quick look at Sameer Somal's mission, impact, and the moments that define him.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <CTAButton href="#" variant="gold">
              Watch Reel →
            </CTAButton>
          </FadeUp>
        </div>

        {/* ── Right — single 16:9 horizontal reel frame ── */}
        <FadeUp delay={0.15}>
          <motion.div
            whileHover={{ scale: 1.015 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 9',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              border: '1px solid rgba(200,155,82,0.2)',
              background: '#0d0a06',
              cursor: 'pointer',
              boxShadow: '0 16px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,155,82,0.08)',
            }}
          >
            {/* Cinematic letterbox bars */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: '8%', background: 'rgba(0,0,0,0.55)', zIndex: 2,
            }} />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: '8%', background: 'rgba(0,0,0,0.55)', zIndex: 2,
            }} />

            {/* Dark gradient background */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #1a1208 0%, #0d0d0d 60%, #0a0805 100%)',
            }} />

            {/* Subtle gold vignette */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)',
            }} />

            {/* Center content */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              zIndex: 3,
              padding: '24px',
            }}>
              {/* Subtitle */}
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '10px',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(200,155,82,0.6)',
              }}>
                Purpose · People · Legacy
              </span>

              {/* Play button */}
              <motion.div
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'rgba(200,155,82,0.92)',
                  border: '2px solid rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 32px rgba(200,155,82,0.35)',
                }}
              >
                {/* Play triangle */}
                <div style={{
                  width: 0, height: 0,
                  borderTop: '13px solid transparent',
                  borderBottom: '13px solid transparent',
                  borderLeft: '22px solid #080808',
                  marginLeft: '4px',
                }} />
              </motion.div>

              {/* Title */}
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(18px, 2.5vw, 26px)',
                fontWeight: 600,
                color: 'var(--cream)',
                letterSpacing: '-0.01em',
                textAlign: 'center',
              }}>
                Sameer Somal
              </span>
            </div>

            {/* Bottom bar — title + duration */}
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              padding: '16px 20px 10px',
              background: 'linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 100%)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              zIndex: 4,
            }}>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '13px',
                fontStyle: 'italic',
                color: 'rgba(243,235,221,0.7)',
                letterSpacing: '0.04em',
              }}>
                Moments That Matter
              </span>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                color: 'var(--muted)',
                background: 'rgba(0,0,0,0.5)',
                padding: '3px 8px',
                borderRadius: '4px',
              }}>
                00:56
              </span>
            </div>

            {/* [Placeholder label] */}
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '16px',
              zIndex: 5,
              background: 'rgba(0,0,0,0.6)',
              padding: '3px 10px',
              borderRadius: '4px',
              border: '1px solid rgba(200,155,82,0.15)',
            }}>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '9px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(200,155,82,0.4)',
              }}>
                [Insert reel video asset]
              </span>
            </div>
          </motion.div>
        </FadeUp>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .reel-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
