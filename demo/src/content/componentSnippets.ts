export type ComponentSnippet = {
  code: string;
  agentPrompt: string;
};

export const componentSnippets = {
  button: {
    code: `import {
  Button,
  ButtonNeutral,
  ButtonTertiary,
  ButtonOutline,
  ButtonDestructive,
  ButtonInverse,
  ButtonIcon,
  ButtonDisc,
  ButtonLink,
  ButtonNeutralIconLink,
  ButtonIconLinkLabeled,
} from "@palashjain95/touchable";

<Button size="default" fullWidth={false}>Save</Button>
<ButtonNeutral size="compact" fullWidth={false}>Cancel</ButtonNeutral>
<ButtonDestructive fullWidth>Delete</ButtonDestructive>
<ButtonInverse size="compact" fullWidth={false}>Get started</ButtonInverse>
<ButtonLink href="/tokens">View tokens</ButtonLink>
<ButtonIconLinkLabeled href="/docs" label="How to use" icon={<Icon />} />

// size: "default" | "compact"  (44px / 36px)
// ButtonDisc: swatchColor for theme picker
// ButtonIconLinkLabeled: round icon link + label beside`,
    agentPrompt:
      "Use Touchable Button for the main action; ButtonNeutral secondary; ButtonDestructive for delete; ButtonInverse on --surface-inverse; ButtonLink for text links; ButtonIconLinkLabeled for icon+label links; ButtonDisc for colour picker. iOS haptics are automatic; configureHaptics({ enabled: false }) to disable globally.",
  },
  searchField: {
    code: `import { SearchField } from "@palashjain95/touchable";

<SearchField variant="pill" placeholder="Search projects" />
<SearchField variant="field" placeholder="Search…" className="w-full" />

// variant: "pill" | "field"`,
    agentPrompt:
      "Add a Touchable SearchField: variant pill in toolbars, variant field for full-width search rows.",
  },
  inputField: {
    code: `import { InputField } from "@palashjain95/touchable";

<InputField name="displayName" placeholder="My Project" defaultValue="Notey.app" />
<InputField size="default" type="date" name="date" />

// size: "compact" (h-8) | "default" (h-11)
// inputFieldClass(size) for raw <input> with same tokens`,
    agentPrompt:
      "Use Touchable InputField with a visible <label htmlFor>; size compact for dense settings, default for primary forms; set invalid or aria-invalid when validation fails.",
  },
  combobox: {
    code: `import {
  Combobox,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxContent,
  ComboboxItem,
} from "@palashjain95/touchable";

<Combobox defaultValue="welcome">
  <ComboboxTrigger variant="field" aria-label="Event type">
    <ComboboxValue placeholder="Select event type…" />
  </ComboboxTrigger>
  <ComboboxContent>
    <ComboboxItem value="welcome">Welcome</ComboboxItem>
    <ComboboxItem value="recital">Recital</ComboboxItem>
  </ComboboxContent>
</Combobox>

// Same as Dropdown. Radix Select with combobox role on trigger.`,
    agentPrompt:
      "Use Touchable Combobox (or Dropdown) with variant field in forms and pill in filters; fixed option lists only.",
  },
  dropdown: {
    code: `import {
  Dropdown,
  DropdownTrigger,
  DropdownValue,
  DropdownContent,
  DropdownItem,
} from "@palashjain95/touchable";

<Dropdown defaultValue="mine">
  <DropdownTrigger variant="pill" aria-label="Filter projects">
    <DropdownValue placeholder="Filter projects" />
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem value="all">All projects</DropdownItem>
    <DropdownItem value="mine">Created by me</DropdownItem>
  </DropdownContent>
</Dropdown>

// DropdownTrigger variant: "pill" | "field"`,
    agentPrompt:
      "Use Touchable Dropdown with pill trigger for filters and field trigger in forms; control value with defaultValue or controlled state.",
  },
  formCard: {
    code: `import {
  Card,
  Button,
  ButtonNeutral,
  InputField,
  Combobox,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxContent,
  ComboboxItem,
} from "@palashjain95/touchable";

<Card size="rectangle" className="p-5 md:p-6">
  <form className="space-y-4" onSubmit={…}>
    <InputField size="default" name="title" placeholder="Spring recital" />
    <Combobox defaultValue="welcome">
      <ComboboxTrigger variant="field" id="event-type">
        <ComboboxValue placeholder="Select…" />
      </ComboboxTrigger>
      <ComboboxContent>…</ComboboxContent>
    </Combobox>
    <Button type="submit" fullWidth={false}>Save</Button>
    <ButtonNeutral type="button" fullWidth={false}>Cancel</ButtonNeutral>
  </form>
</Card>`,
    agentPrompt:
      "Put this form in a Touchable Card size rectangle: native inputs for text/date, field Dropdown for selects, Button submit + ButtonNeutral cancel.",
  },
  card: {
    code: `import { Card } from "@palashjain95/touchable";

<Card size="rectangle" urgency="warning">…panel…</Card>
<Card size="compact" interactive urgency="success">…tappable row…</Card>
<Card size="portrait">…square tile…</Card>
<Card size="tray">…horizontal strip…</Card>

// size: "rectangle" | "compact" | "portrait" | "tray"
// urgency?: "warning" | "moderate" | "success"
// interactive?: boolean (compact rows)`,
    agentPrompt:
      "Use Touchable Card: size rectangle for panels, compact+interactive for pressable rows, portrait/tray for tiles; add urgency only when status matters.",
  },
  pill: {
    code: `import { PillNeutral, PillAccent } from "@palashjain95/touchable";

<PillNeutral interactive role="button">Filter</PillNeutral>
<PillAccent style={{ "--bg-accent": "var(--primary)" }}>Selected</PillAccent>

// PillAccent: set --bg-accent for selected chip colour`,
    agentPrompt:
      "Use Touchable PillNeutral for filters/tags; PillAccent with --bg-accent var(--primary) for the selected chip.",
  },
  tabs: {
    code: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@palashjain95/touchable";

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="details">Details</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">…</TabsContent>
  <TabsContent value="details">…</TabsContent>
</Tabs>`,
    agentPrompt:
      "Add Touchable Tabs for this screen: TabsList + TabsTrigger labels + TabsContent panels per section.",
  },
  icon: {
    code: `import { Icon } from "@palashjain95/touchable";
import { HomeIcon } from "@heroicons/react/24/outline";

<Icon as={HomeIcon} size="md" />

// size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"`,
    agentPrompt:
      "Use Touchable Icon with Heroicons at size md for nav and inline actions; pass the icon component via as=.",
  },
} satisfies Record<string, ComponentSnippet>;
