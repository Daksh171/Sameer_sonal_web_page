import { motion } from 'framer-motion';
import { FadeUp } from '../ui/Primitives';
import { CTAButton } from '../ui/CTAButton';

export function Legacy() {
  return (
    <section
      id="legacy"
      style={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--black)',
      }}
    >
      {/* Background — Abraham Lincoln image with cinematic overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
      }}>
        <img
          src="/images/Abraham Lincoln Image.jpeg"
          alt="Abraham Lincoln — Athens, Illinois legacy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'brightness(0.28) sepia(0.3) contrast(1.1)',
          }}
        />
        {/* Dark cinematic overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(105deg, rgba(8,8,8,0.88) 0%, rgba(8,8,8,0.55) 50%, rgba(8,8,8,0.30) 100%)',
        }} />
      </div>

      {/* Warm gold glow accent */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 80% 50%, rgba(200,155,82,0.07) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Subtle city silhouette — placeholder for real Athens image */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
        background: 'linear-gradient(to top, rgba(200,155,82,0.03) 0%, transparent 100%)',
        borderTop: '1px solid rgba(200,155,82,0.06)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: 'var(--section-py) var(--section-px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
      }}>
        {/* Section marker */}
        <FadeUp>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px',
          }}>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '9px',
              letterSpacing: '0.15em',
              color: 'var(--muted)',
            }}>
              06
            </span>
            <span style={{ width: '24px', height: '1px', background: 'var(--gold)', display: 'block' }} />
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
            }}>
              The Broader Picture
            </span>
          </div>
        </FadeUp>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(40px, 6vw, 96px)',
          alignItems: 'center',
        }}
          className="legacy-grid"
        >
          {/* Left */}
          <div>
            <FadeUp delay={0.1}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 5vw, 68px)',
                fontWeight: 700,
                lineHeight: 1.0,
                letterSpacing: '-0.02em',
                color: 'var(--cream)',
                marginBottom: '28px',
              }}>
                Building a Legacy<br />
                <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>for Future</span><br />
                Generations
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '15px',
                lineHeight: 1.75,
                color: 'var(--muted)',
                marginBottom: '40px',
                maxWidth: '440px',
              }}>
                Beyond business, Sameer Somal is deeply rooted in community, history, and purpose. His commitment extends to Athens, Illinois — with a special focus on Abraham Lincoln and the legacy he left for generations to come.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <CTAButton href="#" variant="outline">
                Explore the Athens Story →
              </CTAButton>
            </FadeUp>
          </div>

          {/* Right — Quote & visual element */}
          <FadeUp delay={0.2}>
            <div style={{
              padding: '40px',
              background: 'rgba(200,155,82,0.04)',
              border: '1px solid rgba(200,155,82,0.15)',
              borderRadius: 'var(--radius-lg)',
              position: 'relative',
            }}>
              {/* Large quote mark */}
              <span style={{
                position: 'absolute',
                top: '-16px',
                left: '32px',
                fontFamily: 'var(--font-display)',
                fontSize: '80px',
                lineHeight: 1,
                color: 'rgba(200,155,82,0.18)',
              }}>
                "
              </span>

              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(20px, 2.5vw, 28px)',
                fontStyle: 'italic',
                lineHeight: 1.5,
                color: 'var(--cream)',
                fontWeight: 400,
                marginBottom: '24px',
                position: 'relative',
                zIndex: 1,
              }}>
                Some people build companies.
                Others build communities.
                The rarest build legacies.
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}>
                <div style={{
                  width: '32px',
                  height: '1px',
                  background: 'var(--gold)',
                }} />
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                }}>
                  Sameer Somal
                </span>
              </div>

              {/* Athens, Illinois image */}
              <div style={{
                marginTop: '32px',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                border: '1px solid rgba(200,155,82,0.2)',
                aspectRatio: '16/7',
              }}>
                <img
                  src="/images/abraham_licoln_2.jpeg"
                  alt="Athens, Illinois"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    filter: 'brightness(0.8) sepia(0.15)',
                  }}
                />
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .legacy-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
