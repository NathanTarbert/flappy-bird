import { updateBird, setupBird, getBirdRect } from './bird.js';

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
    updateBird(delta);
    if (checkLose()) return handleLose(); //this will end the game if checkLose is true
    lastTime = time;
    window.requestAnimationFrame(updateLoop);
}

function checkLose() {
    const birdRect = getBirdRect();
    const outsideworld = birdRect.top < 0 || birdRect.bottom > window.innerHeight; //this will check to see if the bird hits the top or the bottom
    return outsideworld;
}

function handleStart() {
    title.classList.add('hide');
    setupBird();
    lastTime = null; //resetting the lastTime so if the game is restarted it doesn't carry over previous values
    window.requestAnimationFrame(updateLoop);
}

function handleLose() {
    setTimeout(() => {
        title.classList.remove('hide');
    subtitle.classList.remove('hide');
    subtitle.textContent = '0 pipes';
    document.addEventListener("keypress", handleStart, { once: true }); //this will restart the game by "keypress" once the game ends
    }, 100);//adds a delay before the game can be restarted    
}   