/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";

import { tw } from "@twind";
import { listPosts, Post } from "@/utils/posts.ts";

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await listPosts();
    return ctx.render(posts);
  },
};

export default function Home(props: PageProps<Post[]>) {
  const posts = props.data;
  return (
    <div class={tw`px-4 my-12 mx-auto max-w-screen-md`}>
      <h1 class={tw`text-5xl font-bold mb-8`}>Luca's Blog</h1>
      <ul class={tw`mt-4`}>
        {posts.map((post) => <PostEntry post={post} />)}
      </ul>
    </div>
  );
}

function PostEntry({ post }: { post: Post }) {
  return (
    <li class={tw`py-3 border-t`}>
      <a href={`/blog/${post.id}`} class={tw`flex gap-6 group`}>
        <div class={tw`text-gray-500`}>
          {post.publishAt.toLocaleDateString()}
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
