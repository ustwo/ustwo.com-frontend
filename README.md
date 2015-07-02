# ustwo.com-prototype

Currently used:

  * Building using Gulp + Browserify
  * UI using React.js + ES6/7
  * Lightweight style guide using [React Style Guide](https://github.com/alexlande/react-style-guide)
  * CSS via LibSass + Susy
  * CSS browser support with PostCSS / [Autoprefixer](https://github.com/postcss/autoprefixer)
  * Web fonts using [Localfont.js](https://github.com/jaicab/localFont)
  * Icons via SVG spritemap – might need to use [SVG4everybody](https://github.com/jonathantneal/svg4everybody) for IE support
  * SVGs optimised with [SVGOMG](https://jakearchibald.github.io/svgomg/)
  * Responsive images via [Imager.jsx](https://github.com/oncletom/Imager.jsx) (React wrapper of Imager.js)

Upcoming:

 * Dynamic animations: [GreenSock.js](http://greensock.com/get-started-js) or [Velocity.js](http://julian.com/research/velocity) + [bezier easing](https://github.com/gre/bezier-easing)
 * Data: right now only loading some local JSON with [Fetch](https://github.com/github/fetch) promises, should move to something more proper like Flux
 * Routing: we'll need something which plays nice with isomorphic React later
 * Scroll triggered animations: [ScrollMagic](http://janpaepke.github.io/ScrollMagic/) or [WOW](https://github.com/matthieua/WOW)
 * Tests

To update content, have a look in the `/data` folder (it's only gulpdata.json at this point though...)!

Main motivation to have a SPA is to have nice between page transitions like on http://www.google.com/design/articles/ :)

## Setup

    $ npm install
    $ npm run bower

## Develop

    $ npm run watch

TODO: containerise – waiting for HumanMade to see how they deal with WP

## Style guide

JS: [Airbnb ES6 style guide](https://github.com/airbnb/javascript) as a starting point + which JSX on? Should we enforce with [JSCS](http://jscs.info/) (see [Airbnb's settings](https://github.com/jscs-dev/node-jscs/blob/master/presets/airbnb.json))?
CSS: [BEM](http://getbem.com/introduction/)

Use EditorConfig!
