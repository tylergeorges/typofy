import plugin from "tailwindcss/plugin";

export const TailwindChildren = plugin(({ addVariant }) => {
  addVariant("child", "& > *");
  addVariant("child-hover", "& > *:hover");
  addVariant("child-group-hover", "& > *:group-hover");
  addVariant("not-last", "&:not(:last-child)");
});

export const TailwindGradientText = plugin(({ addUtilities }) => {
  addUtilities({
    ".text-gradient": {
      color: "transparent",
      backgroundClip: "text",
      "-webkit-background-clip": "text",
    },
  });
});

export const TailwindFlexible = plugin(({ addUtilities }) => {
  addUtilities({
    ".horizontal": {
      display: "flex",
      flexDirection: "row",
    },

    ".horizontal.center-v, .flex-row.center-v": {
      alignItems: "center",
    },

    ".horizontal.center-h, .flex-row.center-h": {
      justifyContent: "center",
    },

    ".horizontal.center, .flex.center": {
      justifyContent: "center",
      alignItems: "center",
    },

    ".vertical": {
      display: "flex",
      flexDirection: "column",
    },

    ".vertical.center-v, .flex-col.center-v": {
      justifyContent: "center",
    },

    ".vertical.center-h, .flex-col.center-h": {
      alignItems: "center",
    },

    ".vertical.center, .flex-col.center": {
      justifyContent: "center",
      alignItems: "center",
    },

    ".space-between": {
      justifyContent: "space-between",
    },
  });
});

const getPx = (val: number) => `${val}px`;

export const generateScreens = (screenSizes: Record<string, number>) => {
  const screenEntries = Object.entries(screenSizes);

  const minWidthBreakpoints = screenEntries.reduce(
    (acc, [name, width]) => ({
      // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
      ...acc,
      [name]: { min: getPx(width) },
    }),
    {}
  );
  const maxWidthBreakpoints = screenEntries.reduce(
    (acc, [name, width]) => ({
      // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
      ...acc,
      [`to-${name}`]: { max: getPx(width) },
    }),
    {}
  );

  let prevBreakpointWidth: number;

  const onlyBreakpoints = screenEntries.reduce((acc, [name, width]) => {
    const isFirst = typeof prevBreakpointWidth === "undefined";

    const key = `${name}-only`;

    const value = isFirst
      ? { max: getPx(width) }
      : { min: getPx(width), max: getPx(prevBreakpointWidth - 1) };

    prevBreakpointWidth = width;

    // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
    return { ...acc, [key]: value };
  }, {});

  return { ...minWidthBreakpoints, ...maxWidthBreakpoints, ...onlyBreakpoints };
};
