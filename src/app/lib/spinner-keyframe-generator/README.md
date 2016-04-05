# Spinner keyframe generator

This is a css (stylus) helper that uses the prototype library, Ornithopter, to generate css keyframes
for `components/loading-icon`. Contact phil@ustwo.com for any questions.

## Why use Ornithopter?

Due to the complexity and desire to easily maintain/change the multi-coloured spinner keyframes for the loading-icon animation,
the component relies on generating the keyframes using the 'Ornithopter' library.
Ornithopter is a prototype with many limitations, however it is sufficient for the formulaic
nature of the desired output animation of this case.

Letting Ornithopter generate the keyframes based on individual sets of animations allows us to
accomplish the following with ease:
  * add/remove a cycle,
  * re-order/alter the colours

## Add a new cycle and colour

  1.  Copy the last block of animation units (each block is separated by space and contains everything from `colorBorder` to `spin` animations) and paste it at the end of the animations object.

  2.  Change each occurrence of the cycle number, e.g. 4, with one number higher. For example:
    - `colourBorderA4` => `colourBorderA5`,
    - `delay: (cycle-duration * 4)` => `delay: (cycle-duration * 5)`

  3.  Add a new colour to the palette and change the colours in the new block accordingly. For example:
    - `$colour.tenth => $colour.eleventh`
