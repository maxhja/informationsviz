function sortData(industryGroup, data){

   var companyArray =[];
   var companyObject = {};

   for (var i = data.length - 1; i >= 0; i--) {
   	       if(data[i]["Industry Group"]==industryGroup["Industry Group"]){
   	       	companyArray.push(data[i]);
   	       }
   };

return companyArray;

}


function getCompany(industryGroup, data){

   var companyArray =[];
   var companyObject = {};

   for (var i = data.length - 1; i >= 0; i--) {
           if(data[i]["Company Name"]==industryGroup["Company Name"]){
            companyArray.push(data[i]);
           }
   };

return companyArray;

}


function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}



function getHistoricalData(ticker) {
 
  var rdata;
  $.ajax({
    type: "POST",
    async: false,  
    url: "js/functions.php",
    data: {
            ticker: ticker
          },

    dataType : "text",
    success: function(data){
       
     rdata = data;
      
    }
  });
   return rdata;
}


function parseTicker(ticker){

    var res = ticker.replace("OM:","");
    res = res+".ST";

  return res;

}


