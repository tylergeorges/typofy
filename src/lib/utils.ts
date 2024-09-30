import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import prettier from 'prettier/standalone';
import parserHTML from 'prettier/parser-html';

export const cn = (...args: ClassValue[]) => twMerge(clsx(args));

const hexRegex = /^#(([0-9A-Fa-f]{2}){3,4}|[0-9A-Fa-f]{3})$/;

export const isHexColor = (hex: string) => hex.length === 7 && hexRegex.test(hex);

export const formatHTML = (htmlString: string) => {
  return prettier.format(htmlString, {
    parser: 'html',
    trailingComma: 'none',
    arrowParens: 'avoid',
    semi: true,
    singleQuote: true,
    bracketSpacing: true,
    printWidth: 60,
    useTabs: false,
    tabWidth: 2,
    quoteProps: 'as-needed',
    jsxSingleQuote: false,
    plugins: [parserHTML]
  });
};
