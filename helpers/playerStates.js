import { Dust, Fire, Splash } from './particles.js';

const states = {
    IDLE: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    HIT: 4,
    // ATTACKING: 4,
    // DIVING: 5,
}

class State {
    constructor(state, game){
        this.state = state;
        this.game = game;
    }
}

export class Idle extends State {
    constructor(game){
        super('IDLE', game);
    }
    enter(){
        // this.game.player.frameX = 0;
        this.game.player.width = 1500/16;
        this.game.player.maxFrame = 15;
        this.game.player.frameY = 0;
    }
    handleInput(input){
        if (input.includes(`ArrowLeft`) || input.includes(`ArrowRight`)){
            this.game.player.setState(states.RUNNING,1 );
        } 
        // else if (input.includes('Enter')){
        //     this.game.player.setState(states.ATTACKING, 2);
        // }
    }
}
export class Running extends State {
    constructor(game){
        super('RUNNING', game);
    }
    enter(){
        // this.game.player.frameX = 0;
        this.game.player.width = 1126/11;
        this.game.player.maxFrame = 10;
        this.game.player.frameY = 2;
    }
    handleInput(input){
        this.game.particles.push(new Dust(this.game, this.game.player.x + this.game.player.width * 0.6, this.game.player.y + this.game.player.height));
        if (input.includes(`ArrowDown`)){
            this.game.player.setState(states.IDLE, 0);
        } else if (input.includes(`ArrowUp`) || input.includes(` `)){
            this.game.player.setState(states.JUMPING, 1);
        } 
        // else if (input.includes('Enter')){
        //     this.game.player.setState(states.ATTACKING, 2);
        // }
    }
}
export class Jumping extends State {
    constructor(game){
        super('JUMPING', game);    }
    enter(){
        if (this.game.player.onGround()) this.game.player.vy -= 22;
        // this.game.player.frameX = 0;
        this.game.player.width = 1724/16;
        this.game.player.maxFrame = 15;
        this.game.player.frameY = 3;
    }
    handleInput(input){
        if (this.game.player.vy > this.game.player.weight){
            this.game.player.setState(states.FALLING, 1);
        } 
        // else if (input.includes('Enter')){
        //     this.game.player.setState(states.ATTACKING, 2);
        // } 
        // else if (input.includes('ArrowDown')){
        //     this.game.player.setState(states.DIVING, 0);
        // }
    }
}
export class Falling extends State {
    constructor(game){
        super('FALLING', game);
    }
    enter(){
        // this.game.player.frameX = 0
        this.game.player.width = 1724/16;
        this.game.player.maxFrame = 15;
        this.game.player.frameY = 3;
    }
    handleInput(input){
        if (this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1);
        } 
        // else if (input.includes('ArrowDown')){
        //     this.game.player.setState(states.DIVING, 0);
        // }
    }
}
// export class Attacking extends State {
//     constructor(game){
//         super('ATTACKING', game);
//     }
//     enter(){
//         // this.game.player.frameX = 0
//         this.game.player.width = 1375/11;
//         this.game.player.maxFrame = 10;
//         this.game.player.frameY = 4;
//     }
//     handleInput(input){
//         this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
//         if (!input.includes('Enter') && this.game.player.onGround()){
//             this.game.player.setState(states.RUNNING, 1);
//         } else if (!input.includes('Enter') && !this.game.player.onGround()){
//             this.game.player.setState(states.FALLING, 1);
//         } else if (input.includes('Enter') && input.includes('ArrowUp') && this.game.player.onGround()) {
//             this.game.player.vy -= 25;
//         } else if (input.includes('ArrowDown') && !this.game.player.onGround()){
//             this.game.player.setState(states.DIVING, 0);
//         }
//     }
// }
// export class Diving extends State {
//     constructor(game){
//         super('DIVING', game);
//     }
//     enter(){
//         // this.game.player.frameX = 0
//         this.game.player.width = 1375/11;
//         this.game.player.maxFrame = 10;
//         this.game.player.frameY = 4;
//         this.game.player.vy = 20;
//     }
//     handleInput(input){
//         this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
//         if (this.game.player.onGround()){
//             this.game.player.setState(states.RUNNING, 1);
//             for (let i=0 ; i<30 ; i++){
//                 this.game.particles.unshift(new Splash(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height));
//             }
//         } else if (input.includes('Enter') && this.game.player.onGround()){
//             this.game.player.setState(states.ATTACKING, 2);
//         }
//     } 
// }
export class Hit extends State {
    constructor(game){
        super('HIT', game);
    }
    enter(){
        // this.game.player.frameX = 0
        this.game.player.width = 3096/17;
        this.game.player.maxFrame = 16;
        this.game.player.frameY = 5;
    }
    handleInput(input){

        if (this.game.player.frameX >= 16 && this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1);

        } else if (this.game.player.frameX >= 16 && !this.game.player.onGround()){
            this.game.player.setState(states.FALLING, 1);
        }
    } 
}