var MongoClient = require('mongodb').MongoClient;

var userName = 'ReadWriteUser'
var pass = '###'
var dbname = 'userCollectionDB'
var url = 'mongodb+srv://' + userName + ':'+ pass + '@clustername.2wk9k.mongodb.net/"' + dbname + '"?retryWrites=true&w=majority';

MongoClient.connect(url, function(err, db){
    var dbo = db.db("mydb");
    var collection = dbo.collection('users');

    // Метод find возвращает специальный объект - Cursor
    var cursor = collection.find();
    
    // Метод toArray - все полученные данные преобразовывает в массив и передает в функцию обратного вызова
    cursor.toArray(function(err, res){
        console.log('********** All Data **********');
        console.log(res);
        console.log('****************************');
        
        // Метод find(параметр) - возвращает коллекцию объектов, которые соответсвуют условию
        collection.find({name : "Sergey"}).toArray(function(err, res){
            console.log('********** Employees with name Sergey **********');
            console.log(res);
            console.log('***********************************************');
            
            // Метод findOne - позволяет найти одну запись в коллекции с указанными параметрами
            collection.findOne({age : {$lt : 30} }).then(function(value){
                console.log('********** Employee with age less than 30 **********');
                console.log(value);
                console.log('***********************************************');
                
                // закрываем подключение к базе данных
                db.close(); 
            });
        });
    });    
});