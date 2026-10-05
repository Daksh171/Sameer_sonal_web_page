/**
 * useScrollReveal — IntersectionObserver-based viewport reveal.
 *
 * Performance contract:
 *   - Zero scroll event listeners (uses IntersectionObserver)
 *   - Animates only `opacity` + `transform` via inline style transitions
 *   - Triggers once only — observer disconnects after first intersection
 *   - No React state updates on scroll (no re-renders)
 *
 * @param {object} options
 * @param {number} [options.threshold=0.12]   Fraction visible before trigger
 * @param {string} [options.rootMargin='-40px'] Shrink effective viewport
 * @param {number} [options.duration=700]      Transition ms
 * @param {number} [options.delay=0]           Delay ms
 * @param {number} [options.distance=40]       translateY start distance px
 * @returns {React.RefObject}
 */
import { useEffect, useRef } from 'react';

export function useScrollReveal({
  threshold = 0.12,
  rootMargin = '-40px',
  duration = 700,
  delay = 0,
  distance = 40,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set initial invisible state instantly (before paint)
    el.style.opacity = '0';
    el.style.transform = `translate3d(0, ${distance}px, 0)`;
    el.style.willChange = 'opacity, transform';
    el.style.transition = `opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translate3d(0, 0, 0)';
          // Clean up will-change after animation completes
          setTimeout(() => { el.style.willChange = 'auto'; }, duration + delay + 100);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, duration, delay, distance]);

  return ref;
}
