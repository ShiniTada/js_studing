var MongoClient = require('mongodb').MongoClient;
var persons = require('./persons');


var userName = 'ReadWriteUser'
var pass = '###'
var dbname = 'userCollectionDB'
var url = 'mongodb+srv://' + userName + ':'+ pass + '@clustername.2wk9k.mongodb.net/"' + dbname + '"?retryWrites=true&w=majority';

MongoClient.connect(url, function(err, db){
    var dbo = db.db("mydb");
    var collection = dbo.collection('users');
    // метод insertMany используется для добавления множества обьектов
    collection.insertMany(persons, function(err, results){
        if(err) throw err;

        console.log('Data added!');
        console.log('********** Result **********');
        console.log(results);
        console.log('****************************');        
        db.close();
    });    
});