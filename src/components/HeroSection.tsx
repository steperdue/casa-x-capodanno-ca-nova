import { useState } from 'react';
import { ExternalLink, Home } from 'lucide-react';
import { HOUSE_DATA } from '../data/houseData';

export function HeroSection() {
  const [imgError, setImgError] = useState(false);
  const heroPhoto = HOUSE_DATA.photos[0];

  return (
    <section id="top" className="relative isolate overflow-hidden bg-[#231E1A]">
      {!imgError && heroPhoto ? (
        <img
          src={heroPhoto.url}
          alt={heroPhoto.caption}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 flex items-center justify-center bg-gradient-to-br from-[#3D3128] via-[#26201B] to-[#171310]"
        >
          <Home className="h-16 w-16 text-white/15" />
        </div>
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/55 to-black/30"
      />

      {/* Compact hero so the 2D floorplan is visible immediately on mobile */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-11">
        <p className="text-xs font-medium text-[#F2D5C4]">
          {HOUSE_DATA.meta.locationShort} <span aria-hidden="true">·</span> ★{' '}
          {HOUSE_DATA.reviews.overallRating.toFixed(2).replace('.', ',')} ({HOUSE_DATA.reviews.totalCount} recensioni)
        </p>

        <h1 className="mt-1.5 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {HOUSE_DATA.meta.heroTitle}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-sm text-[#F5EFE6]">
          <span>
            <strong className="font-mono-nums font-semibold text-white">16+</strong> ospiti
          </span>
          <span aria-hidden="true" className="text-white/40">·</span>
          <span>
            <strong className="font-mono-nums font-semibold text-white">{HOUSE_DATA.overview.bedrooms}</strong> camere
          </span>
          <span aria-hidden="true" className="text-white/40">·</span>
          <span>
            <strong className="font-mono-nums font-semibold text-white">{HOUSE_DATA.overview.beds}</strong> letti
          </span>
          <span aria-hidden="true" className="text-white/40">·</span>
          <span>
            <strong className="font-mono-nums font-semibold text-white">{HOUSE_DATA.overview.bathroomsShared}</strong> bagni ospiti
          </span>
          <span aria-hidden="true" className="text-white/40">·</span>
          <a
            href={HOUSE_DATA.meta.airbnbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#F2D5C4] underline-offset-4 hover:underline"
          >
            <span>Airbnb #{HOUSE_DATA.meta.listingId}</span>
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
