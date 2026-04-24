/**
 * Media helpers for mobile dual-source optimization.
 *
 * Convention: every `foo.mp4` has a sibling `foo-mobile.mp4` scaled to
 * 768px, CRF 28, no-audio. Every key `*.webp` has a matching `*.avif`
 * (libsvtav1, CRF 40). If the mobile/avif file is missing the browser
 * simply skips that `<source>` and falls back to the desktop asset.
 */

/** Derive the mobile-optimized path for a given `.mp4` URL. */
export function toMobileVideo(src: string): string {
  if (!src.endsWith(".mp4")) return src;
  return src.replace(/\.mp4$/, "-mobile.mp4");
}

/** Derive the AVIF companion for a given `.webp` URL. */
export function toAvif(src: string): string {
  if (!src.endsWith(".webp")) return src;
  return src.replace(/\.webp$/, ".avif");
}
