import { motion } from 'framer-motion';

export function CTAButton({ children, variant = 'gold', href = '#', onClick, style = {} }) {
  const styles = {
    gold: {
      background: 'var(--gold)',
      color: '#080808',
      border: 'none',
      padding: '13px 28px',
      borderRadius: '50px',
      fontFamily: 'var(--font-sans)',
      fontSize: '13px',
      fontWeight: 600,
      letterSpacing: '0.06em',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'background 0.3s, transform 0.2s',
    },
    outline: {
      background: 'transparent',
      color: 'var(--cream)',
      border: '1px solid rgba(243,235,221,0.3)',
      padding: '12px 28px',
      borderRadius: '50px',
      fontFamily: 'var(--font-sans)',
      fontSize: '13px',
      fontWeight: 500,
      letterSpacing: '0.06em',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'border-color 0.3s, color 0.3s',
    },
    dark: {
      background: 'var(--near-black)',
      color: 'var(--cream)',
      border: '1px solid rgba(200,155,82,0.3)',
      padding: '12px 28px',
      borderRadius: '50px',
      fontFamily: 'var(--font-sans)',
      fontSize: '13px',
      fontWeight: 500,
      letterSpacing: '0.06em',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'background 0.3s, border-color 0.3s',
    },
    cream: {
      background: 'var(--cream)',
      color: '#080808',
      border: 'none',
      padding: '13px 28px',
      borderRadius: '50px',
      fontFamily: 'var(--font-sans)',
      fontSize: '13px',
      fontWeight: 600,
      letterSpacing: '0.06em',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'background 0.3s, transform 0.2s',
    },
  };

  const base = { ...styles[variant], ...style };

  return (
    <motion.a
      href={href}
      onClick={onClick}
      style={base}
      whileHover={{ scale: 1.03, opacity: 0.92 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.a>
  );
}
