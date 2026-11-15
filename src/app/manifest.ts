import type { MetadataRoute } from "next";
import { business } from "@/content/business";

/** Lets phones save the site to the home screen with the right name, icon and colors. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: business.name,
    short_name: business.shortName,
    description: "Family-owned residential concrete contractor in New Haven, Michigan.",
    start_url: "/",
    display: "browser",
    background_color: "#151515",
    theme_color: "#151515",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
