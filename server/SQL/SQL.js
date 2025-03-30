export default {
  async HandleRequest(request, env)
  {
    const url = new URL(request.url);
    if(url.pathname == "/SQL/get")
    {
      return this.GetTables(request, env);
    }


    return new Response(JSON.stringify({
      "success": false,
      "message": "URL must be /SQL/get or /SQL/add or /SQL/update or /SQL/delete",
      "data": []
    }));
  },
  async GetTables(request, env)
  {
    const requestData = await request.json();
    const table   = requestData["Table"];
    const filter  = requestData["Filters"];
    if(table == undefined || filter == undefined)
    {
      return new Response(JSON.stringify({
        "success": false,
        "message": "Table and Filters are required parameters!",
        "data": []
      }));
    }

    const { results } = await env.database.prepare(
      "SELECT * FROM Campaigns"
    ).all();

    return new Response(JSON.stringify({
      "success": true,
      "message": "Success",
      "data": results
    }));
  },

  async GetAllCampaigns(request, env)
  {
    const { results } = await env.database.prepare(
      "SELECT * FROM Campaigns"
    ).all();

    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}