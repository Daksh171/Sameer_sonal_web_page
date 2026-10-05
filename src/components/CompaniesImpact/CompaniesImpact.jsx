import { motion } from 'framer-motion';
import { companies } from '../../data/companies';
import { SectionHeader } from '../ui/SectionHeader';
import { CTAButton } from '../ui/CTAButton';
import { FadeUp, ImagePlaceholder } from '../ui/Primitives';

function CompanyCard({ company, index }) {
  return (
    <FadeUp delay={index * 0.12} style={{ flex: 1, minWidth: '280px', maxWidth: '100%' }}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.35 }}
        style={{
          background: '#0e0e0e',
          border: '1px solid rgba(200,155,82,0.15)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        {/* Image area */}
        <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
          {company.image ? (
            <motion.img
              src={company.image}
              alt={company.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.5 }}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              background: `linear-gradient(135deg, ${company.color}33, ${company.color}11)`,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '12px',
            }}>
              {/* Company color swatch + letter */}
              <div style={{
                width: '60px', height: '60px',
                borderRadius: '50%',
                background: company.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#fff',
                  letterSpacing: '0.05em',
                }}>
                  {company.logoPlaceholder}
                </span>
              </div>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '9px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(200,155,82,0.4)',
              }}>
                [Company Image Placeholder]
              </span>
            </div>
          )}

          {/* Dark hover overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(8,8,8,0.35)',
            }}
          />

          {/* Category tag */}
          <div style={{
            position: 'absolute', top: '16px', left: '16px',
            background: 'rgba(8,8,8,0.75)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(200,155,82,0.2)',
            borderRadius: '50px',
            padding: '5px 12px',
          }}>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '9px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
            }}>
              {company.category}
            </span>
          </div>
        </div>

        {/* Card content */}
        <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '22px',
            fontWeight: 600,
            color: 'var(--cream)',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
          }}>
            {company.name}
          </h3>

          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            lineHeight: 1.7,
            color: 'var(--muted)',
            flex: 1,
          }}>
            {company.description}
          </p>

          <a
            href={company.learnMore}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginTop: 'auto',
              transition: 'gap 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.gap = '10px'; }}
            onMouseLeave={(e) => { e.currentTarget.style.gap = '6px'; }}
          >
            Learn More <span>→</span>
          </a>
        </div>
      </motion.div>
    </FadeUp>
  );
}

export function CompaniesImpact() {
  return (
    <section
      id="companies"
      style={{
        background: 'var(--cream)',
        padding: 'var(--section-py) var(--section-px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle texture */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.3,
        backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(200,155,82,0.08) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Header row */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '24px',
        marginBottom: '60px',
      }}>
        <SectionHeader
          number="01"
          label="Companies & Impact"
          title="Ideas Into"
          titleLight="Real-World Impact"
          subtitle="Building businesses and platforms that empower people, solve real problems, and create lasting change."
          dark={false}
        />
        <FadeUp delay={0.3}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              color: '#7a6f60',
              letterSpacing: '0.06em',
            }}>
              Different industries. One common goal: people first.
            </span>
            <a href="#" style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              color: 'var(--near-black)',
              fontWeight: 600,
              letterSpacing: '0.08em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              Explore All →
            </a>
          </div>
        </FadeUp>
      </div>

      {/* Company cards grid */}
      <div style={{
        display: 'flex',
        gap: '24px',
        flexWrap: 'wrap',
      }}>
        {companies.map((company, i) => (
          <CompanyCard key={company.id} company={company} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          #companies > div:last-child {
            flex-direction: column;
          }
          #companies > div:last-child > div {
            min-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
