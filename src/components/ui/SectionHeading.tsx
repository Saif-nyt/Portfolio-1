import { Reveal } from "@/components/ui/Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  headingLevel?: "h1" | "h2" | "h3";
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className = "",
  headingLevel = "h2",
  id,
}: SectionHeadingProps) {
  const Heading = headingLevel;

  return (
    <Reveal
      className={`flex flex-col gap-5 ${
        align === "center" ? "items-center text-center" : "items-start"
      } ${className}`}
    >
      <span className="eyebrow">{eyebrow}</span>
      <Heading id={id} className="max-w-3xl text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.05]">
        {title}
      </Heading>
      {intro ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}
