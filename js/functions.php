<?php

    $id = $_POST['ticker'];


    
    $url = 'http://ichart.finance.yahoo.com/table.csv?s=';
    $ticker = $id; 
    $url2 = '&d=1&e=26&f=2014&g=d&a=0&b=3&c=2000&ignore=.csv';
    $completeUrl = $url.$ticker.$url2;
    
    
   
    $path = 'hist/'.$id.'.csv';
    
    if(file_exists($path)==false){

    $ch = curl_init($completeUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $data = curl_exec($ch);

    curl_close($ch);

    file_put_contents($path, $data);
    
       echo 0;

    }
    else{
    	echo 1;

    }



    
?>