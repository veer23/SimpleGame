function start(){var canvas = document.getElementById("mainCanvas");
var context = canvas.getContext("2d");

var canvastime = document.getElementById("Ctime");
var cnt = canvastime.getContext("2d");

context.clearRect(0, 0, 500, 400);
cnt.clearRect(0, 0, 250, 30);
var time = 50;
cnt.font = "bold 25px helvetica";
cnt.fillText(time, 225, 20);
var width = 500, height = 400, speed = 3;
var score = 0;
var keys = [];
var player = {
	x: 40,
	y: 40,
	width: 20,
	height: 20
};

var cube = {
	x: Math.random() * (width - 40),
	y: Math.random() * (height - 40),
	width: 20,
	height: 20
};

window.addEventListener("keydown", function(e){
	keys[e.keyCode] = true;
}, false);

window.addEventListener("keyup", function(e){
	delete keys[e.keyCode];
}, false);

function game(){
	update();
	render();
}

function update(){
	if(keys[38]) player.y-=speed;
	if(keys[40]) player.y+=speed;
	if(keys[37]) player.x-=speed;
	if(keys[39]) player.x+=speed;
	
	if(player.x < 0) player.x = 0;
	if(player.y < 0) player.y = 0;
	if(player.x >= width - player.width) player.x = width - player.width;
	if(player.y >= height - player.height) player.y = height - player.height;
    if(collision(player, cube)) process();
}

function render(){
	context.clearRect(0, 0, width, height);
	context.fillStyle = "blue";
	context.fillRect(player.x, player.y, player.width, player.height);
	context.fillStyle = "red";
	context.fillRect(cube.x, cube.y, cube.width, cube.height);
	context.fillStyle = "black";
	context.font = "bold 30px helvetica";
	context.fillText(score, 30, 30);
}

function collision(first, second){
	return !(first.x > second.x + second.width || first.x+first.width<second.x ||
	first.y > second.y + second.height ||
	first.y + first.height < second.y);
}

function process(){
	score++;
	cube.x = Math.random() * (width - 40);
	cube.y = Math.random() * (height - 40);
}
var gameStart = setInterval(function(){
	game();
}, 1000/30);

var gameOver = setInterval(function(){
	time--;
	//cnt.font = "bold 25 helvetica";
	cnt.clearRect(0, 0, 500, 30);
	cnt.font = "bold 25px helvetica";
	cnt.fillText(time,225, 20);
	if(time== 0){
	end();}
},1000);
function end(){
	
	clearInterval(gameStart);
	clearInterval(gameOver);
	context.clearRect(0, 0, width, height);
	cnt.clearRect(0, 0, 500, 30);
	context.fillText("GAME OVER",150, 200);
	cnt.fillText("YOUR SCORE IS : " + score, 120, 25);
}}