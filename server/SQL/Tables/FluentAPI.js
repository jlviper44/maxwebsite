import { D1QB } from 'workers-qb'
import HelperFunctions from '../../HelperFunctions';

export default {
  async HandleRequest(request, env)
  {
    const url = new URL(request.url);
    if(url.pathname == "/SQL/FluentAPI/get")
    {
      return this.Get(request, env);
    }
    if(url.pathname == "/SQL/FluentAPI/insert")
    {
      return this.Insert(request, env);
    }
    if(url.pathname == "/SQL/FluentAPI/update")
    {
      return this.Update(request, env);
    }
    if(url.pathname == "/SQL/FluentAPI/delete")
    {
      return this.Delete(request, env);
    }
    return new HelperFunctions.CreateResponse(
      false,
      "Invalid Function",
      []
    );
  },

  async Get(request, env)
  {
    const qb = new D1QB(env.database);
    const APIs = await qb
    .fetchAll({
      tableName: 'FluentAPIs',
    })
    .execute();

    return HelperFunctions.CreateResponse(
      true,
      "Success",
      APIs.results
    );
  },

  async Insert(request, env)
  {
    const reqBody = await request.json();
    if( !"Name" in reqBody ||
        !"API_KEY" in reqBody||
        !"AFFILIATE_ID" in reqBody
    )
    {
      return HelperFunctions.CreateResponse(
        false,
        "Error: Name, API_KEY, and AFFILIATE_ID need to be in body!",
        []
      );
    }

    const qb = new D1QB(env.database);
    try
    {
      const APIs = await qb
      .insert({
        tableName: 'FluentAPIs',
        data: {
          Name: reqBody.Name,
          API_KEY: reqBody.API_KEY,
          AFFILIATE_ID: reqBody.AFFILIATE_ID
        }
      })
      .execute();

      return HelperFunctions.CreateResponse(
        true,
        "Success",
        []
      );
    } catch {

    }
    return HelperFunctions.CreateResponse(
      false,
      "Insert Error!",
      []
    );
  },

  async Update(request, env)
  {
    const reqBody = await request.json();
    if( !"Name" in reqBody ||
        !"API_KEY" in reqBody||
        !"AFFILIATE_ID" in reqBody ||
        !"UpdateName" in reqBody
    )
    {
      return HelperFunctions.CreateResponse(
        false,
        "Error: Name, API_KEY, AFFILIATE_ID, and UpdateName need to be in body!",
        []
      );
    }

    const qb = new D1QB(env.database);
    try
    {
      const APIs = await qb
      .update({
        tableName: 'FluentAPIs',
        data: {
          Name: reqBody.Name,
          API_KEY: reqBody.API_KEY,
          AFFILIATE_ID: reqBody.AFFILIATE_ID
        },
        where: {
          conditions: 'Name = ?',
          params: reqBody.UpdateName,
        },
      })
      .execute();

      return HelperFunctions.CreateResponse(
        true,
        "Success",
        []
      );
    } catch {

    }
    return HelperFunctions.CreateResponse(
      false,
      "Insert Error!",
      []
    );
  },

  async Delete(request, env)
  {
    const reqBody = await request.json();
    if( !"Name" in reqBody)
    {
      return HelperFunctions.CreateResponse(
        false,
        "Error: Name needs to be in body!",
        []
      );
    }

    const qb = new D1QB(env.database);
    try
    {
      const APIs = await qb
      .delete({
        tableName: 'FluentAPIs',
        where: {
          conditions: 'Name = ?',
          params: reqBody.Name,
        },
      })
      .execute();

      return HelperFunctions.CreateResponse(
        true,
        "Success",
        []
      );
    } catch {

    }
    return HelperFunctions.CreateResponse(
      false,
      "Insert Error!",
      []
    );
  }
}