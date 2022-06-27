/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";

import { tw } from "@twind";
import { listPosts, Post } from "@/utils/posts.ts";
import { State } from "@/utils/state.ts";
import Layout from "@/components/Layout.tsx";

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
    <Layout>
      <h1 class={tw`text-5xl font-bold mb-8 mt-12`}>Luca's Blog</h1>
      <ul class={tw`mt-4`}>
        {posts.map((post) => <PostEntry post={post} locales={locales} />)}
      </ul>
    </Layout>
  );
}

function PostEntry({ post, locales }: { post: Post; locales: string[] }) {
  const fmt = Intl.DateTimeFormat(locales, { dateStyle: "short" });
  return (
    <li class={tw`py-3 border-t`}>
      <a href={`/blog/${post.id}`} class={tw`flex gap-6 group`}>
        <div class={tw`text-gray-500`}>
          {fmt.format(post.publishAt)}
        </div>
        <div>
          <h3 class={tw`text-xl font-medium group-hover:underline`}>
            {post.title}
          </h3>
          <p class={tw`text-gray-600`}>{post.snippet}</p>
        </div>
      </a>
    </li>
  );
}
