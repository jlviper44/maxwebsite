
export const FormatDateTime = (dateString) => {
  const date = new Date(dateString);

  const month   = (date.getMonth() + 1).toString().padStart(2, '0');
  const day     = (date.getDate()).toString().padStart(2, '0');
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

