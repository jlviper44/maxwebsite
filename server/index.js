export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		if (url.pathname.startsWith("/api/")) {
			return Response.json({
				name: "Cloudflare",
			});
		}

    if(url.pathname.startsWith("/kvs")) {
      let value = await env.KeyValues.get("campaigns");
      return new Response(value);
    }

		return env.ASSETS.fetch(request);
	},
};
