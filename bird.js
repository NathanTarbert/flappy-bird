const birdElem = document.querySelector('[data-bird]');
const BIRD_SPEED = 0.5;
const JUMP_DURATION = 125;//jump = 125 pixels
let timeSinceLastJump = Number.POSITIVE_INFINITY;


export function setupBird() {
    setTop(window.innerHeight / 2); //this will place the bird in the middle of the screen
    document.removeEventListener('keydown', handleJump);
    document.addEventListener('keydown', handleJump);
}

export function updateBird(delta) { //check time since last jump and update
    if (timeSinceLastJump < JUMP_DURATION) {
        setTop(getTop() - BIRD_SPEED * delta); //this moves the bird up
    }else {
        setTop(getTop() + BIRD_SPEED * delta); //this moves the bird down
    }    
    timeSinceLastJump += delta;
}

export function getBirdRect() {
    return birdElem.getBoundingClientRect(); //this will get the position of the bird to determine if the bird has gone off the screen
}

function setTop(top) {
    birdElem.style.setProperty('--bird-top', top);
}

function getTop() {
    return parseFloat(getComputedStyle(birdElem).getPropertyValue('--bird-top'));//make sure you change the property value to a number from a string
}

function handleJump(e) {
    if (e.code !== 'Space') return;//uses the space bar to jump
    timeSinceLastJump = 0;
}