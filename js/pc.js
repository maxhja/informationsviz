function pc(){

    var self = this; // for internal d3 functions

    var pcDiv = $("#pc");

    var margin = [30, 10, 10, 10],
        width = pcDiv.width() - margin[1] - margin[3],
        height = pcDiv.height() - margin[0] - margin[2];

     
     var dimensionsOfStock  = ["Company Name","Exchange:Ticker","Industry Group","Bottom up Beta for sector","Bottom up levered beta","Market Cap (in US $)",
                            "Book Debt to capital ratio","Market Debt to capital ratio","Book Debt to Equity Ratio",
                            "Market Debt to Equity ratio",
                            "Standard deviation in stock price","Interest coverage ratio","PEG","EV/EBIT","EV/EBITDA",
                            "EV/Invested Capital","EV/Sales","Dividend Yield","Historical growth in Net Income - Last 3 years",
                            "Historical growth in Net Income - Last 5 years","Historical growth in Revenues - Last 3 years",
                            "Historical growth in Revenues - Last 5 years","Expected growth rate in EPS- Next 5 years","Expected growth in revenues - Next 2 years",
                            "Return on Equity,Return on Capital (ROC or ROIC)","Net Profit Margin,Pre-tax Operating Margin","Effective Tax Rate",
                            "% held by institutions","Net Income","Trailing Net Income","Operating Income","Trailing Operating Income (adj for leases)",
                            "Revenues","Trailing Revenues,EBITDA","Trailing EBITDA","EBIT (1-t)","Net Debt issued (Debt issue - repaid)",
                            "Change in non-cash Working capital","Net Cap Ex","Reinvestment Rate","FCFF","FCFE","FCFE without debt","Book Value of Equity - 4 qtrs ago",
                            "Invested Capital - 4 qtre ago","Current Book Value of Equity","Current Invested Capital","Dividends","Modified 2-year beta","Modified 5-year beta",
                            "Beta adjustment factor","Coeff of variation - Op Income","Coeff of variation - Net Income",
                            "Average 10-year EBIT","Average 10-yr Net Income", "EBITDA", "Cash/ Firm Value", "Stock price (Dec 31, 2012)in US$",
                            "Return on Capital (ROC or ROIC)", "Net Profit Margin", "Pre-tax Operating Margin","Total Debt", "Cash", "Correlation with market",
                            "Return on Equity", "Trailing Revenues"]

    
    //initialize color scale
    //...
    
    //initialize tooltip

   dimensionsOfStock;
    var tooltip = d3.select("#body").append("div")
                    .attr("class", "tooltip")
                    .style("opacity",0);

  

    var div = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);
 //...
    var x = d3.scale.ordinal().rangePoints([0, width], 1),
        y = {};
        

    var line = d3.svg.line(),
        axis = d3.svg.axis().orient("left"),
        background,
        foreground;

    var svg = d3.select("#pc").append("svg:svg")
        .attr("width", width + margin[1] + margin[3])
        .attr("height", height + margin[0] + margin[2])
        .append("svg:g")
        .attr("transform", "translate(" + margin[3] + "," + margin[0] + ")");

    //Load data
    d3.csv("data/svenska_aktier2.csv", function(data) {

        self.data = data;


        infoGrid1.addGrid(data);
        console.log(data);
        var means = meanOfbranch(data);
        data = means;
        console.log(data);
        x.domain(dimensions = d3.keys(self.data[0]).filter(function(d) {
            return d != "Name" && [(y[d] = d3.scale.linear() 

       infoGrid1.addGrid(data);

        x.domain(dimensions = d3.keys(self.data[0]).filter(function(d) {
            return d !=  mrParser(d) && [(y[d] = d3.scale.linear() //Remove Country

                .domain(d3.extent(self.data, function(p) { 
                    return +p[d]; }))
                .range([height, 0]))];
        }));


        self.data = data;
        //console.log(data);
        //var means = meanOfbranch(data);
       // console.log(means);
       //self.data = means;

      //  data = means;

        function mrParser(d){
            var l = dimensionsOfStock.length;
            var i;
            
            for(i=0; i<l;i++){
                 if(d != dimensionsOfStock[i]){

                
                }
                else {
                    console.log(d);
                    return d;
                }
                    
            }

            
        }

        draw();
    });

    function draw(){

        //adds all the stock

        cc = {};
        var color = d3.scale.category20c();


   //     self.data.forEach(function(d){
    //        cc[d["Tick"]] = color(d["Tick"]);

        self.data.forEach(function(d){
            cc[d["Company Name"]] = color(d["Company Name"]);
        });


        // Add grey background lines for context.
        background = svg.append("svg:g")
            .attr("class", "background")
            .selectAll("path")
            .data(self.data)
            .enter().append("svg:path")
            .attr("d", path)
            .style("stroke", function(p){
                return color(p["Company Name"]);
     
            })
            //add the data and append the path 
            //...
            .on("mousemove", function(d){})
            .on("mouseout", function(){});

        // Add Color foreground lines for focus.
        foreground = svg.append("svg:g")
            .attr("class", "foreground")
            .selectAll("path")
            .data(self.data)
            .enter().append("svg:path")
            .attr("d", path)
            .style("stroke", function(p){

                return color(p["Company Name"]);   
            })
            .on("mouseout", function(d){
                tooltip.transition()
                .duration(500)
                .style("opacity",0);

                                  })
            .on("mouseover", function(d){

                tooltip.transition()
                .duration(500)  
                .style("opacity", .9)

            
                                    })
            .on("click", function(d){
                //selFeature(d);
                console.log(d);
                //addToGrid(d);
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
        var actives = dimensions.filter(function(p) { return !y[p].brush.empty(); }),
            extents = actives.map(function(p) { return y[p].brush.extent(); });
            foreground.style("display", function(d) {

            return actives.every(function(p, i) {
                if(extents[i][0] <= d[p] && d[p] <= extents[i][1])
                {
                    //addToGrid(d);
                }
                return extents[i][0] <= d[p] && d[p] <= extents[i][1];
            }) ? null : "none";
        });
    }

    //method for selecting the pololyne from other components	
    this.selectLine = function(value){
         
    };

    //add data to to the grid
    function addToGrid(value) {

        infoGrid1.addGrid(value);

    }
    
    //method for selecting features of other components
    function selFeature(value){
        console.log(value);
        //...
    };

}
