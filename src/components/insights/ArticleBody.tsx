import type { ArticleBlock } from "@/types/article";

function slugId(block: Extract<ArticleBlock, { id: string }>): string {
  return block.id;
}

export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={`${block.id}-${index}`}
                id={slugId(block)}
                className="scroll-mt-28 pt-6 text-[clamp(1.4rem,2.6vw,1.95rem)] font-medium leading-snug tracking-[-0.02em] text-ink"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={`${block.id}-${index}`}
                id={slugId(block)}
                className="scroll-mt-28 pt-4 text-[1.15rem] font-medium leading-snug tracking-[-0.01em] text-ink"
              >
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p
                key={index}
                className="text-[1.02rem] leading-[1.75] text-ink-soft"
              >
                {block.text}
              </p>
            );
          case "ul":
            return (
              <ul key={index} className="space-y-3 pl-1">
                {block.items.map((item) => (
                  <li
                    key={item.slice(0, 48)}
                    className="flex gap-3 text-[1rem] leading-[1.7] text-ink-soft"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-glow shadow-[0_0_0_4px_var(--glow-soft)]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={index} className="space-y-3 pl-1">
                {block.items.map((item, itemIndex) => (
                  <li
                    key={item.slice(0, 48)}
                    className="flex gap-4 text-[1rem] leading-[1.7] text-ink-soft"
                  >
                    <span className="mt-0.5 font-mono text-[0.78rem] tabular-nums text-accent dark:text-bio">
                      {String(itemIndex + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            );
          case "note":
            return (
              <aside
                key={index}
                className="rounded-2xl border border-glow/35 bg-glow/[0.07] p-5"
                aria-label={block.title}
              >
                <p className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-accent dark:text-bio">
                  {block.title}
                </p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">
                  {block.text}
                </p>
              </aside>
            );
          case "quote":
            return (
              <blockquote
                key={index}
                className="border-l-2 border-glow/70 pl-5 font-editorial text-[1.25rem] italic leading-snug text-ink"
              >
                <p>{block.text}</p>
                {block.cite ? (
                  <cite className="mt-2 block text-[0.8rem] not-italic text-muted">
                    {block.cite}
                  </cite>
                ) : null}
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
