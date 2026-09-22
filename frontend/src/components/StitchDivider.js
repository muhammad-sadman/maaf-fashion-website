/**
 * Signature element: a stitched-thread line, referencing the seams of
 * knitwear, used to divide page sections instead of a generic hairline.
 */
export default function StitchDivider({ className = "" }) {
  return (
    <svg
      className={`stitch-divider ${className}`}
      viewBox="0 0 1200 28"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path className="stitch-line" d="M0 14 Q 150 2, 300 14 T 600 14 T 900 14 T 1200 14" />
    </svg>
  );
}
