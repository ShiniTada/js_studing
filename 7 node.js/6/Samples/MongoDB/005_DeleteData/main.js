var MongoClient = require('mongodb').MongoClient;

var userName = 'ReadWriteUser'
var pass = '###'
var dbname = 'userCollectionDB'
var url = 'mongodb+srv://' + userName + ':'+ pass + '@clustername.2wk9k.mongodb.net/"' + dbname + '"?retryWrites=true&w=majority';

// Для удаления объектов (документов) из коллекции используется используется несколько методов
    // deleteMany()         - удаляет все документы, которые соответствуют определенному критерию
    // deleteOne()          - удаляет один документ, который соответствует определенному критерию
    // findOneAndDelete()   - получает и удаляет один документ, который соответствует определенному критерию
    // drop()               - удаляет всю коллекцию

MongoClient.connect(url, function(err, db){
    var dbo = db.db("mydb");
    var collection = dbo.collection('users');

    //все записи
    collection.find().toArray(function(err, res){
        console.log(res);
    });

    // collection.deleteOne({name : "Sergey", age: 37}, function(err, result){
    //     console.log(result);

    //     collection.find().toArray(function(err, res){
    //         console.log(res);
    //         db.close();
    //     });
    // });    
        
    collection.deleteMany({name: "Ivan"}, function(err, result){             
        console.log(result);
        db.close();
    });
});