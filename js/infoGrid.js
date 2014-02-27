function infoGrid() {

	var self = this; // for internal d3 functions
  self.grid=null;	
 
  //create the grid with slickgrid

  var columns = [
    {id: "stock", name: "Stock Name", field: "Stock", width: 140},
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
            console.log(data[args.row]);
        // or dataView.getItem(args.row);
        });


            
    }
     
    
    //method for selecting the pololyne from other components	
    this.selectLine = function(value){
        


    };


}