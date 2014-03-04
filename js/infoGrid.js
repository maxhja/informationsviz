function infoGrid() {

	var self = this; // for internal d3 functions
  self.grid=null;	
 
  //create the grid with slickgrid
 
  var columns = [
    
    {id: "ig", name: "Industry Group", field: "ig", width: 140},
    {id: "pe", name: "P/E", field: "pe"},
    {id: "ps", name: "P/S", field: "ps"},
    {id: "dy", name: "Dividend Yield", field: "dy"},
    {id: "beta", name: "Beta", field: "beta"},
    

  ];


  var options = {
    enableCellNavigation: false,
    enableColumnReorder: false
  };

//method for selecting features of other components
    function selFeature(value){
     

    }

    this.addGrid = function(data){

       var columns;
   

      if(data[0]["Company Name"]==null){

        var columns = [
          {id: "ig", name: "Industry Group", field: "ig", width: 100},
          {id: "pe", name: "P/E", field: "pe"},
          {id: "ps", name: "P/S", field: "ps"},
          {id: "dy", name: "Dividend Yield", field: "dy"},
          {id: "beta", name: "Beta", field: "beta"},
         ];
        }
        else{
          var columns = [
          {id: "Stock", name: "Company Name", field: "Stock", width: 100},
          {id: "ig", name: "Industry Group", field: "ig", width: 100},
          {id: "pe", name: "P/E", field: "pe"},
          {id: "ps", name: "P/S", field: "ps"},
          {id: "dy", name: "Dividend Yield", field: "dy"},
          {id: "beta", name: "Beta", field: "beta"},
         ];

        }

        var dataPicked = [];
  	    var length = data.length;

  	     for (var i = 0; i < length; i++) {
  		      dataPicked[i] = {
  			        Stock: data[i]["Company Name"],
                ig: data[i]["Industry Group"],
  			        pe: data[i]["Current PE"],
  			        ps: data[i]["PS"],
                dy: data[i]["Dividend Yield"],
                beta: data[i]["Beta"]
              };
          }

          self.grid = new Slick.Grid("#stockInfo", dataPicked, columns, options);

          self.grid.onClick.subscribe(function(e, args) {
            
            if(data[args.row]["Exchange:Ticker"]!=null){

              var res = parseTicker(data[args.row]["Exchange:Ticker"]);
              var newRes =getHistoricalData(res);
             

             

              if(newRes ==1 || newRes ==0){
                    
                    infoPlot1.setFile(res);
                    infoPlot1.setTitle(data[args.row]["Company Name"]);

              }
              else{
                     console.log("could not load file :(");
              }

            }
            else{

              pc1.addToPc(data[args.row]);
            
            }
            

      
          });

       //columnId, ascending
            
    }
     
    
    //method for selecting the pololyne from other components	
    this.selectLine = function(value){
        


    };


}