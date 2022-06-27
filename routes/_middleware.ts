import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { parse } from "https://esm.sh/accept-language-parser@1.5.0";
import { getCookies } from "$std/http/cookie.ts";

import { State } from "@/utils/state.ts";

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  ctx.state.locales = [];

  const cookies = getCookies(req.headers);
  ctx.state.preferredLocale = cookies["language"] || null;
  if (ctx.state.preferredLocale) {
    ctx.state.locales.push(ctx.state.preferredLocale);
  }

  const langs = parse(req.headers.get("accept-language") || undefined);
  for (const lang of langs) {
    let locale = lang.code;
    if (lang.region) locale += "-" + lang.region;
    ctx.state.locales.push(locale);
    if (!ctx.state.fallbackLocale) ctx.state.fallbackLocale = locale;
  }

  if (ctx.state.locales.length === 0) {
    ctx.state.locales.push("en");
    ctx.state.fallbackLocale = "en";
  }

  const resp = await ctx.next();
  return resp;
}
