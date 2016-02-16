# Assets guide

## Using SVGs as sprites

### Add SVG to spritemap.svg

After exporting the asset, some level of optimisation is needed before using it in the app.

1. Navigate to [SVG OMG](https://jakearchibald.github.io/svgomg/)
2. Choose 'Open SVG', select the file, and switch to the 'Code' tab
3. Select 'Prettify code' and 'Multipass' in global settings
4. Copy the following template and paste into `src/app/images/spritemap.svg` at an appropriate place:

        <symbol id="name-of-sprite" viewbox="0 0 20 20">
            <title>Name of Sprite</title>
            <path>
        </symbol>
5. Back to SVG OMG, copy everything within `<svg>`
6. Past the copied code in place of `<path>` in the template
7. Rename `id`, `title` and replace the `viewbox` dimensions with the ones from the `<svg>` tag in SVG OMG

### Using sprites

The custom made SVG component (`app/components/svg`) is required to use sprites from spritemap.svg

Import and call the component passing the name declared in `id` above as the `spritemapID`:
```
import SVG from 'app/components/svg';
...
<SVG spritemapID="name-of-sprite" />
```
