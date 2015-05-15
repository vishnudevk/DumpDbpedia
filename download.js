var http = require("http");


onJsonResponse = function(res) {
    var data = '';

    res.on('data', function (chunk){
        data += chunk;
    });

    res.on('end',function(){
        //console.log(data);
        var jsonStr = JSON.parse(data);
        //console.log(JSON.stringify(jsonStr.head));
        processResultJson(jsonStr);
    })
}

var queryUrl = "http://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=select++%3Fhomepage+%3Fabstract+%3Fproduct+%3Flocation+%3Fthumbnail+++%28group_concat%28%3Fcompany_name%3Bseparator%3D%22%2C%22%29+as+%3Fcompany_name%29+%28group_concat%28%3FproductLabel+%3Bseparator%3D%22%2C%22%29+as+%3FproductLabel%29++%28group_concat%28%3FlocationLabel+%3Bseparator%3D%22%2C%22%29+as+%3FlocationLabel%29%0D%0Awhere+%7B%0D%0A++++%3Fcompany+dcterms%3Asubject+category%3ACloud_computing_providers.%0D%0A++++%0D%0A++++%3Fcompany+foaf%3Aname+%3Fcompany_name.%0D%0A++++%3Fcompany+foaf%3Ahomepage+%3Fhomepage.%0D%0A++++%3Fcompany+dbpedia-owl%3Aabstract+%3Fabstract.%0D%0A++++Optional+%7B%0D%0A++++++++%3Fcompany+dbpedia-owl%3Aproduct+%3Fproduct.%0D%0A++++++++%3Fproduct+rdfs%3Alabel+%3FproductLabel+.%0D%0A++++%7D%0D%0A++++Optional+%7B%0D%0A++++++++%3Fcompany+dbpedia-owl%3Alocation+%3Flocation.%0D%0A++++++++%3Flocation+rdfs%3Alabel+%3FlocationLabel+.%0D%0A++++%7D%0D%0AOptional+%7B%0D%0A++++++++%3Fcompany+dbpedia-owl%3Athumbnail+%3Fthumbnail.%0D%0A++++++++++%7D%0D%0A%0D%0AFILTER+%28langMatches%28lang%28%3Fabstract%29%2C%22en%22%29%29%0D%0A++++FILTER+%28langMatches%28lang%28%3FproductLabel%29%2C%22en%22%29%29%0D%0A++++FILTER+%28langMatches%28lang%28%3FlocationLabel%29%2C%22en%22%29%29++%0D%0A%7D%0D%0AGROUP+BY++%3Fhomepage+%3Fabstract+%3Fproduct+%3Flocation+%3Fthumbnail+&format=application%2Fsparql-results%2Bjson"


http.get({
    host: 'labcore-vip.network.fedex.com',
    // proxy IP
    port: 3128,
    // proxy port
    method: 'GET',
    path: queryUrl // full URL as path
},onJsonResponse);

//http.get(queryUrl,onJsonResponse);


processResultJson =  function(response){

    var resultarray = response.results.bindings;
    var newresultarray = new Array;

    resultarray.forEach(
    function(row) {
        var newRow = {};
        newRow.name = row.company_name.value;
        newRow.url = row.homepage.value;
        newRow.description = row.abstract.value;

        //columns not having values
        //newRow.upvotes
        //newRow.createdOn
        //newRow.abbreviated

        var val = containsHomepageInArray(newresultarray,row.homepage.value);
        if(val && val !== undefined){//if there an existing row for the same url we will append
            if(val.locations.indexOf(row.locationLabel.value)<0){
                val.locations.push(row.locationLabel.value);
            }
            if(val.services.indexOf(row.productLabel.value)<0){
                val.services.push(row.productLabel.value);
            }
        }else{//if it is a new row we will add new arrays
            var locationArr = new Array;
            var productLabelArr = new Array;
            locationArr.push(row.locationLabel.value);
            productLabelArr.push(row.productLabel.value);
            newRow.locations = locationArr;
            newRow.services = productLabelArr;
            newresultarray.push(newRow);
        }
    });

    //document.getElementsByClassName("someClass")[0].innerHTML=JSON.stringify(newresultarray);
    console.log(JSON.stringify(newresultarray));
    //alert(JSON.stringify(newresultarray));

}

function containsHomepageInArray(array,homepage){
    var rowval;
    try{
        array.forEach(function(row){
            if(row.url===homepage){
                rowval= row;
                throw BreakException;
            }
        });
    }catch(e){
         return rowval;
    }

}



