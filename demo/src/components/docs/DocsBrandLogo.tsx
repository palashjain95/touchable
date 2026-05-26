import { cn } from "@palashjain/touchable";

export function DocsBrandLogo({
  className = "h-8 w-8",
  alt = "Touchable",
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <>
      <img
        src="/brand-sign/sign_light.svg"
        alt={alt}
        className={cn("dark:hidden", className)}
      />
      <img
        src="/brand-sign/sign_dark.svg"
        alt={alt}
        className={cn("hidden dark:block", className)}
      />
    </>
  );
}
