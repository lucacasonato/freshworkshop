/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";

import { tw } from "@twind";
import Layout from "@/components/Layout.tsx";
import Topbar from "@/components/Topbar.tsx";
import { State } from "@/utils/state.ts";
import LanguageSelector from "@/islands/LanguageSelector.tsx";

export const handler: Handlers<State, State> = {
  async GET(_req, ctx) {
    return ctx.render({ ...ctx.state });
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const lang = form.get("language");
    const resp = new Response("", {
      status: 303,
      headers: { Location: "/settings" },
    });
    if (typeof lang === "string") {
      setCookie(resp.headers, {
        name: "language",
        value: lang,
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "Lax",
      });
    }
    return resp;
  },
};

export default function Settings(props: PageProps<State>) {
  return (
    <Layout>
      <Topbar />
      <h2 class={tw`text-3xl font-bold mt-8`}>Language</h2>
      <p class={tw`text-gray-600 mt-4`}>
        Select the language you want to use for localizable elements of the
        blog.
      </p>
      <p>
        You are currently using the language <b>{props.data.locales[0]}</b>.
      </p>
      <LanguageSelector
        preferredLocale={props.data.preferredLocale}
        fallbackLocale={props.data.fallbackLocale}
      />
    </Layout>
  );
}
