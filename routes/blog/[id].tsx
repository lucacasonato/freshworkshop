/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import * as gfm from "$gfm";

import { tw } from "@twind";
import { loadPost, Post } from "@/utils/posts.ts";

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    const id = ctx.params.id;
    const post = await loadPost(id);
    if (!post) return new Response("Post not found", { status: 404 });
    return ctx.render(post);
  },
};

export default function Home(props: PageProps<Post>) {
  const post = props.data;

  const html = gfm.render(post.content);

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <link rel="stylesheet" href="/gfm.css" />
      </Head>
      <div class={tw`px-4 mx-auto max-w-screen-md`}>
        <div class={tw`py-2 flex justify-between border-b`}>
          <a href="/" class={tw`block text-gray-700 hover:underline`}>
            Luca's Blog
          </a>
          <div class={tw`text-gray-700`}>
            © {new Date().getFullYear()}
          </div>
        </div>
        <p class={tw`text-gray-500 mt-12`}>
          {post.publishAt.toLocaleDateString()}
        </p>
        <h1 class={tw`text-5xl font-bold mt-2`}>{post.title}</h1>
        <div
          data-color-mode="light"
          class={tw`mt-6` + " markdown-body"}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </>
  );
}
