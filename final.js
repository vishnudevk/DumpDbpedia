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
//query to get list of companies
var queryCompanies = "http://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&"+
    "query=select+distinct(%3Fcompany)+where%0D%0A{{%0D%0A%09{%0D%0A%09%3Fcompany++dcterms%3Asubject+category%3ACloud_storage%0D%0A%09}%0D%0A%09union{%0D%0A%09%3Fcompany++dcterms%3Asubject+category%3ACloud_applications%0D%0A%09}%0D%0A%09union{%0D%0A%09%3Fcompany++dcterms%3Asubject+category%3ACloud_infrastructure%0D%0A%09}%0D%0A%09union{%0D%0A%09%3Fcompany++dcterms%3Asubject+category%3ACloud_platforms%0D%0A%09}%0D%0A%09union{%0D%0A%09%3Fcompany++dcterms%3Asubject+category%3AFree_software_for_cloud_computing%0D%0A%09}%0D%0A%09union{%0D%0A%09%3Fcompany++dcterms%3Asubject+category%3AInfrastructure_as_a_service%0D%0A%09}%0D%0A%09union{%0D%0A%09%3Fcompany++dcterms%3Asubject+category%3AWeb_hosting%0D%0A%09}%0D%0A%09union{%0D%0A%09%3Fcompany+dcterms%3Asubject+category%3ACloud_infrastructure%0D%0A%09}%0D%0A%09.%0D%0A%09%3Fcompany+dcterms%3Asubject+category%3ACloud_computing_providers.%0D%0A%09}union{%0D%0A%09%09%3Fcompany+dbpedia-owl%3AwikiPageID+32476167%0D%0A%09}union{%0D%0A%09%09%3Fcompany+dbpedia-owl%3AwikiPageID+19127434%0D%0A%09}union{%0D%0A%09%09%3Fcompany+dbpedia-owl%3AwikiPageID+37259190%0D%0A%09}%0D%0A}"

+"&format=application%2Fsparql-results%2Bjson";

//query to get list of companies
var queryDetail = "http://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=PREFIX+owl%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2002%2F07%2Fowl%23%3E%0D%0APREFIX+xsd%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0D%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0D%0APREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0D%0APREFIX+foaf%3A+%3Chttp%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2F%3E%0D%0APREFIX+dc%3A+%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%3E%0D%0APREFIX+%3A+%3Chttp%3A%2F%2Fdbpedia.org%2Fresource%2F%3E%0D%0APREFIX+dbpedia2%3A+%3Chttp%3A%2F%2Fdbpedia.org%2Fproperty%2F%3E%0D%0APREFIX+dbpedia%3A+%3Chttp%3A%2F%2Fdbpedia.org%2F%3E%0D%0APREFIX+skos%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2004%2F02%2Fskos%2Fcore%23%3E%0D%0Aselect+%3Fcompany+%3Fcompany_name+%3Fhomepage+%3FproductLabel+%3FlocationLabel+%3Fthumbnail+%3Fabstract%0D%0Awhere%7B%0D%0A+BIND+%28+%3CCOMAPNYQRYTAG%3E+AS+%3Fcompany%29%0D%0A+%0D%0Aoptional%7B%0D%0A++++%3Fcompany+foaf%3Aname+%3Fcompany_name%0D%0A+%7D%0D%0Aoptional%7B%0D%0A++++%3Fcompany+rdf%3Alabel+%3Fcompany_name%0D%0A+%7D%0D%0A%0D%0Aoptional%7B%0D%0A++++%3Fcompany+foaf%3Ahomepage+%3Fhomepage.%0D%0A%7D%0D%0A%0D%0AOptional+%7B%0D%0A++++++++%3Fcompany+dbpedia-owl%3Aproduct+%3Fproduct.%0D%0A++++++++%3Fproduct+rdfs%3Alabel+%3FproductLabel+.%0D%0A%7D%0D%0Aoptional%7B%0D%0A++++%3Fcompany+foaf%3Aname+%3FproductLabel%0D%0A+%7D%0D%0Aoptional%7B%0D%0A++++%3Fcompany+rdf%3Alabel+%3FproductLabel%0D%0A+%7D%0D%0AOptional+%7B%0D%0A++++++++%3Fcompany+dbpedia-owl%3Alocation+%3Flocation.%0D%0A++++++++%3Flocation+rdfs%3Alabel+%3FlocationLabel+.%0D%0A%7D%0D%0AOptional+%7B%0D%0A++++++++%3Fcompany+dbpedia-owl%3Athumbnail+%3Fthumbnail.%0D%0A%7D%0D%0A%0D%0AOptional+%7B%0D%0A++++++++%3Fcompany+dbpedia-owl%3Aabstract+%3Fabstract.%0D%0A%7D%0D%0A%0D%0A%0D%0AFILTER+%28langMatches%28lang%28%3Fabstract%29%2C%22en%22%29%29%0D%0AFILTER+%28langMatches%28lang%28%3FproductLabel%29%2C%22en%22%29%29%0D%0AFILTER+%28langMatches%28lang%28%3FlocationLabel%29%2C%22en%22%29%29++%0D%0A%7D%0D%0A&output=json";

/*http.get({
    //host: 'labcore-vip.network.fedex.com',
    // proxy IP
    //port: 3128,
    // proxy port
    method: 'GET',
    path: queryUrl // full URL as path
},onJsonResponse);*/

http.get(queryCompanies,onJsonResponse);


onJsonDetailResponse = function(res) {
    var data = '';

    res.on('data', function (chunk){
        data += chunk;
    });

    res.on('end',function(){
        //console.log(data);
        try{
            var jsonStr = JSON.parse(data);
        }catch(e){
            console.error("error while parsing data response from dbpedia.. most likely the site is down");
            console.error(data);
        }
        processDetailJson(jsonStr);
    })
}

processResultJson =  function(response){
    //console.log(response.results.bindings);
    var binding = response.results.bindings;

    binding.forEach(function(companyRow){
        var companyURI = companyRow.company.value;
        var qry = queryDetail.replace("COMAPNYQRYTAG", companyURI);
        //console.log(company);
        http.get(qry,onJsonDetailResponse);
    })


    //http.get(queryDetail,onJsonDetailResponse);
}

processDetailJson =  function(response){

    console.log(response.results.bindings[0]);
}
