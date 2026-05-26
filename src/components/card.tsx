import * as React from 'react';
import type { ReactNode } from 'react';

import { pressableDivProps } from '../lib/a11y';
import { withHapticPress, type HapticPressKind } from '../lib/haptics';
import { cn } from '../lib/utils';

const CARD_NEUTRAL_TOKEN_STYLE = {
  '--border-default': '1px',
} as React.CSSProperties;

const CARD_SHELL_STYLE: React.CSSProperties = {
  color: 'var(--fg-primary)',
  background: 'var(--bg-translucent)',
  ...CARD_NEUTRAL_TOKEN_STYLE,
};

const CARD_NEUTRAL_FX = {
  dropShadow: {
    boxShadow:
      'light-dark(oklch(0 0 0 / 0.04), oklch(0 0 0 / 0.12)) 0px 2px 2px -1px, light-dark(oklch(0 0 0 / 0.02), oklch(0 0 0 / 0.12)) 0px 4px 4px -2px',
    ...CARD_NEUTRAL_TOKEN_STYLE,
  },
  interaction: {
    backgroundColor: 'light-dark(oklch(0 0 0), oklch(1 0 0))',
    '--_resting': '0',
    '--_hover': '0.04',
    '--_pressed': '0.06',
    '--_dark-resting': '0',
    '--_dark-hover': '0.08',
    '--_dark-pressed': '0.12',
    ...CARD_NEUTRAL_TOKEN_STYLE,
  } as React.CSSProperties,
  spotlights: {
    boxShadow:
      'light-dark(oklch(1 0 0), transparent) 0px 2px 0px -1px inset, light-dark(oklch(1 0 0 / 0.8), transparent) 0px -2px 0px -1px inset',
    ...CARD_NEUTRAL_TOKEN_STYLE,
  },
  domeOverlay: {
    backgroundImage:
      'linear-gradient(light-dark(transparent, oklch(1 0 0 / 0.04)), light-dark(oklch(0 0 0 / 0.04), transparent))',
    ...CARD_NEUTRAL_TOKEN_STYLE,
  },
  rim: {
    boxShadow:
      'inset 0 0 0 var(--border-default) light-dark(oklch(0 0 0 / 0.16), oklch(1 0 0 / 0.16))',
    ...CARD_NEUTRAL_TOKEN_STYLE,
  },
  secondarySpotlights: {
    boxShadow:
      'light-dark(oklch(0 0 0 / 0.08), oklch(1 0 0 / 0.16)) 0px 0.5px 0px 0px inset, light-dark(oklch(0 0 0 / 0.16), oklch(1 0 0 / 0.04)) 0px -0.5px 0px 0px inset',
    ...CARD_NEUTRAL_TOKEN_STYLE,
  },
} as const;

type CardFxStyles = typeof CARD_NEUTRAL_FX;

/** Hover/active scoped to this card only, not ancestor `[data-card]` shells (nested lists). */
const CARD_INTERACTION_LAYER_CLASS =
  'pointer-events-none absolute inset-0 rounded-[inherit] will-change-opacity transition-opacity duration-150 group-hover:duration-0 group-active:duration-0 z-0 [@media(hover:none)]:hidden opacity-[var(--_resting)] dark:opacity-[var(--_dark-resting)] [.card-primitive:hover>&]:opacity-[var(--_hover)] dark:[.card-primitive:hover>&]:opacity-[var(--_dark-hover)] [.card-primitive:active>&]:opacity-[var(--_pressed)] dark:[.card-primitive:active>&]:opacity-[var(--_dark-pressed)]';

const CARD_SHELL_CLASS =
  'card-primitive group relative isolate w-full overflow-hidden backdrop-blur-xl';

const CARD_SIZE_CLASS = {
  /** Wide panels: calendar events, dashboard widgets. */
  default: 'rounded-3xl',
  /** Alias for `default`: horizontal rectangle panels. */
  rectangle: 'rounded-3xl',
  /** List rows: piece links, task cards; tighter radius than panels. */
  compact: 'rounded-xl',
  /** Square tiles: practice history; use `aspect-square` on the body. */
  portrait: 'rounded-xl',
  '4xl': 'rounded-4xl',
  tray: 'rounded-full',
} as const;

const CARD_BODY_CLASS = 'relative z-30 min-w-0';

export type CardSize = keyof typeof CARD_SIZE_CLASS;

export type CardUrgency =
  | 'moderate'
  | 'success'
  | 'warning'
  | 'critical'
  | 'featured'
  | 'featured-soft';

/** Semantic token names for urgency accents (icons, labels). */
export const cardUrgencyAccent = {
  critical: 'destructive',
  warning: 'warning',
  moderate: 'foreground',
  success: 'success',
  featured: 'primary',
  'featured-soft': 'primary',
} as const satisfies Record<CardUrgency, string>;

