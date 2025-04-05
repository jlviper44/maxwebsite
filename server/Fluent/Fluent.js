import HelperFunctions from "../HelperFunctions";
import { D1QB } from 'workers-qb'

const BASE_URL      = "https://login.affluentco.com/affiliates/api";

export default {
  async HandleRequest(request, env)
  {
    const url = new URL(request.url);
    if(url.pathname == "/Fluent/get/Reports/Conversions")
      return this.GetConversionReports(request, env);
    if(url.pathname == "/Fluent/get/Reports/Clicks")
      return this.GetClicksReports(request, env);
    if(url.pathname == "/Fluent/get/Reports/SubAffiliateSummary")
      return this.GetSubAffiliateSummary(request, env);

    return HelperFunctions.CreateResponse(
      false,
      "Unknown Request!",
      []
    );
  },
  GetStartAndEndDateFromBody(reqBody)
  {
    if(!reqBody.hasOwnProperty('start_date'))
    {
      return "Error: Missing start_date in body!";
    }
    if(!reqBody.hasOwnProperty('end_date'))
    {
      return "Error: Missing end_date in body!";
    }

    return  "start_date=" + encodeURIComponent(HelperFunctions.FormatDateTime(reqBody["start_date"])) +
            "&end_date="  + encodeURIComponent(HelperFunctions.FormatDateTime(reqBody["end_date"]));
  },

  GetFieldsFromBody(reqBody)
  {
    if(!reqBody.hasOwnProperty('fields'))
    {
      return "";
    }
    if(!Array.isArray(reqBody["fields"]))
    {
      return "";
    }
    var string = "";
    reqBody["fields"].forEach((field) => {
      string += "&fields="+field;
    });
    return string;
  },

  async GetAPIKeyAndAffiliateID(env, APIName)
  {
    const qb = new D1QB(env.database);
    const APIs = await qb
    .fetchAll({
      tableName: 'FluentAPIs',
      where: {
        conditions: 'Name = ?',
        params: APIName,
      },
    })
    .execute();
    if(APIs.results.length == 1)
    {
      return "&api_key="+APIs.results[0].API_KEY+"&affiliate_id="+APIs.results[0].AFFILIATE_ID;
    }

    return "";
  },

  async GetConversionReports(request, env)
  {
    const reqBody = await request.json();
    var apiUrl = BASE_URL + "/Reports/Conversions?";
    
    const startAndEndDate = this.GetStartAndEndDateFromBody(reqBody);
    if(startAndEndDate.includes("Error"))
      return HelperFunctions.CreateResponse(
        false,
        startAndEndDate,
        []
      );
    
    apiUrl += startAndEndDate;

    apiUrl += "&start_at_row=1&row_limit=3000";
    apiUrl += this.GetFieldsFromBody(reqBody);
    apiUrl += await this.GetAPIKeyAndAffiliateID(env, reqBody.APIName);
    
    let response = await fetch(apiUrl, {});
    let t = await response.json();

    return HelperFunctions.CreateResponse(
      true,
      "Success",
      t["data"]
    );
  },

  async GetClicksReports(request, env)
  {
    const reqBody = await request.json();
    var apiUrl = BASE_URL + "/Reports/Clicks?";
    
    const startAndEndDate = this.GetStartAndEndDateFromBody(reqBody);
    if(startAndEndDate.includes("Error"))
      return HelperFunctions.CreateResponse(
        false,
        startAndEndDate,
        []
      );
    
    apiUrl += startAndEndDate;

    apiUrl += "&start_at_row=1&row_limit=3000";
    apiUrl += this.GetFieldsFromBody(reqBody);
    apiUrl += await this.GetAPIKeyAndAffiliateID(env, reqBody.APIName);
    
    let response = await fetch(apiUrl, {});
    let t = await response.json();

    return HelperFunctions.CreateResponse(
      true,
      "Success",
      t["data"]
    );
  },

  async GetSubAffiliateSummary(request, env)
  {
    const reqBody = await request.json();
    var apiUrl = BASE_URL + "/Reports/SubAffiliateSummary?";
    
    const startAndEndDate = this.GetStartAndEndDateFromBody(reqBody);
    if(startAndEndDate.includes("Error"))
      return HelperFunctions.CreateResponse(
        false,
        startAndEndDate,
        []
      );
    
    apiUrl += startAndEndDate;

    apiUrl += "&start_at_row=1&row_limit=3000";
    apiUrl += this.GetFieldsFromBody(reqBody);
    apiUrl += await this.GetAPIKeyAndAffiliateID(env, reqBody.APIName);
    
    let response = await fetch(apiUrl, {});
    let t = await response.json();

    return HelperFunctions.CreateResponse(
      true,
      "Success",
      t["data"]
    );
  }
}