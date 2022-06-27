/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import { listPosts, Post } from "../utils/posts.ts";

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await listPosts();
    return ctx.render(posts);
  },
};

export default function Home(props: PageProps<Post[]>) {
  const posts = props.data;
  return (
    <div class={tw`px-4 mx-auto max-w-screen-md`}>
      <h1 class={tw`font-bold text-5xl mt-12`}>Luca's Blog</h1>
      <ul class={tw`mt-8`}>
        {posts.map((post) => <PostEntry post={post} />)}
      </ul>
    </div>
  );
}

function PostEntry(props: { post: Post }) {
  const { post } = props;
  const locale = "en-UK";
  const dateFmt = new Intl.DateTimeFormat(locale, { dateStyle: "short" });
  return (
    <li class={tw`border-t`}>
      <a href={`/blog/${post.id}`} class={tw`py-2 flex group gap-4`}>
        <div>{dateFmt.format(post.publishAt)}</div>
        <div>
          <h2 class={tw`font-bold group-hover:underline`}>{post.title}</h2>
          <p class={tw`text-gray-600`}>{post.snippet}</p>
        </div>
      </a>
    </li>
  );
}
