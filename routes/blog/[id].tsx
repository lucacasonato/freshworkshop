/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import * as gfm from "$gfm";
import { tw } from "@twind";
import { loadPost, Post } from "../../utils/posts.ts";
import { State } from "../../utils/state.ts";

interface Data extends State {
  post: Post;
}

export const handler: Handlers<Data, State> = {
  async GET(_req, ctx) {
    const post = await loadPost(ctx.params.id);
    if (!post) {
      return new Response("Post not found", { status: 404 });
    }
    return ctx.render({ ...ctx.state, post });
  },
};

export default function PostPage(props: PageProps<Data>) {
  const { post, locales } = props.data;
  const dateFmt = new Intl.DateTimeFormat(locales, { dateStyle: "full" });
  const html = gfm.render(post.content);
  return (
    <div class={tw`px-4 mx-auto max-w-screen-md`}>
      <p class={tw`text-gray-600 mt-12`}>{dateFmt.format(post.publishAt)}</p>
      <h1 class={tw`font-bold text-5xl mt-2`}>{post.title}</h1>
      <style dangerouslySetInnerHTML={{ __html: gfm.CSS }} />
      <div
        class={tw`mt-12` + " markdown-body"}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
