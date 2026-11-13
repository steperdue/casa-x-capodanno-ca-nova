import { useState } from 'react';
import { Calculator, Check, Copy, Minus, Plus } from 'lucide-react';
import { HOUSE_DATA } from '../data/houseData';

export function ExpenseCalculator() {
  const defaults = HOUSE_DATA.pricingDefaults;

  const [nights, setNights] = useState(defaults.nights);
  const [friendsCount, setFriendsCount] = useState(defaults.friendsCount);
  const [nightlyRateInput, setNightlyRateInput] = useState<string>(
    defaults.nightlyRateEur !== null ? String(defaults.nightlyRateEur) : ''
  );
  const [useKitchen, setUseKitchen] = useState(true);
  const [kitchenDailyInput, setKitchenDailyInput] = useState<string>(
    defaults.kitchenDailySurchargeEur !== null ? String(defaults.kitchenDailySurchargeEur) : ''
  );
  const [extrasInput, setExtrasInput] = useState<string>('');
  const [groceriesPerPersonInput, setGroceriesPerPersonInput] = useState<string>(
    String(defaults.groceriesPerPersonEur)
  );
  const [copied, setCopied] = useState(false);

  const parseNum = (val: string) => {
    const n = parseFloat(val.replace(',', '.'));
    return Number.isFinite(n) && n >= 0 ? n : 0;
  };

  const hasNightlyRate = nightlyRateInput.trim() !== '';
  const nightlyRate = parseNum(nightlyRateInput);
  const kitchenDaily = useKitchen ? parseNum(kitchenDailyInput) : 0;
  const fixedExtras = parseNum(extrasInput);
  const groceriesPerPerson = parseNum(groceriesPerPersonInput);

  const houseTotal = nightlyRate * nights + kitchenDaily * nights + fixedExtras;
  const grandTotal = houseTotal + groceriesPerPerson * friendsCount;
  const housePerPerson = friendsCount > 0 ? houseTotal / friendsCount : 0;
  const totalPerPerson = friendsCount > 0 ? grandTotal / friendsCount : 0;

  const formatEur = (val: number) =>
    new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 2,
    }).format(val);

  const applySampleEstimate = () => {
    setNightlyRateInput('380');
    setKitchenDailyInput('30');
    setExtrasInput('270');
  };

  const handleCopySummary = async () => {
    const lines = [
      `Capodanno a Cà Nova (${defaults.checkInDate} → ${defaults.checkOutDate}, ${nights} notti)`,
      `Amici: ${friendsCount}`,
      `Totale casa: ${hasNightlyRate ? formatEur(houseTotal) : 'Da confermare'} (${formatEur(housePerPerson)} a testa)`,
      `Spesa cenone/extra: ${formatEur(groceriesPerPerson)} a testa`,
      `TOTALE A TESTA: ${formatEur(totalPerPerson)}`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(lines);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="spese" className="scroll-mt-16 space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-[#1E1B18] dark:text-[#F2ECE4]">
            Calcolatore spese Capodanno
          </h2>
          <p className="mt-0.5 text-xs sm:text-sm text-[#645D55] dark:text-[#B5ADA3]">
            Periodo predefinito: 30 dic – 2 gen ({nights} notti) · Tariffe Airbnb da confermare
          </p>
        </div>

        {!hasNightlyRate && (
          <button
            type="button"
            onClick={applySampleEstimate}
            className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-[#E6E0D6] bg-white px-3 py-1.5 text-xs font-semibold text-[#1E1B18] hover:border-[#B84A2E] dark:border-[#2F2A25] dark:bg-[#1E1B18] dark:text-[#F2ECE4]"
          >
            <Calculator className="h-3.5 w-3.5 text-[#B84A2E] dark:text-[#D96B4E]" aria-hidden="true" />
            <span>Simula con stima di prova</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="space-y-4 rounded-2xl border border-[#E6E0D6] bg-white p-4 dark:border-[#2F2A25] dark:bg-[#1E1B18] lg:col-span-7 sm:p-5">
          {/* Friends + Nights steppers */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center justify-between rounded-xl bg-[#F8F6F2] px-3.5 py-2.5 dark:bg-[#141210]">
              <span className="text-xs font-semibold">Amici</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFriendsCount((c) => Math.max(2, c - 1))}
                  aria-label="Riduci amici"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#E6E0D6] bg-white dark:border-[#2F2A25] dark:bg-[#1E1B18]"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-mono-nums w-8 text-center text-base font-bold text-[#B84A2E] dark:text-[#D96B4E]">
                  {friendsCount}
                </span>
                <button
                  type="button"
                  onClick={() => setFriendsCount((c) => Math.min(20, c + 1))}
                  aria-label="Aumenta amici"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#E6E0D6] bg-white dark:border-[#2F2A25] dark:bg-[#1E1B18]"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-[#F8F6F2] px-3.5 py-2.5 dark:bg-[#141210]">
              <span className="text-xs font-semibold">Notti</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setNights((n) => Math.max(1, n - 1))}
                  aria-label="Riduci notti"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#E6E0D6] bg-white dark:border-[#2F2A25] dark:bg-[#1E1B18]"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-mono-nums w-8 text-center text-base font-bold">
                  {nights}
                </span>
                <button
                  type="button"
                  onClick={() => setNights((n) => Math.min(14, n + 1))}
                  aria-label="Aumenta notti"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#E6E0D6] bg-white dark:border-[#2F2A25] dark:bg-[#1E1B18]"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Numeric Inputs */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="nightly-rate" className="block text-xs font-medium text-[#645D55] dark:text-[#B5ADA3]">
                Costo casa a notte (€) — da confermare
              </label>
              <input
                id="nightly-rate"
                type="number"
                min={0}
                step="10"
                placeholder="Es. 380"
                value={nightlyRateInput}
                onChange={(e) => setNightlyRateInput(e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#E6E0D6] bg-[#F8F6F2] px-3 py-2 font-mono-nums text-sm focus:border-[#B84A2E] focus:outline-none dark:border-[#2F2A25] dark:bg-[#141210]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="kitchen-surcharge" className="font-medium text-[#645D55] dark:text-[#B5ADA3]">
                  Supplemento cucina/gg (€)
                </label>
                <label className="inline-flex cursor-pointer items-center gap-1 font-medium">
                  <input
                    type="checkbox"
                    checked={useKitchen}
                    onChange={(e) => setUseKitchen(e.target.checked)}
                    className="h-3.5 w-3.5 accent-[#B84A2E]"
                  />
                  <span>Attivo</span>
                </label>
              </div>
              <input
                id="kitchen-surcharge"
                type="number"
                min={0}
                step="5"
                disabled={!useKitchen}
                placeholder="Da confermare"
                value={kitchenDailyInput}
                onChange={(e) => setKitchenDailyInput(e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#E6E0D6] bg-[#F8F6F2] px-3 py-2 font-mono-nums text-sm disabled:opacity-50 focus:border-[#B84A2E] focus:outline-none dark:border-[#2F2A25] dark:bg-[#141210]"
              />
            </div>

            <div>
              <label htmlFor="extras-fee" className="block text-xs font-medium text-[#645D55] dark:text-[#B5ADA3]">
                Pulizie + costi Airbnb totali (€)
              </label>
              <input
                id="extras-fee"
                type="number"
                min={0}
                step="10"
                placeholder="Es. 270"
                value={extrasInput}
                onChange={(e) => setExtrasInput(e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#E6E0D6] bg-[#F8F6F2] px-3 py-2 font-mono-nums text-sm focus:border-[#B84A2E] focus:outline-none dark:border-[#2F2A25] dark:bg-[#141210]"
              />
            </div>

            <div>
              <label htmlFor="groceries-per-person" className="block text-xs font-medium text-[#645D55] dark:text-[#B5ADA3]">
                Spesa cenone a persona (€)
              </label>
              <input
                id="groceries-per-person"
                type="number"
                min={0}
                step="5"
                value={groceriesPerPersonInput}
                onChange={(e) => setGroceriesPerPersonInput(e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#E6E0D6] bg-[#F8F6F2] px-3 py-2 font-mono-nums text-sm focus:border-[#B84A2E] focus:outline-none dark:border-[#2F2A25] dark:bg-[#141210]"
              />
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#E6E0D6] bg-white p-4 dark:border-[#2F2A25] dark:bg-[#1E1B18] lg:col-span-5 sm:p-5">
          <div>
            <p className="text-xs font-medium text-[#645D55] dark:text-[#B5ADA3]">
              Quota a persona ({friendsCount} amici · {nights} notti)
            </p>
            <p className="mt-1 font-mono-nums text-3xl font-bold text-[#B84A2E] dark:text-[#D96B4E]">
              {formatEur(totalPerPerson)}
            </p>
            <p className="mt-1 font-mono-nums text-xs text-[#645D55] dark:text-[#B5ADA3]">
              Solo casa: <strong className="text-[#1E1B18] dark:text-[#F2ECE4]">{formatEur(housePerPerson)}</strong> · Totale gruppo:{' '}
              <strong className="text-[#1E1B18] dark:text-[#F2ECE4]">{formatEur(grandTotal)}</strong>
            </p>
            {!hasNightlyRate && (
              <p className="mt-2 text-xs text-[#B84A2E] dark:text-[#D96B4E]">
                Inserisci la tariffa per notte (o clicca “Simula”) per calcolare l’importo esatto della casa.
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleCopySummary}
            className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#1E1B18] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#36312C] dark:bg-[#F2ECE4] dark:text-[#141210]"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-[#7DB28B] dark:text-[#3D5A45]" aria-hidden="true" />
                <span>Copiato per WhatsApp!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" aria-hidden="true" />
                <span>Copia riepilogo per il gruppo</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
