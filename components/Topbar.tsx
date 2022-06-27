/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function Topbar() {
  return (
    <div class={tw`py-2 flex justify-between border-b`}>
      <a href="/" class={tw`block text-gray-700 hover:underline`}>
        Luca's Blog
      </a>
      <div class={tw`text-gray-700`}>© {new Date().getFullYear()}</div>
      <a href="/settings" class={tw`block text-gray-700 hover:underline`}>
        Settings
      </a>
    </div>
  );
}
