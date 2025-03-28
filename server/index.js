export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		if (url.pathname.startsWith("/api/")) {
      const apiUrl = "https://login.affluentco.com/affiliates/api/Reports/Conversions?start_date=2025-03-24&end_date=2025-03-26&start_at_row=1&row_limit=3000&api_key=hFct58Jru5Y5cPlP8VGq8Q&affiliate_id=207744";
      let response = await fetch(apiUrl, request);

      // Recreate the response so you can modify the headers.
      response = new Response(response.body, response);

      // Set CORS headers.
      response.headers.set("Access-Control-Allow-Origin", "*"); // Or specific origin
      response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

      return response;
		}

    if(url.pathname.startsWith("/kvs"))
    {
      let value = await env.KeyValues.get("safety");

      // Return the value, as is, for the Response
      return new Response(value);
    }

    // if(url.pathname.startsWith("/sql"))
    // {
    //   // const db = await mf.getD1Database("DB");
    //   // const { results } = await db.prepare(
    //   //   "SELECT * FROM Campaigns"
    //   // )
    //   //   .all();
    //   return new Response(JSON.stringify("{}"), {
    //     headers: { 'Content-Type': 'application/json' }
    //   });
    // }

		return env.ASSETS.fetch(request);
	},
};
