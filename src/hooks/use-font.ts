'use client';

import { useEffect, useRef } from 'react';
import opentype from 'opentype.js';
import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect';
import { toast } from 'sonner';

export const useFont = (url: string, cb: (font: opentype.Font) => void) => {
  const cbRef = useRef(cb);
  const urlRef = useRef(url);

  useIsomorphicLayoutEffect(() => {
    cbRef.current = cb;
    urlRef.current = url;
  });

  useEffect(() => {
    const controller = new AbortController();

    const callback = cbRef.current;
    const cachedUrl = urlRef.current;

    fetch(cachedUrl, { signal: controller.signal })
      .then(data => data.arrayBuffer())
      .then(data => {
        const font = opentype.parse(data);
        callback(font);
      })
      .catch(err => {
        if (typeof err === 'string') {
        } else {
          if (err instanceof Error) {
            toast.error(err.message);
          }
        }
      });

    return () => controller.abort('useFont unmounted.');
  }, []);
};
