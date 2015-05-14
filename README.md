# DumpDbpedia
Create json string in the given format


Query used

select  ?homepage ?abstract ?product ?location ?thumbnail   (group_concat(?company_name;separator=",") as ?company_name) (group_concat(?productLabel ;separator=",") as ?productLabel)  (group_concat(?locationLabel ;separator=",") as ?locationLabel)
where {
    ?company dcterms:subject category:Cloud_computing_providers.
    
    ?company rdfs:label ?company_name.
    ?company foaf:homepage ?homepage.
    ?company dbpedia-owl:abstract ?abstract.
    Optional {
        ?company dbpedia-owl:product ?product.
        ?product rdfs:label ?productLabel .
    }
    Optional {
        ?company dbpedia-owl:location ?location.
        ?location rdfs:label ?locationLabel .
    }
Optional {
        ?company dbpedia-owl:thumbnail ?thumbnail.
          }

FILTER (langMatches(lang(?abstract),"en"))
    FILTER (langMatches(lang(?productLabel),"en"))
    FILTER (langMatches(lang(?locationLabel),"en"))  
}
GROUP BY  ?homepage ?abstract ?product ?location ?thumbnail 



//json to be created
{
    "_id" : ObjectId("555335a60537cd14040c149f"),
    "name" : "Azmazon web service",
    "abbreviated" : "AWS",
    "description" : "this is one of the major cloud provider we have so far.",
    "url" : "http://amazon.com",
     "createdOn" : ISODate("2015-05-13T11:29:42.878Z"),
    "upvotes" : 0,
    "locations" : [ 
        "Ukraine", 
        "United States"
    ],
    "services" : [ 
        "paas", 
        "saas", 
        "dbaas"
    ],
    "__v" : 6
}






