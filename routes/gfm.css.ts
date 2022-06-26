import { Handlers } from "$fresh/server.ts";
import * as gfm from "$gfm";

export const handler: Handlers = {
  GET() {
    return new Response(gfm.CSS, {
      headers: { "Content-Type": "text/css" },
    });
  },
};
