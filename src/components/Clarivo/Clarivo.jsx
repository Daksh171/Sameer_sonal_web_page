import { motion } from 'framer-motion';
import { clarivo } from '../../data/media';
import { SectionHeader } from '../ui/SectionHeader';
import { CTAButton } from '../ui/CTAButton';
import { FadeUp } from '../ui/Primitives';

export function Clarivo() {
  return (
    <section
      id="clarivo"
      style={{
        background: 'var(--warm-cream)',
        padding: 'var(--section-py) var(--section-px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle decorative blob */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '-100px',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'rgba(200,155,82,0.06)',
        pointerEvents: 'none',
        filter: 'blur(60px)',
      }} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(40px, 6vw, 96px)',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }}
      className="clarivo-grid"
      >
        {/* Left content */}
        <div>
          {/* Section label */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '16px',
          }}>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '9px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#7a6f60',
            }}>
              05
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
              Hire Our Creative Agency
            </span>
          </div>

          <SectionHeader
            title="Bring Your Story to Life with Clarivo"
            dark={false}
          />

          <FadeUp delay={0.15}>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              lineHeight: 1.75,
              color: '#7a6f60',
              marginBottom: '32px',
              maxWidth: '460px',
            }}>
              {clarivo.description}
            </p>
          </FadeUp>

          {/* Services list */}
          <FadeUp delay={0.2}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginBottom: '40px',
            }}>
              {clarivo.services.map((service, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--gold)',
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    color: '#4a3f2a',
                    fontWeight: 500,
                  }}>
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* CTAs */}
          <FadeUp delay={0.3}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <CTAButton href={clarivo.website} variant="cream">
                Work With Clarivo →
              </CTAButton>
              <CTAButton href={clarivo.website} variant="dark">
                Get a Free Consultation →
              </CTAButton>
            </div>
          </FadeUp>

          {/* Trust strip */}
          <FadeUp delay={0.4}>
            <div style={{
              marginTop: '40px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(200,155,82,0.2)',
              display: 'flex',
              gap: '24px',
              flexWrap: 'wrap',
            }}>
              {clarivo.trustPoints.map((point, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: 'var(--near-black)',
                  }}>
                    {point.value}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '10px',
                    letterSpacing: '0.08em',
                    color: '#7a6f60',
                    textTransform: 'uppercase',
                  }}>
                    {point.label}
                  </span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* Right — Clarivo visual */}
        <FadeUp delay={0.2}>
          <div style={{ position: 'relative' }}>
            {/* Logo badge */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '0',
              background: '#fff',
              borderRadius: 'var(--radius-md)',
              padding: '16px 24px',
              border: '1px solid rgba(200,155,82,0.2)',
              zIndex: 10,
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '4px',
            }}>
              <img
                src={clarivo.logo}
                alt="Clarivo logo"
                style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span style={{ display: 'none', fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--near-black)' }}>
                CLARIVO
              </span>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '9px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}>
                Creative Partner for Visionaries
              </span>
            </div>

            {/* Main visual — editing workspace placeholder */}
            <div style={{
              aspectRatio: '4/3',
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, #1a1208 0%, #0d0d0d 100%)',
              border: '1px solid rgba(200,155,82,0.15)',
              overflow: 'hidden',
              position: 'relative',
              marginTop: '20px',
            }}>
              {/* Simulated editing workspace UI */}
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                padding: '0',
              }}>
                {/* Top bar */}
                <div style={{
                  height: '36px',
                  background: 'rgba(0,0,0,0.5)',
                  borderBottom: '1px solid rgba(200,155,82,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 16px',
                  gap: '6px',
                }}>
                  {['#ff5f57', '#ffbd2e', '#28c840'].map((c) => (
                    <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />
                  ))}
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '10px',
                    color: 'rgba(248,246,241,0.4)',
                    marginLeft: '12px',
                    letterSpacing: '0.08em',
                  }}>
                    Sameer_Somal_Story.prproj
                  </span>
                </div>

                {/* Workspace area */}
                <div style={{
                  flex: 1,
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr',
                  gap: '0',
                }}>
                  {/* Left panel */}
                  <div style={{
                    borderRight: '1px solid rgba(200,155,82,0.08)',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}>
                    {['Intro', 'Interview', 'B-Roll', 'Music', 'Export'].map((clip) => (
                      <div key={clip} style={{
                        height: '28px',
                        background: 'rgba(200,155,82,0.08)',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 8px',
                      }}>
                        <span style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '9px',
                          color: 'rgba(200,155,82,0.5)',
                          letterSpacing: '0.06em',
                        }}>
                          {clip}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Preview area */}
                  <div style={{
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                  }}>
                    <div style={{
                      width: '100%',
                      aspectRatio: '16/9',
                      background: 'rgba(200,155,82,0.06)',
                      borderRadius: '6px',
                      border: '1px solid rgba(200,155,82,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '12px',
                        fontStyle: 'italic',
                        color: 'rgba(200,155,82,0.35)',
                      }}>
                        Turning Stories Into Impact
                      </span>
                    </div>
                    {/* Timeline scrubber */}
                    <div style={{
                      width: '100%',
                      height: '24px',
                      background: 'rgba(0,0,0,0.4)',
                      borderRadius: '4px',
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                      {[...Array(8)].map((_, i) => (
                        <div key={i} style={{
                          position: 'absolute',
                          top: '4px',
                          left: `${i * 13 + 2}%`,
                          width: '10%',
                          height: '16px',
                          background: `rgba(200,155,82,${0.1 + i * 0.06})`,
                          borderRadius: '2px',
                        }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                background: 'rgba(0,0,0,0.7)',
                padding: '4px 10px',
                borderRadius: '4px',
                border: '1px solid rgba(200,155,82,0.2)',
              }}>
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '9px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(200,155,82,0.6)',
                }}>
                  [Workspace Image Placeholder]
                </span>
              </div>
            </div>

            {/* Phone mockup beside workspace */}
            <div style={{
              position: 'absolute',
              bottom: '-24px',
              left: '-20px',
              width: '80px',
              aspectRatio: '9/19',
              background: '#111',
              borderRadius: '12px',
              border: '2px solid rgba(200,155,82,0.3)',
              overflow: 'hidden',
              boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
            }}>
              <div style={{
                height: '8px',
                background: 'rgba(200,155,82,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{ width: '20px', height: '3px', background: '#222', borderRadius: '2px' }} />
              </div>
              <div style={{
                flex: 1,
                height: 'calc(100% - 8px)',
                background: 'linear-gradient(165deg, #1a1208 0%, #0d0a06 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '8px',
                  fontStyle: 'italic',
                  color: 'var(--gold)',
                  textAlign: 'center',
                  lineHeight: 1.3,
                }}>
                  Ideas Into Impact
                </span>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .clarivo-grid {
            grid-template-columns: 1fr !important;
          }
          .clarivo-grid > div:last-child {
            margin-top: 40px;
          }
        }
      `}</style>
    </section>
  );
}
