import * as React from "react";

const BTN_PRIMARY = "var(--primary)";

/** Primary tokens: must live on the button and each FX layer for oklch(from var(--bg-accent) …). */
const BTN_PRIMARY_TOKEN_STYLE = {
  "--bg-accent": BTN_PRIMARY,
  "--fg-emphasis": "hsl(var(--primary-foreground))",
  "--border-default": "1px",
} as React.CSSProperties;

const BTN_NEUTRAL_TOKEN_STYLE = {
  "--border-default": "1px",
} as React.CSSProperties;

const BTN_TERTIARY_TOKEN_STYLE = {
  "--border-default": "1px",
} as React.CSSProperties;

const BUTTON_FOCUS_CLASS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]";

const BUTTON_CLASS_BASE =
  `btn-primitive box-border inline-flex items-center justify-center whitespace-nowrap font-normal select-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 relative isolate data-[state=open]:[&_[data-fx-layer=drop-shadow]]:opacity-0 ${BUTTON_FOCUS_CLASS}`;

const BUTTON_SIZE_CLASS = {
  default:
    "h-11 gap-1.5 px-3.5 py-2.5 text-lg rounded-xl [&_svg[data-default-size]]:size-[22px]",
  compact:
    "h-9 gap-1.5 px-3 py-2 text-sm rounded-lg [&_svg[data-default-size]]:size-4",
  /** Quick Practice small widget: `rounded-4xl` (4× compact `rounded-lg`). */
  widget:
    "h-9 gap-2 px-4 py-2 text-sm font-normal rounded-4xl [&_svg[data-default-size]]:size-3.5",
} as const;

const NEUTRAL_BUTTON_SIZE_CLASS = {
  default:
    "h-11 gap-1.5 px-3.5 py-2.5 text-lg rounded-xl [&_svg[data-default-size]]:size-[22px]",
  compact:
    "h-9 gap-1.5 px-3 py-2 text-sm rounded-lg [&_svg[data-default-size]]:size-4",
} as const;

const TERTIARY_BUTTON_SIZE_CLASS = {
  default:
    "h-11 gap-1.5 px-3.5 py-2.5 text-lg rounded-xl [&_svg[data-default-size]]:size-[22px]",
  compact:
    "h-9 gap-1 px-2.5 py-2 text-sm rounded-lg [&_svg[data-default-size]]:size-4",
} as const;

export type ButtonSize = keyof typeof BUTTON_SIZE_CLASS;

function getButtonClass(
  sizeClass: Record<string, string>,
  size: string,
  fullWidth: boolean,
) {
  return `${BUTTON_CLASS_BASE} ${sizeClass[size]} ${fullWidth ? "w-full" : "w-auto"}`;
}

const PRIMARY_BUTTON_STYLE: React.CSSProperties = {
  color: "var(--fg-emphasis)",
  background: BTN_PRIMARY,
  ...BTN_PRIMARY_TOKEN_STYLE,
};

const NEUTRAL_BUTTON_STYLE: React.CSSProperties = {
  color: "var(--fg-primary)",
  background: "var(--bg-translucent)",
  ...BTN_NEUTRAL_TOKEN_STYLE,
};

const TERTIARY_BUTTON_STYLE: React.CSSProperties = {
  color: "var(--fg-primary)",
  background: "transparent",
  ...BTN_TERTIARY_TOKEN_STYLE,
};

const BTN_INVERSE_TOKEN_STYLE = {
  "--border-default": "1px",
} as React.CSSProperties;

const INVERSE_BUTTON_SIZE_CLASS = {
  default:
    "h-11 gap-1.5 px-3.5 py-2.5 text-lg rounded-xl [&_svg[data-default-size]]:size-[22px]",
  compact:
    "h-9 gap-1.5 px-3 py-2 text-sm rounded-lg [&_svg[data-default-size]]:size-4",
  /** Login marketing header only: tighter corners. */
  cta: "h-9 gap-1.5 px-3 py-2 text-sm rounded-sm [&_svg[data-default-size]]:size-4",
} as const;

const INVERSE_BUTTON_STYLE: React.CSSProperties = {
  color: "var(--fg-inverse)",
  background: "var(--bg-inverse)",
  ...BTN_INVERSE_TOKEN_STYLE,
};

