import axios from 'axios';

export const FormatDateTime = (dateString) => {
  const date = new Date(dateString);

  const month   = (date.getMonth() + 1).toString().padStart(2, '0');
  const day     = date.getDate();
  const year    = date.getFullYear();
  const hours   = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${month}-${day}-${year} ${hours}:${minutes}:${seconds}`;
};

export const GetHoursInDay = () => {
  var hours = [];
  for(var i = 0; i < 24; i++)
  {
    hours.push(String(i).padStart(2, '0'));
  }
  return hours;
}

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
  fields
) => {
  var request = await axios.post("/Fluent/get/Reports/Clicks", 
    {
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
  fields
) => {
  var request = await axios.post("/Fluent/get/Reports/Conversions", 
    {
      start_date: startDate,
      end_date:   endDate,
      fields:     fields
    }
  );
  var responseData = request.data.data;
  
  responseData.forEach((item) => {
    item["conversion_date"] = FormatDateTime(item["conversion_date"]);
  })
  return responseData;
}