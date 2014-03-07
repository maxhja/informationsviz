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
    enableColumnReorder: false,
    multiColumnSort: true
  };

//method for selecting features of other components
    function selFeature(value){
     

    }

    $("#myButton").click(function(){

       
        

      var value= $("#mySearch").val();
      var dataPick = [];

      
d3.csv("data/svenska_aktier2.csv", function(data) {
 var counter = 0;
         for (var i = 0; i < data.length; i++) {
         
          var temp = data[i]["Company Name"];
          var re = new RegExp(value,'gi');
          var test = temp.match(re);

              if(test != null)
              {

                  dataPick[counter] = {
                      Stock: data[i]["Company Name"],
                      ig: data[i]["Industry Group"],
                      pe: data[i]["Current PE"],
                      ps: data[i]["PS"],
                      dy: data[i]["Dividend Yield"],
                      beta: data[i]["Beta"],
                      Ticker: data[i]["Exchange:Ticker"]
                    };
                    counter++;
              }
          }
  
                  var columns = [
          {id: "Stock", name: "Company Name", field: "Stock", sortable: true, width: 100},
          {id: "ig", name: "Industry Group", field: "ig", sortable: true, width: 50},
          {id: "pe", name: "P/E", field: "pe", sortable: true},
          {id: "ps", name: "P/S", field: "ps", sortable: true},
          {id: "dy", name: "Dividend Yield", field: "dy", sortable: true },
          {id: "beta", name: "Beta", field: "beta", sortable: true},
         ];

          self.grid = new Slick.Grid("#stockInfo", dataPick, columns, options);

            self.grid.onClick.subscribe(function(e, args) {

                    
               if(dataPick[args.row]["Ticker"]!=null){

              var res = parseTicker(dataPick[args.row]["Ticker"]);
              var newRes =getHistoricalData(res);
             


              if(newRes ==1 || newRes ==0){
                    
                    infoPlot1.setFile(res);
                    infoPlot1.setTitle(dataPick[args.row]["Company Name"]);

              }
              else{
                     console.log("could not load file :(");
              }

            }
            else{

    
              pc1.addToPc(dataPick[args.row]);
            
            }
                  
                  
                  

            
                });

   });  

      
           


   
              
     
      

    });

    function searchGrid(value){
   




    }
    

    this.addGrid = function(data){
  
      if(data[0]["Company Name"]==null){

        var columns = [
          {id: "ig", name: "Industry Group", field: "ig", sortable: true, width: 100},
          {id: "pe", name: "P/E", field: "pe", sortable: true},
          {id: "ps", name: "P/S", field: "ps", sortable: true},
          {id: "dy", name: "Dividend Yield", field: "dy" , sortable: true},
          {id: "beta", name: "Beta", field: "beta", sortable: true},
         ];
        }
        else{
          var columns = [
          {id: "Stock", name: "Company Name", field: "Stock", sortable: true, width: 100},
          {id: "ig", name: "Industry Group", field: "ig", sortable: true, width: 50},
          {id: "pe", name: "P/E", field: "pe", sortable: true},
          {id: "ps", name: "P/S", field: "ps", sortable: true},
          {id: "dy", name: "Dividend Yield", field: "dy", sortable: true },
          {id: "beta", name: "Beta", field: "beta", sortable: true},
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


          self.grid.onSort.subscribe(function (e, args) {
              
              var cols = args.sortCols;


              dataPicked.sort(function (dataRow1, dataRow2) {
                for (var i = 0, l = cols.length; i < l; i++) {
                  var field = cols[i].sortCol.field;
                  var sign = cols[i].sortAsc ? 1 : -1;
                  var value1 = dataRow1[field], value2 = dataRow2[field];
                  var result = (value1 == value2 ? 0 : (value1 > value2 ? 1 : -1)) * sign;
                  if (result != 0) {
                    return result;
                  }
                }
                return 0;
              });
              self.grid.invalidate();
              self.grid.render();
            });

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