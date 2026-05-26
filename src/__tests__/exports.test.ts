import { describe, it, expect } from "vitest";
import * as Touchable from "../index";

const EXPORT_NAMES = [
  "cn",
  "Button",
  "ButtonOutline",
  "ButtonDestructive",
  "ButtonAffirmative",
  "ButtonNeutral",
  "ButtonTertiary",
  "ButtonInverse",
  "ButtonIcon",
  "Card",
  "CardFxLayers",
  "cardClass",
  "Pill",
  "PillNeutral",
  "PillAccent",
  "pillClass",
  "Tabs",
  "TabsList",
  "TabsTrigger",
  "TabsContent",
  "Dropdown",
  "DropdownTrigger",
  "DropdownValue",
  "DropdownContent",
  "DropdownItem",
  "SearchField",
  "InputField",
  "inputFieldClass",
  "Combobox",
  "ComboboxTrigger",
  "ComboboxValue",
  "ComboboxContent",
  "ComboboxItem",
  "Icon",
] as const;

describe("public exports", () => {
  it("exports all documented components", () => {
    for (const name of EXPORT_NAMES) {
      expect(Touchable[name as keyof typeof Touchable]).toBeDefined();
    }
  });
});
