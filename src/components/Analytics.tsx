"use client";

import Script from "next/script";
import { useEffect } from "react";
import { track } from "@/lib/track";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Loads GA4 only when NEXT_PUBLIC_GA_ID is set, and reports phone, email and
 * estimate-CTA clicks site-wide through one delegated listener.
 */
export function Analytics() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("a");
      if (!el) return;
      const href = el.getAttribute("href") || "";
      const location = el.getAttribute("data-track-location") || undefined;
      if (href.startsWith("tel:")) track("phone_click", { link_location: location ?? window.location.pathname });
      else if (href.startsWith("mailto:")) track("email_click", { link_location: location ?? window.location.pathname });
      else if (el.dataset.track) track(el.dataset.track, { link_location: location, page_path: window.location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config',${JSON.stringify(GA_ID)});`}
      </Script>
    </>
  );
}
