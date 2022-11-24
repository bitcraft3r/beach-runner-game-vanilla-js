export class InputHandler {
    constructor(game){
        this.game = game;
        this.keys = [];
        this.touchY = '';
        this.touchX = '';
        this.touchThreshold = 10;
        window.addEventListener('keydown', (e) => {
            if ((   e.key === 'ArrowDown' || 
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.key === 'Enter' ||
                    e.key === ' '
                ) && this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
            } else if (e.key === 'd') this.game.debug = !this.game.debug;
            // else if (e.key === 'Enter' && this.game.gameOver) restartGame();
            console.log(e.key, this.keys);
        });
        window.addEventListener('keyup', (e) => {
            if (    e.key === 'ArrowDown' || 
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.key === 'Enter' ||
                    e.key === ' '){
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
            console.log(e.key, this.keys);
        });
        window.addEventListener('touchstart', e => { // runs once // used to set something up
            this.touchY = e.changedTouches[0].pageY;
            this.touchX = e.changedTouches[0].pageX;
            // console.log('start');
            // // explanation of how to use touch events here: https://youtu.be/GFO_txvwK_c?t=20244
            // console.log(e); // check available events/properties/values in browser inspect terminal
        });
        window.addEventListener('touchmove', e => { // runs over and over as long as event is firing // used to make calculation e.g. direction or time of event
            const swipeDistance = e.changedTouches[0].pageY - this.touchY;   
            const swipeXDistance = e.changedTouches[0].pageX - this.touchX;   
            if (swipeDistance < -this.touchThreshold && this.keys.indexOf('swipe up') === -1) this.keys.push('swipe up'); 
            else if (swipeDistance > this.touchThreshold && this.keys.indexOf('swipe down') === -1) {
                this.keys.push('swipe down');
                // if (gameOver) restartGame();
            } 
            else if (swipeXDistance < -this.touchThreshold && this.keys.indexOf('swipe left') === -1) this.keys.push('swipe left'); 
            else if (swipeXDistance > this.touchThreshold && this.keys.indexOf('swipe right') === -1) this.keys.push('swipe right'); 
            // else if (swipeXDistance > this.touchThreshold && this.keys.indexOf('swipe right') === -1) {
            //     this.keys.push('swipe right');
            // }
            // const swipeXDistance = e.changedTouches[0].pageX - this.touchX;   
            // if (swipeXDistance < -this.touchThreshold && this.keys.indexOf('swipe left') === -1) this.keys.push('swipe left'); 
            // else if (swipeXDistance > this.touchThreshold && this.keys.indexOf('swipe right') === -1) {
            //     this.keys.push('swipe right');
            // }

            // console.log('moving');
        });
        window.addEventListener('touchend', e => { // runs once // used to cleanup, discard recent values not needed anymore
            // console.log(this.keys);
            this.keys.splice(this.keys.indexOf('swipe up'), 1);
            this.keys.splice(this.keys.indexOf('swipe down'), 1);
            this.keys.splice(this.keys.indexOf('swipe left'), 1);
            this.keys.splice(this.keys.indexOf('swipe right'), 1);
            // console.log('end');
        });
    }
}