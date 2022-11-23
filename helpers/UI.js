export class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 40;
        this.fontFamily = 'VT323';
        this.livesImage = lives;
    }
    draw(context){
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        // score
        context.fillText(`Score: ${this.game.score}`, 20, 50);
        // timer
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80);
        // // start
        // context.fillText(`Press LEFT or RIGHT arrow key to Start!`, 200, 250)

        // lives
        for (let i=0; i<this.game.lives; i++){
            context.drawImage(this.livesImage, 30*i+20, 95, 25, 25)
        }
        //game over messages
        if (this.game.gameOver){
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            if (this.game.score > this.game.winningScore){
                context.fillText('HO! HO! HO!', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText(`Who's been a good boy this year? YOU!!!`, this.game.width * 0.5, this.game.height * 0.5 + 20);
            }
             else {
                context.fillText('Tis the season to be...', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText('Nope. Better luck next time!', this.game.width * 0.5, this.game.height * 0.5 + 20);
            }
        }

        if (this.game.gameStarted === false){
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            context.fillStyle = "#ff0000"
            context.fillText(`BANKIN' BAHAMAS!`, 450, 200)
            context.font = this.fontSize * 1 + 'px ' + this.fontFamily;
            context.fillStyle = "#000000"
            context.fillText(`Someone's on the run. What happened?`, 450, 250)
            context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
            context.fillStyle = "#000000"
            context.fillText(`Press LEFT/RIGHT arrow to START`, 450, 350)
        } else if (this.game.gameStarted === true && this.game.score === 0 && this.game.gameOver === false){
            context.textAlign = 'center';
            context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
            context.fillText('Press SPACE or UP arrow to JUMP!', this.game.width * 0.5, this.game.height * 0.5 - 20);
        }



        if (this.game.currentLevel === 2 && this.game.score === 25 && this.game.gameOver === false){
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            context.fillStyle = "#ff0000"
            context.fillText('LEVEL 2!', this.game.width * 0.5, this.game.height * 0.5 - 20);
            context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
            context.fillStyle = "#000000"
            context.fillText(`Look out for those flying... sandwiches?`, this.game.width * 0.5, this.game.height * 0.5 + 20);
        } else if (this.game.currentLevel === 3 && this.game.score === 100 && this.game.gameOver === false){
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            context.fillStyle = "#ff0000"
            context.fillText('LEVEL 3!', this.game.width * 0.5, this.game.height * 0.5 - 20);
            context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
            context.fillStyle = "#000000"
            context.fillText(`It's a bird, it's a plane, wait...`, this.game.width * 0.5, this.game.height * 0.5 + 20);
        }

        context.restore();
    }
}

// export class StartMessage {
//     constructor(game){
//         this.game = game;
//         this.fontSize = 40;
//         this.fontFamily = 'VT323';
//     }
//     draw(context){
//         context.save();
//         context.shadowOffsetX = 2;
//         context.shadowOffsetY = 2;
//         context.shadowColor = 'white';
//         context.shadowBlur = 0;
//         context.font = this.fontSize + 'px ' + this.fontFamily;
//         context.textAlign = 'left';
//         context.fillStyle = this.game.fontColor;
//         // score
//         context.fillText(`Score: ${this.game.score}`, 20, 50);
//         // start
//         if (this.gameStart === false){
//             context.shadowOffsetX = 2;
//             context.shadowOffsetY = 2;
//             context.shadowColor = 'white';
//             context.shadowBlur = 0;
//             context.fillStyle = this.game.fontColor;
            
//             context.textAlign = 'center';
//             context.font = this.fontSize + 'px ' + this.fontFamily;
//             context.fillText(`Press LEFT or RIGHT arrow key to Start!`, 450, 200)
//         }
//         context.restore();
//     }
// }