const INVERSE_FX_STYLES = {
  dropShadow: {
    boxShadow:
      "0 2px 2px -1px light-dark(oklch(from var(--bg-inverse) 0.2 calc(c * 1.2) h / 0.12), oklch(from var(--bg-inverse) 0.2 calc(c * 1.2) h / 0.12)), 0 4px 4px -2px light-dark(oklch(from var(--bg-inverse) 0.2 calc(c * 1.2) h / 0.12), oklch(from var(--bg-inverse) 0.2 calc(c * 1.2) h / 0.12))",
    ...BTN_INVERSE_TOKEN_STYLE,
  },
  interaction: {
    backgroundColor:
      "light-dark(oklch(from var(--bg-inverse) calc(l - 0.1) c h / 1), oklch(from var(--bg-inverse) calc(l + 0.15) c h / 0.7))",
    "--_resting": "0",
    "--_hover": "0.8",
    "--_pressed": "1",
    "--_dark-resting": "0",
    "--_dark-hover": "0.8",
    "--_dark-pressed": "1",
  } as React.CSSProperties,
  spotlights: {
    boxShadow:
      "inset 0 1px 0 0px light-dark(oklch(from var(--bg-inverse) 0.98 0.01 h / 0.24), transparent), inset 0 -1px 0 0px light-dark(oklch(from var(--bg-inverse) 0.98 0.01 h / 1), transparent), inset 0 0.5px 0 0px light-dark(transparent, oklch(from var(--bg-inverse) 0.98 0.01 h / 1)), inset 0 -0.5px 0 0px light-dark(transparent, oklch(from var(--bg-inverse) 0.98 0.01 h / 1))",
    ...BTN_INVERSE_TOKEN_STYLE,
  },
  domeOverlay: {
    backgroundImage:
      "linear-gradient(to bottom, light-dark(transparent, transparent), light-dark(oklch(0 0 0 / 0.88), oklch(0 0 0 / 0.08)))",
  },
  rim: {
    boxShadow: "inset 0 0 0 var(--border-default) light-dark(black, white)",
    ...BTN_INVERSE_TOKEN_STYLE,
  },
  secondarySpotlights: {
    boxShadow:
      "inset 0 0.5px 0 0px light-dark(oklch(1 0 0 / 0.08), oklch(1 0 0 / 0)), inset 0 -0.5px 0 0px light-dark(oklch(0 0 0 / 0.16), oklch(0 0 0 / 0))",
  },
} as const;

const CONTENT_CLASS_INVERSE_SM =
  "relative z-30 inline-flex h-full w-full items-center justify-center gap-1 font-normal";

const CONTENT_CLASS =
  "relative z-30 inline-flex h-full w-full items-center justify-center gap-1.5 font-normal";

const CONTENT_CLASS_COMPACT =
  "relative z-30 inline-flex h-full w-full items-center justify-center gap-1.5 font-normal";

const CONTENT_CLASS_TERTIARY_COMPACT =
  "relative z-30 inline-flex h-full w-full items-center justify-center gap-1 font-normal";

const PRIMARY_FX_STYLES = {
  dropShadow: {
    boxShadow:
      "0 2px 2px -1px light-dark(oklch(from var(--bg-accent) 0.2 calc(c * 1.2) h / 0.12), oklch(from var(--bg-accent) 0.2 calc(c * 1.2) h / 0.24)), 0 4px 4px -2px light-dark(oklch(from var(--bg-accent) 0.2 calc(c * 1.2) h / 0.12), oklch(from var(--bg-accent) 0.2 calc(c * 1.2) h / 0.24))",
  },
  interaction: {
    backgroundColor:
      "light-dark(oklch(from var(--bg-accent) calc(l - 0.1) c h / 1), oklch(from var(--bg-accent) calc(l + 0.15) c h / 0.7))",
    "--_resting": "0",
    "--_hover": "0.4",
    "--_pressed": "0.64",
    "--_dark-resting": "0",
    "--_dark-hover": "0.4",
    "--_dark-pressed": "0.8",
  } as React.CSSProperties,
  spotlights: {
    boxShadow:
      "inset 0 1px 0 0px light-dark(oklch(from var(--bg-accent) 0.98 0.01 h / 0.16), transparent), inset 0 -1px 0 0px light-dark(oklch(from var(--bg-accent) 0.98 0.01 h / 0.08), transparent), inset 0 0.5px 0 0px light-dark(transparent, oklch(from var(--bg-accent) 0.98 0.01 h / 0.16)), inset 0 -0.5px 0 0px light-dark(transparent, oklch(from var(--bg-accent) 0.98 0.01 h / 0.08))",
  },
  domeOverlay: {
    backgroundImage:
      "linear-gradient(light-dark(transparent, oklch(1 0 0 / 0.08)), light-dark(oklch(0 0 0 / 0.08), transparent))",
  },
  rim: {
    boxShadow:
      "inset 0 0 0 var(--border-default) light-dark(oklch(from var(--bg-accent) calc(l - 0.2) calc(c * 0.75) h), oklch(from var(--bg-accent) 0.98 0.01 h / 0.32))",
  },
  secondarySpotlights: {
    boxShadow:
      "light-dark(oklch(1 0 0 / 0.08), oklch(1 0 0 / 0)) 0px 0.5px 0px 0px inset, light-dark(oklch(0 0 0 / 0.16), oklch(0 0 0 / 0)) 0px -0.5px 0px 0px inset",
  },
} as const;

