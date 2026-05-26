import { DocsBrandLogo } from "../components/docs/DocsBrandLogo";

const WEBSITE = "https://www.jpalash.com/";
const LINKEDIN = "https://www.linkedin.com/in/palash-jain-2565b612a/";

export function DesignerPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-5">
        <DocsBrandLogo className="h-32 w-32 shrink-0" alt="Touchable" />
        <h1 className="font-display text-3xl font-semibold tracking-tight text-[var(--fg-primary)]">
          Palash Jain
        </h1>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        <a href={WEBSITE} target="_blank" rel="noopener noreferrer">
          <img
            src="https://img.shields.io/badge/Website-jpalash.com-111?style=flat"
            alt="jpalash.com"
            className="h-5"
          />
        </a>
        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
          <img
            src="https://img.shields.io/badge/LinkedIn-Palash_Jain-0A66C2?style=flat&logo=linkedin&logoColor=white"
            alt="LinkedIn"
            className="h-5"
          />
        </a>
      </div>
    </div>
  );
}
