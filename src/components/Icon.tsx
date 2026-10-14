const paths = {
  phone:
    "M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z",
  mail: "M3 5h18v14H3z M3 6l9 7 9-7",
  pin: "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z M12 12.2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  arrow: "M4 12h15 M13 6l6 6-6 6",
  check: "M4 12.5l5 5L20 6.5",
  shield: "M12 3l8 3v6c0 4.6-3.4 8.3-8 9-4.6-.7-8-4.4-8-9V6z M8.5 12l2.5 2.5 4.5-5",
  home: "M3 11l9-7 9 7 M5 9.5V20h14V9.5 M10 20v-6h4v6",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M12 7v5l3 2",
  camera: "M4 7h3.5L9 5h6l1.5 2H20v12H4z M12 16.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z",
  menu: "M3 6h18 M3 12h18 M3 18h18",
  close: "M5 5l14 14 M19 5L5 19",
  expand: "M4 9V4h5 M20 9V4h-5 M4 15v5h5 M20 15v5h-5",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  const filled = name === "phone";
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}
