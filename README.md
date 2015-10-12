# ustwo.com website

## Overview

This repository contains all the front end code for the current [ustwo.com](https://ustwo.com) website and the toolset required to build and deploy it.



Our content management system behind this is a Wordpress instance which doesn't actually render the pages themselves, but instead serves content up via [WP API](http://v2.wp-api.org/) through a mixture of standard and customised JSON REST API endpoints making the vast majority of the content editable.



React SPA front end + Wordpress API back end

## Tech stack

### React SPA

### Node app

### Nginx proxy

__________

TODO: cull unimportant ones and update to current stack under right section and with a bit more explanation about choices.

Currently used:

* Building using Gulp + Browserify
* UI using React.js + ES6/7
* Lightweight style guide using [React Style Guide](https://github.com/alexlande/react-style-guide)
* CSS via LibSass + Susy
* CSS browser support with PostCSS / [Autoprefixer](https://github.com/postcss/autoprefixer)
* Web fonts using [Localfont.js](https://github.com/jaicab/localFont)
* Responsive images via [Imager.jsx](https://github.com/oncletom/Imager.jsx) (React wrapper of Imager.js)
* Dynamic animations: [GreenSock.js](http://greensock.com/get-started-js) + [bezier easing](https://github.com/gre/bezier-easing)
* Routing: Express + Flux Routes
* Scroll triggered animations: [ScrollMagic](http://janpaepke.github.io/ScrollMagic/)
* Data: using Flux Store to cache stuff loaded using Isomorphic-Fetch via WP API

Main motivation to have a SPA is to have nice between page transitions like on http://www.google.com/design/articles/ :)

## Setup

### Docker dependencies

The project is managed via Docker containers.

Commands below assume OS X and preference to install libraries via Homebrew.
You can of course install Docker Machine and Virtualbox in any other way
you want (like Docker Toolbox / [Kitematic](https://kitematic.com/)).

* Install [Docker Machine](https://docs.docker.com/machine/#installation)

        $ brew install docker-machine

* Install [Docker Engine](https://docs.docker.com/installation/binaries/)

        $ brew install docker

* Install [Virtualbox](https://www.virtualbox.org/wiki/Downloads)

*Note*: Beware, the version might matter. Our latest known working version is 5.0.4.

### Docker environment

* Create Docker host VM

        $ docker-machine create --driver virtualbox dev

* Set up Docker environment to VM – needs to be done for every new shell session

        $ eval "$(docker-machine env dev)"

* Set up `/etc/hosts` aliases

        192.168.99.100 local.ustwo.com
        192.168.99.100 staging.ustwo.com

*Note*: The IP number above depends on your local instance. Check `docker-machine ip dev`.

### Credentials

#### Vault

TODO: steps how to run local instance with self certification.

* Get the vault from someone (e.g. arnau@ustwo.com) and load it in your
docker environment.

        $ make vault-load VAULT_PATH=vault-2015.tar

#### Testing

TODO: Sauce Labs environment variables

## Develop

*Note*: Check the [Make.md](./Make.md) for an explanation of how the Make
tasks are structured.

Prepare a new environment:

    $ make compiler-build build

Compile the assets (you can use only this when you're only recompiling on front
end stuff):

    $ make stuff

Or target specific subtasks:

    $ make css
    $ make css-watch       # watches for changes in SASS files
    $ make spa             # compiles the react app
    $ make vendors         # compiles the react dependencies

*Note*: `css` and `spa` combined with `VERBOSE=true` will create sourcemaps.

*Note*: `spa` and `vendors` combined with `FLUSH_CACHE=true` will skip any
cache created by browserify. Ex:

    $ make spa VERBOSE=true FLUSH_CACHE=true

Deploy app (when you need to restart services):

    $ make -i love LOCAL_FS=true VERBOSE=true

*Note*: Add the flag `LOCAL_FS=true` if you want to use your local files instead
of the ones inside the containers.
*Note*: Add the flag `VERBOSE=true` if you want the JS and CSS expanded.

As long as `LOCAL_FS=true` is set a convenient way to refresh the environment
is:

    $ make -i love stuff LOCAL_FS=true

As it will rebuild the assets (`stuff`) and recreate the containers (`love`)
remounting all necessary files from the host environment.

Clean the environment:

    $ make clean
    
See Node app logs with:

    $ make app-log
    
And Nginx logs with:

    $ make proxy-log

## Test

### Unit

Run the unit tests:

    $ make test

TODO: describe what we use (Mocha, JSDOM, etc)

### Integration

TODO: describe what we use (Mocha, Chai, Chai Promises, Sauce Labs, etc)

## Release

We're using Docker Hub and Docker Machine to tag and deploy Docker images, for more info see [RELEASE.md](./RELEASE.md).

## Contribution

To read up on our coding style and general contribution guide, have a look at [CONTRIBUTING.md](./CONTRIBUTING.md).

## Sandbox / component style guide

TODO

## Contact / credits

TODO: who to best talk to about various aspects

## License – probably best as LICENSE.md
