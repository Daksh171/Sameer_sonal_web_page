import { motion } from 'framer-motion';

// Placeholder shown when a real image asset is not available
export function ImagePlaceholder({ label, aspectRatio = '3/4', style = {}, dark = false }) {
  return (
    <div
      style={{
        aspectRatio,
        background: dark ? '#1a1a1a' : '#2a2418',
        border: '1px dashed rgba(200,155,82,0.3)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        color: 'var(--muted)',
        fontFamily: 'var(--font-sans)',
        fontSize: '11px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        userSelect: 'none',
        ...style,
      }}
    >
      <span style={{ fontSize: '24px', opacity: 0.3 }}>⊡</span>
      <span style={{ opacity: 0.5 }}>{label}</span>
    </div>
  );
}

// Animated fade-up wrapper
export function FadeUp({ children, delay = 0, style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// Thin gold divider line
export function GoldLine({ style = {} }) {
  return (
    <div
      style={{
        height: '1px',
        background: 'rgba(200, 155, 82, 0.25)',
        ...style,
      }}
    />
  );
}
