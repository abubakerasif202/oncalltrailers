import { Fragment, type CSSProperties, type ElementType, type ReactNode } from 'react';

interface RevealProps {
  as?: ElementType;
  /** Seconds before the reveal starts, so siblings can stagger. */
  delay?: number;
  /** "plate" reveals a photograph by wiping it open. */
  kind?: 'rise' | 'plate';
  className?: string;
  children: ReactNode;
  id?: string;
}

/** Marks an element for the shared scroll reveal (see Enhance and site.css). Visible by default without scripting. */
export function Reveal({ as, delay = 0, kind = 'rise', className, children, id }: RevealProps) {
  const Tag: ElementType = as ?? 'div';
  const style = { '--reveal-delay': `${Math.round(delay * 1000)}ms` } as CSSProperties;
  return (
    <Tag className={className} data-reveal={kind === 'plate' ? 'plate' : ''} style={style} id={id}>
      {children}
    </Tag>
  );
}

interface LinesProps {
  as?: ElementType;
  lines: readonly string[];
  className?: string;
  /** Seconds before the first line rises. */
  delay?: number;
}

/** A heading whose lines rise out of a mask, one after another, when it scrolls into view. */
export function Lines({ as, lines, className, delay = 0 }: LinesProps) {
  const Tag: ElementType = as ?? 'h2';
  return (
    <Tag className={className} data-reveal="lines">
      {lines.map((text, index) => (
        <Fragment key={text}>
          <span className="line" style={{ '--line-delay': `${Math.round((delay + index * 0.12) * 1000)}ms` } as CSSProperties}>
            <span>{text}</span>
          </span>
          {index < lines.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  );
}
