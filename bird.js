const birdElem = document.querySelector('[data-bird]');
const BIRD_SPEED = 0.5;

export function setupBird() {
    
}

export function updateBird(delta) {
    setTop(getTop() + BIRD_SPEED * delta);
    console.log(getTop());
}

function setTop(top) {
    birdElem.style.setProperty('--bird-top', top);
}

function getTop() {
    return parseFloat(getComputedStyle(birdElem).getPropertyValue('--bird-top'));
}