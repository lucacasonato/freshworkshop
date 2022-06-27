/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import { State } from "../utils/state.ts";

export const handler: Handlers<State, State> = {
  GET(_req, ctx) {
    return ctx.render({ ...ctx.state });
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
    </div>
  );
}
