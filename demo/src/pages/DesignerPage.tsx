import { ButtonLink } from "@palashjain/touchable";
import { DocsBrandLogo } from "../components/docs/DocsBrandLogo";
import { Section } from "../components/docs/DocsPrimitives";

const GITHUB = "https://github.com/palashjain95";
const LINKEDIN = "https://www.linkedin.com/in/palash-jain-2565b612a/";
const EMAIL = "mailto:palash95jain@gmail.com";

export function DesignerPage() {
  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-5">
        <DocsBrandLogo className="h-32 w-32 shrink-0" alt="Touchable" />
        <h1 className="font-display text-3xl font-semibold tracking-tight text-[var(--fg-primary)]">
          Palash Jain
        </h1>
      </header>

      <Section title="Contact" description="Touchable design system and demo gallery.">
        <ul className="space-y-3 text-sm">
          <li>
            <span className="text-[var(--fg-tertiary)]">GitHub </span>
            <ButtonLink href={GITHUB} target="_blank" rel="noopener noreferrer">
              github.com/palashjain95
            </ButtonLink>
          </li>
          <li>
            <span className="text-[var(--fg-tertiary)]">LinkedIn </span>
            <ButtonLink href={LINKEDIN} target="_blank" rel="noopener noreferrer">
              linkedin.com/in/palash-jain-2565b612a
            </ButtonLink>
          </li>
          <li>
            <span className="text-[var(--fg-tertiary)]">Email </span>
            <ButtonLink href={EMAIL}>palash95jain@gmail.com</ButtonLink>
          </li>
        </ul>
      </Section>
    </div>
  );
}
