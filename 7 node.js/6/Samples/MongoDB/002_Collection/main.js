var MongoClient = require('mongodb').MongoClient;
 
//see https://www.w3schools.com/nodejs/nodejs_mongodb_insert.asp
var userName = 'ReadWriteUser'
var pass = '###'
var dbname = 'userCollectionDB'
var url = 'mongodb+srv://' + userName + ':'+ pass + '@clustername.2wk9k.mongodb.net/"' + dbname + '"?retryWrites=true&w=majority';

MongoClient.connect(url, function(err, db) {
    if(err){ 
        console.log(err);
        return;
    }
    var dbo = db.db("mydb");
    var user = {firstName : "Ivan", lastName : "Ivanov", age: 30};
   
    // в mongoDB нет таблиц, все данные хранятся в коллекциях, и для того что бы работать с БД необходимо получить объект коллекции
    // метод collection применяется для получения объекта коллекции

    // метод insertOne позволяет добавить новый объект (документ) в коллекцию, принимает два параметра:
        // 1-й - объект, который необходимо добавить
        // 2-й - функция обратного вызова, которая выполнится после добавления объекта
    dbo.collection("users").insertOne(user, function(err, res) {
        if(err){ 
            console.log(err);
            return;
        }
         // result.ops - объект полученный обратно из базы данных, содержащий идентификатор
        console.log(res.ops);
        db.close();
    });
});