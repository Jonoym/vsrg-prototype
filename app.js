const BOTTOM = "blue";
const TOP = "red";
const MIDDLE = "yellow";
const FLASH = "white";

class Controller {
    constructor(logic) {
        this.logic = logic;
        this.bottomLeft = false;
        this.topLeft = false;
        this.middle = false;
        this.topRight = false;
        this.bottomRight = false;

        this.botLeftTimer;
        this.topLeftTimer;
        this.middleTimer;
        this.topRightTimer;
        this.botRightTimer;


        document.addEventListener('keydown', this.handlePress.bind(this));
        document.addEventListener('keyup', this.handleRelease.bind(this));
    }

    handlePress(event) {
        if (event.keyCode === 97) {
            this.bottomLeftPress();
        }
        if (event.keyCode === 103) {
            this.topLeftPress();
        }
        if (event.keyCode === 101) {
            this.middlePress();
        }
        if (event.keyCode === 105) {
            this.topRightPress();
        }
        if (event.keyCode === 99) {
            this.bottomRightPress();
        }
    }

    bottomLeftPress() {
        const bottomLeft = document.getElementById("glow-bottom-left");
        const bottomLeftWhite = document.getElementById("bottom-left white");
        this.arrowFlash(bottomLeft, bottomLeftWhite, BOTTOM);

        if (this.bottomLeft === false) {
            this.bottomLeft = true;
            this.logic.pressPiece(1, false);

            this.botLeftTimer = setInterval(() => {
                this.logic.pressPiece(1, true);
            }), 50;
        }
    }
    
    topLeftPress() {
        const topLeft = document.getElementById("glow-top-left");
        const topLeftWhite = document.getElementById("top-left white");
        this.arrowFlash(topLeft, topLeftWhite, TOP);

        if (this.topLeft === false) {
            this.topLeft = true;
            this.logic.pressPiece(2, false);

            this.topLeftTimer = setInterval(() => {
                this.logic.pressPiece(2, true);
            }), 50;
        } 
    }
    
    middlePress() {
        const middle = document.getElementById("glow-middle");
        const middleWhite = document.getElementById("middle white");
        this.arrowFlash(middle, middleWhite, MIDDLE);

        if (this.middle === false) {
            this.middle = true;
            this.logic.pressPiece(3, false);

            this.middleTimer = setInterval(() => {
                this.logic.pressPiece(3, true);
            }), 50;
        }
    }
    
    topRightPress() {
        const topRight = document.getElementById("glow-top-right");
        const topRightWhite = document.getElementById("top-right white");
        this.arrowFlash(topRight, topRightWhite, TOP);

        if (this.topRight === false) {
            this.topRight = true;
            this.logic.pressPiece(4, false);

            this.topRightTimer = setInterval(() => {
                this.logic.pressPiece(4, true);
            }), 50;
        } 
    }
    
    bottomRightPress() {
        const bottomRight = document.getElementById("glow-bottom-right");
        const bottomRightWhite = document.getElementById("bottom-right white");
        this.arrowFlash(bottomRight, bottomRightWhite, BOTTOM);

        if (this.bottomRight === false) {
            this.bottomLeft = true;
            this.logic.pressPiece(5, false);

            this.botRightTimer = setInterval(() => {
                this.logic.pressPiece(5, true);
            }), 50;
        }
    }

    arrowFlash(position, white, colour) {
        position.style.boxShadow = "0px 0px 100px " + colour;
        white.style.opacity = "1";
        const background = document.getElementById("wallpaper");
        background.style.opacity = "0.65";
        background.style.transform = "scale(1.01)";
    }

    handleRelease(event) {
        if (event.keyCode === 97) {
            this.bottomLeftRelease();
        }
        if (event.keyCode === 103) {
            this.topLeftRelease();
        }
        if (event.keyCode === 101) {
            this.middleRelease();
        }
        if (event.keyCode === 105) {
            this.topRightRelease();
        }
        if (event.keyCode === 99) {
            this.bottomRightRelease();
        }
    }

    bottomLeftRelease() {
        clearInterval(this.botLeftTimer);
        this.bottomLeft = false;
        const bottomLeft = document.getElementById("glow-bottom-left");
        const bottomLeftWhite = document.getElementById("bottom-left white");
    
        this.arrowRelease(bottomLeft, bottomLeftWhite);
    }
    
    topLeftRelease() {
        clearInterval(this.topLeftTimer);
        this.topLeft = false;
        const topLeft = document.getElementById("glow-top-left");
        const topLeftWhite = document.getElementById("top-left white");
    
        this.arrowRelease(topLeft, topLeftWhite);
    }
    
