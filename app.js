const startBtn = document.querySelector('.start'),
    screens = document.querySelectorAll('.screen'),
    timeList = document.querySelector('#time-list'),
    timeEl = document.querySelector('#time'),
    board = document.querySelector('#board');
let time = 0,
    score=0; 

// Добавляем событие на стартовую кнопку
startBtn.addEventListener('click', (event)=>{
    //Отменяем действия соббытий по умолчанию
    event.preventDefault();
    //Пролистываем первый экран наверхх во вне зоны видимости
    screens[0].classList.add('up');
} );
//Добавляем слушателя соббытий на родителя (происходит делегирование)
timeList.addEventListener('click', (event) =>
{
    if(event.target.classList.contains('time-btn')){
        //В time заносится значение с атрибута
        time = +event.target.getAttribute('data-time');
        //Пролистываем вторый экран на вверх вне зоны видимости
        screens[1].classList.add('up');
        //Запускается игра
        startGame();
    }

});
board.addEventListener('click',event=>{
    if(event.target.classList.contains('circle')){
        //Увеличиваем счетчик
        score++;
        //Удаляем  элемент с доски
        event.target.remove();
        //Добавляем новый на доску
        createRandomCircle();
    }

});
// Старт игры 
function startGame(){
    setTime(time); // установка времени
    setInterval(decreaseTime,1000);// настройка таймера
    createRandomCircle();// создание круга произвольного размера и цвета
}
// Функция уменьшения счетчика времени
function decreaseTime(){
    //Как только завершается время происходит завершение игры
    if (time ===0){
        finishGame();
    } else{
        let current  = --time;
        // если цифра однозначная то происходит добавление "0" перед цифрой
        if(current <10){
            current=`0${current}`;
        }
        setTime(current);
    }
}
//Установка значения времени в блок
function setTime(value){
    timeEl.textContent = `00:${value}`;
}
//функция завершения игры с выводом результата на экран
function finishGame(){
    board.innerHTML = `<h1>Счёт: ${score}</h1>`;
    //Убираем надпись "Осталось"
    timeEl.parentNode.classList.add('hide');
}
//Функция создания круга произольного размера и цвета и координат
function createRandomCircle(){
    //Создание круга с добавлением ему класса
    const circle = document.createElement('div');
    circle.classList.add('circle');
    //Задается случайный размер
    const size = getRandomNumber(10,60);
    //Деструкция для определения ширины и высоты игрового поля 
    const{width, height}=board.getBoundingClientRect();
    //Генерация случайных координат круга
    const x = getRandomNumber(0,width-size);
    const y = getRandomNumber(0,height-size);
    //Генерация случайных значений цвета для градиента.
    const color1 = randomColor();
    const color2 = randomColor();
    const color3 = randomColor();
    //Задаются свойства для элемента
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top =`${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = `linear-gradient(90deg, ${color1}  0%, ${color2} 47%, ${color3} 100%)`;
    //Добавление элемента на доску.
    board.append(circle);

}
//Функция возвращающая случайное значение цвета в НЕХ кодировке
function randomColor(){
    return '#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase();
}
//Функция случайных значений в определенных пределах min и max
function getRandomNumber(min,max){
   return Math.round(Math.random()*(max-min) + min);
}