const NEUTRAL_FX_STYLES = {
  dropShadow: {
    boxShadow:
      "light-dark(oklch(0 0 0 / 0.04), oklch(0 0 0 / 0.12)) 0px 2px 2px -1px, light-dark(oklch(0 0 0 / 0.02), oklch(0 0 0 / 0.12)) 0px 4px 4px -2px",
    ...BTN_NEUTRAL_TOKEN_STYLE,
  },
  interaction: {
    backgroundColor: "light-dark(oklch(0 0 0), oklch(1 0 0))",
    "--_resting": "0",
    "--_hover": "0.04",
    "--_pressed": "0.06",
    "--_dark-resting": "0",
    "--_dark-hover": "0.08",
    "--_dark-pressed": "0.12",
    ...BTN_NEUTRAL_TOKEN_STYLE,
  } as React.CSSProperties,
  spotlights: {
    boxShadow:
      "light-dark(oklch(1 0 0), transparent) 0px 2px 0px -1px inset, light-dark(oklch(1 0 0 / 0.8), transparent) 0px -2px 0px -1px inset",
    ...BTN_NEUTRAL_TOKEN_STYLE,
  },
  domeOverlay: {
    backgroundImage:
      "linear-gradient(light-dark(transparent, oklch(1 0 0 / 0.04)), light-dark(oklch(0 0 0 / 0.04), transparent))",
    ...BTN_NEUTRAL_TOKEN_STYLE,
  },
  rim: {
    boxShadow:
      "inset 0 0 0 var(--border-default) light-dark(oklch(0 0 0 / 0.16), oklch(1 0 0 / 0.16))",
    ...BTN_NEUTRAL_TOKEN_STYLE,
  },
  secondarySpotlights: {
    boxShadow:
      "light-dark(oklch(0 0 0 / 0.08), oklch(1 0 0 / 0.16)) 0px 0.5px 0px 0px inset, light-dark(oklch(0 0 0 / 0.16), oklch(1 0 0 / 0.04)) 0px -0.5px 0px 0px inset",
    ...BTN_NEUTRAL_TOKEN_STYLE,
  },
} as const;

/** Neutral label/icon on translucent fill: primary rim only (accent is the border, not the content). */
const PRIMARY_OUTLINE_BUTTON_STYLE: React.CSSProperties = {
  color: "var(--fg-primary)",
  background: "var(--bg-translucent)",
  ...BTN_NEUTRAL_TOKEN_STYLE,
};

const PRIMARY_OUTLINE_FX_STYLES = {
  ...NEUTRAL_FX_STYLES,
  rim: {
    boxShadow: "inset 0 0 0 var(--border-default) var(--primary)",
    ...BTN_NEUTRAL_TOKEN_STYLE,
  },
} as const;

const TERTIARY_FX_STYLES = {
  interaction: {
    backgroundColor: "light-dark(oklch(0 0 0), oklch(1 0 0))",
    "--_resting": "0",
    "--_hover": "0.08",
    "--_pressed": "0.1",
    "--_dark-resting": "0",
    "--_dark-hover": "0.12",
    "--_dark-pressed": "0.16",
    ...BTN_TERTIARY_TOKEN_STYLE,
  } as React.CSSProperties,
  rim: {
    boxShadow:
      "inset 0 0 0 var(--border-default) light-dark(oklch(0 0 0 / 0.25), oklch(1 0 0 / 0.25))",
    ...BTN_TERTIARY_TOKEN_STYLE,
  },
} as const;

const INTERACTION_LAYER_CLASS =
  "pointer-events-none absolute inset-0 rounded-[inherit] will-change-opacity transition-opacity duration-150 group-hover:duration-0 group-active:duration-0 z-0 [@media(hover:none)]:hidden opacity-[var(--_resting)] dark:opacity-[var(--_dark-resting)] [[data-button]:hover_&]:opacity-[var(--_hover)] dark:[[data-button]:hover_&]:opacity-[var(--_dark-hover)] [[data-button]:active_&]:opacity-[var(--_pressed)] dark:[[data-button]:active_&]:opacity-[var(--_dark-pressed)] [[data-button]:disabled_&]:opacity-[var(--_resting)] dark:[[data-button]:disabled_&]:opacity-[var(--_dark-resting)] [[data-button][aria-disabled='true']_&]:opacity-[var(--_resting)] dark:[[data-button][aria-disabled='true']_&]:opacity-[var(--_dark-resting)]";

function ButtonTertiaryFxLayers() {
  return (
    <>
      <span
        data-fx-layer="interaction"
        aria-hidden="true"
        className={INTERACTION_LAYER_CLASS}
        style={TERTIARY_FX_STYLES.interaction}
      />
      <span
        data-fx-layer="rim"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-3 [[data-button]:disabled_&]:opacity-0 [[data-button][aria-disabled='true']_&]:opacity-0"
        style={TERTIARY_FX_STYLES.rim}
      />
    </>
  );
}

