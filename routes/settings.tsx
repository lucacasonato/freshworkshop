/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";
import { tw } from "@twind";
import { State } from "../utils/state.ts";

export const handler: Handlers<State, State> = {
  GET(_req, ctx) {
    return ctx.render({ ...ctx.state });
  },
  async POST(req) {
    const form = await req.formData();
    const locale = form.get("locale");
    const resp = new Response("", {
      status: 303,
      headers: { Location: "/settings" },
    });
    if (typeof locale === "string") {
      setCookie(resp.headers, { name: "locale", value: locale });
    }
    return resp;
  },
};

export default function SettingsPage(props: PageProps<State>) {
  const { locales } = props.data;
  return (
    <div class={tw`px-4 mx-auto max-w-screen-md`}>
      <h1 class={tw`font-bold text-5xl mt-12`}>Settings</h1>
      <p class={tw`mt-4`}>
        Your current locale is <b>{locales[0]}</b>.
      </p>
      <form action="/settings" method="post" class={tw`mt-4`}>
        <label htmlFor="locale">Locale</label>
        <input
          type="text"
          name="locale"
          id="locale"
          class={tw`border px-2 py-1`}
        />
        <button
          type="submit"
          class={tw`bg-blue(500 hover:700 disabled:200) text-white px-2 py-1`}
        >
          Save
        </button>
      </form>
    </div>
  );
}
