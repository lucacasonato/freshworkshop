import { loadPost } from "./posts.ts";
import { assert, assertEquals } from "$std/testing/asserts.ts";

Deno.test("load post", async () => {
  const post = await loadPost("hello");
  assert(post);
  assertEquals(post.id, "hello");
  assertEquals(post.title, "Hello World");
  assertEquals(post.publishAt, new Date("2022-06-26T13:49:37.703Z"));
  assertEquals(post.snippet, "My first blog entry.");
  assertEquals(post.content, "Hey folks, this is my _new_ blog.\n");
});