type FullFxStyles =
  | typeof PRIMARY_FX_STYLES
  | typeof NEUTRAL_FX_STYLES
  | typeof PRIMARY_OUTLINE_FX_STYLES
  | typeof INVERSE_FX_STYLES;

function ButtonFxLayers({
  styles,
  rimClassName,
}: {
  styles: FullFxStyles;
  rimClassName?: string;
}) {
  const rimBase =
    "pointer-events-none absolute inset-0 rounded-[inherit] z-3";
  return (
    <>
      <span
        data-fx-layer="drop-shadow"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] will-change-opacity transition-opacity duration-150 group-hover:duration-0 group-active:duration-0 z-[-1] [[data-button]:active_&]:opacity-0 [[data-button][data-state=open]_&]:opacity-0 [[data-button]:disabled_&]:opacity-0 [[data-button][aria-disabled='true']_&]:opacity-0"
        style={styles.dropShadow}
      />
      <span
        data-fx-layer="interaction"
        aria-hidden="true"
        className={INTERACTION_LAYER_CLASS}
        style={styles.interaction}
      />
      <span
        data-fx-layer="spotlights"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] will-change-opacity transition-opacity duration-150 group-hover:duration-0 group-active:duration-0 z-1 [[data-button]:active_&]:opacity-0 [[data-button]:disabled_&]:opacity-0 [[data-button][aria-disabled='true']_&]:opacity-0"
        style={styles.spotlights}
      />
      <span
        data-fx-layer="dome-overlay"
        aria-hidden="true"
        className="absolute inset-0 rounded-[inherit] pointer-events-none z-2"
        style={styles.domeOverlay}
      />
      <span
        data-fx-layer="rim"
        aria-hidden="true"
        className={`${rimBase} ${rimClassName ?? ""}`}
        style={styles.rim}
      />
      <span
        data-fx-layer="secondary-spotlights"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] will-change-opacity transition-opacity duration-150 group-hover:duration-0 group-active:duration-0 z-4 [[data-button]:active_&]:opacity-0 [[data-button]:disabled_&]:opacity-0 [[data-button][aria-disabled='true']_&]:opacity-0"
        style={styles.secondarySpotlights}
      />
    </>
  );
}

export type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "style"
> & {
  fullWidth?: boolean;
  size?: ButtonSize;
  /** Overrides default primary fill (e.g. readiness accent). */
  shellStyle?: React.CSSProperties;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type = "button", fullWidth = true, size = "default", shellStyle, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        data-button=""
        className={getButtonClass(BUTTON_SIZE_CLASS, size, fullWidth)}
        style={shellStyle ?? PRIMARY_BUTTON_STYLE}
        {...props}
      >
        <ButtonFxLayers
          styles={PRIMARY_FX_STYLES}
          rimClassName="[[data-button]:disabled_&]:opacity-0 [[data-button][aria-disabled='true']_&]:opacity-0"
        />
        <span data-button-content="true" className={CONTENT_CLASS}>
          {children}
        </span>
      </button>
    );
  },
);
Button.displayName = "Button";

export type ButtonOutlineProps = ButtonProps;

export const ButtonOutline = React.forwardRef<
  HTMLButtonElement,
  ButtonOutlineProps
>(({ type = "button", fullWidth = true, size = "default", children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type={type}
      data-button=""
      className={getButtonClass(BUTTON_SIZE_CLASS, size, fullWidth)}
      style={PRIMARY_OUTLINE_BUTTON_STYLE}
      {...props}
    >
      <ButtonFxLayers styles={PRIMARY_OUTLINE_FX_STYLES} />
      <span data-button-content="true" className={CONTENT_CLASS}>
        {children}
      </span>
    </button>
  );
});
ButtonOutline.displayName = "ButtonOutline";

const BTN_DESTRUCTIVE = "hsl(var(--destructive))";

const BTN_DESTRUCTIVE_TOKEN_STYLE = {
  "--bg-accent": BTN_DESTRUCTIVE,
  "--fg-emphasis": "hsl(var(--destructive-foreground))",
  "--border-default": "1px",
} as React.CSSProperties;

const DESTRUCTIVE_BUTTON_STYLE: React.CSSProperties = {
  color: "var(--fg-emphasis)",
  background: BTN_DESTRUCTIVE,
  ...BTN_DESTRUCTIVE_TOKEN_STYLE,
};

const CONTENT_CLASS_STACKED =
  "relative z-30 inline-flex h-full w-full flex-col items-center justify-center gap-0.5 leading-none font-body font-normal touch-manipulation";

const DESTRUCTIVE_STACKED_CLASS =
  "min-h-11 h-auto w-full gap-0.5 py-2 text-sm rounded-xl";

export type ButtonDestructiveProps = ButtonProps & {
  /** Voice/screen stop control: timer + label stacked vertically. */
  layout?: "default" | "stacked";
};

export const ButtonDestructive = React.forwardRef<
  HTMLButtonElement,
  ButtonDestructiveProps
