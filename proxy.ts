import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  // One canonical origin: https://safocleaning.tj — www and plain http redirect permanently.
  const host = request.headers.get("host") ?? "";
  const isHttp = request.nextUrl.protocol === "http:" || request.headers.get("x-forwarded-proto") === "http";
  const isLocal = host.startsWith("localhost") || host.startsWith("127.0.0.1");
  if (!isLocal && (host.startsWith("www.") || isHttp)) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = host.replace(/^www\./, "");
    url.port = "";
    return NextResponse.redirect(url, 301);
  }
  return intlMiddleware(request);
}

export const config = {
  // Everything except API routes, Next internals and files with an extension.
  matcher: "/((?!api|_next|_vercel|icon|apple-icon|opengraph-image|.*\\..*).*)",
};
