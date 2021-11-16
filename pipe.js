const HOLE_HEIGHT = 200;
const PIPE_WIDTH = 120;
const PIPE_INTERVAL = 1500;
const PIPE_SPEED = 0.75;
let pipes = [];
let timeSinceLastPipe;
let passedPipeCount;

export function setupPipes() {
    document.documentElement.style.setProperty('--pipe-width', PIPE_WIDTH);
    document.documentElement.style.setProperty('--hole-height', HOLE_HEIGHT);
    pipes.forEach(pipe => pipe.remove());
    timeSinceLastPipe = PIPE_INTERVAL;
    passedPipeCount = 0;//initially sets the pipes that are passed to 0
}

export function updatePipes(delta) {
    timeSinceLastPipe += delta;

    if (timeSinceLastPipe > PIPE_INTERVAL) { //check to see if time since last pipe is >= 1.5 seconds
        timeSinceLastPipe -= PIPE_INTERVAL;
        createPipe();
    }
    pipes.forEach(pipe => {
        if (pipe.left + PIPE_WIDTH < 0) {
            passedPipeCount++; //counts the number of pipes the user passes
            return pipe.remove();
        }
        pipe.left = pipe.left - delta * PIPE_SPEED; // for each pipe it is setting the speed to the left
    });    
}

export function getPassedPipeCount() {
    return passedPipeCount;
}  

export function getPipesRects() {
    return pipes.flatMap(pipe => pipe.rects());
}

function createPipe() {
    const pipeElem = document.createElement('div');
    const topElem = createPipeSegment('top');
    const bottomElem = createPipeSegment('bottom');
    pipeElem.append(topElem);
    pipeElem.append(bottomElem);
    pipeElem.classList.add('pipe');
    pipeElem.style.setProperty(
        '--hole-top',
        randomNumberBetween(HOLE_HEIGHT * 1.5, //this will make sure the pipe doesn't go off the screen. It sets it just below the top
         window.innerHeight - HOLE_HEIGHT * 0.5 //this sets the pipe just below the bottom of the screen
        )
    );
    const pipe = {
        get left() {
            return parseFloat(
                getComputedStyle(pipeElem).getPropertyValue('--pipe-left'));
        },
        set left(value) {
            pipeElem.style.setProperty('--pipe-left', value);
        },
        remove() {
            pipes = pipes.filter(p => p !== pipe);// removes pipes from the array when the pipe leaves the screen
            pipeElem.remove();
        },
        rects() {
            return [
                topElem.getBoundingClientRect(),
                bottomElem.getBoundingClientRect(),
            ];
        }
    };
    pipe.left = window.innerWidth;
    document.body.append(pipeElem);
    pipes.push(pipe);
}

function createPipeSegment(position) {
    const segment = document.createElement('div');
    segment.classList.add('segment', position);
    return segment;
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}