>(
  (
    { type = "button", fullWidth = true, size = "default", layout = "default", children, ...props },
    ref,
  ) => {
    const stacked = layout === "stacked";
    return (
      <button
        ref={ref}
        type={type}
        data-button=""
        className={
          stacked
            ? `${BUTTON_CLASS_BASE} ${DESTRUCTIVE_STACKED_CLASS} ${fullWidth ? "w-full" : "w-auto"}`
            : getButtonClass(BUTTON_SIZE_CLASS, size, fullWidth)
        }
        style={DESTRUCTIVE_BUTTON_STYLE}
        {...props}
      >
        <ButtonFxLayers
          styles={PRIMARY_FX_STYLES}
          rimClassName="[[data-button]:disabled_&]:opacity-0 [[data-button][aria-disabled='true']_&]:opacity-0"
        />
        <span
          data-button-content="true"
          className={stacked ? CONTENT_CLASS_STACKED : CONTENT_CLASS}
        >
          {children}
        </span>
      </button>
    );
  },
);
ButtonDestructive.displayName = "ButtonDestructive";

const BTN_AFFIRMATIVE = "var(--bg-affirmative)";

const BTN_AFFIRMATIVE_TOKEN_STYLE = {
  "--bg-accent": "var(--bg-affirmative)",
  "--fg-emphasis": "var(--fg-affirmative)",
  "--border-default": "1px",
} as React.CSSProperties;

const AFFIRMATIVE_BUTTON_STYLE: React.CSSProperties = {
  color: "var(--fg-affirmative)",
  background: BTN_AFFIRMATIVE,
  ...BTN_AFFIRMATIVE_TOKEN_STYLE,
};

export type ButtonAffirmativeProps = ButtonProps;

export const ButtonAffirmative = React.forwardRef<
  HTMLButtonElement,
  ButtonAffirmativeProps
>(({ type = "button", fullWidth = true, size = "default", children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type={type}
      data-button=""
      className={getButtonClass(BUTTON_SIZE_CLASS, size, fullWidth)}
      style={AFFIRMATIVE_BUTTON_STYLE}
      {...props}
    >
      <ButtonFxLayers
        styles={PRIMARY_FX_STYLES}
        rimClassName="[[data-button]:disabled_&]:opacity-0 [[data-button][aria-disabled='true']_&]:opacity-0"
      />
      <span data-button-content="true" className={CONTENT_CLASS}>
        {children}
      </span>
    </button>
  );
});
ButtonAffirmative.displayName = "ButtonAffirmative";

export type ButtonNeutralProps = ButtonProps;

export const ButtonNeutral = React.forwardRef<
  HTMLButtonElement,
  ButtonNeutralProps
>(({ type = "button", fullWidth = true, size = "default", children, ...props }, ref) => {
  const contentClass = size === "compact" ? CONTENT_CLASS_COMPACT : CONTENT_CLASS;
  return (
    <button
      ref={ref}
      type={type}
      data-button=""
      className={getButtonClass(NEUTRAL_BUTTON_SIZE_CLASS, size, fullWidth)}
      style={NEUTRAL_BUTTON_STYLE}
      {...props}
    >
      <ButtonFxLayers styles={NEUTRAL_FX_STYLES} />
      <span data-button-content="true" className={contentClass}>
        {children}
      </span>
    </button>
  );
});
ButtonNeutral.displayName = "ButtonNeutral";

const NEUTRAL_PILL_BUTTON_CLASS = `${BUTTON_CLASS_BASE} h-12 max-w-full gap-1 px-4 py-1.5 text-sm rounded-full shadow-none [&_svg[data-default-size]]:size-4`;

export type ButtonNeutralPillProps = Omit<ButtonProps, "size" | "shellStyle">;

