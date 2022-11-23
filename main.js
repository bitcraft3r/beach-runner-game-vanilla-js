import { Player } from './helpers/player.js'
import { InputHandler } from './helpers/input.js'
import { Background } from './helpers/background.js'
import { SnailEnemy, AfroEnemy, DinoEnemy, ClimbingEnemy, FlyingEnemy } from './helpers/enemies.js'
import { Coin } from './helpers/coins.js'
import { Heart } from './helpers/hearts.js'
import { UI } from './helpers/UI.js'

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 900;
    canvas.height = 500;

    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.groundMargin = 40; // 83 for city
            this.speed = 0;
            this.maxSpeed = 6;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            // this.startMessage = new StartMessage(this);
            this.enemies = [];
            this.particles = [];
            this.collisions = [];
            this.floatingMessages = [];
            this.coins = [];
            this.hearts = [];
            this.maxParticles = 50;
            this.enemyTimer = 0;
            this.enemyInterval = 1555;
            this.coinTimer = 0;
            this.coinInterval = 2121;
            this.heartTimer = 0;
            this.heartInterval = 7777;
            this.debug = false;
            this.score = 0;
            this.winningScore = 100;
            this.fontColor = 'black';
            this.time = 0;
            this.gameStarted = false;
            this.currentLevel = 1;
            this.maxTime = 1000000;
            this.gameOver = false;
            this.lives = 3;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
        }
        update(deltaTime){
            if (this.gameStarted === true) this.time += deltaTime;
            if (this.time > this.maxTime){
                this.gameOver = true;

            } 
            if (this.score === 25){
                this.currentLevel = 2;
                console.log(`updated level to 2`)
            } 
            if (this.score === 100){
                this.currentLevel = 3;
                console.log(`updated level to 3`)
            } 
            if (this.score === 150){
                this.currentLevel = 4;
                console.log(`updated level to 4`)
            } 
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            // handleEnemies
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
            });
            // handle coins 
            if (this.coinTimer > this.coinInterval) {
                this.addCoin();
                this.coinTimer = 0;
            } else {
                this.coinTimer += deltaTime;
            }
            this.coins.forEach(coin => {
                coin.update(deltaTime);
            });
            // handle hearts 
            if (this.heartTimer > this.heartInterval && this.currentLevel > 1 && this.score > 50 ) {
                this.addHeart();
                this.heartTimer = 0;
            } else {
                this.heartTimer += deltaTime;
            }
            this.hearts.forEach(heart => {
                heart.update(deltaTime);
            });
            // handle messages
            this.floatingMessages.forEach(message => {
                message.update();
            });

            // handle particles
            this.particles.forEach((particle, index) => {
                particle.update();
            });
            if (this.particles.length > this.maxParticles) {
                this.particles.length = this.maxParticles;
            }
            // handle collision sprites
            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime);
            })
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            this.coins = this.coins.filter(coin => !coin.markedForDeletion);
            this.hearts = this.hearts.filter(heart => !heart.markedForDeletion);
            this.particles = this.particles.filter(particle => !particle.markedForDeletion);
            this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);
            this.floatingMessages = this.floatingMessages.filter(message => !message.markedForDeletion);
        }
        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            this.coins.forEach(coin => {
                coin.draw(context);
            });
            this.hearts.forEach(heart => {
                heart.draw(context);
            });
            this.particles.forEach(particle => {
                particle.draw(context);
            });
            this.collisions.forEach(collision => {
                collision.draw(context);
            });
            this.floatingMessages.forEach(message => {
                message.draw(context);
            });
            this.UI.draw(context);
        }
        addEnemy(){
            if (this.currentLevel === 1){

                if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new SnailEnemy(this));
                else if (this.speed > 0) this.enemies.push (new DinoEnemy(this));
            } else if (this.currentLevel === 2){
                if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new SnailEnemy(this));
                else if (this.speed > 0) this.enemies.push (new DinoEnemy(this));
                this.enemies.push(new FlyingEnemy(this));
            } else if (this.currentLevel === 3){
                if (this.speed > 0 && Math.random() > 2/3) this.enemies.push(new SnailEnemy(this));
                else if (this.speed > 0 && Math.random () < 1/3) this.enemies.push (new DinoEnemy(this));
                else if (this.speed > 0) this.enemies.push (new ClimbingEnemy(this));
                this.enemies.push(new FlyingEnemy(this));
            } else if (this.currentLevel ===4){
                if (this.speed > 0 && Math.random() > 1/2) this.enemies.push(new SnailEnemy(this));
                else if (this.speed > 0) this.enemies.push (new DinoEnemy(this));
                // else if (this.speed > 0) this.enemies.push (new ClimbingEnemy(this));
                if (this.speed > 0) this.enemies.push(new AfroEnemy(this));
                this.enemies.push(new FlyingEnemy(this));

            }
        }
        addCoin(){
            if (this.speed > 0) this.coins.push (new Coin(this));
        }
        addHeart(){
            if (this.speed > 0) this.hearts.push (new Heart(this));
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    function animate(timeStamp){
        if (game.input.keys.includes('ArrowLeft') || game.input.keys.includes('ArrowRight')){
            game.gameStarted = true;
        }
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if (!game.gameOver) requestAnimationFrame(animate);
    }
    animate(0);
});