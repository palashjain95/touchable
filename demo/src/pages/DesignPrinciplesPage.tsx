import { useState, type ReactNode } from "react";
import {
  Button,
  ButtonDisc,
  ButtonNeutral,
  Card,
  cn,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@palashjain95/touchable";
import { LOVABLE_LOGO } from "../lib/brandLogos";

const PRINCIPLES = [
  { lead: "Readable", line: "Type and contrast come first." },
  { lead: "Touch first", line: "44px targets. Press states on tap." },
  { lead: "Crisp", line: "1px rims. Defined edges." },
  { lead: "Simple", line: "Few variants. Strong defaults." },
  { lead: "Modern", line: "iOS haptics built in. Feel the UI on tap." },
] as const;

const WEEK_DAYS = [
  { id: "mon", label: "M", name: "Monday", minutes: "32m", sessions: "1 session · 1 piece" },
  { id: "tue", label: "T", name: "Tuesday", minutes: "0m", sessions: "No practice" },
  { id: "wed", label: "W", name: "Wednesday", minutes: "48m", sessions: "2 sessions · 2 pieces" },
  { id: "thu", label: "T", name: "Thursday", minutes: "20m", sessions: "1 session · 1 piece" },
  { id: "fri", label: "F", name: "Friday", minutes: "40m", sessions: "1 session · 2 pieces" },
  { id: "sat", label: "S", name: "Saturday", minutes: "0m", sessions: "No practice" },
  { id: "sun", label: "S", name: "Sunday", minutes: "1h", sessions: "2 sessions · 2 pieces" },
] as const;

type WeekDayId = (typeof WEEK_DAYS)[number]["id"];

/** One screen: pick day → pick view → read detail → act. */
function SurfaceShowcase() {
  const [day, setDay] = useState<WeekDayId>("wed");
  const selected = WEEK_DAYS.find((d) => d.id === day) ?? WEEK_DAYS[2];

  return (
    <div className="flex min-w-0 flex-col gap-5">
      <header className="space-y-1">
        <p className="text-sm font-medium text-[var(--fg-primary)]">Practice log</p>
        <p className="text-xs text-[var(--fg-secondary)]">This week. Tap a day, then review.</p>
      </header>

      <div className="flex justify-between gap-1" role="group" aria-label="Days this week">
        {WEEK_DAYS.map((d) => (
          <ButtonDisc
            key={d.id}
            type="button"
            selected={day === d.id}
            aria-label={d.name}
            onClick={() => setDay(d.id)}
          >
            {d.label}
          </ButtonDisc>
        ))}
      </div>

      <Tabs defaultValue="piece" className="w-full min-w-0 space-y-4">
        <TabsList>
          <TabsTrigger value="piece">Piece</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>
        <TabsContent value="piece" className="mt-0">
          <Card size="compact" className="p-3">
            <p className="text-xs text-[var(--fg-secondary)]">Up next</p>
            <p className="mt-1 text-sm font-medium text-[var(--fg-primary)]">Nocturne in E-flat</p>
            <p className="mt-0.5 text-xs text-[var(--fg-secondary)]">
              Chopin ·{" "}
              {selected.sessions === "No practice"
                ? "not practiced"
                : `${selected.minutes} on ${selected.name}`}
            </p>
          </Card>
        </TabsContent>
        <TabsContent value="summary" className="mt-0">
          <Card size="compact" className="p-3">
            <p className="text-xs text-[var(--fg-secondary)]">{selected.name}</p>
            <p className="mt-1 font-display text-lg font-semibold text-[var(--fg-primary)]">
              {selected.minutes}
            </p>
            <p className="mt-0.5 text-xs text-[var(--fg-secondary)]">{selected.sessions}</p>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col gap-3">
        <Button type="button" fullWidth>
          Start practice
        </Button>
        <ButtonNeutral type="button" size="compact" fullWidth>
          Log session manually
        </ButtonNeutral>
      </div>
    </div>
  );
}

/** Background panel; `.light` / `.dark` apply Touchable tokens inside. */
function SurfacePanel({ isDark, children }: { isDark: boolean; children: ReactNode }) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-xl border border-[hsl(var(--border))] p-5",
        isDark ? "dark" : "light",
      )}
    >
      <div aria-hidden className="absolute inset-0 bg-[hsl(var(--background))]" />
      <div className="relative min-w-0">{children}</div>
    </div>
  );
}

