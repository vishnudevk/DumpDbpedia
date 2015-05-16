// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db

funtion insertRetrivedData(json){
    MongoClient.connect("mongodb://localhost:27017", function(err, db) {
      if(!err) {
        console.log("We are connected");

         var collection = db.collection('dumpCollection');
      var doc1 = {'hello':'doc1'};
      var doc2 = {'hello':'doc2'};
      var lotsOfDocs = [{'hello':'doc3'}, {'hello':'doc4'}];

      collection.insert(json);


      }
    });
}