function urgencyAccentVar(urgency: CardUrgency): string {
  return `var(--${cardUrgencyAccent[urgency]})`;
}

function getCardFxStyles(urgency: CardUrgency): CardFxStyles {
  if (urgency === 'moderate') {
    return CARD_NEUTRAL_FX;
  }

  const accent = urgencyAccentVar(urgency);
  const borderAlpha =
    urgency === 'featured-soft' ? 0.45 : urgency === 'featured' ? 0.7 : 0.7;
  const ringAlpha =
    urgency === 'featured-soft'
      ? 0.12
      : urgency === 'success'
        ? 0.2
        : 0.2;

  const ring = `0 0 0 3px hsl(${accent} / ${ringAlpha})`;
  const rim = `inset 0 0 0 1px hsl(${accent} / ${borderAlpha})`;

  return {
    ...CARD_NEUTRAL_FX,
    dropShadow: {
      ...CARD_NEUTRAL_FX.dropShadow,
      boxShadow: `${ring}, ${CARD_NEUTRAL_FX.dropShadow.boxShadow}`,
    },
    rim: {
      ...CARD_NEUTRAL_FX.rim,
      boxShadow: rim,
    },
  };
}

function CardSurfaceFxLayers({
  styles,
  interactive,
}: {
  styles: CardFxStyles;
  interactive: boolean;
}) {
  const dropShadowClass = cn(
    'pointer-events-none absolute inset-0 rounded-[inherit] z-[-1]',
    interactive &&
      '[.card-primitive:active>&]:opacity-0 transition-opacity duration-150 group-hover:duration-0 group-active:duration-0',
  );
  const spotlightClass = cn(
    'pointer-events-none absolute inset-0 rounded-[inherit] z-1',
    interactive &&
      '[.card-primitive:active>&]:opacity-0 transition-opacity duration-150 group-hover:duration-0 group-active:duration-0',
  );

  return (
    <>
      <span data-fx-layer="drop-shadow" aria-hidden="true" className={dropShadowClass} style={styles.dropShadow} />
      {interactive ? (
        <span
          data-fx-layer="interaction"
          aria-hidden="true"
          className={CARD_INTERACTION_LAYER_CLASS}
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
            '[.card-primitive:active>&]:opacity-0 transition-opacity duration-150 group-hover:duration-0 group-active:duration-0',
        )}
        style={styles.secondarySpotlights}
      />
    </>
  );
}

type CardOptions = {
  size?: CardSize;
  urgency?: CardUrgency;
  interactive?: boolean;
  /** Native iOS haptic on press when `interactive` (default light impact). */
  haptic?: HapticPressKind;
};

export type CardProps = CardOptions &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> & {
    children: ReactNode;
  };

/** Shell class names when the outer node is not `CardPrimary` (e.g. `motion.div`). */
export function cardClass(options: CardOptions = {}): string {
  const { size = 'default', interactive = false } = options;
  return cn(
    CARD_SHELL_CLASS,
    CARD_SIZE_CLASS[size],
    interactive && 'cursor-pointer transition-transform duration-150 active:scale-[0.995]',
  );
}

/** Spotlight FX layers: pair with `cardClass` on a `data-card` shell. */
export function CardFxLayers({
  urgency = 'moderate',
  interactive = false,
}: Pick<CardOptions, 'urgency' | 'interactive'>) {
  return <CardSurfaceFxLayers styles={getCardFxStyles(urgency)} interactive={interactive} />;
}

/**
 * Primary content surface: dashboard widgets, list rows, callouts.
 * Neutral spotlight stack matches `ButtonNeutralPrimitive`.
 */
export function Card({
  size = 'default',
  urgency = 'moderate',
  interactive = false,
  haptic,
  className,
  children,
  onClick,
  onKeyDown,
  ...props
}: CardProps) {
  const fx = getCardFxStyles(urgency);
  const shellProps =
    interactive && onClick
      ? withHapticPress({ ...props, onClick, onKeyDown, haptic }, 'light')
      : { ...props, onClick, onKeyDown };
  const pressable =
    interactive && shellProps.onClick
      ? pressableDivProps({
          onClick: shellProps.onClick,
          onKeyDown: shellProps.onKeyDown,
          role: shellProps.role,
          tabIndex: shellProps.tabIndex,
        })
      : {};

  return (
    <div
      data-card=""
      className={cn(cardClass({ size, urgency, interactive }), className)}
      style={CARD_SHELL_STYLE}
      {...shellProps}
      {...pressable}
    >
      <CardSurfaceFxLayers styles={fx} interactive={interactive} />
      <div className={CARD_BODY_CLASS}>{children}</div>
    </div>
  );
}
