import type { ReactNode } from "react";
import { useState } from "react";
import { ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/outline";
import { ButtonNeutral } from "@palashjain95/touchable";

export function Preview({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface-base))] p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export function PreviewGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

export function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-10 space-y-4">
      <div>
        <h2 className="font-display text-xl font-semibold text-[var(--fg-primary)]">{title}</h2>
        {description ? <p className="mt-1 text-sm text-[var(--fg-secondary)]">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="max-w-full overflow-x-auto rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface-depth))] p-4 text-xs leading-relaxed text-[var(--fg-primary)]">
      <code className="block whitespace-pre-wrap break-words">{code.trim()}</code>
    </pre>
  );
}

export function CopyButton({
  text,
  label = "Copy prompt",
  className = "",
  variant = "default",
}: {
  text: string;
  label?: string;
  className?: string;
  /** Icon + short “prompt” label for component gallery sidebar */
  variant?: "default" | "prompt";
}) {
  const [copied, setCopied] = useState(false);
  const ariaLabel = variant === "prompt" ? "Copy prompt" : label;

  return (
    <div className={className}>
      <ButtonNeutral
        type="button"
        size="compact"
        fullWidth={false}
        aria-label={ariaLabel}
        onClick={() => {
          void navigator.clipboard.writeText(text.trim());
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
      >
        {variant === "prompt" ? (
          <>
            {copied ? (
              <CheckIcon data-default-size aria-hidden />
            ) : (
              <ClipboardDocumentIcon data-default-size aria-hidden />
            )}
            <span>{copied ? "Copied" : "prompt"}</span>
          </>
        ) : (
          (copied ? "Copied" : label)
        )}
      </ButtonNeutral>
    </div>
  );
}

export function CopyPrompt({ code, label }: { code: string; label?: string }) {
  return (
    <>
      <CodeBlock code={code} />
      <CopyButton text={code} label={label} className="mt-2" />
    </>
  );
}

export function ComponentUsage({ agentPrompt }: { agentPrompt: string }) {
  return (
    <aside className="shrink-0 lg:sticky lg:top-8">
      <CopyButton text={agentPrompt} variant="prompt" />
    </aside>
  );
}

export function ComponentSection({
  title,
  description,
  agentPrompt,
  children,
}: {
  title: string;
  description?: string;
  agentPrompt: string;
  children: ReactNode;
}) {
  return (
    <Section title={title} description={description}>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
        <div className="min-w-0 space-y-4">{children}</div>
        <ComponentUsage agentPrompt={agentPrompt} />
      </div>
    </Section>
  );
}
