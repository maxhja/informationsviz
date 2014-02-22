function meanOfbranch(data) {
   
   	var meanArray = [];
   	var counter = 0;

    var industryGroups = new Object();

    var industryGroupMean = {}; 
   
    

    //add all uniqe industry group into a "map". 
    for (var i = 0; i < data.length; i++) {
<<<<<<< HEAD
      if(isNaN(industryGroups[data[i]["Industry Group"]])){
        industryGroups[data[i]["Industry Group"]]= 1;
      }
    
       industryGroups[data[i]["Industry Group"]]= 1+industryGroups[data[i]["Industry Group"]];
        
=======
      
>>>>>>> maxBranch
    };

  
   for(var industryGroup in industryGroups){
     
      var sizeOfBranch=0;
      var mean = {};
      mean["Industry Group"] = industryGroup;
      mean["Size of Branch"] =0;
        
    		for(var koordinat = 1; koordinat < d3.keys(data[0]).length; koordinat++) {
                    counter = 1;
                    calc = 0;

                    for(var j=0; j<data.length;j++){
                            
                            var tmpData = data[j][d3.keys(data[0])[koordinat]];

                            if(!isNaN(tmpData) && data[j]["Industry Group"]==industryGroup){
                              tmpData;
                              counter++;
                            	calc += parseFloat(tmpData);
                            }    	
                    }

                    var temp = d3.keys(data[0])[koordinat];

                    if(calc>0){
                       mean[temp] = '' + calc/counter + '';
                       mean["Size of Branch"] = counter;
                      
                     }

        }  
                
                meanArray.push(mean);      
  }
    
  return meanArray;

};
