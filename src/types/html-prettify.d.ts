declare module 'html-prettify' {
  export = prettify;

  declare function prettify(markup: string, options?: { char?: string; count?: number }): string;
}
