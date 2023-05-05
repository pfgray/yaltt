import React from "react";

const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

export const useDisplayMode = () => {
  const [displayMode, setDisplayMode] = React.useState<"dark" | "light">(
    mediaQueryList.matches ? "dark" : "light"
  );

  React.useEffect(() => {
    const handler = (e: MediaQueryListEvent) => {
      setDisplayMode(e.matches ? "dark" : "light");
    };
    mediaQueryList.addEventListener("change", handler);
    return () => mediaQueryList.removeEventListener("change", handler);
  }, []);

  return displayMode;
};