    middleRelease() {
        clearInterval(this.middleTimer);
        this.middle = false;
        const middle = document.getElementById("glow-middle");
        const middleWhite = document.getElementById("middle white");
    
        this.arrowRelease(middle, middleWhite);
    }
    
    topRightRelease() {
        clearInterval(this.topRightTimer);
        this.topRight = false;
        const topRight = document.getElementById("glow-top-right");
        const topRightWhite = document.getElementById("top-right white");
    
        this.arrowRelease(topRight, topRightWhite);
    }
    
    bottomRightRelease() {
        clearInterval(this.botRightTimer);
        this.bottomLeft = false;
        const bottomRight = document.getElementById("glow-bottom-right");
        const bottomRightWhite = document.getElementById("bottom-right white");
    
        this.arrowRelease(bottomRight, bottomRightWhite);
    }
    
    arrowRelease(position, white) {
        position.style.boxShadow = "none";
        white.style.opacity = "0";
        const background = document.getElementById("wallpaper");
        background.style.opacity = "0.6";
        background.style.transform = "scale(1)";
    }
}

/* Game Logic */

class Logic {

    constructor() {
        this.timerID = null;

        this.botLeftQueue = [];
        this.topLeftQueue = [];
        this.middleQueue = [];
        this.topRightQueue = [];
        this.botRightQueue = [];

        this.botLeftHoldQueue = [];
        this.topLeftHoldQueue = [];
        this.middleHoldQueue = [];
        this.topRightHoldQueue = [];
        this.botRightHoldQueue = [];

        this.game;
        this.gameStart = false;

    }

    setGame(track, bpm) {
        this.game = new Game(track, bpm);
        this.pieceDelay = 60000/bpm;
    }

    getGame() {
        return this.game;
    }

    startGame() {
        this.gameStart = true;
        this.timerID = setInterval(this.gameLoop.bind(this), this.pieceDelay);
    }

    getTrack() {
        return this.game.getTrack();
    }

    getFrame() {
        return this.game.getTrack().shift();
    }

    pressPiece(position, held) {
        var d = new Date();
        var currentTime = d.getSeconds() * 1000 + d.getMilliseconds();
        let timeDifference;
        let absoluteDifference;
        let queue;
        let holdQueue;

        switch (position) {
            case 1:
                if (this.botLeftQueue[0] != undefined) {
                    timeDifference = currentTime - this.botLeftQueue[0][1] - 1850;
                    queue = this.botLeftQueue;
                }
                if (this.botLeftHoldQueue[0] != undefined) {
                    timeDifference = currentTime - this.botLeftHoldQueue[0][1] - 1830;
                    holdQueue = this.botLeftHoldQueue;
                }
                break;
            case 2:
                if (this.topLeftQueue[0] != undefined) {
                    timeDifference = currentTime - this.topLeftQueue[0][1] - 1850;
                    queue = this.topLeftQueue;
                }
                if (this.topLeftHoldQueue[0] != undefined) {
                    timeDifference = currentTime - this.topLeftHoldQueue[0][1] - 1850;
                    holdQueue = this.topLeftHoldQueue;
                }
                break;
            case 3:
                if (this.middleQueue[0] != undefined) {
                    timeDifference = currentTime - this.middleQueue[0][1] - 1850;
                    queue = this.middleQueue;
                }
                if (this.middleHoldQueue[0] != undefined) {
                    timeDifference = currentTime - this.middleHoldQueue[0][1] - 1850;
                    holdQueue = this.middleHoldQueue;
                }
                break;
            case 4:
                if (this.topRightQueue[0] != undefined) {
                    timeDifference = currentTime - this.topRightQueue[0][1] - 1850;
                    queue = this.topRightQueue;
                }

                if (this.topRightHoldQueue[0] != undefined) {
                    timeDifference = currentTime - this.topRightHoldQueue[0][1] - 1850;
                    holdQueue = this.topRightHoldQueue;
                }
                break;
            case 5:
                if (this.botRightQueue[0] != undefined) {
                    timeDifference = currentTime - this.botRightQueue[0][1] - 1850;
                    queue = this.botRightQueue;
                }
                if (this.botRightHoldQueue[0] != undefined) {
                    timeDifference = currentTime - this.botHoldRightQueue[0][1] - 1850;
                    holdQueue = this.botRightHoldQueue;
                }
                break;
        }
        
    
        if (queue != undefined && queue[0][2] != true && held == false) {
            console.log(timeDifference);
            absoluteDifference = Math.abs(timeDifference);
            if (absoluteDifference < 40) {
                console.log("PERFECT");
            } else if (absoluteDifference < 80) {
                console.log("GOOD");
            } else if (absoluteDifference < 120) {
                console.log("OKAY");
            } else {
                return;
            }
            queue[0][0].style.opacity = "0";
            queue[0][2] = true;
        }

        if (holdQueue != undefined && holdQueue[0][4] != true) {
            absoluteDifference = Math.abs(timeDifference);
            if (absoluteDifference < 10) {
                console.log("PERFECT");
                holdQueue[0][0].style.opacity = "0";
                holdQueue[0][4] = true;
            }
        }
    }

