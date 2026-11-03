import type { Trailer } from '@/data/trailers';

interface TrailerGlyphProps {
  kind: Trailer['kind'];
  className?: string;
}

function Wheel({ cx }: { cx: number }) {
  return (
    <g className="glyph-wheel" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
      <circle cx={cx} cy="92" r="17" fill="#04070d" stroke="#e3eaf5" strokeWidth="3" />
      <circle cx={cx} cy="92" r="6" fill="#2a7fff" />
      <path d={`M${cx} 77v30M${cx - 15} 92h30`} stroke="#93a6c4" strokeWidth="2" />
    </g>
  );
}

/** Brand-styled line illustration of each trailer type. Decorative only. */
export function TrailerGlyph({ kind, className }: TrailerGlyphProps) {
  return (
    <svg
      viewBox="0 0 260 130"
      role="presentation"
      aria-hidden="true"
      className={className}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 96h40" stroke="#93a6c4" strokeWidth="3" />
      <circle cx="8" cy="96" r="5" fill="#2a7fff" />
      {kind === 'cage' && (
        <>
          <path d="M44 88h196v-10H44z" fill="#0d1a2e" stroke="#e3eaf5" strokeWidth="3" />
          <path d="M60 78V30h168v48" stroke="#e3eaf5" strokeWidth="3" />
          <path
            d="M60 46h168M60 62h168M92 30v48M124 30v48M156 30v48M188 30v48"
            stroke="#6aa9ff"
            strokeWidth="1.5"
            opacity="0.75"
          />
        </>
      )}
      {kind === 'car' && (
        <>
          <path d="M44 88h196v-10H44z" fill="#0d1a2e" stroke="#e3eaf5" strokeWidth="3" />
          <path d="M44 78l40-14h156" stroke="#e3eaf5" strokeWidth="3" />
          <path d="M96 64l30-26h78l20 26" fill="#0d1a2e" stroke="#6aa9ff" strokeWidth="2.5" />
          <path d="M112 62l20-16h26v16" stroke="#6aa9ff" strokeWidth="1.5" opacity="0.8" />
        </>
      )}
      {kind === 'bike' && (
        <>
          <path d="M44 88h196v-10H44z" fill="#0d1a2e" stroke="#e3eaf5" strokeWidth="3" />
          <circle cx="110" cy="62" r="13" stroke="#6aa9ff" strokeWidth="2.5" />
          <circle cx="178" cy="62" r="13" stroke="#6aa9ff" strokeWidth="2.5" />
          <path
            d="M110 62l24-26h20l-8 26m-36 0l28-22m12-4l12-10"
            stroke="#e3eaf5"
            strokeWidth="2.5"
          />
        </>
      )}
      <Wheel cx={kind === 'bike' ? 110 : 128} />
      <Wheel cx={kind === 'bike' ? 168 : 168} />
    </svg>
  );
}