/** Pill-shaped neutral control for filters and toolbar dropdowns (rounded-full, 48px). */
export const ButtonNeutralPill = React.forwardRef<HTMLButtonElement, ButtonNeutralPillProps>(
  ({ type = "button", fullWidth = false, children, ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      data-button=""
      className={`${NEUTRAL_PILL_BUTTON_CLASS} ${fullWidth ? "w-full" : "w-auto"}`}
      style={NEUTRAL_BUTTON_STYLE}
      {...props}
    >
      <ButtonFxLayers styles={NEUTRAL_FX_STYLES} />
      <span data-button-content="true" className={CONTENT_CLASS_TERTIARY_COMPACT}>
        {children}
      </span>
    </button>
  ),
);
ButtonNeutralPill.displayName = "ButtonNeutralPill";

export type ButtonTertiaryProps = ButtonProps;

export const ButtonTertiary = React.forwardRef<
  HTMLButtonElement,
  ButtonTertiaryProps
>(({ type = "button", fullWidth = true, size = "default", children, ...props }, ref) => {
  const contentClass =
    size === "compact" ? CONTENT_CLASS_TERTIARY_COMPACT : CONTENT_CLASS;
  return (
    <button
      ref={ref}
      type={type}
      data-button=""
      className={getButtonClass(TERTIARY_BUTTON_SIZE_CLASS, size, fullWidth)}
      style={TERTIARY_BUTTON_STYLE}
      {...props}
    >
      <ButtonTertiaryFxLayers />
      <span data-button-content="true" className={contentClass}>
        {children}
      </span>
    </button>
  );
});
ButtonTertiary.displayName = "ButtonTertiary";

export type ButtonInverseSize = keyof typeof INVERSE_BUTTON_SIZE_CLASS;

export type ButtonInverseProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "style"
> & {
  fullWidth?: boolean;
  size?: ButtonInverseSize;
};

export const ButtonInverse = React.forwardRef<
  HTMLButtonElement,
  ButtonInverseProps
>(({ type = "button", fullWidth = true, size = "compact", children, ...props }, ref) => {
  const contentClass =
    size === "cta" ? CONTENT_CLASS_INVERSE_SM : size === "compact" ? CONTENT_CLASS_COMPACT : CONTENT_CLASS;
  return (
    <button
      ref={ref}
      type={type}
      data-button=""
      className={getButtonClass(INVERSE_BUTTON_SIZE_CLASS, size, fullWidth)}
      style={INVERSE_BUTTON_STYLE}
      {...props}
    >
      <ButtonFxLayers
        styles={INVERSE_FX_STYLES}
        rimClassName="[[data-button]:disabled_&]:opacity-0 [[data-button][aria-disabled='true']_&]:opacity-0"
      />
      <span data-button-content="true" className={contentClass}>
        {children}
      </span>
    </button>
  );
});
ButtonInverse.displayName = "ButtonInverse";

const BUTTON_PRIMARY_ROUND_ICON_BASE =
  `btn-primitive box-border inline-flex items-center justify-center font-normal select-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 shrink-0 rounded-full relative isolate ${BUTTON_FOCUS_CLASS}`;

const ROUND_ICON_SIZE_CLASS = {
  sm: "h-7 w-7 [&_svg[data-default-size]]:size-4",
  md: "h-8 w-8 [&_svg[data-default-size]]:size-4",
  default: "h-9 w-9 [&_svg[data-default-size]]:size-5",
  lg: "h-12 w-12 [&_svg[data-default-size]]:size-5",
} as const;

const CONTENT_ICON_CLASS =
  "relative z-30 inline-flex h-full w-full items-center justify-center";

export type ButtonIconSize = keyof typeof ROUND_ICON_SIZE_CLASS;

export type ButtonIconProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "style"
> & {
  size?: ButtonIconSize;
  /** Required: icon-only buttons have no visible text label. */
  "aria-label": string;
};

export const ButtonIcon = React.forwardRef<
  HTMLButtonElement,
  ButtonIconProps
>(({ type = "button", size = "default", children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type={type}
      data-button=""
      className={`${BUTTON_PRIMARY_ROUND_ICON_BASE} ${ROUND_ICON_SIZE_CLASS[size]}`}
      style={PRIMARY_BUTTON_STYLE}
      {...props}
    >
      <ButtonFxLayers
        styles={PRIMARY_FX_STYLES}
        rimClassName="[[data-button]:disabled_&]:opacity-0 [[data-button][aria-disabled='true']_&]:opacity-0"
      />
      <span data-button-content="true" className={CONTENT_ICON_CLASS}>
        {children}
      </span>
    </button>
  );
});
ButtonIcon.displayName = "ButtonIcon";

export type ButtonInverseIconSize = keyof typeof ROUND_ICON_SIZE_CLASS;

export type ButtonInverseIconProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "style"
> & {
  size?: ButtonInverseIconSize;
};

export const ButtonInverseIcon = React.forwardRef<
  HTMLButtonElement,
  ButtonInverseIconProps
>(({ type = "button", size = "default", children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type={type}
      data-button=""
      className={`${BUTTON_PRIMARY_ROUND_ICON_BASE} ${ROUND_ICON_SIZE_CLASS[size]}`}
      style={INVERSE_BUTTON_STYLE}
      {...props}
    >
      <ButtonFxLayers
        styles={INVERSE_FX_STYLES}
        rimClassName="[[data-button]:disabled_&]:opacity-0 [[data-button][aria-disabled='true']_&]:opacity-0"
      />
      <span data-button-content="true" className={CONTENT_ICON_CLASS}>
        {children}
      </span>
    </button>
  );
});
ButtonInverseIcon.displayName = "ButtonInverseIcon";

export type ButtonOutlineIconSize = keyof typeof ROUND_ICON_SIZE_CLASS;

export type ButtonOutlineIconProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "style"
> & {
  size?: ButtonOutlineIconSize;
};

export const ButtonOutlineIcon = React.forwardRef<
  HTMLButtonElement,
  ButtonOutlineIconProps
>(({ type = "button", size = "default", children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type={type}
      data-button=""
      className={`${BUTTON_PRIMARY_ROUND_ICON_BASE} ${ROUND_ICON_SIZE_CLASS[size]}`}
      style={PRIMARY_OUTLINE_BUTTON_STYLE}
      {...props}
    >
      <ButtonFxLayers styles={PRIMARY_OUTLINE_FX_STYLES} />
      <span data-button-content="true" className={CONTENT_ICON_CLASS}>
        {children}
      </span>
    </button>
  );
});
ButtonOutlineIcon.displayName = "ButtonOutlineIcon";

const BUTTON_NEUTRAL_ROUND_ICON_BASE =
  `btn-primitive box-border inline-flex items-center justify-center font-normal select-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 shrink-0 rounded-full relative isolate p-0 ${BUTTON_FOCUS_CLASS}`;

const NEUTRAL_ROUND_ICON_SIZE_CLASS = {
  sm: "h-7 w-7 [&_svg[data-default-size]]:size-4",
  md: "h-8 w-8 [&_svg[data-default-size]]:size-4",
  default: "h-9 w-9 [&_svg[data-default-size]]:size-5",
  lg: "h-12 w-12 [&_svg[data-default-size]]:size-5",
} as const;

const NEUTRAL_DESTRUCTIVE_BUTTON_STYLE: React.CSSProperties = {
  ...NEUTRAL_BUTTON_STYLE,
  color: "hsl(var(--destructive))",
};

export type ButtonNeutralIconSize = keyof typeof NEUTRAL_ROUND_ICON_SIZE_CLASS;

export type ButtonNeutralIconTone = "default" | "destructive";

export type ButtonNeutralIconProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "style"
> & {
  size?: ButtonNeutralIconSize;
  tone?: ButtonNeutralIconTone;
};

export const ButtonNeutralIcon = React.forwardRef<
  HTMLButtonElement,
  ButtonNeutralIconProps
>(({ type = "button", size = "default", tone = "default", children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type={type}
      data-button=""
      className={`${BUTTON_NEUTRAL_ROUND_ICON_BASE} ${NEUTRAL_ROUND_ICON_SIZE_CLASS[size]}`}
      style={tone === "destructive" ? NEUTRAL_DESTRUCTIVE_BUTTON_STYLE : NEUTRAL_BUTTON_STYLE}
      {...props}
    >
      <ButtonFxLayers styles={NEUTRAL_FX_STYLES} />
      <span data-button-content="true" className={CONTENT_ICON_CLASS}>
        {children}
      </span>
    </button>
  );
});
ButtonNeutralIcon.displayName = "ButtonNeutralIcon";

const NEUTRAL_ROUND_ICON_BADGE_BASE =
  "btn-primitive box-border inline-flex items-center justify-center font-normal select-none shrink-0 rounded-full relative isolate p-0 pointer-events-none";

export type NeutralIconBadgeProps = {
  size?: ButtonNeutralIconSize;
  children: React.ReactNode;
};

/** Decorative neutral round icon shell: same FX as `ButtonNeutralIcon`, non-interactive. */
export function NeutralIconBadge({ size = "sm", children }: NeutralIconBadgeProps) {
  return (
    <span
      data-button=""
      aria-hidden="true"
      className={`${NEUTRAL_ROUND_ICON_BADGE_BASE} ${NEUTRAL_ROUND_ICON_SIZE_CLASS[size]}`}
      style={NEUTRAL_BUTTON_STYLE}
    >
      <ButtonFxLayers styles={NEUTRAL_FX_STYLES} />
      <span data-button-content="true" className={CONTENT_ICON_CLASS}>
        {children}
      </span>
    </span>
  );
}

export type ButtonNeutralIconLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "className" | "style"
> & {
  size?: ButtonNeutralIconSize;
};

export const ButtonNeutralIconLink = React.forwardRef<
  HTMLAnchorElement,
  ButtonNeutralIconLinkProps
>(({ size = "default", children, ...props }, ref) => {
  return (
    <a
      ref={ref}
      data-button=""
      className={`${BUTTON_NEUTRAL_ROUND_ICON_BASE} ${NEUTRAL_ROUND_ICON_SIZE_CLASS[size]} p-1`}
      style={NEUTRAL_BUTTON_STYLE}
      {...props}
    >
      <ButtonFxLayers styles={NEUTRAL_FX_STYLES} />
      <span data-button-content="true" className={CONTENT_ICON_CLASS}>
        {children}
      </span>
    </a>
  );
});
ButtonNeutralIconLink.displayName = "ButtonNeutralIconLink";

const LINK_BUTTON_CLASS =
  "btn-primitive box-border inline-flex h-9 shrink-0 cursor-pointer select-none items-center justify-center gap-1 px-0 py-2 text-sm font-normal underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))] rounded-md disabled:cursor-not-allowed disabled:opacity-50";

const LINK_BUTTON_STYLE: React.CSSProperties = {
  color: "var(--fg-link)",
  background: "transparent",
};

export type ButtonLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "className" | "style"
>;

/** Text link for navigation and secondary exits (uses --fg-link). */
export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ children, ...props }, ref) => (
    <a ref={ref} data-button="" className={LINK_BUTTON_CLASS} style={LINK_BUTTON_STYLE} {...props}>
      <span data-button-content="true" className="relative z-30">
        {children}
      </span>
    </a>
  ),
);
ButtonLink.displayName = "ButtonLink";

