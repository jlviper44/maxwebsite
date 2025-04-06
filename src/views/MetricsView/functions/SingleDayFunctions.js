import axios from 'axios';
import { FormatDateTime, GetHoursInDay } from './functions';

export const SingleDayFormatChartData = (data, dateKey, dataKey) => {
  var labels = {};
  
  GetHoursInDay().forEach((item) => {
    labels[item] = 0.0;
  });

  data.forEach((item) => {
    var label = item[dateKey].substring(11,13);
    labels[label] += item[dataKey];
  });
  var finalData = [];

  GetHoursInDay().forEach((item) => {
    finalData.push({
      label: item,
      data: labels[item]
    });
  });
  return finalData;
}

export const GetClickData = async(
  startDate,
  endDate,
  fields,
  apiName
) => {
  var request = await axios.post("/Fluent/get/Reports/Clicks", 
    {
      APIName: apiName,
      start_date: startDate,
      end_date:   endDate,
      fields:     fields
    }
  );
  var responseData = request.data.data;
  responseData.forEach((item) => {
    item["click_date"] = FormatDateTime(item["click_date"]);
    item["Count"] = 1;
  })

  return responseData;
}

export const GetConversionData = async(
  startDate,
  endDate,
  fields,
  apiName
) => {
  var request = await axios.post("/Fluent/get/Reports/Conversions", 
    {
      APIName: apiName,
      start_date: startDate,
      end_date:   endDate,
      fields:     fields
    }
  );
  console.log(request);
  var responseData = request.data.data;
  
  responseData.forEach((item) => {
    item["conversion_date"] = FormatDateTime(item["conversion_date"]);
  })
  return responseData;
}