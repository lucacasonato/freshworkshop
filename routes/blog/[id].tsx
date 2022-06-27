/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Post } from "../../utils/posts.ts";

const post: Post = {
  id: "hello",
  title: "Hello World",
  publishAt: new Date("2020-01-01"),
  snippet: "The first post.",
  content: "Hello World",
};

export default function PostPage() {
  return (
    <div class={tw`px-4 mx-auto max-w-screen-md`}>
      <p class={tw`text-gray-600 mt-12`}>
        {post.publishAt.toLocaleDateString()}
      </p>
      <h1 class={tw`font-bold text-5xl mt-2`}>{post.title}</h1>
      <div class={tw`mt-12`}>{post.content}</div>
    </div>
  );
}