//json returned from server
{ "head": { "link": [], "vars": ["homepage", "abstract", "product", "location", "thumbnail", "company_name", "productLabel", "locationLabel"] },
  "results": { "distinct": false, "ordered": true, "bindings": [
    { "homepage": { "type": "uri", "value": "http://amazon.com" }	, "abstract": { "type": "literal", "xml:lang": "en", "value": "Amazon.com, Inc. /\u02C8\u00E6m\u0259z\u0252n/ is an American international electronic commerce company with headquarters in Seattle, Washington, United States. It is the world's largest online retailer. Amazon.com started as an online bookstore, but soon diversified, selling DVDs, VHSs, CDs, video and MP3 downloads/streaming, software, video games, electronics, apparel, furniture, food, toys, and jewelry. The company also produces consumer electronics\u2014notably the Amazon Kindle e-book reader and the Kindle Fire tablet computer\u2014and is a major provider of cloud computing services.Jeff Bezos incorporated the company (as Cadabra) in July 1994 and the site went online as Amazon.com in 1995. The company was renamed after the Amazon River, one of the largest rivers in the world, which in turn was named after the Amazons, the legendary nation of female warriors in Greek mythology.Amazon has separate retail websites for United States, United Kingdom, France, Canada, Germany, Italy, Spain, Australia, Brazil, Japan, China, India and Mexico, with international shipping to certain other countries for some of its products. In 2011, it had professed an intention to launch its websites in Poland, Netherlands, and Sweden, as well. An Austrian website operates as part of the German website." }	, "product": { "type": "uri", "value": "http://dbpedia.org/resource/Woot" }	, "location": { "type": "uri", "value": "http://dbpedia.org/resource/Seattle" }	, "thumbnail": { "type": "uri", "value": "http://commons.wikimedia.org/wiki/Special:FilePath/Amazon.com-Logo.svg?width=300" }	, "company_name": { "type": "literal", "value": "Amazon.com,\u0623\u0645\u0627\u0632\u0648\u0646 (\u0645\u0648\u0642\u0639),Amazon.com,Amazon.com,Amazon.com,Amazon.com,Amazon.com,Amazon.com,Amazon.com,Amazon.com,Amazon.com,\u4E9E\u99AC\u905C\u516C\u53F8" }	, "productLabel": { "type": "literal", "value": "Woot,Woot,Woot,Woot,Woot,Woot,Woot,Woot,Woot,Woot,Woot,Woot" }	, "locationLabel": { "type": "literal", "value": "Seattle,Seattle,Seattle,Seattle,Seattle,Seattle,Seattle,Seattle,Seattle,Seattle,Seattle,Seattle" }},
    { "homepage": { "type": "uri", "value": "http://www.amazon.com" }	, "abstract": { "type": "literal", "xml:lang": "en", "value": "Amazon.com, Inc. /\u02C8\u00E6m\u0259z\u0252n/ is an American international electronic commerce company with headquarters in Seattle, Washington, United States. It is the world's largest online retailer. Amazon.com started as an online bookstore, but soon diversified, selling DVDs, VHSs, CDs, video and MP3 downloads/streaming, software, video games, electronics, apparel, furniture, food, toys, and jewelry. The company also produces consumer electronics\u2014notably the Amazon Kindle e-book reader and the Kindle Fire tablet computer\u2014and is a major provider of cloud computing services.Jeff Bezos incorporated the company (as Cadabra) in July 1994 and the site went online as Amazon.com in 1995. The company was renamed after the Amazon River, one of the largest rivers in the world, which in turn was named after the Amazons, the legendary nation of female warriors in Greek mythology.Amazon has separate retail websites for United States, United Kingdom, France, Canada, Germany, Italy, Spain, Australia, Brazil, Japan, China, India and Mexico, with international shipping to certain other countries for some of its products. In 2011, it had professed an intention to launch its websites in Poland, Netherlands, and Sweden, as well. An Austrian website operates as part of the German website." }	, "product": { "type": "uri", "value": "http://dbpedia.org/resource/Amazon_Instant_Video_UK" }	, "location": { "type": "uri", "value": "http://dbpedia.org/resource/Washington_(state)" }	, "thumbnail": { "type": "uri", "value": "http://commons.wikimedia.org/wiki/Special:FilePath/Amazon.com-Logo.svg?width=300" }	, "company_name": { "type": "literal", "value": "Amazon.com,\u0623\u0645\u0627\u0632\u0648\u0646 (\u0645\u0648\u0642\u0639),Amazon.com,Amazon.com,Amazon.com,Amazon.com,Amazon.com,Amazon.com,Amazon.com,Amazon.com,Amazon.com,\u4E9E\u99AC\u905C\u516C\u53F8" }	, "productLabel": { "type": "literal", "value": "Amazon Instant Video UK,Amazon Instant Video UK,Amazon Instant Video UK,Amazon Instant Video UK,Amazon Instant Video UK,Amazon Instant Video UK,Amazon Instant Video UK,Amazon Instant Video UK,Amazon Instant Video UK,Amazon Instant Video UK,Amazon Instant Video UK,Amazon Instant Video UK" }	, "locationLabel": { "type": "literal", "value": "Washington (state),Washington (state),Washington (state),Washington (state),Washington (state),Washington (state),Washington (state),Washington (state),Washington (state),Washington (state),Washington (state),Washington (state)" }},
    { "homepage": { "type": "uri", "value": "http://www.vmwareinc.com/" }	, "abstract": { "type": "literal", "xml:lang": "en", "value": "VMware, Inc. is an American software company that provides cloud and virtualization software and services, and was the first to successfully virtualize the x86 architecture. Founded in 1998, VMware is based in Palo Alto, California, USA. In 2004 it was acquired by and became a subsidiary of EMC Corporation, then on August 14, 2007 EMC sold 15% of the company in a New York Stock Exchange IPO and it trades under the symbol VMW.VMware's desktop software runs on Microsoft Windows, Linux, and Mac OS X, while its enterprise software hypervisors for servers, VMware ESX and VMware ESXi, are bare-metal hypervisors that run directly on server hardware without requiring an additional underlying operating system." }	, "product": { "type": "uri", "value": "http://dbpedia.org/resource/VMware_Infrastructure" }	, "location": { "type": "uri", "value": "http://dbpedia.org/resource/United_States" }	, "thumbnail": { "type": "uri", "value": "http://commons.wikimedia.org/wiki/Special:FilePath/Vmware.svg?width=300" }	, "company_name": { "type": "literal", "value": "VMware,VMware,VMware,\u0641\u064A \u0625\u0645 \u0648\u064A\u0631,VMware,VMware Inc.,VMware,VMware,VMware,VMware,VMware,VMware" }	, "productLabel": { "type": "literal", "value": "VMware Infrastructure,VMware Infrastructure,VMware Infrastructure,VMware Infrastructure,VMware Infrastructure,VMware Infrastructure,VMware Infrastructure,VMware Infrastructure,VMware Infrastructure,VMware Infrastructure,VMware Infrastructure,VMware Infrastructure" }	, "locationLabel": { "type": "literal", "value": "United States,United States,United States,United States,United States,United States,United States,United States,United States,United States,United States,United States" }},......................................