export type ButtonIconLinkLabeledProps = {
  href: string;
  label: string;
  icon: React.ReactNode;
  size?: ButtonNeutralIconSize;
  external?: boolean;
};

/** Round icon link with text label beside (same destination). */
export function ButtonIconLinkLabeled({
  href,
  label,
  icon,
  size = "md",
  external,
}: ButtonIconLinkLabeledProps) {
  const externalProps = external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <div className="inline-flex items-center gap-1.5">
      <ButtonNeutralIconLink href={href} size={size} aria-hidden tabIndex={-1} {...externalProps}>
        {icon}
      </ButtonNeutralIconLink>
      <ButtonLink href={href} {...externalProps}>
        {label}
      </ButtonLink>
    </div>
  );
}

const BUTTON_TERTIARY_ROUND_ICON_BASE =
  "btn-primitive box-border inline-flex items-center justify-center font-normal select-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 shrink-0 rounded-full relative isolate";

const TERTIARY_ROUND_ICON_SIZE_CLASS = {
  default: "h-9 w-9 [&_svg[data-default-size]]:size-4",
} as const;

const TERTIARY_DESTRUCTIVE_BUTTON_STYLE: React.CSSProperties = {
  ...TERTIARY_BUTTON_STYLE,
  color: "hsl(var(--destructive))",
};

