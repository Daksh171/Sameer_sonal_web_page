import { motion } from 'framer-motion';
import { FadeUp } from '../ui/Primitives';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Journey', href: '#journey' },
  { label: 'Companies', href: '#companies' },
  { label: 'Impact', href: '#impact' },
  { label: 'Media', href: '#documentary' },
  { label: 'People', href: '#legacy' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sameersomal/',
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com/sameersomal',
    icon: (
      <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.754l7.73-8.835L1.254 2.25H8.08l4.256 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer
      id="contact"
      style={{
        background: 'var(--black)',
        borderTop: '1px solid rgba(200,155,82,0.1)',
      }}
    >
      {/* Main footer content */}
      <div style={{
        padding: 'clamp(48px, 6vw, 96px) var(--section-px) clamp(32px, 4vw, 56px)',
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
        gap: 'clamp(24px, 4vw, 56px)',
      }}
      className="footer-grid"
      >
        {/* Left — Branding */}
        <FadeUp>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px',
            }}>
              <div style={{
                width: '38px', height: '38px',
                border: '1px solid rgba(200,155,82,0.4)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', color: 'var(--gold)', fontWeight: 600 }}>SS</span>
              </div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '18px',
                fontWeight: 600,
                color: 'var(--cream)',
                letterSpacing: '-0.01em',
              }}>
                Sameer Somal
              </span>
            </div>

            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              lineHeight: 1.7,
              color: 'var(--muted)',
              maxWidth: '280px',
              marginBottom: '24px',
            }}>
              Entrepreneur, expert witness, and community builder. Creating opportunities that outlast generations.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1px solid rgba(200,155,82,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--muted)',
                    transition: 'color 0.3s, border-color 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--gold)';
                    e.currentTarget.style.borderColor = 'rgba(200,155,82,0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--muted)';
                    e.currentTarget.style.borderColor = 'rgba(200,155,82,0.2)';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Center — Navigation */}
        <FadeUp delay={0.1}>
          <div>
            <h4 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '20px',
            }}>
              Navigation
            </h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    color: 'var(--muted)',
                    transition: 'color 0.3s',
                    letterSpacing: '0.04em',
                  }}
                  onMouseEnter={(e) => { e.target.style.color = 'var(--cream)'; }}
                  onMouseLeave={(e) => { e.target.style.color = 'var(--muted)'; }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </FadeUp>

        {/* Right — Contact */}
        <FadeUp delay={0.2}>
          <div>
            <h4 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '20px',
            }}>
              Connect
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href="https://www.linkedin.com/in/sameersomal/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  color: 'var(--muted)',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => { e.target.style.color = 'var(--cream)'; }}
                onMouseLeave={(e) => { e.target.style.color = 'var(--muted)'; }}
              >
                LinkedIn
              </a>
              <a
                href="https://blueoceanglobaltech.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  color: 'var(--muted)',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => { e.target.style.color = 'var(--cream)'; }}
                onMouseLeave={(e) => { e.target.style.color = 'var(--muted)'; }}
              >
                Blue Ocean Global Technology
              </a>
              <a
                href="https://girlpowertalk.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  color: 'var(--muted)',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => { e.target.style.color = 'var(--cream)'; }}
                onMouseLeave={(e) => { e.target.style.color = 'var(--muted)'; }}
              >
                Girl Power Talk
              </a>
            </div>
          </div>
        </FadeUp>

        {/* Clarivo column */}
        <FadeUp delay={0.3}>
          <div>
            {/* Clarivo logo + name */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px',
            }}>
              <img
                src="/images/clarivo/clarivo-logo.jpeg"
                alt="Clarivo"
                style={{
                  height: '28px',
                  width: 'auto',
                  objectFit: 'contain',
                  borderRadius: '4px',
                }}
                onError={e => { e.target.style.display = 'none'; }}
              />
            </div>

            <h4 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '20px',
            }}>
              Clarivo
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Email */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '9px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(200,155,82,0.5)',
                }}>
                  Email
                </span>
                <a
                  href="mailto:clarivobusiness.com"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    color: 'var(--muted)',
                    transition: 'color 0.3s',
                    wordBreak: 'break-all',
                  }}
                  onMouseEnter={e => { e.target.style.color = 'var(--cream)'; }}
                  onMouseLeave={e => { e.target.style.color = 'var(--muted)'; }}
                >
                  clarivobusiness.com
                </a>
              </div>

              {/* Instagram */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '9px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(200,155,82,0.5)',
                }}>
                  Instagram
                </span>
                <a
                  href="https://www.instagram.com/clarivobusiness?stkn=eHpnZHZ4ajNlMzEy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    color: 'var(--muted)',
                    transition: 'color 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--cream)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; }}
                >
                  {/* Instagram icon */}
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  @clarivobusiness
                </a>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>

      {/* Bottom strip */}
      <div style={{
        borderTop: '1px solid rgba(200,155,82,0.08)',
        padding: '20px var(--section-px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '11px',
          color: 'rgba(184,176,161,0.4)',
          letterSpacing: '0.06em',
        }}>
          © {new Date().getFullYear()} Sameer Somal. All rights reserved.
        </span>
        <span style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '13px',
          fontStyle: 'italic',
          color: 'rgba(200,155,82,0.4)',
          letterSpacing: '0.1em',
        }}>
          People · Purpose · Legacy
        </span>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
