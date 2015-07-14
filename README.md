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
  * Dynamic animations: [GreenSock.js](http://greensock.com/get-started-js) + [bezier easing](https://github.com/gre/bezier-easing)
  * Routing: Express + Flux Routes
  * Scroll triggered animations: [ScrollMagic](http://janpaepke.github.io/ScrollMagic/)

Upcoming:

 * Data: right now only loading some local JSON with [Fetch](https://github.com/github/fetch) promises, should move to proper Flux Store via WP API
 * Tests

To update content, have a look in the `/data` folder (it's only gulpdata.json at this point though...)!

Main motivation to have a SPA is to have nice between page transitions like on http://www.google.com/design/articles/ :)

## Setup

The project is wrapped into a Docker container so the only dependencies are Docker related.

Commands below assume OS X and preference to install binaries via Homebrew and Cask. You can of course install Docker Machine and Virtualbox in any other way you want, or what is appropriate to your environment.

    # 1. Install Docker Machine
    $ brew install docker-machine
    # 2. Install Virtualbox
    $ brew cask install virtualbox
    # 3. Create Docker host
    $ make create
    # 4. Set up Docker environment
    $ eval "$(docker-machine env dev)"
    # 5. Build container
    $ make build
    # 6. Build container
    $ make run
    # 7. Open app in browser
    $ make open

## Develop

    # Tail Gulp watch output
    $ make log

    # In case Gulp exits with an error restart
    $ make run

## Style guide

JS: [Airbnb ES6 style guide](https://github.com/airbnb/javascript) as a starting point + which JSX one?  
Should we enforce with [JSCS](http://jscs.info/) (see [Airbnb's settings](https://github.com/jscs-dev/node-jscs/blob/master/presets/airbnb.json))?

CSS: [BEM](http://getbem.com/introduction/)

Use EditorConfig!
