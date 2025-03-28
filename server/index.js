export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		if (url.pathname.startsWith("/api/")) {
			return Response.json({
				name: "Cloudflare",
			});
		}
    if(url.pathname.startsWith("/kvs")) {
      const value = await env.KeyValues.get("campaigns");
      return new Response(value);
    }

    if(url.pathname.startsWith("/db")) {
      const result = await env.database.prepare(
        "SELECT * FROM Campaigns",
        ).run();
        return Response(result);
    }

		return env.ASSETS.fetch(request);
	},
};
