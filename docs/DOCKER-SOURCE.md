# Docker Source with Virtualbox

Before the Docker native client we installed docker with homebrew.
Here are the steps for this original setup process.

## Docker dependencies

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

## Docker environment

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
