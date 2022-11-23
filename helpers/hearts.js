class Health {
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
            // context.strokeRect(this.x, this.y, this.width, this.height);
        } 
        context.drawImage(this.image, this.width*this.frameX,0,this.width,this.height, this.x,this.y,this.width,this.height)
    }
}

export class Heart extends Health {
    constructor(game){
        super();
        this.game = game;
        this.width = 75;
        this.height = 75;
        this.x = this.game.width;
        this.y = this.game.height/5;
        this.image = heart_sprite;
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 5;
    }
}

// export class ClimbingEnemy extends Enemy {
//     constructor(game){
//         super();
//         this.game = game;
//         this.width = 120;
//         this.height = 144;
//         this.x = this.game.width;
//         this.y = Math.random() * this.game.height * 0.5;
//         this.image = enemy_spider;
//         this.speedX = 0;
//         this.speedY = Math.random() < 0.5 ? 1 : -1; // if true ? return : else return
//         this.maxFrame = 5;
//     }
//     update(deltaTime){
//         super.update(deltaTime);
//         if (this.y > this.game.height - this.height - this.game.groundMargin) this.speedY *= -1;
//         if (this.y < -this.height) this.markedForDeletion = true;
//     }
//     draw(context){
//         super.draw(context);
//         context.beginPath(); // draw line
//         context.moveTo(this.x + this.width/2, 0);
//         context.lineTo(this.x + this.width/2, this.y + 50);
//         context.stroke();
//     }
// }