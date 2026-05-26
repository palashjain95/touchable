import type { CSSProperties, ReactNode } from "react";
import {
  Button,
  ButtonNeutral,
  ButtonTertiary,
  ButtonOutline,
  ButtonInverse,
  ButtonIcon,
  ButtonDisc,
  ButtonLink,
  ButtonIconLinkLabeled,
  Card,
  PillNeutral,
  PillAccent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  DropdownValue,
  SearchField,
  InputField,
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxTrigger,
  ComboboxValue,
  Icon,
  pressableDivProps,
} from "@palashjain95/touchable";
import { PlusIcon, HomeIcon, MicrophoneIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { ComponentSection, Preview, PreviewGrid } from "../components/docs/DocsPrimitives";
import { PrimaryColorPicker } from "../components/docs/PrimaryColorPicker";
import { componentSnippets } from "../content/componentSnippets";

const iconSizes = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;

function SizeLabel({ children }: { children: ReactNode }) {
  return <p className="mb-2 text-xs font-medium text-[var(--fg-tertiary)]">{children}</p>;
}

export function ComponentsPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-[var(--fg-primary)]">
            Touchable
          </h1>
          <div className="flex flex-col items-end gap-1">
            <p className="text-xs font-medium text-[var(--fg-tertiary)]">Pick your brand colour</p>
            <PrimaryColorPicker />
          </div>
        </div>
        <p className="text-lg text-[var(--fg-secondary)]">
          Touch-first React components: crisp, readable, and intentionally designed.
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-1">
          <Button fullWidth={false} size="compact" onClick={() => navigate("/docs/how-to-use")}>
            Get started
          </Button>
          <ButtonOutline fullWidth={false} size="compact" onClick={() => navigate("/docs/tokens")}>
            Tokens
          </ButtonOutline>
          <ButtonNeutral fullWidth={false} size="compact" onClick={() => navigate("/docs/haptics")}>
            Haptics
          </ButtonNeutral>
        </div>
      </header>

      <ComponentSection
        title="Button"
        description="Primary, neutral, tertiary, outline, inverse, icon, disc, link, and icon link with label."
        agentPrompt={componentSnippets.button.agentPrompt}
      >
        <PreviewGrid>
          <Button fullWidth={false}>Primary</Button>
          <ButtonNeutral fullWidth={false}>Neutral</ButtonNeutral>
          <ButtonTertiary fullWidth={false}>Tertiary</ButtonTertiary>
          <ButtonOutline fullWidth={false}>Outline</ButtonOutline>
          <ButtonInverse type="button" fullWidth={false}>
            Inverse
          </ButtonInverse>
        </PreviewGrid>
        <Preview className="mt-4 space-y-4">
          <div>
            <p className="mb-2 text-xs font-medium text-[var(--fg-tertiary)]">Disc</p>
            <div className="flex flex-wrap items-center gap-4">
              <ButtonDisc type="button" aria-label="10 minute practice">
                10
              </ButtonDisc>
              <ButtonDisc type="button" aria-label="Voice practice">
                <MicrophoneIcon className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
              </ButtonDisc>
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-[var(--fg-tertiary)]">Link</p>
            <div className="flex flex-wrap items-center gap-4">
              <ButtonLink href="/docs/tokens">View tokens</ButtonLink>
              <ButtonIconLinkLabeled
                href="/docs/how-to-use"
                label="How to use"
                icon={<BookOpenIcon data-default-size aria-hidden />}
              />
            </div>
          </div>
          <div>
            <SizeLabel>Size</SizeLabel>
            <div className="flex flex-wrap gap-6">
              <div className="flex flex-col items-start gap-2">
                <span className="text-sm text-[var(--fg-primary)]">Default</span>
                <p className="text-xs font-medium text-[var(--fg-tertiary)]">default · h-11 (44px)</p>
                <Button size="default" fullWidth={false}>
                  Button
                </Button>
              </div>
              <div className="flex flex-col items-start gap-2">
                <span className="text-sm text-[var(--fg-primary)]">Compact</span>
                <p className="text-xs font-medium text-[var(--fg-tertiary)]">compact · h-9 (36px)</p>
                <Button size="compact" fullWidth={false}>
                  Button
                </Button>
              </div>
              <div className="flex flex-col items-start gap-2">
                <span className="text-sm text-[var(--fg-primary)]">Icon</span>
                <p className="text-xs font-medium text-[var(--fg-tertiary)]">icon · default</p>
                <ButtonIcon aria-label="Add">
                  <PlusIcon data-default-size aria-hidden />
                </ButtonIcon>
              </div>
              <div className="flex flex-col items-start gap-2">
                <span className="text-sm text-[var(--fg-primary)]">Disabled</span>
                <p className="text-xs font-medium text-[var(--fg-tertiary)]">disabled</p>
                <Button disabled fullWidth={false}>
                  Button
                </Button>
              </div>
            </div>
          </div>
        </Preview>
      </ComponentSection>

      <ComponentSection
        title="Card"
        description="Border radius follows size: rectangle panels use rounded-3xl; compact rows and portrait tiles use rounded-xl."
        agentPrompt={componentSnippets.card.agentPrompt}
      >
        <Preview className="space-y-4">
          <div>
            <SizeLabel>size rectangle · rounded-3xl</SizeLabel>
            <Card size="rectangle" urgency="warning">
              <div className="p-5 md:p-6">
                <h3 className="font-display text-lg text-[var(--fg-primary)]">Spring Recital</h3>
                <p className="mt-1 text-sm text-[var(--fg-secondary)]">
                  Saturday, 14 June · Royal Festival Hall
                </p>
              </div>
            </Card>
          </div>

          <div>
            <SizeLabel>size compact · interactive · rounded-xl</SizeLabel>
            <Card
              size="compact"
              interactive
              urgency="success"
              aria-label="Open piece: Nocturne in E-flat by Chopin"
              onClick={() => {}}
            >
              <div className="flex items-stretch justify-between p-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-[var(--fg-primary)]">Nocturne in E-flat</p>
                  <p className="truncate text-xs text-[var(--fg-secondary)]">Chopin</p>
                </div>
                <span className="ml-3 shrink-0 text-xs tabular-nums text-[var(--fg-secondary)]">
                  4 min
                </span>
              </div>
            </Card>
          </div>

          <div>
            <SizeLabel>size compact · static · rounded-xl</SizeLabel>
            <Card size="compact" urgency="moderate">
              <div className="flex items-stretch justify-between p-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-[var(--fg-primary)]">Prelude in C major</p>
                  <p className="truncate text-xs text-[var(--fg-secondary)]">Bach</p>
                </div>
                <span className="ml-3 shrink-0 text-xs tabular-nums text-[var(--fg-secondary)]">
                  2 min
                </span>
              </div>
            </Card>
          </div>

          <div className="max-w-[11rem]">
            <SizeLabel>size portrait · rounded-xl</SizeLabel>
            <Card size="portrait">
              <div className="flex aspect-square flex-col p-3 sm:p-4">
                <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--fg-secondary)]">
                  Mar
                </p>
                <p className="font-display text-2xl tabular-nums leading-none text-[var(--fg-primary)]">
                  12
                </p>
                <div className="flex flex-1 flex-col items-center justify-center py-2">
                  <p className="font-display text-3xl tabular-nums leading-none text-[var(--fg-primary)]">
                    45
                  </p>
                  <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-[var(--fg-secondary)]">
                    min
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div>
            <SizeLabel>size tray · rounded-full</SizeLabel>
            <Card size="tray">
              <div className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-[var(--fg-secondary)]">
                Horizontal pill strip
              </div>
            </Card>
          </div>
        </Preview>
      </ComponentSection>

      <ComponentSection
        title="Form in Card"
        description="Field group inside a rectangle Card: native inputs, field Dropdown, primary + neutral actions."
        agentPrompt={componentSnippets.formCard.agentPrompt}
      >
        <Preview>
          <Card size="rectangle" className="p-5 md:p-6">
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="space-y-1.5">
                <label htmlFor="demo-title" className="text-sm font-medium text-[var(--fg-primary)]">
                  Title
                </label>
                <InputField
                  id="demo-title"
                  name="title"
                  size="default"
                  type="text"
                  placeholder="Spring recital"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="demo-type" className="text-sm font-medium text-[var(--fg-primary)]">
                  Event type
                </label>
                <Combobox defaultValue="welcome">
                  <ComboboxTrigger variant="field" id="demo-type">
                    <ComboboxValue placeholder="Select event type..." />
                  </ComboboxTrigger>
                  <ComboboxContent>
                    <ComboboxItem value="welcome">Welcome</ComboboxItem>
                    <ComboboxItem value="recital">Recital</ComboboxItem>
                    <ComboboxItem value="rehearsal">Rehearsal</ComboboxItem>
                  </ComboboxContent>
                </Combobox>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="demo-date" className="text-sm font-medium text-[var(--fg-primary)]">
                  Date
                </label>
                <InputField id="demo-date" name="date" size="default" type="date" />
              </div>
              <div className="flex flex-wrap gap-3 pt-1">
                <Button type="submit" fullWidth={false}>
                  Save
                </Button>
                <ButtonNeutral type="button" fullWidth={false}>
                  Cancel
                </ButtonNeutral>
              </div>
            </form>
          </Card>
        </Preview>
      </ComponentSection>

      <ComponentSection
        title="Pill"
        description="Compact labels and filter chips."
        agentPrompt={componentSnippets.pill.agentPrompt}
      >
        <Preview className="flex flex-wrap gap-2">
          <PillNeutral>Draft</PillNeutral>
          <PillAccent style={{ "--bg-accent": "var(--primary)" } as CSSProperties}>
            Selected
          </PillAccent>
          <PillNeutral
            interactive
            aria-label="Filter"
            {...pressableDivProps({ onClick: () => {} })}
          >
            Filter
          </PillNeutral>
        </Preview>
      </ComponentSection>

      <ComponentSection
        title="Tabs"
        description="Segmented control with sliding indicator."
        agentPrompt={componentSnippets.tabs.agentPrompt}
      >
        <Preview>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Card size="rectangle" className="mt-4 p-4">
                Overview panel
              </Card>
            </TabsContent>
            <TabsContent value="details">
              <Card size="rectangle" className="mt-4 p-4">
                Details panel
              </Card>
            </TabsContent>
            <TabsContent value="notes">
              <Card size="rectangle" className="mt-4 p-4">
                Notes panel
              </Card>
            </TabsContent>
          </Tabs>
        </Preview>
      </ComponentSection>

      <ComponentSection
        title="SearchField"
        description="Search input with icon. Pill for toolbars; field for full-width rows."
        agentPrompt={componentSnippets.searchField.agentPrompt}
      >
        <Preview className="flex flex-wrap items-end gap-6">
          <div>
            <SizeLabel>variant pill</SizeLabel>
            <SearchField variant="pill" placeholder="Search projects" />
          </div>
          <div className="min-w-[12rem] flex-1">
            <SizeLabel>variant field</SizeLabel>
            <SearchField variant="field" placeholder="Search pieces..." />
          </div>
        </Preview>
      </ComponentSection>

      <ComponentSection
        title="InputField"
        description="Native text inputs for forms and settings. Compact h-8 matches Notey field rows; default h-11 for primary forms."
        agentPrompt={componentSnippets.inputField.agentPrompt}
      >
        <Preview className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="demo-display-name" className="text-sm font-medium text-[var(--fg-primary)]">
              Display name
            </label>
            <InputField
              id="demo-display-name"
              name="displayName"
              placeholder="My Project"
              defaultValue="Notey.app"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="demo-input-title" className="text-sm font-medium text-[var(--fg-primary)]">
              Title
            </label>
            <InputField
              id="demo-input-title"
              size="default"
              name="title"
              placeholder="Spring recital"
            />
          </div>
        </Preview>
      </ComponentSection>

      <ComponentSection
        title="Dropdown"
        description="Select control. Pill trigger for filters; field trigger for forms."
        agentPrompt={componentSnippets.dropdown.agentPrompt}
      >
        <Preview className="flex flex-wrap items-end gap-6">
          <div>
            <SizeLabel>variant pill</SizeLabel>
            <Dropdown defaultValue="mine">
              <DropdownTrigger variant="pill" aria-label="Project filter">
                <DropdownValue placeholder="Filter projects" />
              </DropdownTrigger>
              <DropdownContent>
                <DropdownItem value="all">All projects</DropdownItem>
                <DropdownItem value="mine">Created by me</DropdownItem>
                <DropdownItem value="shared">Shared with me</DropdownItem>
              </DropdownContent>
            </Dropdown>
          </div>
          <div className="w-full max-w-xs">
            <SizeLabel>variant field</SizeLabel>
            <Dropdown defaultValue="welcome">
              <DropdownTrigger variant="field" aria-label="Event type">
                <DropdownValue placeholder="Select event type..." />
              </DropdownTrigger>
              <DropdownContent>
                <DropdownItem value="welcome">Welcome</DropdownItem>
                <DropdownItem value="recital">Recital</DropdownItem>
                <DropdownItem value="rehearsal">Rehearsal</DropdownItem>
              </DropdownContent>
            </Dropdown>
          </div>
        </Preview>
      </ComponentSection>

      <ComponentSection
        title="Combobox"
        description="Fixed-option select (same as Dropdown). Trigger exposes combobox role; use field variant in forms."
        agentPrompt={componentSnippets.combobox.agentPrompt}
      >
        <Preview className="flex flex-wrap items-end gap-6">
          <div className="w-full max-w-xs">
            <SizeLabel>variant field</SizeLabel>
            <Combobox defaultValue="welcome">
              <ComboboxTrigger variant="field" aria-label="Event type">
                <ComboboxValue placeholder="Select event type..." />
              </ComboboxTrigger>
              <ComboboxContent>
                <ComboboxItem value="welcome">Welcome</ComboboxItem>
                <ComboboxItem value="recital">Recital</ComboboxItem>
                <ComboboxItem value="rehearsal">Rehearsal</ComboboxItem>
              </ComboboxContent>
            </Combobox>
          </div>
        </Preview>
      </ComponentSection>

      <ComponentSection
        title="Icon"
        description="Sized wrapper for Heroicons and SVGs."
        agentPrompt={componentSnippets.icon.agentPrompt}
      >
        <Preview>
          <SizeLabel>Size scale</SizeLabel>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {iconSizes.map((size) => (
              <div key={size} className="flex flex-col items-start gap-2">
                <SizeLabel>size {size}</SizeLabel>
                <Icon as={HomeIcon} size={size} />
              </div>
            ))}
          </div>
        </Preview>
      </ComponentSection>
    </div>
  );
}
