# CMPM163Labs

# Lab 2:

Three cubes video (Must have UCSC email to view):
https://drive.google.com/file/d/15XuIXxUtrTVo39Q95UpNPblpIiSAc07q/view?usp=sharing

Part 2 Preview:
![](Images/Lab%202%20Part%202%20Herman%20Wu.png)

# Lab 3:

Five cubes with shaders and materials (Must have UCSC email to view):
https://drive.google.com/file/d/1wvrJQJkr3TuCCRzAkfvLVkjGuNTgbbGY/view?usp=sharing

For the first cube on the left, I made a cube with a simple Phong material that has a gray base color and a green specular color.

For the second cube on the left, I made a cube with a Phong material with a pink base color and put a bump map I found at http://www.bundysoft.com/wiki/doku.php?id=tutorials:l3dt:bumpmap

For the cube in the middle, I made a cube that interpolated between orange and yellow using my own shaders

For the second cube on the right, I generated my own textures in Substance Painter and mapped the albedo, emissive, normal, and height maps using a Phong material.

For the first cube on the right, I made a cube with my own shaders that took in the global position of the fragment and mapped that value on a scale of -1 to 1 into 0 to 1, giving it a soft, pastel appearance.

# Lab 4:

Five cubes with textures and shaders (Must have UCSC email to view):
https://drive.google.com/file/d/1jZkQmNrKY75JqzcMSCIehzMFpMMD14y9/view?usp=sharing

a) x = floor(7 * u)

b) y = floor(7 * ( 1 - v ))

c) (2,5) grey

For the first cube on the left, I mapped just the color map of a texture on the cube.

For the second cube, I mapped both the color map and normal map of the texture from cube 1 onto this cube.

For the third cube, I mapped another combination of a color map and a normal map onto this cube.

For the fourth cube, I mapped the color map via a shader

For the fifth cube, I used the same shader, but passed in a uniform that scaled the texture. Then I truncated the uv coordinates so only the decimal remained and fed that into the texture2D so that I repeat pixels, creating tiling.

# Lab 5:

Unity Mod (Must have UCSC email to view):
https://drive.google.com/file/d/1klPlgttINfIaZlnbr6VuUd_mDQAEUZWu/view?usp=sharing

I made 3 modifications:

I made the track longer by incorporating the extra track and adding an extra turn

I also wrote a script so the particle effects would scale with your speed. If you're sitting still, then no particles will emit. As you pick up speed, the particles' initial speed will increase so it feels like you're going faster.

I also made that script make other particle effects scale their speed and emission rate with how much you are turning, to give feedback that you are turning.

Three.JS lab Part A: Moving the camera around static particles that change color
https://drive.google.com/file/d/1w6nbUmKkWZrhSvigLGUQ1mXUmz5twsMV/view?usp=sharing

Three.JS lab Part B: Custom Explosion of Particles
https://drive.google.com/file/d/1L55DHqEaw15VC1WFQrFzTGbObFkjXN3T/view?usp=sharing

I looked up an algorithm to randomly pick a unit vector in 3D space, so that the particles would explode in a spherical shape. I also made the particles change their hue over time.
Algorithm was found here: https://math.stackexchange.com/questions/44689/how-to-find-a-random-axis-or-unit-vector-in-3d

Three.JS lab Part C: Sine Wave 

https://drive.google.com/file/d/1CMSyK5sj7yI64pq8wEoBqDQxRsN3_k4_/view?usp=sharing

I randomly spread particles across in the X axis, and then I animated their Y positions in a sinusoidal curve, given an input of their X position and time.

# Lab 6:

Spotlight: A light source that emits light rays from a single point in 3D space, but only in some directions.

Directional Light: A light source that emits light rays in one direction globally, which can be thought of a light source from "far away"

Point Light: A light source that emits light rays in all directions, starting from a single point in 3D space

Area Light: A light source that emits light rays in one direction, but emits from a rectangle or disc in space. This light source also only bakes light onto light maps, so it can only cast light on static objects.

I decided to mimic the material of my lanyard. So I found a texture set online that was burlap and applied all of the maps. Then I tinted the albedo map to be greenish-yellow because my lanyard is greenish-yellow. I set the smoothness to .154, because my lanyard isn't shiny, but it does reflect some light, probably because it's made of synthetic fibers? I also decided to push the height map value all of the way because that'd be cool. I also non-uniformly tiled the texture with a ratio of 1:4 because I notice the sewing on my lanyard isn't in squares, but in rectangles.

https://3dtextures.me/2020/01/20/fabric-burlap-003/

I then textured the floor to be wood with this texture and then tiled it 10 times.

https://3dtextures.me/2019/09/19/wood-020/

https://3dtextures.me/2019/10/24/brick-wall-016/