var evt = require('events').EventEmitter;
// создаем обьект события
var emt = new evt();

// Когда вызывается функция обработчик, ключевое слово this внутри нее указывает на объект EventEmitter,
// от этого можно избавиться используя стрелочную функцию
emt.on('myEvent', function(){
    console.log('Ordinary function: ');
    console.log(this);
});

emt.on('myEvent', () => {
    console.log('Arrow function: ')
    console.log(this)
});

// Генерируем событие myEvent и в функцию обработчик передаем 2 параметра
emt.emit('myEvent');