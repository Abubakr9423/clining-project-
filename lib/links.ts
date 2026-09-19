import { siteConfig } from "./site-config";

/** Builds a wa.me deep link with an optional pre-filled message. */
export function whatsappUrl(text?: string): string {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** Builds a t.me deep link. Telegram ignores `text` for user chats on some clients, hence the copy fallback in the calculator. */
export function telegramUrl(text?: string): string {
  const base = `https://t.me/${siteConfig.telegram}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const telHref = `tel:${siteConfig.phone.replace(/[^\d+]/g, "") || siteConfig.phone}`;
export const instagramUrl = `https://instagram.com/${siteConfig.instagram}`;
