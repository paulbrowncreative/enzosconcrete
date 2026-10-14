import Link from "next/link";
import { breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          {all.map((c, i) => (
            <li key={c.path}>
              {i === all.length - 1 ? (
                <span aria-current="page">{c.name}</span>
              ) : (
                <Link href={c.path}>{c.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(all)} />
    </>
  );
}
