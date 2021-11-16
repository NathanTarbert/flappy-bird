import { updateBird, setupBird, getBirdRect } from './bird.js';
import { updatePipes, setupPipes, getPassedPipeCount, getPipesRects } from './pipe.js';

document.addEventListener("keypress", handleStart, { once: true });
const title = document.querySelector('[data-title]');
const subtitle = document.querySelector('[data-subtitle]');

let lastTime;

function updateLoop(time) {
    if (lastTime == null) {
        lastTime = time;
        window.requestAnimationFrame(updateLoop);
        return;
    }
    const delta = time - lastTime;
    updateBird(delta); //pass in the exported function to create the bird
    updatePipes(delta); //pass in the exported function to create the pipes
    if (checkLose()) return handleLose(); //this will end the game if checkLose is true
    lastTime = time;
    window.requestAnimationFrame(updateLoop);
}

function checkLose() {
    const birdRect = getBirdRect();
    const insidePipe = getPipesRects().some(rect => isCollision(birdRect, rect));
    const outsideworld = birdRect.top < 0 || birdRect.bottom > window.innerHeight; //this will check to see if the bird hits the top or the bottom
    return outsideworld || insidePipe;
}

function isCollision(rect1, rect2) { //this will check to see if any corners of the pipes have had a collision
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
    );
}

function handleStart() {
    title.classList.add('hide');
    setupBird(); //posses in function to create bird when the game is started
    setupPipes(); // passes in function to start building pipes
    lastTime = null; //resetting the lastTime so if the game is restarted it doesn't carry over previous values
    window.requestAnimationFrame(updateLoop);
}

function handleLose() {
    setTimeout(() => {
    title.classList.remove('hide');//hides the title when the user loses
    subtitle.classList.remove('hide'); //hides the subtitle when the user loses
    setTimeout(() => {
        subtitle.textContent = `GAME OVER - ${getPassedPipeCount()} PIPES`; //passes in the function to count the number of pipes and displays on the screen once you lose
    }, 400);    
    document.addEventListener("keypress", handleStart, { once: true }); //this will restart the game by "keypress" once the game ends
    }, 200);//adds a delay before the game can be restarted    
}   