import { Calculator, Home, Info, Moon, Sun } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  return (
    <>
      {/* Top Bar (3-zone contract: wordmark · 3 concise links · theme toggle) */}
      <header className="sticky top-0 z-40 border-b border-[#E6E0D6] bg-[#F8F6F2]/95 dark:border-[#2F2A25] dark:bg-[#141210]/95">
        <div className="mx-auto flex h-13 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
          <a
            href="#top"
            className="font-display text-base sm:text-lg font-semibold tracking-tight text-[#1E1B18] dark:text-[#F2ECE4] whitespace-nowrap shrink-0"
          >
            Capodanno a Cà Nova
          </a>

          <nav
            aria-label="Navigazione principale"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-[#645D55] dark:text-[#B5ADA3]"
          >
            <a
              href="#planimetria"
              className="hover:text-[#B84A2E] dark:hover:text-[#D96B4E] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Planimetria 2D
            </a>
            <a
              href="#info"
              className="hover:text-[#B84A2E] dark:hover:text-[#D96B4E] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Info & Servizi
            </a>
            <a
              href="#spese"
              className="hover:text-[#B84A2E] dark:hover:text-[#D96B4E] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Spese amici
            </a>
          </nav>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Passa al tema chiaro' : 'Passa al tema scuro'}
            className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-[#E6E0D6] bg-white px-3 py-1.5 text-xs font-medium text-[#1E1B18] transition-colors hover:border-[#B84A2E] dark:border-[#2F2A25] dark:bg-[#1E1B18] dark:text-[#F2ECE4] whitespace-nowrap shrink-0"
          >
            {isDark ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
            <span className="hidden sm:inline">{isDark ? 'Chiaro' : 'Scuro'}</span>
          </button>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (3 clear destinations, <= 15% height, >= 44px touch targets) */}
      <nav
        aria-label="Menu mobile"
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#E6E0D6] bg-[#F8F6F2]/95 pb-[env(safe-area-inset-bottom)] dark:border-[#2F2A25] dark:bg-[#141210]/95 md:hidden"
      >
        <div className="grid h-14 grid-cols-3 items-center">
          <a
            href="#planimetria"
            className="flex min-h-[44px] flex-col items-center justify-center gap-0.5 text-[11px] font-medium text-[#1E1B18] active:text-[#B84A2E] dark:text-[#F2ECE4]"
          >
            <Home className="h-5 w-5 text-[#B84A2E] dark:text-[#D96B4E]" aria-hidden="true" />
            <span>Planimetria</span>
          </a>

          <a
            href="#info"
            className="flex min-h-[44px] flex-col items-center justify-center gap-0.5 text-[11px] font-medium text-[#645D55] active:text-[#B84A2E] dark:text-[#B5ADA3]"
          >
            <Info className="h-5 w-5" aria-hidden="true" />
            <span>Info casa</span>
          </a>

          <a
            href="#spese"
            className="flex min-h-[44px] flex-col items-center justify-center gap-0.5 text-[11px] font-medium text-[#645D55] active:text-[#B84A2E] dark:text-[#B5ADA3]"
          >
            <Calculator className="h-5 w-5" aria-hidden="true" />
            <span>Spese</span>
          </a>
        </div>
      </nav>
    </>
  );
}