const FINISH_COLUMNS = [
  { mode: "Light", finish: "Matte", description: "Soft paper.", isDark: false },
  { mode: "Dark", finish: "Sheen", description: "Quiet gloss.", isDark: true },
] as const;

function FinishColumn({ mode, finish, description, isDark }: (typeof FINISH_COLUMNS)[number]) {
  return (
    <div className="min-w-0 space-y-4">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--fg-tertiary)]">{mode}</p>
        <p className="mt-0.5 font-display text-lg font-semibold text-[var(--fg-primary)]">{finish}</p>
        <p className="mt-1 text-sm text-[var(--fg-secondary)]">{description}</p>
      </div>
      <SurfacePanel isDark={isDark}>
        <SurfaceShowcase />
      </SurfacePanel>
    </div>
  );
}

function AppleLogo() {
  return (
    <svg
      role="img"
      aria-label="Apple"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="size-9 shrink-0 text-[var(--fg-primary)]"
      fill="currentColor"
    >
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  );
}

function InspirationBrands() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-medium uppercase tracking-wide text-[var(--fg-tertiary)]">
        Inspired by
      </p>
      <div className="flex flex-wrap items-center gap-8">
        <img
          src={LOVABLE_LOGO}
          alt="Lovable"
          className="size-9 shrink-0 object-contain"
        />
        <AppleLogo />
      </div>
    </div>
  );
}

function PrincipleCard({ lead, line }: { lead: string; line: string }) {
  return (
    <Card size="compact" className="h-full p-4">
      <p className="font-display text-xl font-semibold tracking-tight text-[var(--fg-primary)]">{lead}</p>
      <p className="mt-2 text-sm leading-relaxed text-[var(--fg-secondary)]">{line}</p>
    </Card>
  );
}

export function DesignPrinciplesPage() {
  return (
    <div className="space-y-12">
      <header className="mb-8 space-y-4 md:mb-12">
        <h1 className="flex flex-wrap items-baseline gap-x-1.5 text-3xl font-semibold leading-tight text-[var(--fg-primary)] md:gap-y-0 md:text-5xl md:leading-none">
          <span>Build something</span>
          <span className="text-6xl font-bold text-[var(--primary)] md:text-5xl">Touchable</span>
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-[var(--fg-secondary)]">
          A React UI library built for thumbs.
        </p>
      </header>

      <section className="space-y-4" aria-labelledby="principles-heading">
        <h2 id="principles-heading" className="text-sm font-medium text-[var(--fg-primary)]">
          Principles
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {PRINCIPLES.map((p) => (
            <PrincipleCard key={p.lead} {...p} />
          ))}
        </div>
      </section>

      <section className="mt-8 space-y-5" aria-labelledby="finishes-heading">
        <div className="space-y-3">
          <p className="text-xs font-normal tracking-wide text-[var(--primary)]">Touchable</p>
          <h2 id="finishes-heading" className="text-sm font-medium text-[var(--fg-primary)]">
            Finishes
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {FINISH_COLUMNS.map((column) => (
              <FinishColumn key={column.finish} {...column} />
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-12" aria-labelledby="inspiration-heading">
          <h2 id="inspiration-heading" className="text-sm font-medium text-[var(--fg-primary)]">
            Inspiration
          </h2>
          <InspirationBrands />
          <p className="max-w-prose text-xs leading-relaxed text-[var(--fg-secondary)]">
            Inspired by Lovable and Apple. Touchable picks up pieces from both.
          </p>
        </div>
      </section>
    </div>
  );
}
