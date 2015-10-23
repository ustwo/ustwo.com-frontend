# ustwo.com website

## Overview

This repository contains all the front end code for the current [ustwo.com][1]
website and the toolset required to build and deploy it.

In order to be able to have full control over all aspects of the website –
including transitions between pages – and to make navigation super fast by not
having to reload the browser, we decided to build the site as a
[single-page application][2]. We chose [React.js][3] as a main JavaScript
technology enabling us to do this, since it has built in support to render
pages on the server side too (called isomorphic rendering). This way we could
keep the loading and rendering performance snappy on mobile and let visitors
see content without an extra data loading step after the initial page load. To
do this work we put a small Node backend server in place.

Our content management system behind this is a Wordpress instance which doesn't
actually render the pages itself, but instead serves content up via [WP API][4]
through a mixture of standard and customised JSON REST API endpoints making the
vast majority of the content editable.

## Tech stack

[![ustwo.com infrastructure diagram][5]][5]

### React SPA

ES6/7, React.js, Flux

Sass, SVG animations

### Node app

Express, Flux routes

Isomorphic rendering

### Nginx

Reverse proxy

### Build tools

Make, NPM scripts

Browserify, Babel

Autoprefixer, LibSASS

### Browser compatibility

We're aiming to support all evergreen browsers (Chrome, Firefox, Edge and Opera
on all platforms), Safari on Mac and iOS, Internet Explorer 10-11 and Android
Browser 4.2-4.4.4.

In case you were wondering, we've chosen these as we wanted to be able to use
[Flexbox][6] and they happen to conveniently mostly overlap the visitor profiles
from Google Analytics.

If you see any misbehaviour with one of these browsers please open an issue!

## Setup

### Docker dependencies

The project is managed via Docker containers.

Commands below assume OS X and preference to install libraries via Homebrew.
You can of course install Docker Machine and Virtualbox in any other way
you want (like Docker Toolbox / [Kitematic][7]).

* Install [Docker Machine][8]

        $ brew install docker-machine

* Install [Docker Engine][9]

        $ brew install docker

* Install [Virtualbox][10]

*Note*: Beware, the version might matter. Our latest known working version is
5.0.4.

### Docker environment

* Create Docker host VM

        $ docker-machine create --driver virtualbox dev

* Set up Docker environment to VM – needs to be done for every new shell session

        $ eval "$(docker-machine env dev)"

* Set up `/etc/hosts` aliases

        192.168.99.100 local.ustwo.com
        192.168.99.100 staging.ustwo.com

*Note*: The IP number above depends on your local instance. Check
`docker-machine ip dev`.

### Credentials / Vault

TODO: steps how to run local instance with self certification.

* Get the vault from someone (e.g. arnau@ustwo.com) and load it in your
docker environment.

        $ make vault-load VAULT_PATH=vault-2015.tar

## Develop

*Note*: Check the [MAKE.md][11] for an explanation of how the Make
tasks are structured.

Prepare a new environment:

    $ make compiler-build build

Compile the assets (you can use only this when you're only recompiling on front
end stuff):

    $ make stuff

Or target specific subtasks:

    $ make css             # compiles SASS files
    $ make spa             # compiles the React app
    $ make vendors         # compiles app dependencies

*Note*: `css` and `spa` combined with `VERBOSE=true` will create sourcemaps.

*Note*: `spa` and `vendors` combined with `FLUSH_CACHE=true` will skip any
cache created by browserify. Ex:

    $ make spa VERBOSE=true FLUSH_CACHE=true

Deploy app (when you need to restart services):

    $ make -i love LOCAL_FS=true VERBOSE=true

*Note*: Add the flag `LOCAL_FS=true` if you want to use your local files instead
of the ones inside the containers.
*Note*: Add the flag `VERBOSE=true` if you want the JS and CSS expanded and more
log output on the services.

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


### Watch and reload

CSS has extra tasks to speed up the development cycle. `css-watch` starts a
`fswatch` process in _the host machine_ watching any scss or css file under
`scr/app`.

    $ make css-watch

*Note*: `brew install fswatch` to install `fswatch` in your machine.

`sync` starts a dockerised `browser-sync` proxy listening by default to port
`3000`. So you can combine the two:

    $ make -i sync css-watch

Open `https://192.168.99.100:3000` in your browser and start editing scss and
let the toolchain compile and push changes to the browser.

*Note*: `browser-sync` uses a self-signed certificate so using `local.ustwo.com` or the raw IP will make the browser complain.  If you need to overcome this
please add a forward rule to Virtualbox so you can use `https://localhost:3000`.


## Test

Run all tests:

    $ make test

### Sandbox

We believe that every component should hold a single responsibity, and which
functionality must be working independently from the context the component is
instantiated in.

To enforce best practices – like storing functionality and styles in the
component they belong to – we created a sandbox to test components in an
isolated environment.

To prepare the sandbox run:

    $ make sandbox-build

And start the sandbox server with:

    $ make -i sandbox LOCAL_FS=true

The sandbox will be available at https://local.ustwo.com:9443/sandbox

### Unit

We're using Mocha + Chai + Sinon to run unit tests against JSDOM as this setup
works well with React and executes fast.

Run the unit tests:

    $ make assets-test

### Integration

To keep setup simple and still be able to test Internet Explorer and mobile
browsers running on real devices, we're running integrations tests using Sauce
Labs with a Sauce Connect tunnel. This unfortunately means that if you want to
be able to run these tests, you'll need to create an account and set up
`SAUCE_USERNAME` and `SAUCE_ACCESS_KEY` as environment variables.

Also to minimise context switching, we're running our simple sanity testing
suite using Mocha + Chai + Chai Promises + WD.js.

Run the integration tests:

    $ make assets-integration

## Release

We're using Docker Hub and Docker Machine to tag and deploy Docker images, for
more info see [RELEASE.md][12].

## Contribution

To read up on our coding style and general contribution guide, have a look at
[CONTRIBUTING.md][13].

## License

ustwo.com website front end and tools
Copyright (C) 2015 ustwo

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

[1]: https://ustwo.com
[2]: https://en.wikipedia.org/wiki/Single-page_application
[3]: https://facebook.github.io/react/
[4]: http://v2.wp-api.org/
[5]: ./docs/infrastructure.png
[6]: http://caniuse.com/#feat=flexbox
[7]: https://kitematic.com/
[8]: https://docs.docker.com/machine/install-machine/
[9]: https://docs.docker.com/installation/
[10]: https://www.virtualbox.org/wiki/Downloads
[11]: ./docs/MAKE.md
[12]: ./docs/RELEASE.md
[13]: ./CONTRIBUTING.md
