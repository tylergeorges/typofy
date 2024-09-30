import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...args: ClassValue[]) => twMerge(clsx(args));

const hexRegex = /^#(([0-9A-Fa-f]{2}){3,4}|[0-9A-Fa-f]{3})$/;

export const isHexColor = (hex: string) => hex.length === 7 && hexRegex.test(hex);
