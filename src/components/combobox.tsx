/**
 * Combobox — fixed-option select (Radix Select, `role="combobox"` on trigger).
 * Same implementation as Dropdown; use Combobox naming in forms and docs.
 */
export {
  Dropdown as Combobox,
  DropdownGroup as ComboboxGroup,
  DropdownValue as ComboboxValue,
  DropdownTrigger as ComboboxTrigger,
  DropdownContent as ComboboxContent,
  DropdownLabel as ComboboxLabel,
  DropdownItem as ComboboxItem,
  DropdownSeparator as ComboboxSeparator,
} from "./dropdown";
export type { DropdownTriggerVariant as ComboboxTriggerVariant, DropdownTriggerProps as ComboboxTriggerProps } from "./dropdown";
