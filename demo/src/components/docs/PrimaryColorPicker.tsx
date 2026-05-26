import { useEffect, useRef, useState } from "react";
import { ButtonDisc } from "@palashjain/touchable";
import { applyPrimaryFromHex, primaryForTheme } from "../../lib/demoPrimary";

export function PrimaryColorPicker() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [color, setColor] = useState(primaryForTheme);

  useEffect(() => {
    applyPrimaryFromHex(color);
  }, [color]);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setColor(primaryForTheme());
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <input
        ref={inputRef}
        id="docs-primary-color"
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="sr-only"
        tabIndex={-1}
        aria-label="Primary colour value"
      />
      <ButtonDisc
        type="button"
        swatchColor={color}
        aria-label="Choose your colour"
        onClick={() => inputRef.current?.click()}
      />
    </>
  );
}
