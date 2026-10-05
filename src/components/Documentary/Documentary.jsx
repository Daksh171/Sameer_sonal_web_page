import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';
import { CTAButton } from '../ui/CTAButton';
import { FadeUp } from '../ui/Primitives';
import { documentaryVideo } from '../../data/videos';

function PlayButton({ size = 72, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Play documentary"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'rgba(200,155,82,0.92)',
        border: '2px solid rgba(255,255,255,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        backdropFilter: 'blur(8px)',
        flexShrink: 0,
        boxShadow: '0 0 32px rgba(200,155,82,0.35)',
        padding: 0,
      }}
    >
      {/* Play triangle */}
      <div style={{
        width: 0,
        height: 0,
        borderTop: `${size * 0.19}px solid transparent`,
        borderBottom: `${size * 0.19}px solid transparent`,
        borderLeft: `${size * 0.34}px solid #080808`,
        marginLeft: size * 0.06,
      }} />
    </motion.button>
  );
}

export function Documentary() {
  const videoRef = useRef(null);
  const frameRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const hasVideo = Boolean(documentaryVideo?.src);

  // Play inside fixed frame
  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    setStarted(true);
    v.play().catch(() => {});
  };

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) play();
    else v.pause();
  };

  // "Watch Documentary" CTA — scroll the frame into view and start playback in place
  const handleCta = (e) => {
    e.preventDefault();
    frameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (hasVideo) play();
  };

  // Auto-pause when the frame scrolls out of view (saves bandwidth/CPU)
  useEffect(() => {
    const el = frameRef.current;
    if (!el || !hasVideo) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasVideo]);

  const showOverlay = !playing;

  return (
    <section
      id="documentary"
      style={{
        background: 'var(--near-black)',
        padding: 'var(--section-py) var(--section-px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(200,155,82,0.04) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(40px, 6vw, 96px)',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }}
      className="documentary-grid"
      >
        {/* Left — Text */}
        <div>
          <SectionHeader
            number="02"
            label="Featured Documentary"
            title="A Story of People, Purpose and Legacy"
            dark={true}
          />

          <FadeUp delay={0.2}>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              lineHeight: 1.75,
              color: 'var(--muted)',
              marginBottom: '40px',
              maxWidth: '440px',
            }}>
              An in-depth documentary exploring Sameer Somal's journey — from finance to entrepreneurship, from the courtroom to community building, and his deep passion for Abraham Lincoln and Athens, Illinois.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{
                width: '1px', height: '40px',
                background: 'rgba(200,155,82,0.4)',
              }} />
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '18px',
                fontStyle: 'italic',
                color: 'var(--cream)',
                lineHeight: 1.5,
              }}>
                More than business.<br />
                <span style={{ color: 'var(--gold)', fontStyle: 'normal', fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  A broader purpose.
                </span>
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.4}>
            <CTAButton href="#documentary" variant="gold" onClick={handleCta}>
              Watch Documentary →
            </CTAButton>
          </FadeUp>
        </div>

        {/* Right — Video card */}
        <FadeUp delay={0.25}>
          <motion.div
            ref={frameRef}
            onClick={hasVideo && !playing ? play : undefined}
            whileHover={playing ? undefined : { scale: 1.015 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              border: '1px solid rgba(200,155,82,0.2)',
              aspectRatio: '16/9',
              background: '#0a0a0a',
              cursor: playing ? 'default' : 'pointer',
              boxShadow: '0 16px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,155,82,0.08)',
            }}
          >
            {/* Cloudinary video — contained in the fixed frame, fullscreen & PiP disabled */}
            {hasVideo && (
              <video
                ref={videoRef}
                src={documentaryVideo.src}
                poster={documentaryVideo.poster || undefined}
                preload="metadata"
                playsInline
                controls={playing}
                disablePictureInPicture
                controlsList="nofullscreen nodownload noremoteplayback"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => setPlaying(false)}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 1,
                  background: '#000',
                }}
              />
            )}

            {/* Overlay — hidden while video plays */}
            <div style={{
              position: 'absolute',
              inset: 0,
              zIndex: 2,
              opacity: showOverlay ? 1 : 0,
              transition: 'opacity 0.4s ease',
              pointerEvents: showOverlay ? 'auto' : 'none',
            }}>
              {/* Fallback background if no poster */}
              {!(started || documentaryVideo?.poster) && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, #1a1208 0%, #0d0d0d 100%)',
                }} />
              )}

              {/* Poster image fallback overlay for aesthetic contrast */}
              {documentaryVideo?.poster && !started && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${documentaryVideo.poster})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }} />
              )}

              {/* Dark shading scrim over poster */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(8,8,8,0.45) 0%, rgba(8,8,8,0.65) 100%)',
              }} />

              {/* Cinematic letterbox bars */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: '10%',
                background: 'rgba(0,0,0,0.6)',
                zIndex: 2,
              }} />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: '10%',
                background: 'rgba(0,0,0,0.6)',
                zIndex: 2,
              }} />

              {/* Center content */}
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                textAlign: 'center',
                zIndex: 3,
                padding: '20px',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(18px, 3vw, 28px)',
                  fontWeight: 700,
                  color: 'var(--cream)',
                  letterSpacing: '-0.01em',
                  marginBottom: '2px',
                  textShadow: '0 2px 12px rgba(0,0,0,0.7)',
                }}>
                  Sameer Somal
                </div>
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(12px, 1.5vw, 15px)',
                  fontStyle: 'italic',
                  color: 'var(--gold)',
                  letterSpacing: '0.06em',
                  marginBottom: '16px',
                  textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                }}>
                  A Story of People, Purpose & Legacy
                </div>

                {/* Centered play button */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <PlayButton size={72} onClick={play} />
                </div>

                {!hasVideo && (
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '10px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(200,155,82,0.4)',
                    marginTop: '20px',
                  }}>
                    [Documentary Placeholder — Insert video asset]
                  </p>
                )}
              </div>

              {/* Video title bar at bottom */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '16px 20px',
                background: 'linear-gradient(to top, rgba(8,8,8,0.9), transparent)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                zIndex: 4,
              }}>
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  color: 'var(--cream)',
                  fontWeight: 500,
                }}>
                  A Story of People, Purpose & Legacy
                </span>
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  color: 'var(--muted)',
                  background: 'rgba(0,0,0,0.6)',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}>
                  {documentaryVideo.duration || '18:42'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Signature caption */}
          <div style={{
            marginTop: '16px',
            textAlign: 'right',
          }}>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '18px',
              fontStyle: 'italic',
              color: 'rgba(200,155,82,0.4)',
              letterSpacing: '0.05em',
            }}>
              Sameer Somal
            </span>
          </div>
        </FadeUp>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .documentary-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
