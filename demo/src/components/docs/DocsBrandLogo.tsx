import { cn } from "@palashjain95/touchable";
import { publicAsset } from "../../lib/publicAsset";

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
        src={publicAsset("brand-sign/sign_light.svg")}
        alt={alt}
        className={cn("dark:hidden", className)}
      />
      <img
        src={publicAsset("brand-sign/sign_dark.svg")}
        alt={alt}
        className={cn("hidden dark:block", className)}
      />
    </>
  );
}
