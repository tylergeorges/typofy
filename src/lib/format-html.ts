'use client';

import prettier from 'prettier/standalone.js';
import parserHTML from 'prettier/parser-html.js';

export const formatHtml = async (htmlString: string) => {
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
