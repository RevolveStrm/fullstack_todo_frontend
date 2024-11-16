'use client';
import { useRouter } from 'next/navigation';
import { MouseEventHandler, useCallback, useEffect, useRef } from 'react';

type Props = React.PropsWithChildren & {};

export function Modal({ children }: Props) {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    },
    [onDismiss],
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';

      return document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      className="fixed bottom-0 left-0 right-0 top-0 z-10 mx-auto  bg-black/90"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="absolute left-1/2 top-1/2 flex w-fit -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl 
        border border-gray-800 bg-zinc-50 dark:bg-black p-16"
      >
        {children}
      </div>
    </div>
  );
}
