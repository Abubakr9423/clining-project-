import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

/** Lucide dropped brand marks; these three follow Lucide's 24px / 1.75 stroke grid. */
export function WhatsAppIcon({ size = 24, ...props }: Props) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M12.04 3a8.9 8.9 0 0 0-7.63 13.47L3 21l4.66-1.36A8.9 8.9 0 1 0 12.04 3Z" />
      <path d="M9.2 8.6c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.1.2-.2.3 0 .6a6.6 6.6 0 0 0 3.3 2.9c.3.1.4 0 .6-.1l.7-.9c.2-.2.4-.2.6-.1l1.7.8c.3.1.4.2.4.4 0 .3 0 1.1-.5 1.6s-1.3.9-1.8.9c-.8 0-2.6-.7-4.4-2.4-2-1.9-2.8-3.6-2.8-4.5 0-.9.3-1.7.4-2.1Z" />
    </svg>
  );
}

export function TelegramIcon({ size = 24, ...props }: Props) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M21 4.5 3.6 11.2c-.8.3-.8 1.1 0 1.4l4.3 1.4 1.7 5.2c.2.6.9.7 1.3.3l2.4-2.3 4.4 3.3c.6.4 1.3.1 1.5-.6L21.9 5.6c.2-.8-.4-1.4-.9-1.1Z" />
      <path d="m7.9 14 9.3-6.4-6.9 7.5" />
    </svg>
  );
}

export function InstagramIcon({ size = 24, ...props }: Props) {
  return (
    <svg {...base(size)} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r=".9" fill="currentColor" stroke="none" />
    </svg>
  );
}
