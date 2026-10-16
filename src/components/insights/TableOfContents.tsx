"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
}

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: [0, 1] },
    );

    for (const item of items) {
      const node = document.getElementById(item.id);
      if (node) observer.observe(node);
    }

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-labelledby="toc-heading"
      className="rounded-[1.25rem] border border-line bg-surface-2 p-6"
    >
      <h2
        id="toc-heading"
        className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted"
      >
        On this page
      </h2>
      <ol className="mt-4 space-y-2.5">
        {items.map((item, index) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`flex gap-3 text-[0.86rem] leading-snug transition-colors duration-300 ${
                  isActive
                    ? "text-ink"
                    : "text-muted hover:text-ink dark:hover:text-ink"
                }`}
              >
                <span className="font-mono text-[0.7rem] tabular-nums text-accent dark:text-bio">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
