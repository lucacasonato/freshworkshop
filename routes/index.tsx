/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import { listPosts, Post } from "../utils/posts.ts";
import { State } from "../utils/state.ts";

interface Data extends State {
  posts: Post[];
}

export const handler: Handlers<Data, State> = {
  async GET(_req, ctx) {
    const posts = await listPosts();
    return ctx.render({ ...ctx.state, posts });
  },
};

export default function Home(props: PageProps<Data>) {
  const { posts, locales } = props.data;
  return (
    <div class={tw`px-4 mx-auto max-w-screen-md`}>
      <h1 class={tw`font-bold text-5xl mt-12`}>Luca's Blog</h1>
      <ul class={tw`mt-8`}>
        {posts.map((post) => <PostEntry post={post} locales={locales} />)}
      </ul>
    </div>
  );
}

function PostEntry(props: { post: Post; locales: string[] }) {
  const { post, locales } = props;
  const dateFmt = new Intl.DateTimeFormat(locales, { dateStyle: "short" });
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
