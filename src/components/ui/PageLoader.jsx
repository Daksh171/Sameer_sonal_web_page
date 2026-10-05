/**
 * PageLoader — cinematic documentary opening sequence
 *
 * Performance contract:
 *   - Animates only `opacity` and `transform` (GPU only)
 *   - Self-destroys from DOM after completion (no persistent cost)
 *   - No scroll handlers, no resize handlers, no canvas
 */
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const taglineWords = ['People', '·', 'Purpose', '·', 'Legacy'];

export function PageLoader({ onComplete }) {
  /**
   * phases:
   *   'enter'   — logo fades in
   *   'tagline' — tagline words stagger in
   *   'exit'    — both lift and fade out
   *   'done'    — component removed from DOM
   */
  const [phase, setPhase] = useState('enter');

  useEffect(() => {
    // Simplified, faster intro on mobile / reduced-motion
    const fast =
      window.innerWidth < 768 ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = fast
      ? { tagline: 350, exit: 850, done: 1250 }
      : { tagline: 650, exit: 1350, done: 1900 };

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      setPhase('done');
      onComplete?.();
    };

    const timers = [
      setTimeout(() => setPhase('tagline'), t.tagline),
      setTimeout(() => setPhase('exit'), t.exit),
      setTimeout(finish, t.done),
    ];

    // User can skip naturally by scrolling, swiping, or pressing a key
    const skip = () => {
      timers.forEach(clearTimeout);
      setPhase('exit');
      timers.push(setTimeout(finish, 450));
      removeListeners();
    };
    const opts = { passive: true, once: true };
    const removeListeners = () => {
      window.removeEventListener('wheel', skip);
      window.removeEventListener('touchmove', skip);
      window.removeEventListener('keydown', skip);
    };
    window.addEventListener('wheel', skip, opts);
    window.addEventListener('touchmove', skip, opts);
    window.addEventListener('keydown', skip, opts);

    return () => {
      timers.forEach(clearTimeout);
      removeListeners();
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  const isExiting = phase === 'exit';

  return (
    <motion.div
      key="page-loader"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#080808',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '28px',
        pointerEvents: 'none',
      }}
    >
      {/* ── Logo mark ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{
          opacity: isExiting ? 0 : 1,
          y: isExiting ? -28 : 0,
        }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}
      >
        {/* Gold monogram circle */}
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          border: '1px solid rgba(200,155,82,0.55)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '22px',
            fontWeight: 600,
            color: '#C89B52',
            letterSpacing: '0.04em',
          }}>
            SS
          </span>
        </div>

        {/* Name */}
        <span style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: '22px',
          fontWeight: 400,
          color: '#F3EBDD',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
        }}>
          Sameer Somal
        </span>

        {/* Gold rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isExiting ? 0 : 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          style={{
            width: '48px',
            height: '1px',
            background: 'rgba(200,155,82,0.5)',
            transformOrigin: 'center',
          }}
        />
      </motion.div>

      {/* ── Tagline — staggered word reveal ── */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', height: '20px' }}>
        {taglineWords.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: phase === 'enter' ? 0 : isExiting ? 0 : 1,
              y: phase === 'enter' ? 8 : isExiting ? -10 : 0,
            }}
            transition={{
              duration: 0.4,
              delay: phase === 'enter' ? 0 : i * 0.07,
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: word === '·' ? 'rgba(200,155,82,0.5)' : 'rgba(184,176,161,0.7)',
            }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
