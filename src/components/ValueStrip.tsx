import { perks } from '@/data/content';
import { Icon } from './Icon';

/** Diamond-plate steel wedge for the strip's bottom corners. */
function CornerPlate({ side }: { side: 'left' | 'right' }) {
  return (
    <span
      aria-hidden="true"
      className={`plate pointer-events-none absolute bottom-0 hidden h-16 w-20 lg:block ${
        side === 'left' ? 'left-0' : 'right-0'
      }`}
      style={{
        clipPath: side === 'left' ? 'polygon(0 0, 100% 100%, 0 100%)' : 'polygon(100% 0, 100% 100%, 0 100%)',
      }}
    />
  );
}

/** Four short reasons to hire, set in a steel strip under the hero panels. */
export function ValueStrip() {
  return (
    <section
      aria-label="Why hire from us"
      className="relative border-y border-electric/25 bg-gradient-to-b from-[#0b1424] to-ink"
    >
      <CornerPlate side="left" />
      <CornerPlate side="right" />
      <ul className="relative mx-auto grid max-w-7xl sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-electric/20">
        {perks.map((perk) => (
          <li key={perk.title} className="flex items-center gap-4 px-6 py-7 sm:px-8">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-chrome/50 bg-ink text-electric-hi shadow-[0_0_22px_rgb(42_127_255/0.35),inset_0_0_14px_rgb(42_127_255/0.2)]">
              <Icon name={perk.icon} className="h-7 w-7" />
            </span>
            <span>
              <span className="display block text-xl text-white">{perk.title}</span>
              <span className="block text-sm text-mute">{perk.body}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
