import { Idle, Running, Jumping, Falling, Hit } from './playerStates.js'
import { CollisionAnimation } from './collisionAnimation.js'
import { FloatingMessage } from './floatingMessages.js'

export class Player {
    constructor(game){
        this.game = game;
        this.width = 1500/16; // single frame width
        this.height = 125; // single frame height
        this.x = 50;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.vy = 0;
        this.weight = 1;
        // javascript automatically creates references to all elements with IDs into the global namespace, using it's ID as a variable name:
        this.image = player; // this.image = document.getElementById('player'); 
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 7;
        this.fps = 50;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.states = [new Idle(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Hit(this.game)];
        this.currentState = null;
    }
    update(input, deltaTime){
        this.checkCollision();
        this.currentState.handleInput(input);
        // horizontal movement
        this.x += this.speed;
        if (input.includes('ArrowRight') && this.currentState !== this.states[4]) this.speed = this.maxSpeed;
        else if (input.includes('ArrowLeft') && this.currentState !== this.states[4]) this.speed = -this.maxSpeed;
        else this.speed = 0;
        // horizontal boundaries
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        // vertical movement
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
        // vertical boundaries
        if (this.y > this.game.height - this.height - this.game.groundMargin) this.y = this.game.height - this.height - this.game.groundMargin;
        // sprite animation
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }
    draw(context){
        if (this.game.debug){
            context.lineWidth = 3;
            context.strokeStyle = 'white';
            context.beginPath();
            context.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
            context.stroke();
        }
        // context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.width*this.frameX,this.height*this.frameY,this.width,this.height, this.x,this.y,this.width,this.height);
    }
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
    setState(state, speed){
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }
    checkCollision(){
        this.game.enemies.forEach(enemy => {
            const dx = (enemy.x + enemy.width/2) - (this.x + this.width/2);
            const dy = (enemy.y + enemy.height/2) - (this.y + this.height/2);
            const distance = Math.sqrt(dx*dx+dy*dy);
            // if (){
            //     gameOver = true;
            if (
                distance < enemy.width/2.5 + this.width/2
                // enemy.x < this.x + this.width &&
                // enemy.x + enemy.width > this.x &&
                // enemy.y < this.y + this.height &&
                // enemy.y + enemy.height > this.y
            ){
                var hitSound = new Audio('../assets/hit.mp3');
                hitSound.loop = false;
                hitSound.play();
                enemy.markedForDeletion = true;
                this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
                // if (this.currentState === this.states[4] || this.currentState === this.states[5]){
                //     this.game.score += 1;
                //     window.totalGweiScore = this.game.score;
                //     this.game.floatingMessages.push(new FloatingMessage('+1', enemy.x, enemy.y, 130, 46));
                // } else {
                    this.setState(4, 0);
                    // this.game.score-=3;
                    window.totalGweiScore = this.game.score;
                    this.game.lives--;
                    if (this.game.lives <= 0) {
                        window.totalGweiScore = this.game.score
                        this.game.gameOver = true;
                        var gameOverSound = new Audio('../assets/game_over.wav');
                        gameOverSound.loop = false;
                        gameOverSound.play();
                    // }
                }
            } 
        })
        this.game.coins.forEach(coin => {
            const dx = (coin.x + coin.width/2) - (this.x + this.width/2);
            const dy = (coin.y + coin.height/2) - (this.y + this.height/2);
            const distance = Math.sqrt(dx*dx+dy*dy);
            if (
                distance < coin.width/2 + this.width/2
                // coin.x < this.x + this.width &&
                // coin.x + coin.width > this.x &&
                // coin.y < this.y + this.height &&
                // coin.y + coin.height > this.y
            ){
                var coinSound = new Audio('../assets/coin.wav');
                coinSound.loop = false;
                coinSound.play();
                coin.markedForDeletion = true;
                this.game.collisions.push(new CollisionAnimation(this.game, coin.x + coin.width * 0.5, coin.y + coin.height * 0.5));
                this.game.score += 5;
                if (this.game.score === 50){
                    var levelUpSound = new Audio('../assets/level_up.wav');
                    levelUpSound.loop = false;
                    levelUpSound.play();
                } else if (this.game.score === 100){
                    var levelUpSound = new Audio('../assets/level_up.wav');
                    levelUpSound.loop = false;
                    levelUpSound.play();
                } else if (this.game.score === 150){
                    var levelUpSound = new Audio('../assets/level_up.wav');
                    levelUpSound.loop = false;
                    levelUpSound.play();
                }
                window.totalGweiScore = this.game.score;
                this.game.floatingMessages.push(new FloatingMessage('+5', coin.x, coin.y, 150, 46));
                
                this.game.maxSpeed += 0.5; // adjust speed increase per get coin

            }
        })
        this.game.hearts.forEach(heart => {
            const dx = (heart.x + heart.width/2) - (this.x + this.width/2);
            const dy = (heart.y + heart.height/2) - (this.y + this.height/2);
            const distance = Math.sqrt(dx*dx+dy*dy);
            if (
                distance < heart.width/2 + this.width/2
            ){
                var heartSound = new Audio('../assets/heart.wav');
                heartSound.loop = false;
                heartSound.play();
                heart.markedForDeletion = true;
                this.game.collisions.push(new CollisionAnimation(this.game, heart.x + heart.width * 0.5, heart.y + heart.height * 0.5));
                this.game.lives += 1;
                this.game.floatingMessages.push(new FloatingMessage('❤', heart.x, heart.y, 100, 120));
                
                this.game.maxSpeed += 0.5; // adjust speed increase per get heart

            }
        })
    }
}