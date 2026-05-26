import { useEffect, useRef, useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { ButtonDisc, ButtonNeutralIconLink } from "@palashjain/touchable";
import {
  applyPrimaryFromHex,
  clearAccentOverride,
  hasAccentOverride,
  readLibraryPrimaryHex,
} from "../../lib/demoPrimary";

export function PrimaryColorPicker() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [color, setColor] = useState(readLibraryPrimaryHex);
  const overridden = hasAccentOverride();

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => {
      if (!hasAccentOverride()) {
        setColor(readLibraryPrimaryHex());
      }
    };
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <input
        ref={inputRef}
        id="docs-primary-color"
        type="color"
        value={color}
        onChange={(e) => {
          const hex = e.target.value;
          setColor(hex);
          applyPrimaryFromHex(hex);
        }}
        className="sr-only"
        tabIndex={-1}
        aria-label="Primary colour value"
      />
      <ButtonDisc
        type="button"
        swatchColor={overridden ? color : "var(--primary)"}
        aria-label="Primary colour"
        onClick={() => inputRef.current?.click()}
      />
      {overridden ? (
        <ButtonNeutralIconLink
          href="#"
          size="md"
          aria-label="Reset primary colour"
          onClick={(e) => {
            e.preventDefault();
            clearAccentOverride();
            setColor(readLibraryPrimaryHex());
          }}
        >
          <ArrowPathIcon data-default-size aria-hidden />
        </ButtonNeutralIconLink>
      ) : null}
    </div>
  );
}
