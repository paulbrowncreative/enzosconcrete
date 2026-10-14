type Params = Record<string, string | number | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Sends a conversion/interaction event to GA4 (gtag) and/or a GTM dataLayer if
 * either is present. No-ops when analytics isn't configured.
 */
export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") window.gtag("event", event, params);
  else if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event, ...params });
}
