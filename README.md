# Pop

The pop figures are semi-generated. 
Each heart has 'big picture' coordinates of each pixel. 
Pixel size is defined in the constant `REAL_PIXEL_SIZE`. 
Coordinates are defined in `heartOutline`.
Bliks are dewfined in the `heartBlick`.
Inside the heart, there is a line of pixels described that covers almost the whole heart interior. It is defined in `heartBruises`.
From this list a random number of consecutive pixels ir randomly selected and displayed. These combine with the randomness of the heart outline glitches.

Heart outline Glitches happen when a user bursts a heart. A random number of consequent pixels from the heart outline are selected. these pixels are all displaced with one pixel in either direction.