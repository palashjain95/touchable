import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { ButtonNeutralIcon } from "@palashjain/touchable";
import { PrimaryColorPicker } from "./PrimaryColorPicker";

export function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
    root.style.colorScheme = dark ? "dark" : "light";
  }, [dark]);

  return (
    <ButtonNeutralIcon
      type="button"
      size="md"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setDark((d) => !d)}
    >
      {dark ? <SunIcon data-default-size aria-hidden /> : <MoonIcon data-default-size aria-hidden />}
    </ButtonNeutralIcon>
  );
}

/** Theme + primary colour disc at top of docs shell */
export function DocsAppearanceControls() {
  return (
    <div className="flex items-center gap-1">
      <PrimaryColorPicker />
      <ThemeToggle />
    </div>
  );
}
