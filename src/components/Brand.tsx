import Image from "next/image";
import Link from "next/link";
import mark from "@/assets/brand/mark-light.png";

/** Horizontal lockup of the existing Enzo’s Concrete mark + wordmark for tight spaces. */
export function Brand({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`brand ${className}`} aria-label="Enzo’s Concrete LLC, home">
      <Image src={mark} alt="" width={46} height={41} className="brand__mark" priority />
      <span className="brand__word" aria-hidden="true">
        <span className="brand__name">Enzo’s</span>
        <span className="brand__sub">Concrete LLC</span>
      </span>
    </Link>
  );
}
