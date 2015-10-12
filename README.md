# ustwo.com website

## Overview

TODO: What is this, less technical high level overview

React SPA front end + Wordpress API back end

## Tech stack

TODO: cull unimportant ones and update to current stack with a bit more explanation about choices.

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

Main motivation to have a SPA is to have nice between page transitions like on http://www.google.com/design/articles/ :)

## Setup

### Docker dependencies

The project is managed via Docker containers.

Commands below assume OS X and preference to install libraries via Homebrew.
You can of course install Docker Machine and Virtualbox in any other way
you want (like [Kitematic](https://kitematic.com/)).

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

#### AWS

TODO: how to set up `ustwosite` and `ustwositepro` Docker env

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

## Test

### Unit

Run the unit tests:

    $ make test

TODO: describe what we use (Mocha, JSDOM, etc)

### Integration

TODO: describe what we use (Mocha, Chai, Chai Promises, Sauce Labs, etc)

## Contribution (code style guide)

TODO: clean up, maybe move completely to [CONTRIBUTING.md](./CONTRIBUTING.md)?

Use [EditorConfig](http://editorconfig.org/)!

JS: [Airbnb ES6 style guide](https://github.com/airbnb/javascript) as a starting point + which JSX one?
Should we enforce with [JSCS](http://jscs.info/) (see [Airbnb's settings](https://github.com/jscs-dev/node-jscs/blob/master/presets/airbnb.json))?

## Sandbox / component style guide

TODO

## Release – move to RELEASE.md?

If the commit you are releasing from has been picked up by CircleCI (so you have
a snapshot available `ustwo/usweb:app-{git hash}`) you can release with:

        $ make release VERSION=1.2.3
        $ git push --tags origin master

If not, do it manually (only for emergencies when you cannot wait for the CircleCI build):

1. Tag the release

        $ make release-tag-create VERSION=1.2.3
        $ git push --tags origin master

2. Build fresh Docker images

        $ make build VERSION=x.x.x

3. Publish the release

        $ make push VERSION=1.2.3


## Deploy staging – move to RELEASE.md?

1. Set the right environment

        $ eval $(docker-machine env ustwosite)

2. Pull images

        $ make pull VERSION=1.2.3

3. Deploy

        $ make deploy-staging VERSION=1.2.3

4. Clean old images, keeping only the last known working version in case of rollback

        $ make nuke VERSION=1.2.2


## Deploy production – move to RELEASE.md?

It assumes you followed the staging flow so the tagged images are available in
the Docker Hub.

1. Deploy in your local environment

        $ make -i love VERSION=1.2.3

2. Test deployment

        $ open https://local.ustwo.com:9443

3. Set the right environment

        $ eval $(docker-machine env ustwositepro)

4. Pull images

        $ make pull VERSION=1.2.3

5. Deploy

        $ make deploy-production VERSION=1.2.3

6. Clean old images, keeping only the last known working version in case of rollback

        $ make nuke VERSION=1.2.3



