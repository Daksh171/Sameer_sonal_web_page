import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] },
  }),
};

export function SectionHeader({ number, label, title, titleLight, subtitle, align = 'left', dark = false }) {
  const textColor = dark ? 'var(--cream)' : 'var(--near-black)';
  const mutedColor = dark ? 'var(--muted)' : '#7a6f60';

  return (
    <div style={{ textAlign: align === 'center' ? 'center' : 'left', marginBottom: '48px' }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px',
          justifyContent: align === 'center' ? 'center' : 'flex-start' }}
      >
        {number && (
          <motion.span
            custom={0}
            variants={fadeUp}
            style={{ fontFamily: 'var(--font-serif)', fontSize: '11px', letterSpacing: '0.15em', color: mutedColor }}
          >
            {number}
          </motion.span>
        )}
        {number && label && <span style={{ width: '24px', height: '1px', background: 'var(--gold)', display: 'block' }} />}
        {label && (
          <motion.span
            custom={0.05}
            variants={fadeUp}
            style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 500,
              letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)' }}
          >
            {label}
          </motion.span>
        )}
      </motion.div>

      <motion.h2
        custom={0.1}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 5vw, 68px)',
          fontWeight: 700,
          lineHeight: 1.0,
          letterSpacing: '-0.02em',
          color: textColor,
          marginBottom: subtitle ? '20px' : 0,
        }}
      >
        {title}
        {titleLight && (
          <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}> {titleLight}</span>
        )}
      </motion.h2>

      {subtitle && (
        <motion.p
          custom={0.2}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '15px',
            lineHeight: 1.7,
            color: mutedColor,
            maxWidth: '520px',
            marginTop: '16px',
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
