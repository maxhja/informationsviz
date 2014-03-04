function pc(){
    
 

    var self = this; // for internal d3 functions

    self.means =null;
    var brush
    var means;
    var data;
    var brush_count = 0;
    var x ;
    var div;
    var tooltip;
    var svg;
    var line = d3.svg.line(),
        axis = d3.svg.axis().orient(),
        background,
        foreground;

    var pcDiv = $("#pc");

    var margin = [30, 10, 10, 10],
        width = pcDiv.width() - margin[1] - margin[3],
        height = pcDiv.height() - margin[0] - margin[2];

     
     var dimensionsOfStock  = ["Company Name","Exchange:Ticker","Industry Group","Bottom up Beta for sector","Bottom up levered beta","Market Cap (in US $)",
                            "Book Debt to capital ratio","Market Debt to capital ratio","Book Debt to Equity Ratio",
                            "Market Debt to Equity ratio",
                            "Standard deviation in stock price","Interest coverage ratio","PEG","EV/EBIT","EV/EBITDA",
                           "EV/Sales","Dividend Yield","Historical growth in Net Income - Last 3 years",
                            "Historical growth in Net Income - Last 5 years","Historical growth in Revenues - Last 3 years",
                            "Historical growth in Revenues - Last 5 years","Expected growth rate in EPS- Next 5 years","Expected growth in revenues - Next 2 years",
                            "Return on Equity,Return on Capital (ROC or ROIC)","Pre-tax Operating Margin","Effective Tax Rate",
                            "% held by institutions","Net Income","Trailing Net Income","Operating Income","Trailing Operating Income (adj for leases)",
                            "Revenues","Trailing Revenues,EBITDA","Trailing EBITDA","EBIT (1-t)","Net Debt issued (Debt issue - repaid)",
                            "Change in non-cash Working capital","Net Cap Ex","Reinvestment Rate","FCFF","FCFE","FCFE without debt","Book Value of Equity - 4 qtrs ago",
                            "Invested Capital - 4 qtre ago","Current Book Value of Equity","Current Invested Capital","Dividends","Modified 2-year beta","Modified 5-year beta",
                            "Beta adjustment factor","Coeff of variation - Op Income","Coeff of variation - Net Income",
                            "Average 10-year EBIT","Average 10-yr Net Income", "EBITDA", "Cash/ Firm Value", "Stock price (Dec 31, 2012)in US$",
                            "Return on Capital (ROC or ROIC)", "Net Profit Margin", "Pre-tax Operating Margin","Total Debt", "Cash",
                            "Return on Equity", "Trailing Revenues", "Size of Branch"]
    
    //initialize tooltip

    d3.csv("data/svenska_aktier2.csv", function(data) {
        
        means = meanOfbranch(data);
        data = data;
        self.data = data;
        self.means = means;
        var value = "mean";
        loadData(value, data); 
    

    });  
     

    function loadData(value, sortedData) {



    d3.select("#pc > svg")
    .remove();

     tooltip = d3.select("body").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);


     line = d3.svg.line(),
        axis = d3.svg.axis().orient("left"),
        background,
        foreground;


    x = d3.scale.ordinal().rangePoints([0, width], 1),
    y = {};


        svg = d3.select("#pc").append("svg:svg")
            .attr("width", width + margin[1] + margin[3])
            .attr("height", height + margin[0] + margin[2])
            .append("svg:g")
            .attr("transform", "translate(" + margin[3] + "," + margin[0] + ")");
     
         //Load data med en Ny function som sedan ska anropas på "on click"
        if(value == "mean"){

        var means = meanOfbranch(sortedData);
            infoGrid1.addGrid(means);

            setScale(self.means)
        }
        else if("data"==value){
          // console.log(value);
            
            self.sortedData = sortedData;   
            infoGrid1.addGrid(sortedData);
            console.log(self.sortedData);
            setScale(self.sortedData)
        }
        else{

            infoGrid1.addGrid(data);
            setScale(self.data)
        }

        function setScale(data1){
             
            x.domain(dimensions = d3.keys(data1[0]).filter(function(d) {
            return d !=  getDimension(d) && [(y[d] = d3.scale.linear() //Remove Country
                .domain(d3.extent(data1, function(p) { 

                    return +p[d]; }))
                .range([height, 0]))];
            }));

        }

        draw(value);
      }

      //Slut på loaddata
      function getDimension(d){

            var l = dimensionsOfStock.length;
            var i;
            for(i=0; i<l;i++){
                 if(d != dimensionsOfStock[i]){
                }
                else 
                    return d;
            } 
    }

    function draw(value){
     
        //adds all the stock
        cc = {};
        var color = d3.scale.category20c();
        var setColorType ="";

        var dataSet= null;

        if(value =="mean"){

            self.means.forEach(function(d){
                    cc[d["Industry Group"]] = color(d["Industry Group"]);
            });
            setColorType = "Industry Group";

            dataSet = self.means;
        }
        else if(value=="data"){
            self.sortedData.forEach(function(d){
                    cc[d["Company Name"]] = color(d["Company Name"]);
                   
            });
             setColorType = "Company Name";
             dataSet = self.sortedData;

        }
        else{
            self.data.forEach(function(d){
                cc[d["Company Name"]] = color(d["Company Name"]);
                
            });
            dataSet = self.data;
            setColorType = "Industry Group";

        }
        // Add grey background lines for context.
        background = svg.append("svg:g")
            .attr("class", "background")
            .selectAll("path")
            .data(dataSet)
            .enter().append("svg:path")
            .attr("d", path)
            .style("stroke", function(p){
                return color(p["Industry Group"]);
     
            })
            //add the data and append the path 
            .on("mousemove", function(d){})
            .on("mouseout", function(){});

        // Add Color foreground lines for focus.
        foreground = svg.append("svg:g")
            .attr("class", "foreground")
            .selectAll("path")
            .data(dataSet)
            .enter().append("svg:path")
            .attr("d", path)
            .attr("stroke-width", function(d){
                return (d["Size of Branch"]/5);
            })
            .style("stroke",function(p){
                return color(p[setColorType]);   
            })

            .on("mouseout", function(d){
                tooltip.transition()
                .duration(500)
                .style("opacity",0);
             /*    if(d["Company Name"]!=null){ //get all company 
                    
                     addToGrid(self.data);
                 }
                 else{ //get all company within
                    var tempData = clone(self.data);
                   // var sortedData = getCompany(d, tempData);     
                   // addToGrid(sortedData);
                 }
                   */

                                  })
            .on("mouseover", function(d){
               // console.log(d);
                tooltip.transition()
               .duration(200)
               .style("opacity", 1);
                tooltip.html(d[setColorType])
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY -8) + "px");
/*
                if(d["Company Name"]!=null){
                    var tempData = clone(self.means);
                    //sort after company name
                    //var sortedData = getCompany(d, tempData);     
                   // addToGrid(sortedData);


                }
                else{ // sort grid after industry group 
                var tempData = clone(self.data);
              
                 //get all objects within the industry group
                 var sortedData = sortData(d, tempData);     
               //  addToGrid(sortedData);
                 }

               var tempData = clone(self.data);
               var sortedData = sortData(d, tempData);

              // addToGrid(sortedData)
              */
                                    })
            .on("click", function(d){

                //selFeature(d);
                var tempData = clone(self.data);
                var mean = "data";  
                //get all objects within the industry group
                var sortedData = sortData(d, tempData);  
              
                addToGrid(sortedData);
                loadData(mean, sortedData);

               var res = parseTicker(d["Exchange:Ticker"]);

               var newRes =getHistoricalData(res);

               if(newRes ==1 || newRes ==0){
                
                infoPlot1.setFile(res);

               }
               else{
                 console.log("could not load file :(");
               }


            });

        // Add a group element for each dimension.
        var g = svg.selectAll(".dimension")
            .data(dimensions)
            .enter().append("svg:g")
            .attr("class", "dimension")
            .attr("transform", function(d) { return "translate(" + x(d) + ")"; });
            
        // Add an axis and title.
        g.append("svg:g")
            .attr("class", "axis")
            .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
            //add scale
            .append("svg:text")
            .attr("text-anchor", "middle")
            .attr("y", -9)
            .text(String);

        // Add and store a brush for each axis.
        g.append("svg:g")
            .attr("class", "brush")
            .each(function(d) { d3.select(this).call(y[d].brush = d3.svg.brush().y(y[d]).on("brush", brush)); })
            .selectAll("rect")
            .attr("x", -8)
            .attr("width", 16)
    }

    // Returns the path for a given data point.
    function path(d) {
        return line(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));

    }
   

    // Handles a brush event, toggling the display of foreground lines.
    function brush() {

        var selected = [];
      
        var actives = dimensions.filter(function(p) { return !y[p].brush.empty(); }),
            extents = actives.map(function(p) { return y[p].brush.extent(); });
            foreground.style("display", function(d) {

            return actives.every(function(p, i) {

                 return extents[i][0] <= d[p] && d[p] <= extents[i][1];
            }) ? selected.push(d) && null : "none";

        });
            addToGrid(selected);

          //  path(selected);
    
    }


    //method for selecting the pololyne from other components	
    this.selectLine = function(value){
         
    };

    this.addToPc = function(value){
        test(value);

    }

    function test(value){

         var tempData = clone(self.data);
         var mean = "data";  
         //get all objects within the industry group
         var sortedData = sortData(value, tempData);       
         addToGrid(sortedData);
         loadData(mean, sortedData);
 
    }

    //method for selecting features of other components
    function selFeature(value){

       
    };

  

   
}


