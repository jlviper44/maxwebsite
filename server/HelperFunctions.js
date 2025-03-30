export default {
  CreateResponse(success, message, data)
  {
    return new Response(JSON.stringify({
      "success": success,
      "message": message,
      "data": data
    }));
  },
  FormatDateTime(dateString) {
    const date = new Date(dateString);
    const month   = (date.getMonth() + 1).toString().padStart(2, '0');
    const day     = date.getDate();
    const year    = date.getFullYear();
    const hours   = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${month}-${day}-${year} ${hours}:${minutes}:${seconds}`;
  }
}