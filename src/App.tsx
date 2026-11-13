import { useEffect, useMemo, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { ExpenseCalculator } from './components/ExpenseCalculator';
import { FloorplanSVG } from './components/FloorplanSVG';
import { HeroSection } from './components/HeroSection';
import { InfoSections } from './components/InfoSections';
import { Navbar } from './components/Navbar';
import { PhotoLightbox } from './components/PhotoLightbox';
import { RoomDetailDrawer } from './components/RoomDetailDrawer';
import { HOUSE_DATA, type FloorId } from './data/houseData';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [activeFloor, setActiveFloor] = useState<FloorId>('terra');
  const [selectedRoomId, setSelectedRoomId] = useState<string>('sala_giochi');
  const [isTourActive, setIsTourActive] = useState(false);
  const [lightboxState, setLightboxState] = useState<{ open: boolean; index: number }>({
    open: false,
    index: 0,
  });

  // Sync Tailwind v4 .dark class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [isDark]);

  // Sorted guided tour sequence (1..10)
  const tourRooms = useMemo(
    () => [...HOUSE_DATA.rooms].sort((a, b) => a.tourOrder - b.tourOrder),
    []
  );

  const selectedRoom = useMemo(
    () => HOUSE_DATA.rooms.find((r) => r.id === selectedRoomId) ?? HOUSE_DATA.rooms[0],
    [selectedRoomId]
  );

  const selectedRoomPhotos = useMemo(
    () =>
      selectedRoom.photoIds
        .map((id) => HOUSE_DATA.photos.find((p) => p.id === id))
        .filter((p): p is NonNullable<typeof p> => Boolean(p)),
    [selectedRoom]
  );

  const handleSelectRoom = (roomId: string) => {
    const room = HOUSE_DATA.rooms.find((r) => r.id === roomId);
    if (!room) return;
    setSelectedRoomId(room.id);
    setActiveFloor(room.floor);
  };

  const handleSelectFloor = (floor: FloorId) => {
    setActiveFloor(floor);
    if (selectedRoom.floor !== floor) {
      const firstOnFloor = tourRooms.find((r) => r.floor === floor);
      if (firstOnFloor) setSelectedRoomId(firstOnFloor.id);
    }
  };

  const handleStepTour = (direction: 1 | -1) => {
    setIsTourActive(true);
    const currentIdx = tourRooms.findIndex((r) => r.id === selectedRoom.id);
    const nextIdx = (currentIdx + direction + tourRooms.length) % tourRooms.length;
    const nextRoom = tourRooms[nextIdx];
    setSelectedRoomId(nextRoom.id);
    setActiveFloor(nextRoom.floor);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#1E1B18] transition-colors duration-200 dark:bg-[#141210] dark:text-[#F2ECE4]">
      <Navbar isDark={isDark} onToggleTheme={() => setIsDark((d) => !d)} />

      <HeroSection />

      <main className="mx-auto max-w-6xl space-y-12 px-4 py-6 pb-24 sm:px-6 sm:py-8 md:pb-14">
        {/* ===================================================================
            SEZIONE 1 (PRINCIPALE): PLANIMETRIA 2D INTERATTIVA + DETTAGLIO STANZA
           =================================================================== */}
        <section id="planimetria" className="scroll-mt-16 space-y-4">
          <div>
            <h2 className="font-display text-xl font-semibold tracking-tight text-[#1E1B18] dark:text-[#F2ECE4] sm:text-2xl">
              Esplora la casa dalla planimetria 2D
            </h2>
            <p className="mt-0.5 text-xs sm:text-sm text-[#645D55] dark:text-[#B5ADA3]">
              Tocca qualsiasi stanza sulla mappa per vedere foto, letti e dotazioni, oppure usa Avanti/Indietro per il tour.
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <FloorplanSVG
                activeFloor={activeFloor}
                selectedRoomId={selectedRoom.id}
                onSelectFloor={handleSelectFloor}
                onSelectRoom={handleSelectRoom}
              />
            </div>

            <div className="lg:col-span-5">
              <RoomDetailDrawer
                room={selectedRoom}
                photos={selectedRoomPhotos}
                totalTourSteps={tourRooms.length}
                isTourActive={isTourActive}
                onPrevRoom={() => handleStepTour(-1)}
                onNextRoom={() => handleStepTour(1)}
                onOpenLightbox={(idx) => setLightboxState({ open: true, index: idx })}
              />
            </div>
          </div>
        </section>

        {/* ===================================================================
            SEZIONE 2: INFORMAZIONI ESSENZIALI & CALCOLATORE SPESE
           =================================================================== */}
        <InfoSections />

        <ExpenseCalculator />
      </main>

      <footer className="border-t border-[#E6E0D6] bg-white/70 pb-20 pt-6 text-xs text-[#645D55] dark:border-[#2F2A25] dark:bg-[#1E1B18]/70 dark:text-[#9A9187] md:pb-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 sm:px-6">
          <p>
            Fonte dati: Airbnb #{HOUSE_DATA.meta.listingId} · CIN {HOUSE_DATA.meta.cin}
          </p>
          <a
            href={HOUSE_DATA.meta.airbnbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-[#1E1B18] underline-offset-4 hover:underline dark:text-[#F2ECE4]"
          >
            <span>Vedi annuncio su Airbnb</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </footer>

      {lightboxState.open && (
        <PhotoLightbox
          photos={selectedRoomPhotos}
          currentIndex={lightboxState.index}
          roomTitle={selectedRoom.name}
          onClose={() => setLightboxState({ open: false, index: 0 })}
          onChangeIndex={(next) => setLightboxState({ open: true, index: next })}
        />
      )}
    </div>
  );
}
