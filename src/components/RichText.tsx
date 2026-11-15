import Link from "next/link";
import { Fragment, type ReactNode } from "react";

const TOKEN = /(\[[^\]]+\]\([^)\s]+\)|\*\*[^*]+\*\*)/g;

/**
 * Renders trusted, hand-written content with two inline marks: [text](href) and **bold**.
 * Internal paths use <Link>; external URLs open in a new tab. No HTML is ever injected.
 */
export function RichText({ text }: { text: string }): ReactNode {
  return text.split(TOKEN).map((part, i) => {
    const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
    if (link) {
      const [, label, href] = link;
      if (href.startsWith("/")) {
        return (
          <Link key={i} href={href}>
            {label}
          </Link>
        );
      }
      return (
        <a key={i} href={href} target="_blank" rel="noopener">
          {label}
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      );
    }
    const bold = /^\*\*([^*]+)\*\*$/.exec(part);
    if (bold) return <strong key={i}>{bold[1]}</strong>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}
