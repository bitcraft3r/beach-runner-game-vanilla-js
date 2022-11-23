class Item {
    constructor(){
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;
    }
    update(deltaTime){
        // movement
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        // check if off screen
        if (this.x + this.width < 0) this.markedForDeletion = true;
    }
    draw(context){
        if (this.game.debug){
            context.lineWidth = 3;
            context.strokeStyle = 'white';
            context.beginPath();
            context.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
            context.stroke();
        } 
        context.drawImage(this.image, this.width*this.frameX,0,this.width,this.height, this.x,this.y,this.width,this.height)
    }
}

export class Coin extends Item {
    constructor(game){
        super();
        this.game = game;
        this.width = 80;
        this.height = 80;
        this.x = this.game.width;
        this.y = this.game.height/5;
        this.image = coin;
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 9;
    }
}