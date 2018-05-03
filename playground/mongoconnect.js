const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const url = 'mongodb://localhost:27017/mongobread';

MongoClient.connect(url, function(err, db) {
  const bread = db.collection('mongobreadcollection');

  bread.find({}).toArray(function(err, docs) {
    console.log(docs);
  })
});
