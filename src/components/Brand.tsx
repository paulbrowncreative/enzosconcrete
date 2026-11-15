import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/brand/logo.png";

/** Enzo’s Concrete LLC badge logo, linking home. */
export function Brand({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`brand ${className}`}>
      <Image src={logo} alt="Enzo’s Concrete LLC, home" sizes="88px" className="brand__logo" priority />
    </Link>
  );
}
