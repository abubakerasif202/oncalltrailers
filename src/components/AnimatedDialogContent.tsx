'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Dialog } from 'radix-ui';
import { useSyncExternalStore, type ComponentProps, type ReactNode } from 'react';
import { MOTION_EVENT, motionAllowed } from '@/lib/motion';

function subscribeMotion(onChange: () => void) {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  preference.addEventListener('change', onChange);
  window.addEventListener(MOTION_EVENT, onChange);
  return () => {
    preference.removeEventListener('change', onChange);
    window.removeEventListener(MOTION_EVENT, onChange);
  };
}

/** Radix owns focus and dismissal; Motion owns presentation, including the site's pause preference. */
export function AnimatedDialogContent({ open, className, overlayClassName = '', onCloseAutoFocus, children }: {
  open: boolean;
  className: string;
  overlayClassName?: string;
  children: ReactNode;
  onCloseAutoFocus?: ComponentProps<typeof Dialog.Content>['onCloseAutoFocus'];
}) {
  const animate = useSyncExternalStore(subscribeMotion, motionAllowed, () => false);
  const transition = { duration: animate ? 0.22 : 0 };

  return (
    <Dialog.Portal forceMount>
      <AnimatePresence>
        {open && (
          <Dialog.Overlay key="overlay" forceMount asChild>
            <motion.div className={`dialog-overlay ${overlayClassName}`} initial={{ opacity: 0 }}
              animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={transition} />
          </Dialog.Overlay>
        )}
        {open && (
          <Dialog.Content key="content" forceMount asChild onCloseAutoFocus={onCloseAutoFocus}>
            <motion.div className={className} data-open="true" data-lenis-prevent
              initial={{ opacity: 0, y: animate ? 12 : 0 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: animate ? 8 : 0 }} transition={transition}>
              {children}
            </motion.div>
          </Dialog.Content>
        )}
      </AnimatePresence>
    </Dialog.Portal>
  );
}
