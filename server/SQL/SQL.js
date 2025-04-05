import { D1QB } from 'workers-qb'
import HelperFunctions from '../HelperFunctions';
import FluentAPI from './Tables/FluentAPI';

export default {
  async HandleRequest(request, env)
  {
    const url = new URL(request.url);
    if(url.pathname.startsWith("/SQL/FluentAPI"))
    {
      return FluentAPI.HandleRequest(request, env);
    }
    return new HelperFunctions.CreateResponse(
      false,
      "Invalid Table",
      []
    );
  },

  // async GetAllAPIs(request, env)
  // {
  //   const qb = new D1QB(env.database);
  //   const employeeList = await qb
  //   .fetchAll({
  //     tableName: 'FluentAPIs',
  //   })
  //   .execute()
    
  //   console.log(employeeList.results)
    
  //   return HelperFunctions.CreateResponse(
  //     true,
  //     "Test!",
  //     []
  //   );
  // }
  // async GetTables(request, env)
  // {
  //   const requestData = await request.json();
  //   const table   = requestData["Table"];
  //   const filter  = requestData["Filters"];
  //   if(table == undefined || filter == undefined)
  //   {
  //     return new Response(JSON.stringify({
  //       "success": false,
  //       "message": "Table and Filters are required parameters!",
  //       "data": []
  //     }));
  //   }

  //   const { results } = await env.database.prepare(
  //     "SELECT * FROM Campaigns"
  //   ).all();

  //   return new Response(JSON.stringify({
  //     "success": true,
  //     "message": "Success",
  //     "data": results
  //   }));
  // },

  // async GetAllCampaigns(request, env)
  // {
  //   const { results } = await env.database.prepare(
  //     "SELECT * FROM Campaigns"
  //   ).all();

  //   return new Response(JSON.stringify(results), {
  //     headers: { 'Content-Type': 'application/json' }
  //   });
  // }
}