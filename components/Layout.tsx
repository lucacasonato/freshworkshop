/** @jsx h */
import { ComponentChildren, h } from "preact";
import { tw } from "@twind";

interface LayoutProps {
  children: ComponentChildren;
}

export default function Layout(props: LayoutProps) {
  return <div class={tw`px-4 mx-auto max-w-screen-md`}>{props.children}</div>;
}
