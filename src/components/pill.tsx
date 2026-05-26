import * as React from 'react';
import type { ReactNode } from 'react';

import { cn } from '../lib/utils';

const PILL_NEUTRAL_TOKEN_STYLE = {
  '--border-default': '1px',
} as React.CSSProperties;

const PILL_NEUTRAL_SHELL_STYLE: React.CSSProperties = {
  color: 'var(--fg-primary)',
  background: 'var(--bg-translucent)',
  ...PILL_NEUTRAL_TOKEN_STYLE,
};

const PILL_ACCENT_TOKEN_STYLE = {
  '--border-default': '1px',
} as React.CSSProperties;

const PILL_NEUTRAL_FX = {
  dropShadow: {
    boxShadow:
      'light-dark(oklch(0 0 0 / 0.04), oklch(0 0 0 / 0.12)) 0px 2px 2px -1px, light-dark(oklch(0 0 0 / 0.02), oklch(0 0 0 / 0.12)) 0px 4px 4px -2px',
    ...PILL_NEUTRAL_TOKEN_STYLE,
  },
  interaction: {
    backgroundColor: 'light-dark(oklch(0 0 0), oklch(1 0 0))',
    '--_resting': '0',
    '--_hover': '0.04',
    '--_pressed': '0.06',
    '--_dark-resting': '0',
    '--_dark-hover': '0.08',
    '--_dark-pressed': '0.12',
    ...PILL_NEUTRAL_TOKEN_STYLE,
  } as React.CSSProperties,
  spotlights: {
    boxShadow:
      'light-dark(oklch(1 0 0), transparent) 0px 2px 0px -1px inset, light-dark(oklch(1 0 0 / 0.8), transparent) 0px -2px 0px -1px inset',
    ...PILL_NEUTRAL_TOKEN_STYLE,
  },
  domeOverlay: {
    backgroundImage:
      'linear-gradient(light-dark(transparent, oklch(1 0 0 / 0.04)), light-dark(oklch(0 0 0 / 0.04), transparent))',
    ...PILL_NEUTRAL_TOKEN_STYLE,
  },
  rim: {
    boxShadow:
      'inset 0 0 0 var(--border-default) light-dark(oklch(0 0 0 / 0.16), oklch(1 0 0 / 0.16))',
    ...PILL_NEUTRAL_TOKEN_STYLE,
  },
  secondarySpotlights: {
    boxShadow:
      'light-dark(oklch(0 0 0 / 0.08), oklch(1 0 0 / 0.16)) 0px 0.5px 0px 0px inset, light-dark(oklch(0 0 0 / 0.16), oklch(1 0 0 / 0.04)) 0px -0.5px 0px 0px inset',
    ...PILL_NEUTRAL_TOKEN_STYLE,
  },
} as const;

const PILL_ACCENT_FX = {
  dropShadow: {
    boxShadow:
      '0 2px 2px -1px light-dark(oklch(from var(--bg-accent) 0.2 calc(c * 1.2) h / 0.12), oklch(from var(--bg-accent) 0.2 calc(c * 1.2) h / 0.24)), 0 4px 4px -2px light-dark(oklch(from var(--bg-accent) 0.2 calc(c * 1.2) h / 0.12), oklch(from var(--bg-accent) 0.2 calc(c * 1.2) h / 0.24))',
    ...PILL_ACCENT_TOKEN_STYLE,
  },
  interaction: {
    backgroundColor:
      'light-dark(oklch(from var(--bg-accent) calc(l - 0.1) c h / 1), oklch(from var(--bg-accent) calc(l + 0.15) c h / 0.7))',
    '--_resting': '0',
    '--_hover': '0.4',
    '--_pressed': '0.64',
    '--_dark-resting': '0',
    '--_dark-hover': '0.4',
    '--_dark-pressed': '0.8',
    ...PILL_ACCENT_TOKEN_STYLE,
  } as React.CSSProperties,
  spotlights: {
    boxShadow:
      'inset 0 1px 0 0px light-dark(oklch(from var(--bg-accent) 0.98 0.01 h / 0.16), transparent), inset 0 -1px 0 0px light-dark(oklch(from var(--bg-accent) 0.98 0.01 h / 0.08), transparent), inset 0 0.5px 0 0px light-dark(transparent, oklch(from var(--bg-accent) 0.98 0.01 h / 0.16)), inset 0 -0.5px 0 0px light-dark(transparent, oklch(from var(--bg-accent) 0.98 0.01 h / 0.08))',
    ...PILL_ACCENT_TOKEN_STYLE,
  },
  domeOverlay: {
    backgroundImage:
      'linear-gradient(light-dark(transparent, oklch(1 0 0 / 0.08)), light-dark(oklch(0 0 0 / 0.08), transparent))',
    ...PILL_ACCENT_TOKEN_STYLE,
  },
  rim: {
    boxShadow:
      'inset 0 0 0 var(--border-default) light-dark(oklch(from var(--bg-accent) calc(l - 0.2) calc(c * 0.75) h), oklch(from var(--bg-accent) 0.98 0.01 h / 0.32))',
    ...PILL_ACCENT_TOKEN_STYLE,
  },
  secondarySpotlights: {
    boxShadow:
      'light-dark(oklch(1 0 0 / 0.08), oklch(1 0 0 / 0)) 0px 0.5px 0px 0px inset, light-dark(oklch(0 0 0 / 0.16), oklch(0 0 0 / 0)) 0px -0.5px 0px 0px inset',
    ...PILL_ACCENT_TOKEN_STYLE,
  },
} as const;

