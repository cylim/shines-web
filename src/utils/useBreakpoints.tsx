import { useMediaQuery } from "usehooks-ts";
import resolveConfig from "tailwindcss/resolveConfig";
import { Config, ScreensConfig } from "tailwindcss/types/config";

import tailwindConfig from "../../tailwind.config"; // Your tailwind config

const fullConfig = resolveConfig(tailwindConfig as unknown as Config);

const breakpoints = fullConfig?.theme?.screens || {
  xs: "480px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
};

type BreakpointKey = keyof typeof breakpoints;

export function useBreakpoint<K extends string>(breakpointKey: K) {
  const bool = useMediaQuery(`(max-width: ${breakpoints[breakpointKey as BreakpointKey]})`)
  const capitalizedKey = breakpointKey[0].toUpperCase() + breakpointKey.substring(1);

  type KeyAbove = `isAbove${Capitalize<K>}`;
  type KeyBelow = `isBelow${Capitalize<K>}`;

  return {
    [breakpointKey]: Number(String(breakpoints[breakpointKey as BreakpointKey]).replace(/[^0-9]/g, "")),
    [`isAbove${capitalizedKey}`]: !bool,
    [`isBelow${capitalizedKey}`]: bool,
  } as Record<typeof breakpointKey, number> & Record<KeyAbove | KeyBelow, boolean>;
}