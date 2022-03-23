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

    let heartBlick = [
        p.createVector(2, 9),
        p.createVector(3, 10),
        p.createVector(4, 10)
    ];

    let heartsClicked = [];

    p.setup = function () {
        p.noStroke();
        p.background(200);

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

        for(let iy = 0; iy < heartNumber.y; iy++) {
            for(let ix = 0; ix < heartNumber.x; ix++) {

                let heartClicked = false;
                let glitchCoordinates = undefined;
                for (clicked of heartsClicked) {
                    if (clicked[0].x == ix && clicked[0].y == iy) {
                        heartClicked = true;
                        glitchCoordinates = clicked[1];
                        break;
                    }
                }

                // calculate exact heart starting points in p5js values.
                // this is the offset in regard to other already drawn hearts.
                let currentHeartY = (heartPxWidth * REAL_PIXEL_SIZE * ix) + (HEART_SPACING * ix);
                let currentHeartX = (heartPxHeight * REAL_PIXEL_SIZE * iy) + (HEART_SPACING * iy);
                let heartPosition = p.createVector(currentHeartX, currentHeartY);
                drawHeart(heartPosition, heartClicked, glitchCoordinates);
            }
        }

    }

    drawHeart = function(heartPosition, heartClicked, glitchCoordinates) {

        let localGlitchCoordinates;
        if (heartClicked) {
            localGlitchCoordinates = _.cloneDeep(glitchCoordinates);
        }

        for (let ix = 0; ix < heartOutline.length; ix++) {
            p.fill(0);
            let el = heartOutline[ix];
            let shouldTriggerGlitch = false;
            // p.fill(0);

            //check glitch
            if (heartClicked && localGlitchCoordinates !== undefined) {

                // check the list of glitches. if at least one glitch should be triggered, then trigger
                for (let g = 0; g < localGlitchCoordinates.length; g++) {
                    shouldTriggerGlitch = shouldTriggerGlitch ||
                        (ix >= localGlitchCoordinates[g][0] && ix <= (localGlitchCoordinates[g][0] + localGlitchCoordinates[g][1]));
                }

            }

            if (shouldTriggerGlitch) {
                let yCoef = heartPosition.y % 2 == 0 ? -1 : 1;
                let xCoef = heartPosition.x % 2 == 0 ? -1 : 1;
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

                // draw heart blick.
                p.fill(255);
                for (let ix = 0; ix < heartBlick.length; ix++) {
                    let el = heartBlick[ix];
                    p.rect(el.y * REAL_PIXEL_SIZE + heartPosition.y,
                        el.x * REAL_PIXEL_SIZE + heartPosition.x,
                        REAL_PIXEL_SIZE,
                        REAL_PIXEL_SIZE);
                }
            }
        }


    }

    p.mousePressed = function() {
        // find the coordinates of the clicked heart.
        let clickedHeartPosX = _.floor(p.mouseX / ((REAL_PIXEL_SIZE * heartPxWidth) + HEART_SPACING));
        let clickedHeartPosY = _.floor(p.mouseY / ((REAL_PIXEL_SIZE * heartPxHeight) + HEART_SPACING));

        // prepare outline distortion data
        let glitchOutlineCoordinates = [];
        let numberOfGlitches = _.random(2, 4);
        for (let gl = 0; gl < numberOfGlitches; gl++) {
            let startingPixel = _.random(heartOutline.length);
            let glitchLength = _.random(2, 7);
            glitchOutlineCoordinates.push([startingPixel, glitchLength]);
        }

        // initialize glitch here and attach to specific heart.
        // heartsClicked contains a vector with x, y for the clicked heart and a list of lists with glitches.
        // each small list contains the starting pixel and the length of the glitch.
        heartsClicked.push([p.createVector(clickedHeartPosX, clickedHeartPosY), glitchOutlineCoordinates]);

        console.log( heartsClicked.length + " clicked heart with coordinates - x: " + clickedHeartPosX + "   y: " + clickedHeartPosY);
    }
}
new p5(sketch_idnameofdiv, 'hearts')