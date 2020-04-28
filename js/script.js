//variaveis do js do game
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
let direction = "right";


//criar background
function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0,0,16 * box, 16 * box);
}

//criando a cobrinha
function criarSnake(){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function comida(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// adicionando listener dos comandos
document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "up") direction = "down";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "down") direction = "up";
}

// iniciar o jogo
function iniciar(){

    //fim de jogo
    for(i=1; i > snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo)
        }
    }

    //atravessar parede
    if(snake[0].x > 15 * box  && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0  && direction == "left") snake[0].x = 15 * box;
    if(snake[0].y > 15 * box  && direction == "up") snake[0].y = 0;
    if(snake[0].y < 0  && direction == "down") snake[0].y = 15 * box;

    criarBG();
    criarSnake();
    comida();

    //coordenadas
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "up") snakeY+= box;
    if(direction == "left") snakeX -= box;
    if(direction == "down") snakeY -= box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box,
        food.y = Math.floor(Math.random() * 15 + 1) * box
    }

    
    
    //adicionando cabeça
    let newhead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newhead);

}

iniciar();

let jogo = setTimeout(() => {jogar()}, 1000000000);

function jogar(){
    
    jogo = setInterval(iniciar,100);
}