    gameLoop() {
        
        if (this.getGame().getTrack().length != 0) {
            let frame = this.getFrame();
            if (frame.getHold() == 0) {
                frame.positions.forEach(position => {
                    this.makeArrow(position);
                });
            } else {
                frame.positions.forEach(position => {
                    this.makeHoldArrow(position, frame.getHold());
                });
            }
        } else {
            clearInterval(this.timerID);
        }
    }

    makeArrow(position) {
        let date = new Date();
        let arrowTime = date.getSeconds() * 1000 + date.getMilliseconds();
        let element;
        let queue;
        let currentTime;

        let arrow = document.createElement("img");
        arrow.style.top = "150vh"
        arrow.classList.add("moving");

        if (position == 1) {
            arrow.src = "./assets/botleft.png"
            element = document.getElementById("bottom-left");
            queue = this.botLeftQueue;

        } else if (position == 2) {
            arrow.src = "./assets/topleft.png"
            element = document.getElementById("top-left");
            queue = this.topLeftQueue;

        } else if (position == 3) {
            arrow.src = "./assets/middle.png"
            element = document.getElementById("middle");
            queue = this.middleQueue;

        } else if (position == 4) {
            arrow.src = "./assets/topright.png"
            element = document.getElementById("top-right");
            queue = this.topRightQueue;
            
        } else if (position == 5) {
            arrow.src = "./assets/botright.png"
            element = document.getElementById("bottom-right");
            queue = this.botRightQueue;
        }
        
        if (element != null && queue != null) {
            element.appendChild(arrow);
            queue.push([arrow, arrowTime]);

            setTimeout(() => {
                let date = new Date();
                currentTime = date.getSeconds() * 1000 + date.getMilliseconds();
                if (currentTime > arrowTime + 2000 && queue[0][2] != true) {
                    console.log("MISS");
                }
                queue.shift();
                element.removeChild(arrow);
                arrow = undefined;
            }, 2100);
        }
        setTimeout(()=> {
            arrow.style.transform = "translateY(-330vh)"
        }, 20);
    }