export type ButtonTertiaryIconSize = keyof typeof TERTIARY_ROUND_ICON_SIZE_CLASS;

export type ButtonTertiaryIconTone = "default" | "destructive";

export type ButtonTertiaryIconProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "style"
> & {
  size?: ButtonTertiaryIconSize;
  tone?: ButtonTertiaryIconTone;
};

export const ButtonTertiaryIcon = React.forwardRef<
  HTMLButtonElement,
  ButtonTertiaryIconProps
>(({ type = "button", size = "default", tone = "default", children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type={type}
      data-button=""
      className={`${BUTTON_TERTIARY_ROUND_ICON_BASE} ${TERTIARY_ROUND_ICON_SIZE_CLASS[size]}`}
      style={tone === "destructive" ? TERTIARY_DESTRUCTIVE_BUTTON_STYLE : TERTIARY_BUTTON_STYLE}
      {...props}
    >
      <ButtonTertiaryFxLayers />
      <span data-button-content="true" className={CONTENT_ICON_CLASS}>
        {children}
      </span>
    </button>
  );
});
ButtonTertiaryIcon.displayName = "ButtonTertiaryIcon";

function discCenterClass(selected?: boolean) {
  return `relative z-30 flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-display text-xs font-normal tabular-nums leading-none ${
    selected
      ? "bg-[hsl(var(--primary-foreground))] text-[var(--primary)]"
      : "bg-[var(--primary)] text-[hsl(var(--primary-foreground))]"
  }`;
}

export type ButtonDiscCenterProps = {
  children: React.ReactNode;
  /** Inverts disc colors when the parent control is active (e.g. history open). */
  selected?: boolean;
};

/** Primary disc inside a round neutral button (quick-practice center). */
export function ButtonDiscCenter({ children, selected }: ButtonDiscCenterProps) {
  return (
    <span className={discCenterClass(selected)} aria-hidden>
      {children}
    </span>
  );
}

export type ButtonDiscProps = ButtonNeutralIconProps & {
  selected?: boolean;
  /** Fills the center disc with a custom colour (e.g. theme swatch). Ignores `children`. */
  swatchColor?: string;
};

/**
 * Round neutral button with a primary center disc.
 * Matches Notey `ButtonNeutralRoundIcon` + quick-practice disc pattern.
 */
export const ButtonDisc = React.forwardRef<HTMLButtonElement, ButtonDiscProps>(
  ({ children, selected, swatchColor, ...props }, ref) => (
    <ButtonNeutralIcon ref={ref} {...props}>
      {swatchColor ? (
        <span
          data-disc-swatch=""
          className="relative z-30 block h-5 w-5 shrink-0 rounded-full border border-[hsl(var(--border))]/40"
          style={{ background: swatchColor }}
          aria-hidden
        />
      ) : (
        <ButtonDiscCenter selected={selected}>{children}</ButtonDiscCenter>
      )}
    </ButtonNeutralIcon>
  ),
);
ButtonDisc.displayName = "ButtonDisc";
