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

var queryUrl = "http://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&"+
    "query=select+distinct+(%3Fcompany)+%3Fcompany_name+%3Fhomepage+%3Fabstract+%3FproductLabel+%3FlocationLabel+%3Fthumbnail%0D%0Awhere{%0D%0A++++%3Fcompany+foaf%3Aname+%3Fcompany_name.%0D%0A++++%3Fcompany+foaf%3Ahomepage+%3Fhomepage.%0D%0A++++%3Fcompany+dbpedia-owl%3Aabstract+%3Fabstract.%0D%0A++++%3Fcompany+dbpedia-owl%3Aproduct+%3Fproduct.%0D%0A%0D%0A++++Optional+{%0D%0A++++++++%3Fcompany+dbpedia-owl%3Aproduct+%3Fproduct.%0D%0A++++++++%3Fproduct+rdfs%3Alabel+%3FproductLabel+.%0D%0A++++}%0D%0A++++Optional+{%0D%0A++++++++%3Fcompany+dbpedia-owl%3Alocation+%3Flocation.%0D%0A++++++++%3Flocation+rdfs%3Alabel+%3FlocationLabel+.%0D%0A++++}%0D%0A++++Optional+{%0D%0A++++++++%3Fcompany+dbpedia-owl%3Athumbnail+%3Fthumbnail.%0D%0A++++}%0D%0A%0D%0A{%0D%0A%09{%0D%0A%09%3Fcompany++dcterms%3Asubject+category%3ACloud_storage%0D%0A%09}%0D%0A%09union{%0D%0A%09%3Fcompany++dcterms%3Asubject+category%3ACloud_applications%0D%0A%09}%0D%0A%09union{%0D%0A%09%3Fcompany++dcterms%3Asubject+category%3ACloud_infrastructure%0D%0A%09}%0D%0A%09union{%0D%0A%09%3Fcompany++dcterms%3Asubject+category%3ACloud_platforms%0D%0A%09}%0D%0A%09union{%0D%0A%09%3Fcompany++dcterms%3Asubject+category%3AFree_software_for_cloud_computing%0D%0A%09}%0D%0A%09union{%0D%0A%09%3Fcompany++dcterms%3Asubject+category%3AInfrastructure_as_a_service%0D%0A%09}%0D%0A%09union{%0D%0A%09%3Fcompany++dcterms%3Asubject+category%3AWeb_hosting%0D%0A%09}%0D%0A%09union{%0D%0A%09%3Fcompany+dcterms%3Asubject+category%3ACloud_infrastructure%0D%0A%09}%0D%0A%09.%0D%0A%09%3Fcompany+dcterms%3Asubject+category%3ACloud_computing_providers.%0D%0A}union{%0D%0A%09%3Fcompany+dbpedia-owl%3AwikiPageID+32476167%0D%0A}union{%0D%0A%09%3Fcompany+dbpedia-owl%3AwikiPageID+19127434%0D%0A}union{%0D%0A%09%3Fcompany+dbpedia-owl%3AwikiPageID+37259190%0D%0A}%0D%0A%0D%0A}"

+"&format=application%2Fsparql-results%2Bjson"


/*http.get({
    //host: 'labcore-vip.network.fedex.com',
    // proxy IP
    //port: 3128,
    // proxy port
    method: 'GET',
    path: queryUrl // full URL as path
},onJsonResponse);*/

http.get(queryUrl,onJsonResponse);


processResultJson =  function(response){

    var resultarray = response.results.bindings;
    var newresultarray = new Array;
    
    insertRetrivedData(resultarray);
    return ;
    resultarray.forEach(
    function(row) {
        var newRow = {};
        newRow.name = row.company_name.value;
        newRow.url = row.homepage.value;
        newRow.description = row.abstract.value;
        console.log(row.company.value);
        var val = containsCompanyInArray(newresultarray,row.company.value);
        if(val && val !== undefined){//if there an existing row for the same url we will append
            if(row.locationLabel !==undefined && val.locations.indexOf(row.locationLabel.value)<0){
                val.locations.push(row.locationLabel.value);
            }
            if(row.productLabel!==undefined && val.services.indexOf(row.productLabel.value)<0){
                val.services.push(row.productLabel.value);
            }
        }else{//if it is a new row we will add new arrays
            var locationArr = new Array;
            var productLabelArr = new Array;
            if(row.locationLabel !==undefined){
                locationArr.push(row.locationLabel.value);
            }
            if(row.productLabel!==undefined){
                productLabelArr.push(row.productLabel.value);
            }
            newRow.locations = locationArr;
            newRow.services = productLabelArr;
            newresultarray.push(newRow);
        }
    });

    //document.getElementsByClassName("someClass")[0].innerHTML=JSON.stringify(newresultarray);
    console.log(JSON.stringify(newresultarray));
    //console.log('finished running');

}

function containsCompanyInArray(array,company){
    var rowval;
    try{
        array.forEach(function(row){
            if(row.company.value===company){
                rowval= row;
                throw BreakException;
            }
        });
    }catch(e){
         return rowval;
    }

}

// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db

function insertRetrivedData(json){
    MongoClient.connect("mongodb://localhost:27017", function(err, db) {
      if(!err) {
        console.log("We are connected");

         var collection = db.collection('dumpCollection');

       json.forEach(
    function(row) {
        collection.insert(row);
    }); 
          
 console.log('completed insert');

      }
    });
}



