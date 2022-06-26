import { extract } from "$std/encoding/front_matter.ts";

export interface Post {
  id: string;
  title: string;
  publishAt: Date;
  snippet: string;
  content: string;
}

export async function loadPost(id: string): Promise<Post | null> {
  let text;
  try {
    text = await Deno.readTextFile(`./data/posts/${id}.md`);
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) return null;
    throw err;
  }
  const { attrs, body } = extract(text);
  if (typeof attrs !== "object" || !attrs) {
    throw new Error(`Post ${id} has invalid frontmatter`);
  }
  const data = attrs as Record<string, string>;
  return {
    id,
    title: data.title,
    publishAt: new Date(data.publish_at),
    snippet: data.snippet,
    content: body,
  };
}

export async function listPosts(): Promise<Post[]> {
  const promises: Promise<Post | null>[] = [];
  for await (const post of Deno.readDir("./data/posts")) {
    if (!post.name.endsWith(".md")) continue;
    const id = post.name.slice(0, -3);
    promises.push(loadPost(id));
  }
  const posts = await Promise.all(promises) as Post[];
  posts.sort((a, b) => b.publishAt.getTime() - a.publishAt.getTime());
  return posts;
}