type PillFxStyles = typeof PILL_NEUTRAL_FX | typeof PILL_ACCENT_FX;

const PILL_INTERACTION_LAYER_CLASS =
  'pointer-events-none absolute inset-0 rounded-[inherit] will-change-opacity transition-opacity duration-150 group-hover:duration-0 group-active:duration-0 z-0 [@media(hover:none)]:hidden opacity-[var(--_resting)] dark:opacity-[var(--_dark-resting)] [.pill-primitive:hover>&]:opacity-[var(--_hover)] dark:[.pill-primitive:hover>&]:opacity-[var(--_dark-hover)] [.pill-primitive:active>&]:opacity-[var(--_pressed)] dark:[.pill-primitive:active>&]:opacity-[var(--_dark-pressed)]';

/** Chip tier: below compact button (h-9 / 36px), above legacy 11px glass-pill (~20px). */
const PILL_SHELL_CLASS =
  'pill-primitive group relative isolate inline-flex max-w-full shrink-0 items-center overflow-hidden whitespace-nowrap backdrop-blur-xl rounded-full font-body text-xs font-medium leading-none min-h-6 px-2.5 py-1';

const PILL_BODY_CLASS = 'relative z-30 inline-flex items-center justify-center gap-1';

function PillFxLayers({
  styles,
  interactive,
}: {
  styles: PillFxStyles;
  interactive?: boolean;
}) {
  const dropShadowClass = cn(
    'pointer-events-none absolute inset-0 rounded-[inherit] z-[-1]',
    interactive &&
      '[.pill-primitive:active>&]:opacity-0 transition-opacity duration-150 group-hover:duration-0 group-active:duration-0',
  );
  const spotlightClass = cn(
    'pointer-events-none absolute inset-0 rounded-[inherit] z-1',
    interactive &&
      '[.pill-primitive:active>&]:opacity-0 transition-opacity duration-150 group-hover:duration-0 group-active:duration-0',
  );

  return (
    <>
      <span data-fx-layer="drop-shadow" aria-hidden="true" className={dropShadowClass} style={styles.dropShadow} />
      {interactive ? (
        <span
          data-fx-layer="interaction"
          aria-hidden="true"
          className={PILL_INTERACTION_LAYER_CLASS}
          style={styles.interaction}
        />
      ) : null}
      <span data-fx-layer="spotlights" aria-hidden="true" className={spotlightClass} style={styles.spotlights} />
      <span
        data-fx-layer="dome-overlay"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-2"
        style={styles.domeOverlay}
      />
      <span
        data-fx-layer="rim"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-3"
        style={styles.rim}
      />
      <span
        data-fx-layer="secondary-spotlights"
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 rounded-[inherit] z-4',
          interactive &&
            '[.pill-primitive:active>&]:opacity-0 transition-opacity duration-150 group-hover:duration-0 group-active:duration-0',
        )}
        style={styles.secondarySpotlights}
      />
    </>
  );
}

export type PillVariant = 'neutral' | 'accent';

type PillOptions = {
  variant?: PillVariant;
  interactive?: boolean;
};

export type PillProps = PillOptions &
  Omit<React.HTMLAttributes<HTMLSpanElement>, 'className' | 'style'> & {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
  };

export function pillClass({
  interactive = false,
}: Pick<PillOptions, 'interactive'> = {}): string {
  return cn(PILL_SHELL_CLASS, interactive && 'cursor-pointer transition-transform duration-150 active:scale-[0.98]');
}

export function PillNeutral({
  interactive = false,
  children,
  className,
  ...props
}: PillProps) {
  return (
    <span
      data-pill=""
      className={cn(pillClass({ interactive }), className)}
      style={PILL_NEUTRAL_SHELL_STYLE}
      {...props}
    >
      <PillFxLayers styles={PILL_NEUTRAL_FX} interactive={interactive} />
      <span className={PILL_BODY_CLASS}>{children}</span>
    </span>
  );
}

export function PillAccent({
  interactive = false,
  children,
  className,
  style,
  ...props
}: PillProps) {
  return (
    <span
      data-pill=""
      className={cn(pillClass({ interactive }), className)}
      style={{ ...PILL_ACCENT_TOKEN_STYLE, ...style }}
      {...props}
    >
      <PillFxLayers styles={PILL_ACCENT_FX} interactive={interactive} />
      <span className={PILL_BODY_CLASS}>{children}</span>
    </span>
  );
}

export function Pill({
  variant = 'neutral',
  ...props
}: PillProps) {
  if (variant === 'accent') {
    return <PillAccent {...props} />;
  }
  return <PillNeutral {...props} />;
}
