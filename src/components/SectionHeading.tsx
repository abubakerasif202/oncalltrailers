import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  title: ReactNode;
  intro?: string;
}

export function SectionHeading({ title, intro }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 max-w-3xl">
      <h2 className="display text-5xl text-white sm:text-7xl">{title}</h2>
      {intro && <p className="mt-4 text-lg text-mute sm:text-xl">{intro}</p>}
    </Reveal>
  );
}
