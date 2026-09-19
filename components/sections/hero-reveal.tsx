/**
 * The one orchestrated entrance on the page, done in CSS so the headline is painted
 * (and counts as LCP) before any JavaScript runs. Children rise in sequence; the
 * animation is disabled entirely under prefers-reduced-motion (see globals.css).
 */
export function HeroReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const items = Array.isArray(children) ? children : [children];
  return (
    <div className={className}>
      {items.map((child, i) => (
        <div key={i} className="hero-rise" style={{ animationDelay: `${i * 70}ms` }}>
          {child}
        </div>
      ))}
    </div>
  );
}
