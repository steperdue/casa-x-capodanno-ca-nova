import { useEffect, useRef, useState } from 'react';
import {
  BedDouble,
  Check,
  ChevronLeft,
  ChevronRight,
  Compass,
  ImageOff,
  Maximize2,
} from 'lucide-react';
import type { PhotoAsset, RoomSpace } from '../data/houseData';

interface RoomDetailDrawerProps {
  room: RoomSpace;
  photos: PhotoAsset[];
  totalTourSteps: number;
  isTourActive: boolean;
  onPrevRoom: () => void;
  onNextRoom: () => void;
  onOpenLightbox: (photoIndex: number) => void;
}

export function RoomDetailDrawer({
  room,
  photos,
  totalTourSteps,
  isTourActive,
  onPrevRoom,
  onNextRoom,
  onOpenLightbox,
}: RoomDetailDrawerProps) {
  const [photoIdx, setPhotoIdx] = useState(0);
  const [failedUrls, setFailedUrls] = useState<Record<string, boolean>>({});
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    setPhotoIdx(0);
  }, [room.id]);

  const activePhoto = photos[photoIdx] ?? photos[0];
  const totalSleeps = room.beds.reduce((sum, b) => sum + b.sleeps, 0);

  const handlePrevPhoto = () => {
    if (photos.length <= 1) return;
    setPhotoIdx((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNextPhoto = () => {
    if (photos.length <= 1) return;
    setPhotoIdx((prev) => (prev + 1) % photos.length);
  };

  return (
    <aside
      aria-label={`Scheda dettaglio: ${room.name}`}
      className="flex flex-col rounded-2xl border border-[#E6E0D6] bg-white dark:border-[#2F2A25] dark:bg-[#1E1B18]"
    >
      {/* Guided Tour Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E6E0D6] px-4 py-3 dark:border-[#2F2A25] sm:px-5">
        <div className="flex items-center gap-2 text-xs font-medium text-[#645D55] dark:text-[#B5ADA3]">
          <Compass className="h-4 w-4 text-[#B84A2E] dark:text-[#D96B4E]" aria-hidden="true" />
          <span>{isTourActive ? 'Tour guidato attivo' : 'Visita guidata stanze'}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono-nums font-semibold text-[#1E1B18] dark:text-[#F2ECE4]">
            Tappa {room.tourOrder}/{totalTourSteps}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onPrevRoom}
            aria-label="Stanza precedente nel tour"
            className="inline-flex min-h-[40px] items-center gap-1 rounded-lg border border-[#E6E0D6] bg-[#F8F6F2] px-3 py-1.5 text-xs font-medium text-[#1E1B18] transition-colors hover:border-[#B84A2E] hover:text-[#B84A2E] dark:border-[#2F2A25] dark:bg-[#141210] dark:text-[#F2ECE4] dark:hover:border-[#D96B4E]"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            <span>Indietro</span>
          </button>
          <button
            type="button"
            onClick={onNextRoom}
            aria-label="Stanza successiva nel tour"
            className="inline-flex min-h-[40px] items-center gap-1 rounded-lg bg-[#B84A2E] px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#9E3D24] dark:bg-[#D96B4E] dark:text-[#141210] dark:hover:bg-[#E47D61]"
          >
            <span>Avanti</span>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Photo Carousel (Touch swipe on mobile, arrows on desktop, fullscreen zoom trigger) */}
      <div className="p-4 pb-0 sm:p-5 sm:pb-0">
        <div
          className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#E6E0D6] bg-[#EDE8DF] dark:border-[#2F2A25] dark:bg-[#141210]"
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null || photos.length <= 1) return;
            const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
            if (delta > 45) handlePrevPhoto();
            else if (delta < -45) handleNextPhoto();
            touchStartX.current = null;
          }}
        >
          {activePhoto && !failedUrls[activePhoto.url] ? (
            <img
              key={activePhoto.id}
              src={activePhoto.url}
              alt={activePhoto.caption}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() =>
                setFailedUrls((prev) => ({
                  ...prev,
                  [activePhoto.url]: true,
                }))
              }
              onClick={() => onOpenLightbox(photoIdx)}
              className="h-full w-full cursor-zoom-in object-cover object-center transition-opacity duration-200"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 p-4 text-center text-[#645D55] dark:text-[#B5ADA3]">
              <ImageOff className="h-8 w-8 opacity-60" />
              <p className="text-xs font-medium">{room.name}</p>
            </div>
          )}

          {/* Bottom gradient scrim + caption & count */}
          {activePhoto && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-3.5 pb-3 pt-8">
              <div className="flex items-end justify-between gap-2 text-white">
                <p className="text-xs leading-snug text-[#F5EFE6]">{activePhoto.caption}</p>
                <span className="font-mono-nums shrink-0 text-[11px] font-medium text-white/85">
                  {photoIdx + 1}/{photos.length}
                </span>
              </div>
            </div>
          )}

          {/* Desktop / Touch Arrows */}
          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevPhoto}
                aria-label="Foto precedente stanza"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/80"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleNextPhoto}
                aria-label="Foto successiva stanza"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/80"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Fullscreen Zoom Button */}
          <button
            type="button"
            onClick={() => onOpenLightbox(photoIdx)}
            aria-label="Apri galleria a schermo intero"
            className="absolute right-2.5 top-2.5 inline-flex min-h-[36px] items-center gap-1.5 rounded-lg bg-black/60 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-black/85"
          >
            <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Schermo intero</span>
          </button>
        </div>

        {/* Thumbnail Strip */}
        {photos.length > 1 && (
          <div className="no-scrollbar mt-2.5 flex gap-2 overflow-x-auto pb-1">
            {photos.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPhotoIdx(idx)}
                aria-label={`Seleziona foto ${idx + 1}: ${p.caption}`}
                className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                  idx === photoIdx
                    ? 'border-[#B84A2E] dark:border-[#D96B4E]'
                    : 'border-transparent opacity-65 hover:opacity-100'
                }`}
              >
                <img
                  src={p.url}
                  alt={p.caption}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Room Metadata & Description */}
      <div className="space-y-4 p-4 sm:p-5">
        <div>
          <p className="text-xs font-medium text-[#B84A2E] dark:text-[#D96B4E]">
            {room.floorLabel} <span aria-hidden="true">·</span> {photos.length}{' '}
            {photos.length === 1 ? 'foto' : 'foto'}
          </p>
          <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight text-[#1E1B18] dark:text-[#F2ECE4]">
            {room.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#4B453F] dark:text-[#CEC7BE]">
            {room.description}
          </p>
        </div>

        {/* Sleeping arrangements (for bedrooms) */}
        {room.isBedroom && room.beds.length > 0 && (
          <div className="rounded-xl border border-[#E6E0D6] bg-[#F8F6F2] p-3.5 dark:border-[#2F2A25] dark:bg-[#141210]">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#1E1B18] dark:text-[#F2ECE4]">
                <BedDouble className="h-4 w-4 text-[#B84A2E] dark:text-[#D96B4E]" aria-hidden="true" />
                <span>Posti letto nella stanza</span>
              </div>
              <span className="font-mono-nums text-xs font-semibold text-[#645D55] dark:text-[#B5ADA3]">
                {totalSleeps} posti letto
              </span>
            </div>

            <ul className="mt-2.5 space-y-1.5 text-sm">
              {room.beds.map((bed) => (
                <li
                  key={bed.type}
                  className="flex items-start justify-between gap-3 text-[#3D3732] dark:text-[#DCD5CC]"
                >
                  <span>
                    {bed.type}
                    {bed.note ? (
                      <span className="block text-xs text-[#645D55] dark:text-[#9A9187]">
                        {bed.note}
                      </span>
                    ) : null}
                  </span>
                  <span className="font-mono-nums shrink-0 text-xs font-medium text-[#645D55] dark:text-[#B5ADA3]">
                    ×{bed.count}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Room Amenities */}
        {room.amenities.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#645D55] dark:text-[#9A9187]">
              Dotazioni dello spazio
            </h4>
            <ul className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {room.amenities.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-xs leading-snug text-[#3D3732] dark:text-[#DCD5CC]"
                >
                  <Check
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#3D5A45] dark:text-[#6E9E7B]"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
}
