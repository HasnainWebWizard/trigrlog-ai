export { auth as middleware } from "./auth";

export const config = {
  // This "Matcher" tells the guard which paths to watch.
  // We exclude internal Next.js files and the public landing page.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};