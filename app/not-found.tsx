import Link from "next/link";

/** Root-level 404 (paths outside any locale). Minimal and locale-neutral by design. */
export default function RootNotFound() {
  return (
    <html lang="tg">
      <body style={{ fontFamily: "system-ui, sans-serif", background: "#F3F6F5", color: "#14201D", margin: 0, display: "grid", placeItems: "center", minHeight: "100dvh" }}>
        <main style={{ textAlign: "center", padding: 24 }}>
          <p style={{ fontSize: 64, fontWeight: 800, color: "#0B3B34", margin: 0 }}>404</p>
          <p style={{ marginTop: 8 }}>Саҳифа ёфт нашуд · Страница не найдена</p>
          <p style={{ marginTop: 24 }}>
            <Link href="/tj" style={{ color: "#0F6B5C", fontWeight: 600, marginRight: 16 }}>TJ</Link>
            <Link href="/ru" style={{ color: "#0F6B5C", fontWeight: 600 }}>RU</Link>
          </p>
        </main>
      </body>
    </html>
  );
}
