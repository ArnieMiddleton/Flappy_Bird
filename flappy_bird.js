var bird;
var pipes = [];
var score = 0;
function setup() {
	createCanvas(400,600)
	bird = new(Bird);
	for (var i = 0;i < 2;i ++){
		pipes.push(new(Pipe));
		pipes[i].generate(i* (width / 1.5) + width);
	}
}

function draw() {
	background(50, 200, 50, 150)
	bird.show();
	bird.update();
	for (var i = 0;i < pipes.length;i++){
		pipes[i].show();
		pipes[i].update();
		pipes[i].pass();
		if (bird.collide(pipes[i]) === true){
			console.log(score);
			score = 0;
			pipes = [];
			bird.y = height/2;
			setup();
		}
	}
	fill(0);
	textAlign(CENTER,CENTER);
	textSize(20);
	text(score, width/2, height - 20);
}

function Bird(){
	this.y = height/2;
	this.r = 25;
	this.gravity = 0.35;
	this.vel = 0;
	
	this.show = function(){
		fill(255, 0, 0);
		noStroke();
		ellipse(width/4, this.y, this.r*2, this.r*2)
	}
	
	this.update = function(){
		this.y += this.vel;
		this.vel += this.gravity;
		if (this.y < 0){
			this.y = 0;
			this.vel = 0;
		}
	}
	
	this.fly = function(){
		this.vel = -7.5;
	}
	
	this.collide = function(that){
		if (abs(that.x - width/4) < this.r + width/20 && this.y > that.yDown - this.r){
			return(true);
		}
		else if (abs(that.x - width/4) < this.r + width/20 && this.y < that.yUp + this.r){
			return(true);
		}
		else if(this.y > height - this.r){
			return(true);
		}
		else {
			return(false);
		}
	}
}

function Pipe(){
	this.x;
	this.yUp;
	this.yDown;
	
	this.passed;
	
	this.show = function(){
		rectMode(TOP, CENTER);
		fill(0, 100, 0)
		noStroke();
		rect(this.x-width/20, this.yDown, width/10, height-this.yDown)//lower pipe
		rect(this.x-width/20, 0, width/10, this.yUp)
	}
	
	this.generate = function(x){
		var midY = floor(random(100, height-100));
		this.yUp = midY - 90;
		this.yDown = midY + 90;
		this.x = x;
		this.passed = false;
	}
	
	this.update = function(){
		this.x -= 3;
		if (this.x <= -width/10){
			this.generate(width+100);
		}
	}
	
	this.pass = function(){
		if (this.x < width/4 && this.passed === false){
			score++;
			this.passed = true;
		}
	}
}


mousePressed = function(){
	bird.fly();
}










