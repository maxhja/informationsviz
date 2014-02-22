function meanOfbranch(data) {
   
   	var meanArray = [];
   	var counter = 0;

    var industryGroups = new Object();

    var industryGroupMean = {}; 

   
    

    //add all uniqe industry group into a "map". 
    for (var i = 0; i < data.length; i++) {

      if(isNaN(industryGroups[data[i]["Industry Group"]])){
        industryGroups[data[i]["Industry Group"]]= 1;
      }
    
       industryGroups[data[i]["Industry Group"]]= 1+industryGroups[data[i]["Industry Group"]];


    };

  
   for(var industryGroup in industryGroups){
     
      var sizeOfBranch=0;
      var mean = {};
      mean["Industry Group"] = industryGroup;
      mean["Size of Branch"] =0;
      mean["Company Name"]="";
        
    		for(var koordinat = 1; koordinat < d3.keys(data[0]).length; koordinat++) {
                    counter = 1;
                    calc = 0;


                    for(var j=0; j<data.length;j++){
                            var companyName ="";
                            
                            var tmpData = data[j][d3.keys(data[0])[koordinat]];

                            if(!isNaN(tmpData) && data[j]["Industry Group"]==industryGroup){
                              tmpData;
                              companyName+=data[j]["Company Name"];
                              counter++;

                            	calc += parseFloat(tmpData);
                            }    	
                    }

                    var temp = d3.keys(data[0])[koordinat];

                    if(calc>0){
                       mean[temp] = '' + calc/counter + '';
                       mean["Size of Branch"] = counter;
                       mean["Company Name"] =companyName;

                      
                     }

        }  
                
                meanArray.push(mean);      
  }
    
  return meanArray;

};
