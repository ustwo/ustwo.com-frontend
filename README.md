# ustwo.com website

[![Circle CI build status][16]][17]

## Overview

This repository contains all the front end code for the current [ustwo.com][1]
website and the toolset required to build and deploy it.

In order to be able to have full control over all aspects of the website –
including transitions between pages – and to make navigation super fast by not
having to reload the browser, we decided to build the site as a
[single-page application][2]. We chose [React.js][3] as a main JavaScript
technology enabling us to do this, since it has built in support to render
pages on the server side too (called isomorphic rendering). This way we could
keep the initial rendering performance snappy on mobile and let visitors
see content without an extra data loading step which usually happens with most
client side JavaScript framework. To enable server side rendering and to have
proper URLs, we put a small Node backend server behind our app.

Our content management system behind this is a Wordpress instance which doesn't
actually render the pages itself, but instead serves content up via [WP API][4]
through a mixture of standard and customised JSON REST API endpoints, making the
vast majority of the content editable.

## Tech stack

### React SPA

With the current set of challenges and available browser features we found
React.js to be a great solution to templating and events on the UI. The
composability of components with the one way binding and "queryless" event
handling offered by JSX templates is solving the right problems, without trying
to do too much and become a framework. The easy to implement server side
rendering combined with the ability to prevent rerendering on client side (by
internally doing a comparison to the virtual DOM) is also a great feature to
make it a viable solution on mobile.

To make it a single-page application we put Flux Routes and Store behind the
React front end, so that it can take over the navigation from the browser and
load data from Wordpress by itself.

Since we need to precompile JSX anyway, in our quest to minimise the number of
libraries (like Underscore, etc) and push a future-proof way of working with
JavaScript, we adopted a lot of ES6 features by transpiling the code with Babel.

As for the CSS, we're using Sass to be able to split our styles and store them
together with the components. But in general we're trying to minimise the
reliance on Sass language specific features and instead write as much pure CSS
as possible, getting ready for a CSS Next / PostCSS world just as we did with
ES6.

For the animated illustrations on the site we use SVG sequences, controlled by a
small React component. This is unfortunately only possible with inlining SVGs,
but all the static vector symbols are stored in one, external SVG sprite,
polyfilled for old Internet Explorers with [SVG for Everybody][15].

### Node app

Since all the heavy content work is done for is in Wordpress, our Node / Express
app is kept as light as possible. The only two main responsibilities are
delivering fully baked HTML files through running React rendering on the
prefetched content and responding to the same routes as the front end app does.

### Nginx

As we had quite a lot of components (or microservices if you will) to tie
together – multiplied by production + staging + dev environments – we didn't
want to overburden our Node server and decided to put an Nginx proxy in place.

### Build tools

While we started out using Gulp for our frontend builds which was a very
convenient start point for quickly iterating different combination of tools,
in the end we settled on shell scripts using the fastest command line builds of
libraries.

For JavaScript we're using Browserify (plus Persistify caching) to process our
code with Babel and resolve dependencies using Aliasify. Our Sass code is
compiled using SassC with PostCSS's Autoprefixer taking care of vendor
prefixing. All this happens in a dedicated compiler Docker image, so that we can
keep the production application as lean as possible.

To get the Docker environment up and running and to tie all of the above
together, we created a fleet of Makefiles to get some extra flexibility with
shared variables and task composition on top of shell scripting.

### CDN

We have *everything* served up from a CDN, and by that we mean that ustwo.com is
pointed at the CDN URL on a DNS level! Needless to say this guarantees great
load speeds across the globe and at very little cost. Call it the "CDN first"
approach if you will – check out our [blog post about this here](https://ustwo.com/blog/open-sourcing-our-website).

Unless you have a lot of user dependent dynamic content (and it's not feasible
moving these areas to subdomains) the trick is to remove caching from all layers
of the stack, while keeping the client side cache / expiry short (we're using
only 1 hour or effectively one session).

This way the only place you need to worry about and manage cache is the CDN. Of
course for this you need to have a decent CDN which has an API to purge and
prefetch content. At this point all the servers and applications behind can be
scaled down to no cache and minimum resources as they'll only be accessed by the
CDN network for an occasional update.

### The big picture

So here's how all this fits together and creates a working setup with our
WordPress backend and CDN.

[![ustwo.com infrastructure diagram][5]][5]

## Inclusion

### Browser compatibility

We're aiming to support all evergreen browsers (Chrome, Firefox, Edge and Opera
on all platforms), Safari on Mac and iOS, Internet Explorer 10-11 and Android
Browser 4.2-4.4.4.

