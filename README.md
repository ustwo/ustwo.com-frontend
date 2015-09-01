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

The project is managed via Docker containers.

Commands below assume OS X and preference to install binaries via Homebrew and
Cask. You can of course install Docker Machine and Virtualbox in any other way
you want, or what is appropriate to your environment.

* Install [Docker Machine](https://docs.docker.com/machine/#installation)

      $ brew install docker-machine

* Install [Docker Engine](https://docs.docker.com/installation/binaries/)

      $ brew install docker

* Install [Virtualbox](https://www.virtualbox.org/wiki/Downloads)

      $ brew cask install virtualbox

*Note* Beware the version might matter.  The tested version is 5.0.0.

* Create Docker host VM

      $ docker-machine create --driver virtualbox dev

* Set up Docker environment to VM – needs to be done for every new shell session

      $ eval "$(docker-machine env dev)"

* Build images — If you build the vault, you need to place the SSL certificates
in `./etc/nginx/ssl`.  Alternatively, get the image `ustwo/usweb-vault:2015`
from another member of the team.

      $ make vault-build
      $ make compiler-build seeds


## Develop

*Note*: Check the [Make.md](./Make.md) for an explanation of how the make
tasks are structured.

Bootstrap a new environment:

    $ make offspring

*Note*: Add the flag `VERBOSE=true` if you want the JS and CSS expanded.

Deploy app:

    $ make love

It is recommended to add a new entry to your `/etc/hosts` with an ustwo
subdomain so the SSL certificate works without warnings:

    # Assuming 192.168.99.100 is your dev environment.
    192.168.99.100 local.ustwo.com

Clean the environment:

    $ make extermination


## Release staging

1. Increment version in `Makefile`
2. Build fresh Docker images

      $ make seeds

3. Push image to the Docker Hub

      $ make infection

4. Set the right environment

      $ eval $(docker-machine env ustwosite)

5. Pull images

      $ make incubation

5. Deploy

      $ make -i deploy-staging


## Release production

1. Deploy in your local environment the production version.

      # Remove dev instances to avoid port collisions
      $ make extermination
      $ make -i love TIER=production

*Note* It assumes you build the images already following the staging process.

2. Test deployment

      $ open https://local.ustwo.com:10443

3. Set the right environment

      $ eval $(docker-machine env ustwositepro)

4. Pull images

      $ make incubation

5. Deploy

      $ make -i deploy-production



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
