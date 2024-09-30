'use client';

import { forwardRef } from 'react';

interface SvgRendererProps {}

export const SvgRenderer = forwardRef<HTMLDivElement, SvgRendererProps>(({ ...props }, ref) => {
  return <div ref={ref} {...props}></div>;
});

SvgRenderer.displayName = 'SvgRenderer';
