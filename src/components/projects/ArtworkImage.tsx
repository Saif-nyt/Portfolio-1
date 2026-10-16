"use client";

import { useState } from "react";
import { ProjectArtwork } from "@/components/artwork/ProjectArtwork";
import { projectArtworkUrl } from "@/config/content";

interface ArtworkImageProps {
  /** Project slug — the backend hosts one original SVG per slug. */
  slug: string;
  /** Key of the inline fallback artwork, used when the image fails to load. */
  artwork: string;
  /** Classes for the hosted <img>. */
  className?: string;
  /** Classes for the inline fallback wrapper. */
  fallbackClassName?: string;
}

/**
 * Hosted project artwork from the content backend, with the original inline
 * SVG artwork as an automatic fallback so a network hiccup never leaves an
 * empty card.
 */
export function ArtworkImage({
  slug,
  artwork,
  className = "",
  fallbackClassName = "",
}: ArtworkImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <ProjectArtwork name={artwork} className={fallbackClassName} />;
  }

  return (
    // Remote SVG from the content API; next/image does not optimize SVGs.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={projectArtworkUrl(slug)}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
