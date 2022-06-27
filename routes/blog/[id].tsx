/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import * as gfm from "$gfm";

import { tw } from "@twind";
import { loadPost, Post } from "@/utils/posts.ts";
import { State } from "@/utils/state.ts";
import Layout from "@/components/Layout.tsx";
import Topbar from "@/components/Topbar.tsx";

interface Data extends State {
  post: Post;
}

export const handler: Handlers<Data, State> = {
  async GET(_req, ctx) {
    const id = ctx.params.id;
    const post = await loadPost(id);
    if (!post) return new Response("Post not found", { status: 404 });
    return ctx.render({ ...ctx.state, post });
  },
};

export default function Home(props: PageProps<Data>) {
  const { post, locales } = props.data;
  const fmt = Intl.DateTimeFormat(locales, { dateStyle: "long" });

  const html = gfm.render(post.content);

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <link rel="stylesheet" href="/gfm.css" />
      </Head>
      <Layout>
        <Topbar />
        <p class={tw`text-gray-500 mt-12`}>{fmt.format(post.publishAt)}</p>
        <h1 class={tw`text-5xl font-bold mt-2`}>{post.title}</h1>
        <div
          data-color-mode="light"
          class={tw`mt-6` + " markdown-body"}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Layout>
    </>
  );
}
