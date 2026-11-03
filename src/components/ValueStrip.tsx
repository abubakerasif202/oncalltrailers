import { perks } from '@/data/content';
import { Icon } from './Icon';

/** Four short reasons to hire, set in a steel strip under the hero panels. */
export function ValueStrip() {
  return (
    <section aria-label="Why hire from us" className="border-y border-line bg-ink/80">
      <ul className="mx-auto grid max-w-7xl sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line">
        {perks.map((perk) => (
          <li key={perk.title} className="flex items-center gap-4 px-6 py-6 sm:px-8">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-electric/50 bg-electric/10 text-electric-hi">
              <Icon name={perk.icon} className="h-6 w-6" />
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
