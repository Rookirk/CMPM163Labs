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

a) color = floor(7 * u)
b) color = floor(7 * ( 1 - v ))

c) (2,5) grey

For the first cube on the left, I mapped just the color map of a texture on the cube.

For the second cube, I mapped both the color map and normal map of the texture from cube 1 onto this cube.

For the third cube, I mapped another combination of a color map and a normal map onto this cube.

For the fourth cube, I mapped the color map via a shader

For the fifth cube, I used the same shader, but passed in a uniform that scaled the texture.