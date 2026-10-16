import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost" | "bio" | "light" | "outlineLight";
type Size = "sm" | "md" | "lg";

type Shared = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type AnchorProps = Shared &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & {
    href: string;
    type?: never;
  };

type ButtonProps = Shared &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: undefined;
  };

export type ButtonPropsUnion = AnchorProps | ButtonProps;

const sizeClasses: Record<Size, string> = {
  sm: "h-10 px-4 text-[0.8rem]",
  md: "h-12 px-6 text-[0.875rem]",
  lg: "h-14 px-7 text-[0.9rem]",
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-ink text-surface border border-ink hover:bg-accent-strong hover:border-accent-strong dark:bg-bio dark:text-forest dark:border-bio dark:hover:bg-bio/85 dark:hover:border-bio/85",
  outline:
    "bg-transparent text-ink border border-line-strong hover:border-accent hover:text-accent dark:text-ink dark:border-line-strong dark:hover:border-bio dark:hover:text-bio",
  ghost:
    "bg-transparent text-muted border border-transparent hover:text-ink hover:border-line dark:hover:text-ink",
  bio: "bg-glow/12 text-accent border border-glow/45 hover:bg-glow/22 dark:bg-bio/15 dark:text-bio dark:border-bio/50 dark:hover:bg-bio/25",
  // For dark, immersive surfaces — declared as full treatments so nothing in
  // the variant layer competes with a className override.
  light:
    "bg-[#65E8E0] text-[#062019] border border-[#65E8E0] hover:bg-[#8FF2EC] hover:border-[#8FF2EC]",
  outlineLight:
    "bg-white/10 text-[#EDF5F1] border border-white/45 backdrop-blur-sm hover:border-[#65E8E0] hover:text-[#8FF2EC] hover:bg-white/15",
};

const base =
  "shine group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-wide transition-all duration-300 ease-out will-change-transform active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

function classesFor(variant: Variant, size: Size, className?: string) {
  return `${base} ${sizeClasses[size]} ${variantClasses[variant]} ${className ?? ""}`;
}

export function Button(props: ButtonPropsUnion) {
  if ("href" in props && typeof props.href === "string") {
    const {
      variant = "primary",
      size = "md",
      children,
      className,
      href,
      ...anchorRest
    } = props;
    const classes = classesFor(variant, size, className);
    const external = href.startsWith("http") || href.startsWith("mailto:");

    if (external) {
      return (
        <a href={href} className={classes} {...anchorRest}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  const { variant = "primary", size = "md", children, className, ...buttonRest } =
    props;
  const classes = classesFor(variant, size, className);

  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
