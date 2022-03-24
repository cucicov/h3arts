const HEART_SPACING = 10;

function sketch_idnameofdiv(p) {

    const REAL_PIXEL_SIZE = 10;
    const HEART_SPACING = 10;

    let heartPxWidth = 0;
    let heartPxHeight = 0;
    let heartNumber = p.createVector(0, 0);

    let heartOutline = [
        p.createVector(0, 2),
        p.createVector(0, 3),
        p.createVector(0, 4),
        p.createVector(1, 5),
        p.createVector(2, 6),
        p.createVector(1, 7),
        p.createVector(0, 8),
        p.createVector(0, 9),
        p.createVector(0, 10),
        p.createVector(1, 11),
        p.createVector(2, 12),
        p.createVector(3, 12),
        p.createVector(4, 12),
        p.createVector(5, 12),
        p.createVector(6, 11),
        p.createVector(7, 10),
        p.createVector(8, 9),
        p.createVector(9, 8),
        p.createVector(10, 7),
        p.createVector(11, 6),
        p.createVector(10, 5),
        p.createVector(9, 4),
        p.createVector(8, 3),
        p.createVector(7, 2),
        p.createVector(6, 1),
        p.createVector(5, 0),
        p.createVector(4, 0),
        p.createVector(3, 0),
        p.createVector(2, 0),
        p.createVector(1, 1)
    ];

    let heartBruises = [
        p.createVector(1, 2),
        p.createVector(1, 3),
        p.createVector(1, 4),
        p.createVector(2, 4),
        p.createVector(2, 3),
        p.createVector(2, 2),
        p.createVector(2, 1),
        p.createVector(3, 1),
        p.createVector(4, 1),
        p.createVector(5, 1),
        p.createVector(5, 2),
        p.createVector(4, 2),
        p.createVector(3, 2),
        p.createVector(3, 3),
        p.createVector(4, 3),
        p.createVector(5, 3),
        p.createVector(6, 3),
        p.createVector(7, 3),
        p.createVector(7, 4),
        p.createVector(6, 4),
        p.createVector(5, 4),
        p.createVector(4, 4),
        p.createVector(3, 4),
        p.createVector(3, 5),
        p.createVector(4, 5),
        p.createVector(5, 5),
        p.createVector(6, 5),
        p.createVector(7, 5),
        p.createVector(8, 5),
        p.createVector(9, 5),
        p.createVector(9, 6),
        p.createVector(9, 7),
        p.createVector(8, 7),
        p.createVector(8, 8),
        p.createVector(7, 8),
        p.createVector(7, 7),
        p.createVector(7, 6),
        p.createVector(6, 6),
        p.createVector(6, 7),
        p.createVector(6, 8),
        p.createVector(6, 9),
        p.createVector(6, 10),
        p.createVector(5, 10),
        p.createVector(5, 11),
        p.createVector(4, 11),
        p.createVector(3, 11),
        p.createVector(2, 11),
        p.createVector(2, 10),
        p.createVector(3, 10),
        p.createVector(4, 10),
        p.createVector(4, 9),
        p.createVector(5, 9),
        p.createVector(5, 8),
        p.createVector(5, 7),
        p.createVector(5, 6),
        p.createVector(4, 6),
        p.createVector(3, 6),
        p.createVector(3, 7),
        p.createVector(4, 7),
        p.createVector(4, 8),
        p.createVector(3, 8),
        p.createVector(2, 8),
        p.createVector(1, 8),
        p.createVector(1, 9),
        p.createVector(2, 9),
        p.createVector(3, 9),
    ];

    let heartBlick = [
        p.createVector(2, 9),
        p.createVector(3, 10),
        p.createVector(4, 10)
    ];

    let heartsClicked = [];
    let backgroundNoise;
    let popSoundsPaths = ['1.mp3', '2.mp3', '3.mp3', '4.mp3', '5.mp3', '6.mp3', '7.mp3', '8.mp3', '9.mp3', '10.mp3', '11.mp3', '12.mp3'];
    let popSounds = [];
    let isSoundOn = false;

    p.preload = function () {
        p.soundFormats('ogg', 'mp3');
        backgroundNoise = p.loadSound('rustling.mp3');
        popSoundsPaths.forEach(path => {
            popSounds.push(p.loadSound(path));
        })
    }

    p.mouseMoved = function() {
        if (isSoundOn
            && p.frameCount > 10
            && !backgroundNoise.isPlaying()
            && (heartsClicked === undefined || heartsClicked.length == 0)) {
            backgroundNoise.loop();
        }
    }

    p.setup = function () {
        console.log("A project by Dorin Cucicov.");
        console.log("March 2022.");
        console.log("Sounds by Dwums96, AdamJordaan140087 and bewagne.");

        p.noStroke();
        p.background(200);
        p.cursor('cursor.png');

        // backgroundNoise.loop();

        // initialize total heart pixel size to use in positioning next hearts.
        heartOutline.forEach(el => {
            heartPxHeight = el.x > heartPxHeight ? el.x : heartPxHeight;
            heartPxWidth = el.y > heartPxWidth ? el.y : heartPxWidth;
        });
        heartPxHeight++; // fix 0 index.
        heartPxWidth++; // fix 0 index.

        // initialize heart number
        heartNumber.x = _.floor(p.windowWidth / (heartPxWidth * REAL_PIXEL_SIZE));
        heartNumber.x--;
        heartNumber.y = _.floor(p.windowHeight / (heartPxHeight * REAL_PIXEL_SIZE));
        heartNumber.y--;

        console.log("nr of hearts:" + heartNumber.x * heartNumber.y);

        // set exact canvas size matching number of hearts.
        let realCanvasWidth = (heartNumber.x  * REAL_PIXEL_SIZE * heartPxWidth) + (heartNumber.x * HEART_SPACING);
        let realCanvasHeight = (heartNumber.y  * REAL_PIXEL_SIZE * heartPxHeight) + (heartNumber.y * HEART_SPACING);
        p.createCanvas(realCanvasWidth, realCanvasHeight);
    }

    p.draw = function () {
        p.background(200);
        if (isSoundOn) { // project starts only after the user clicks for audio start

            if (p.random(1) < 0.03 && backgroundNoise.isPlaying()) {
                backgroundNoise.pause();
            }

            for(let iy = 0; iy < heartNumber.y; iy++) {
                for(let ix = 0; ix < heartNumber.x; ix++) {

                    let heartClicked = false;
                    let glitchCoordinates = undefined;
                    let bruiseGlitchCoordinates = undefined;
                    for (clicked of heartsClicked) {
                        if (clicked[0].x == ix && clicked[0].y == iy) {
                            heartClicked = true;
                            glitchCoordinates = clicked[1];
                            bruiseGlitchCoordinates = clicked[2];
                            break;
                        }
                    }

                    // calculate exact heart starting points in p5js values.
                    // this is the offset in regard to other already drawn hearts.
                    let currentHeartY = (heartPxWidth * REAL_PIXEL_SIZE * ix) + (HEART_SPACING * ix);
                    let currentHeartX = (heartPxHeight * REAL_PIXEL_SIZE * iy) + (HEART_SPACING * iy);
                    let heartPosition = p.createVector(currentHeartX, currentHeartY);
                    drawHeart(heartPosition, heartClicked, glitchCoordinates, bruiseGlitchCoordinates, ix, iy);
                }
            }
        }

    }

    drawHeart = function(heartPosition, heartClicked, glitchCoordinates, bruiseGlitchCoordinates, ix, iy) {

        let glitchTriggeredForThisHeart = false;

        for (let ix = 0; ix < heartOutline.length; ix++) {
            p.fill(0);
            let el = heartOutline[ix];
            let shouldTriggerGlitch = false;
            // p.fill(0);

            //check glitch
            if (heartClicked && glitchCoordinates !== undefined) {

                // check the list of glitches. if at least one glitch should be triggered, then trigger
                for (let g = 0; g < glitchCoordinates.length; g++) {
                    shouldTriggerGlitch = shouldTriggerGlitch ||
                        (ix >= glitchCoordinates[g][0] && ix <= (glitchCoordinates[g][0] + glitchCoordinates[g][1]));
                }

            }

            if (shouldTriggerGlitch) {
                glitchTriggeredForThisHeart = true;
                // let yCoef = heartPosition.y % 20 == 0 ? -1 : 1;
                // let xCoef = heartPosition.x % 20 == 0 ? -1 : 1;

                let yCoef = iy % 2 == 0 ? -1 : 1;
                let xCoef = ix % 2 == 0 ? -1 : 1;

                // try to move each big pixel by at most one position on x and one on y axis.
                p.rect((el.y - yCoef) * REAL_PIXEL_SIZE + heartPosition.y,
                    (el.x - xCoef) * REAL_PIXEL_SIZE + heartPosition.x,
                    REAL_PIXEL_SIZE,
                    REAL_PIXEL_SIZE);
            } else {
                p.rect(el.y * REAL_PIXEL_SIZE + heartPosition.y,
                    el.x * REAL_PIXEL_SIZE + heartPosition.x,
                    REAL_PIXEL_SIZE,
                    REAL_PIXEL_SIZE);
            }
        }


        // draw blick.
        p.fill(255);
        if (!glitchTriggeredForThisHeart) {
            // draw heart blick.
            for (let ix = 0; ix < heartBlick.length; ix++) {
                let el = heartBlick[ix];
                p.rect(el.y * REAL_PIXEL_SIZE + heartPosition.y,
                    el.x * REAL_PIXEL_SIZE + heartPosition.x,
                    REAL_PIXEL_SIZE,
                    REAL_PIXEL_SIZE);
            }
        } else {
            // p.fill(130);

            if (bruiseGlitchCoordinates !== undefined) {

                for (let ix = 0; ix < heartBruises.length; ix++) {
                    let el = heartBruises[ix];
                    p.fill(0);

                    // check which pixel from inside the heart should be drawn.
                    let shouldTriggerBruise = false;
                    // check the list of glitches. if at least one bruise should be drawn then draw.
                    for (let g = 0; g < bruiseGlitchCoordinates.length; g++) {
                        shouldTriggerBruise = (ix >= bruiseGlitchCoordinates[g][0] && ix <= (bruiseGlitchCoordinates[g][0] + bruiseGlitchCoordinates[g][1]));
                        if (shouldTriggerBruise) {
                            break;
                        }
                    }

                    if (shouldTriggerBruise) {
                        p.rect(el.y * REAL_PIXEL_SIZE + heartPosition.y,
                            el.x * REAL_PIXEL_SIZE + heartPosition.x,
                            REAL_PIXEL_SIZE,
                            REAL_PIXEL_SIZE);
                    }

                }

            }

        }

    }



    p.mousePressed = function() {
        // initialization sound permission
        if (!isSoundOn) {
            p.userStartAudio();
            isSoundOn = true;
            //hide warning message
            p.select("#warning").style("display", "none");

        } else { // proceed normally after the initialization of sound.
            // find the coordinates of the clicked heart.
            let clickedHeartPosX = _.floor(p.mouseX / ((REAL_PIXEL_SIZE * heartPxWidth) + HEART_SPACING));
            let clickedHeartPosY = _.floor(p.mouseY / ((REAL_PIXEL_SIZE * heartPxHeight) + HEART_SPACING));

            // check if heart already clicked/popped.
            let heartAlreadyClicked = false;
            heartsClicked.forEach(el => {
               if (el[0].x == clickedHeartPosX && el[0].y == clickedHeartPosY) {
                   heartAlreadyClicked = true;
               }
            });

            if (!heartAlreadyClicked) {
                // prepare outline distortion data
                let glitchOutlineCoordinates = generateGlitchCoords(2, 4, 2,  7, heartOutline);
                let glitchBruisesCoordinates = generateGlitchCoords(0, 5, 1,  2, heartOutline);

                // initialize glitch here and attach to specific heart.
                // heartsClicked contains a vector with x, y for the clicked heart and a list of lists with glitches.
                // each small list contains the starting pixel and the length of the glitch.
                heartsClicked.push([p.createVector(clickedHeartPosX, clickedHeartPosY), glitchOutlineCoordinates, glitchBruisesCoordinates]);

                // play random pop sound
                let rrndSound = _.random(popSounds.length - 1);
                popSounds[rrndSound].stop();
                popSounds[rrndSound].play();
            }

            console.log( heartsClicked.length + " clicked heart with coordinates - x: " + clickedHeartPosX + "   y: " + clickedHeartPosY);
        }
    }

    // generated a list of random size between @minGlitches and @maxGlitches
    // for each list picks up a random item index from @list and generates a random length between @minGlitchLen and @maxGlitchLen
    generateGlitchCoords = function(minGlitches, maxGlitches, minGlitchLen, maxGlitchLen, list) {
        let glitchOutlineCoordinates = [];
        let numberOfGlitches = _.random(minGlitches, maxGlitches);
        for (let gl = 0; gl < numberOfGlitches; gl++) {
            let startingPixel = _.random(list.length);
            let glitchLength = _.random(minGlitchLen, maxGlitchLen);
            glitchOutlineCoordinates.push([startingPixel, glitchLength]);
        }

        return glitchOutlineCoordinates;
    }

}
new p5(sketch_idnameofdiv, 'hearts')