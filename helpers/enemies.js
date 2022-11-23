class Enemy {
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
            context.arc(this.x + this.width/2, this.y + this.height/2, this.width/2.5, 0, Math.PI * 2);
            context.stroke();
            // context.strokeRect(this.x, this.y, this.width, this.height);
        } 
        context.drawImage(this.image, this.width*this.frameX,0,this.width,this.height, this.x,this.y,this.width,this.height)
    }
}


export class SnailEnemy extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.width = 1099/10;
        this.height = 80;
        this.x = this.game.width;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = enemy_snail;
        this.speedX = Math.random() + 1.5;
        this.speedY = 0;
        this.maxFrame = 9;
    }
}

export class AfroEnemy extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.width = 160;
        this.height = 160;
        this.x = this.game.width * (Math.random() + 1);
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = enemy_afro_big;
        this.speedX = (Math.random() + 3.5) * 1.5;
        this.speedY = 0;
        this.maxFrame = 4;
    }
}

export class DinoEnemy extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.width = 1851/12;
        this.height = 135;
        this.x = this.game.width;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = enemy_dino;
        this.speedX = (Math.random() + 2) * 1.5;
        this.speedY = 0;
        this.maxFrame = 11;
    }
}

export class ClimbingEnemy extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.width = 975/13;
        this.height = 150;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.image = enemy_obelisk;
        this.speedX = 0;
        this.speedY = Math.random() < 0.5 ? 1 : -1; // if true ? return : else return
        this.maxFrame = 12;
    }
    update(deltaTime){
        super.update(deltaTime);
        if (this.y > this.game.height - this.height - this.game.groundMargin) this.speedY *= -1.5;
        if (this.y < -this.height) this.markedForDeletion = true;
    }
    draw(context){
        super.draw(context);
        // context.beginPath(); // draw line
        // context.moveTo(this.x + this.width/2, 0);
        // context.lineTo(this.x + this.width/2, this.y + 50);
        // context.stroke();
    }
}

export class FlyingEnemy extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.width = 1165/20;
        this.height = 50;
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = Math.random() * this.game.height * 0.15;
        this.speedX = Math.random() + 1;
        this.speedY = 0;
        this.maxFrame = 5;
        this.image = enemy_ufo;
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1; // Velocity of Angle, between 0.1-0.2
    }
    update(deltaTime){
        super.update(deltaTime);
        this.angle += this.va;
        // passing a slowly increasing angle to Math.sin() will map positions of our enemies along a `sine wave`.
        this.y += Math.sin(this.angle);
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
//         // context.beginPath(); // draw line
//         // context.moveTo(this.x + this.width/2, 0);
//         // context.lineTo(this.x + this.width/2, this.y + 50);
//         // context.stroke();
//     }
// }