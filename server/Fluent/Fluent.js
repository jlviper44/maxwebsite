import HelperFunctions from "../HelperFunctions";

const BASE_URL      = "https://login.affluentco.com/affiliates/api";
const API_KEY       = "hFct58Jru5Y5cPlP8VGq8Q";
const AFFILIATE_ID  = "207744";


export default {
  async HandleRequest(request, env)
  {
    const url = new URL(request.url);
    if(url.pathname == "/Fluent/get/ConversionReports")
    {
      return this.GetConversionReports(request, env);
    }

    return HelperFunctions.CreateResponse(
      false,
      "Unknown Request!",
      []
    );
  },

  async GetConversionReports(request, env)
  {
    const reqBody = await request.json();

    var apiUrl = BASE_URL + "/Reports/Conversions?";
    
    if(!"start_date" in reqBody)
    {
      return HelperFunctions.CreateResponse(
        false,
        "Error: Missing start_date in body!",
        []
      );
    }
    if(!"end_date" in reqBody)
    {
      return HelperFunctions.CreateResponse(
        false,
        "Error: Missing start_date in body!",
        []
      );
    }
    apiUrl +=
      "start_date=" + encodeURIComponent(HelperFunctions.FormatDateTime(reqBody["start_date"])) +
      "&end_date="  + encodeURIComponent(HelperFunctions.FormatDateTime(reqBody["end_date"]))


    apiUrl += "&start_at_row=1&row_limit=3000&api_key=hFct58Jru5Y5cPlP8VGq8Q&affiliate_id=207744";
    
    
    
    
    
    let response = await fetch(apiUrl, {});
    let t = await response.json();

    return HelperFunctions.CreateResponse(
      true,
      "Good Request!",
      t["data"]
    );
  }
}