import Fluent from "./Fluent/Fluent";
import SQL from "./SQL/SQL";

export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		// if (url.pathname.startsWith("/api/")) {
    //   const apiUrl = "https://login.affluentco.com/affiliates/api/Reports/Conversions?start_date=2025-03-24&end_date=2025-03-26&start_at_row=1&row_limit=3000&api_key=hFct58Jru5Y5cPlP8VGq8Q&affiliate_id=207744";
    //   let response = await fetch(apiUrl, request);

    //   // Recreate the response so you can modify the headers.
    //   response = new Response(response.body, response);

    //   // Set CORS headers.
    //   response.headers.set("Access-Control-Allow-Origin", "*"); // Or specific origin
    //   response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    //   response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    //   return response;
		// }


    if(url.pathname.startsWith("/SQL"))
      return SQL.HandleRequest(request, env);

    if(url.pathname.startsWith("/Fluent"))
      return Fluent.HandleRequest(request, env);

		return env.ASSETS.fetch(request);
	},
};