In case you were wondering, we've chosen these as we wanted to be able to use
[Flexbox][6], and they also happened to conveniently overlap our historical
visitor profiles from Google Analytics.

If you see any misbehaviour with one of these browsers please open an issue!

### Performance

Being a studio which is passionate about delivering a great user experience
everywhere and early champions of mobile, we kept performance in the front of
our minds throughout the process of building the websites.

This means that we are continuously reviewing both hard metrics and perceptual
performance. To get reports and keep an eye on things, we found [GTmetrix][14]
to be a great tool with a generous free tier. It calculates both PageSpeed and
YSlow scores, generates a network waterfall, renders a filmstrip view and sends
an automated report of all these regularly.

There are too many things to list here, but we mentioned a lot of optimisations
throughout this README and might cover some of them specifically in blog posts
later.

### Accessibility

Officially supporting only modern browsers doesn't mean that we ignore people
(and browsers) with special needs.

* We're delivering prerendered HTML, so content is delivered to and rendered on
clients without Javascript (or with overzealous ad blockers)
* Clean, standards compliant markup
* WAI-ARIA tags (TODO: test more comprehensively and with real users)

## Setup

### Docker dependencies

The project is managed via Docker containers. Right now we're using Docker
version 1.9.0 with Docker Machine version 0.5.0.

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

*Note 2*: You need the environment to be set to dev to use Make commands!

### Credentials / Vault

* Open a Terminal window and go to the project folder.

The easiest way is to load the vault image from a tar. If you receive the image
tar from someone in the team just do:

        $ make vault-load VAULT_PATH=path/to/vault-2015.tar

If you do not have access to this tar then you can proceed by generating your
own self-signed certificates.

        $ make vault-generate-cert
        $ make vault-build

*Note*: If you use self-signed certificates you probably want to use your
docker IP (e.g. `docker-machine ip dev`) instead of a custom `ustwo.com`
domain.


## Develop

*Note*: Check the [MAKE.md][11] for an explanation of how the Make
tasks are structured.

* Open a Terminal window and go to the project folder.

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

* Open a Terminal window and go to the project folder.

CSS has extra tasks to speed up the development cycle. `css-watch` starts a
`fswatch` process in _the host machine_ watching any scss or css file under
`scr/app`.

        $ make css-watch

*Note*: `brew install fswatch` to install `fswatch` in your machine.

`sync` starts a dockerised `browser-sync` proxy listening by default to port
`3000`. So you can combine the two:

        $ make -i sync css-watch

Open `http://192.168.99.100:3000` in your browser and start editing scss and
let the toolchain compile and push changes to the browser.

*Note*: `browser-sync` uses a self-signed certificate so using `local.ustwo.com`
or the raw IP will make the browser complain. If you need to overcome this
please add a forward rule to Virtualbox so you can use `http://localhost:3000`.

## Test

* Open a Terminal window and go to the project folder.

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

        $ make assets-unit-test

### Integration

To keep setup simple and still be able to test Internet Explorer and mobile
browsers running on real devices, we're running integrations tests using Sauce
Labs with a Sauce Connect tunnel. This unfortunately means that if you want to
be able to run these tests, you'll need to create an account and set up
`SAUCE_USERNAME` and `SAUCE_ACCESS_KEY` as environment variables.

Also to minimise context switching, we're running our simple sanity testing
suite using Mocha + Chai + Chai Promises + WD.js.

Run the integration tests:

        $ make assets-integration-test

If you need more info on what's happening with the tests, you can either log in
to the Sauce web UI to see the Selenium logs to understand more details about
the browser interactions or run verbose mode locally for more info on the API
requests and their results:

        $ make assets-integration-test VERBOSE=true

TODO: add flow diagram about git branches -> CI, etc

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
[14]: https://gtmetrix.com/
[15]: https://github.com/jonathantneal/svg4everybody
[16]: https://circleci.com/gh/ustwo/ustwo.com-frontend.png?circle-token=6b4747fb91e70c0c1e3050879f6b5eebdf34dec3
[17]: https://circleci.com/gh/ustwo/ustwo.com-frontend
