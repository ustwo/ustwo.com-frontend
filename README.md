# ustwo.com website

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
  * Data: using Flux Store to cache stuff loaded using Isomorpic-Fetch via WP API

Upcoming:

 * Tests

Main motivation to have a SPA is to have nice between page transitions like on http://www.google.com/design/articles/ :)

## Setup

The project is wrapped into a Docker container so the only dependencies are Docker related.

Commands below assume OS X and preference to install binaries via Homebrew and Cask. You can of course install Docker Machine and Virtualbox in any other way you want, or what is appropriate to your environment.

  * Install [Docker Machine](https://docs.docker.com/machine/#installation)

  `$ brew install docker-machine`

  * Install [Docker Engine](https://docs.docker.com/installation/binaries/)

  `$ brew install docker`

  * Install [Virtualbox](https://www.virtualbox.org/wiki/Downloads)

  `$ brew cask install virtualbox`

  * Create Docker host VM

  `$ docker-machine create --driver virtualbox dev`

  * Set up Docker environment to VM – needs to be done for every new shell session

  `$ eval "$(docker-machine env dev)"`

  * Build container – you can also do a `pull` instead to download a prebuilt image if you're on a fast connection and have a Docker Hub account added to the ustwo organisation

  `$ make build`

## Develop

First thing, request to the team maintainer the ustwo SSL certificates and put
them into `./etc/nginx/ssl`.

Bootstrap a new environment:

    $ make init TIER=dev

Deploy app:

    $ make deploy TIER=dev

*Note*: Deploy recreates the app and the proxy but keeps the vault.

It is recommended to add a new entry to your `/etc/hosts` with an ustwo
subdomain so the SSL certificate works without warnings:

    # Assuming 192.168.99.100 is your dev environment.
    192.168.99.100 local.ustwo.com

Clean the environment:

    $ make init-rm TIER=dev


## Release

1. Increment version in `Makefile` and `package.json`.
2. Build fresh Docker image

        $ make build

3. Push image to Docker Hub

        $ make push`

4. Set the right environment

        $ eval $(docker-machine env ustwosite)

5. Deploy

        $ make deploy TIER=production PROXY_HTTP_PORT=80 PROXY_HTTPS_PORT=443

*Note*: If there is no previous release you must use

      $ make init TIER=production PROXY_HTTP_PORT=80 PROXY_HTTPS_PORT=443


## Style guide (WIP)

Use [EditorConfig](http://editorconfig.org/)!

JS: [Airbnb ES6 style guide](https://github.com/airbnb/javascript) as a starting point + which JSX one?
Should we enforce with [JSCS](http://jscs.info/) (see [Airbnb's settings](https://github.com/jscs-dev/node-jscs/blob/master/presets/airbnb.json))?

CSS: [BEM](http://getbem.com/introduction/)

Components / HTML: [Atomic design](http://bradfrost.com/blog/post/atomic-web-design/) – we're using the ideas from Atomic design, but with different naming convention for component hierarchy levels (from simple to complex):
  * Elements instead of Atoms
  * Components instead of Molecules
  * Modules instead of Organisms
  * Templates

If you find yourself with very long class names due to BEM, it's probably a sign that you should have broken some pieces out to smaller components!
