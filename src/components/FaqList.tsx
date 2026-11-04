import type { Faq } from '@/data/content';

/** Native disclosure widgets: keyboard and screen-reader behaviour for free, no script needed. */
export function FaqList({ items }: { items: readonly Faq[] }) {
  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.q}>
          <summary>{item.q}</summary>
          <p className="answer-text">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
