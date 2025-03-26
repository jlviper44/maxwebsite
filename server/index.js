export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		if (url.pathname.startsWith("/api/")) {
      const apiUrl = "https://login.affluentco.com/affiliates/api/Reports/CampaignSummary?start_date=03%2F01%2F2025&end_date=03%2F25%2F2025&conversion_type=all&start_at_row=1&row_limit=30&api_key=hFct58Jru5Y5cPlP8VGq8Q&affiliate_id=207744";
      let response = await fetch(apiUrl, request);

      // Recreate the response so you can modify the headers.
      response = new Response(response.body, response);

      // Set CORS headers.
      response.headers.set("Access-Control-Allow-Origin", "*"); // Or specific origin
      response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

      return response;
		}

		return env.ASSETS.fetch(request);
	},
};
