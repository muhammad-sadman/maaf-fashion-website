/**
 * Subtle knit-loop texture used as an atmospheric background layer,
 * standing in for factory photography and reinforcing the knitwear subject.
 */
export default function KnitPattern({ className = "", opacity = 0.16 }) {
  return (
    <svg className={className} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <pattern id="knitLoop" width="20" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M0 10 C 5 0, 15 0, 20 10 C 15 20, 5 20, 0 10 Z"
            fill="none"
            stroke="var(--gold-400)"
            strokeWidth="0.8"
            opacity={opacity}
          />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#knitLoop)" />
    </svg>
  );
}
