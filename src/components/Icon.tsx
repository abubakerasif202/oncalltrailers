export type IconName = 'calendar' | 'phone' | 'play' | 'check' | 'clock' | 'shield' | 'pin' | 'people' | 'lock';

interface IconProps {
  name: IconName;
  className?: string;
}

/** Small stroke icon set. Decorative: always hidden from assistive tech. */
export function Icon({ name, className = 'h-5 w-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {name === 'calendar' && (
        <>
          <path d="M8 2v4M16 2v4M3 10h18" />
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
        </>
      )}
      {name === 'phone' && (
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      )}
      {name === 'play' && (
        <>
          <circle cx="12" cy="12" r="10" />
          <path d="m10 8 6 4-6 4z" />
        </>
      )}
      {name === 'check' && <path d="M20 6 9 17l-5-5" />}
      {name === 'clock' && (
        <>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </>
      )}
      {name === 'shield' && (
        <>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </>
      )}
      {name === 'pin' && (
        <>
          <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
          <circle cx="12" cy="10" r="3" />
        </>
      )}
      {name === 'people' && (
        <>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </>
      )}
      {name === 'lock' && (
        <>
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </>
      )}
    </svg>
  );
}