    makeHoldArrow(position, holdLength) {
        let date = new Date();
        let arrowTime = date.getSeconds() * 1000 + date.getMilliseconds();
        let element;
        let queue;
        let currentTime;

        let arrowStart = document.createElement("img");
        let arrowHold = document.createElement("img");
        let arrowEnd = document.createElement("img");

        arrowStart.style.top = "150vh"
        arrowStart.classList.add("moving");
        arrowStart.style.zIndex = "999";

        arrowHold.style.top = "150vh";
        arrowHold.classList.add("moving");
        arrowHold.style.width = "60px";

        arrowEnd.style.top = "150vh"
        arrowEnd.classList.add("moving");
        arrowEnd.style.zIndex = "999";

        if (position == 1) {
            arrowStart.src = "./assets/botleft.png"
            arrowHold.src = "./assets/bot hold.png"
            arrowEnd.src = "./assets/botleft.png"
            element = document.getElementById("bottom-left");
            queue = this.botLeftHoldQueue;

        } else if (position == 2) {
            arrowStart.src = "./assets/topleft.png"
            arrowHold.src = "./assets/top hold.png"
            arrowEnd.src = "./assets/topleft.png"
            element = document.getElementById("top-left");
            queue = this.topLeftHoldQueue;

        } else if (position == 3) {
            arrowStart.src = "./assets/middle.png"
            arrowHold.src = "./assets/middle hold.png"
            arrowEnd.src = "./assets/middle.png"
            element = document.getElementById("middle");
            queue = this.middleHoldQueue;

        } else if (position == 4) {
            arrowStart.src = "./assets/topright.png"
            arrowHold.src = "./assets/top hold.png"
            arrowEnd.src = "./assets/topright.png"
            element = document.getElementById("top-right");
            queue = this.topRightHoldQueue;
            
        } else if (position == 5) {
            arrowStart.src = "./assets/botright.png"
            arrowHold.src = "./assets/bot hold.png"
            arrowEnd.src = "./assets/botright.png"
            element = document.getElementById("bottom-right");
            queue = this.botRightHoldQueue;
        }
        let arrowHoldHeight;
        if (holdLength < 6) {
            arrowHoldHeight = holdLength * 150 + 6 * holdLength * holdLength;
        } else {
            arrowHoldHeight = holdLength * 147 + 5 * holdLength * holdLength;
        }


        arrowHold.style.height = arrowHoldHeight + "px";

        if (element != null && queue != null) {
            element.appendChild(arrowStart);
            element.appendChild(arrowHold);
            element.appendChild(arrowEnd);

            queue.push([arrowStart, arrowTime]);

            setTimeout(() => {
                let date = new Date();
                currentTime = date.getSeconds() * 1000 + date.getMilliseconds();
                if (currentTime > arrowTime + 2000 && queue[0][4] != true) {
                    console.log("MISS");
                }
                queue.shift();
                element.removeChild(arrowStart);
                arrowStart = undefined;
            }, 2000);

            for (let i = 1; i < holdLength; i++) {
                let hold = document.createElement("img");
                hold.style.top = arrowHold.style.top;
                hold.classList.add("moving");
                queue.push([hold, arrowTime + this.pieceDelay * i, arrowHold, holdLength - i]);

                setTimeout(() => {
                    let date = new Date();
                    currentTime = date.getSeconds() * 1000 + date.getMilliseconds();
                    if (currentTime > arrowTime + this.pieceDelay * i + 2000 && queue[0][4] != true) {
                        console.log("MISS");
                    }
                    queue.shift();
                    hold = undefined;
                }, 2000 + this.pieceDelay * i);
            }

            queue.push([arrowEnd, arrowTime + this.pieceDelay * holdLength]);

            setTimeout(() => {
                let date = new Date();
                currentTime = date.getSeconds() * 1000 + date.getMilliseconds();
                if (currentTime > arrowTime + this.pieceDelay * holdLength + 2000 && queue[0][4] != true) {
                    console.log("MISS");
                }
                queue.shift();
                element.removeChild(arrowHold);
                element.removeChild(arrowEnd);
                arrowEnd = undefined;
            }, 2000 + this.pieceDelay * holdLength);
        }

        setTimeout(()=> {
            arrowStart.style.transform = "translateY(-330vh)"
        }, 20);

        setTimeout(()=> {
            arrowHold.style.transform = "translateY(-330vh)"
        }, 120);

        setTimeout(()=> {
            arrowEnd.style.transform = "translateY(-330vh)"
        }, 20 + this.pieceDelay * holdLength);
    }
}

class Game {
    constructor(trackTitle, bpm) {
        this.track = [];
        this.bpm = bpm;

        this.timeFrames = trackTitle.split("\n");
        this.timeFrames.forEach(frame => {
            let frameValues = frame.split(" ");
            let framePositions = frameValues[0].split(",");
            this.track.push(new TimeFrame(framePositions, frameValues[1]));
        })
    }

    getTrack() {
        return this.track;
    }
}

class TimeFrame {
    constructor(positions, hold) {
        this.positions = positions;
        this.hold = hold;
    }

    getPositions() {
        return this.positions;
    }

    getHold() {
        return this.hold;
    }
}

var map1 = "1,2 \n3,2 1\n3,5 1\n2 0\n5 0\n1 0\n2,4 0\n 0\n1,2 0\n1,5 0\n2,4 0";

var map2 = "1,2,3,4,5 -1\n1,2,3,4,5 -1\n1,2,3,4,5 -1\n1,2,3,4,5 -1\n1,2,3,4,5 -1\n1,2,3,4,5 -1\n";

var map3 = "1 0\n2 0\n3 0\n4 0\n5 0\n1 0\n2 0\n3 0\n4 0\n5 0\n1 0\n2 0\n3 0\n4 0\n5 0\n1 0\n2 0\n3 0\n4 0\n5 0\n1 0\n2 0\n3 0\n4 0\n5 0\n1 0\n2 0\n3 0\n4 0\n5 0\n1 0\n2 0\n3 0\n4 0\n5 0\n1 0\n2 0\n3 0\n4 0\n5 0\n1 0\n2 0\n3 0\n4 0\n5 0\n1 0\n2 0\n3 0\n4 0\n5 0\n";

var map4 = "4 -1\n4 -1\n4 -1\n4 -1";

var map5 = "\n\n1 6\n3 1\n4 2"
const logic = new Logic();
const controller = new Controller(logic);
logic.setGame(map5, 240);
logic.startGame();

/* TO DO LIST
1. Fix the hold system of the arrows.
2. Add the score display to the centre of the screen
3. Create buttons to start and load the game. */