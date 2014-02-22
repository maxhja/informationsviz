function meanOfbranch(data) {

   	var mean = {};
   	var meanArray = [];
   	var counter = 0;
   	mean["Name"] = "Medel";



    for (var i = 0; i < data.length; i++) {
      
    };
  


		for(var koordinat = 1; koordinat < d3.keys(data[0]).length; koordinat++) {
                counter = 0;
                calc = 0;
                for(var j=0; j<data.length;j++){
                        counter++;
                        var tmpData = +data[j][d3.keys(data[0])[koordinat]];
                        if(!isNaN(tmpData)){
                        	calc += tmpData;
                        }    	
                    
                }
                var temp = d3.keys(data[0])[koordinat];
               // console.log(temp);
                mean[temp] = '' + calc/counter + '';
            }  
            meanArray.push(mean);

            return meanArray;


};
