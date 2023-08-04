//game const & var
let direction = { x: 0, y: 0 };
// ctime = curent time
var lastpainttime = 0;
let speed = 6;
let snakearr = [
    { x: 13, y: 13 }
]
//food will not be an array as we will only show one food in various location
let food = { x: 6, y: 6 }
let board = document.querySelector(".board");
let displayscore = document.querySelector(".score h3 strong");
let score = 0;

//game functions
let main = (ctime) => {
    // requestAnimationFrame is a method that schedules visuals and other animation, it takes a call back fun that will call browser befor every repaint/repeate. its very smooth and better then using settimeout
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastpainttime) / 1000 < 1/speed) {
        console.log(speed);
        return;
    }
    lastpainttime = ctime;
    gameEngine();
}

function gameEngine() {
    //1- updating snake variable

    function iscollide(snakeArr) {
        if(snakearr[0].x<0 || snakearr[0].x>18){
            return true;
        }  
        else if(snakearr[0].y<0 || snakearr[0].y>18){
            return true;
        }
        else{
            for (let i = 1; i < snakearr.length; i++) {
                if(snakearr[i].x === snakearr[0].x && snakearr[i].y === snakearr[0].y){
                    return true;
                }
            }
        }
        return false;
    }

    //for game over
    if (iscollide(snakearr)) {
        direction = { x: 0, y: 0 };
        alert("game over press any key to restart");
        snakearr = [{ x: 13, y: 15 }];
        score = 0;
        displayscore.innerHTML = "score: " + score;
        speed = 4;
    }

    //food is eaten or not
    if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
        score++
        displayscore.innerHTML = "score: " + score;
        if(score %5 === 0){
            speed = speed+2   ;
            console.log(score);
            console.log(speed);
        }
        snakearr.unshift({ x: snakearr[0].x + direction.x, y: snakearr[0].y + direction.y });
        let a = 2, b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    //make the sanke move
    for (let i = snakearr.length - 2; i >= 0; i--) {
        snakearr[i + 1] = { ...snakearr[i] };
    }
    snakearr[0].x += direction.x;
    snakearr[0].y += direction.y;

    //2- change the food and snake
    // for snake
    board.innerHTML = "";
    //here we ar using for each as we have to move the snake's entire body.
    snakearr.forEach((e, index) => {
        snakeEle = document.createElement('div');
        snakeEle.style.gridRowStart = e.y;
        snakeEle.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeEle.classList.add('head');
        }
        else {
            snakeEle.classList.add('snake');
        }
        board.appendChild(snakeEle);
    })

    //for food
    foodEle = document.createElement('div');
    foodEle.style.gridRowStart = food.y;
    foodEle.style.gridColumnStart = food.x;
    foodEle.classList.add('food');
    board.appendChild(foodEle);
}

//main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    direction = { x: 0, y: 1 } //when press any key game start
    switch (e.key) {
        case "ArrowUp":
            console.log("Arrow Up");
            direction.x = 0;
            direction.y = -1;
            break;
        case "ArrowDown":
            console.log("Arrow Down");
            direction.x = 0;
            direction.y = 1;
            break;
        case "ArrowRight":
            console.log("Arrow Right");
            direction.x = 1;
            direction.y = 0;
            break;
        case "ArrowLeft":
            console.log("Arrow Left");
            direction.x = -1;
            direction.y = 0;
            break;
    }
})