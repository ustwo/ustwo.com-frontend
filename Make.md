# Makefile guide

The make tasks are structured in layers.  This document describes them from
top to bottom.

This document assumes knowledge of how the Docker containers are connected. A
summary:

There are 5 containers that can be used or created with these tasks:

* vault: Container "volume" wrapping sensitive data (i.e. SSL certificates).
* assets: Container "volume" wrapping all static files (js, css, images and
nginx config).
* app: Container "daemon" running the node.js app.  Compiles html on request.
Mounts the assets volume.
* proxy: Container "daemon" running nginx.  Mounts the vault and the assets
volumes.
* compiler: Container "task" wrapping Gulp, npm and other tasks.  Mounts the
local filesystem as it is only used in development.


## Variables

* `TIER` — dev, staging, canary or production.  Controls in what degree files
are mounted into the Docker containers.
* `BASE_PATH` — Defines the base path to mount files into containers.
* `TAG` — The version of the project.  It is used when building Docker images.
* `VERBOSE` — Affects how css and js are compiled.

## Porcelain tasks

Some porcelain tasks have aliases to make them less boring.  The alias are
between parenthesis.

*Note* All porcelain tasks can be found in [Makefile](./Makefile).

* `deploy` (`love`): Removes any container belonging to the project and tier
and creates new ones.
* `deploy-production`: Same as above with implicit setup for production.
* `deploy-staging`: Same as above with implicit setup for staging.
* `init` (`offspring`): Creates the four Docker containers (vault, proxy, app, assets).
* `init-rm` (`extermination`): Removes the four Docker containers.
* `build` (`seeds`): Builds the node app image and the assets image.
* `push` (`infection`): Pushes the app image and the assets image to the Docker
Hub.
* `pull` (`incubation`): Pulls the app image and the assets images from the
Docker Hub.
* `stats`: Lists the stats for all containers.
* `ps`: Lists the containers for the specified tier.
* `ls`: Lists the images for the current version.
* `nuke`: Removes all images for the given `TAG`.


The following are one-time tasks unless dependencies change.

* `compiler-build`: Creates the compiler Docker image.
* `vault`: Builds the vault and creates a tarball at `build/`.  Requires the
SSL certificates at `./etc/nginx/ssl`.


## Plumbing tasks

*Note* All plumbing tasks can be found in the `tasks` directory under the name
of the image/container it operates.

* `{name}-build`: Compiles a Docker image. `{name}` can be `app`, `assets`,
`compiler` or `vault`.
* `{name}-create: Creates a Docker container. `{name}` can be `app`, `assets`,
`vault` or `proxy`.
* `{name}-rm: Removes a Docker container. `{name}` can be `app`, `assets`,
`vault` or `proxy`.
* `{name}-push`: Pushes a Docker image. `{name}` can be `app` or `assets`.
* `{name}-pull`: Pulls a Docker image. `{name}` can be `app` or `assets`.
* `{name}-log`: Tails the logs for a container. `{name}` can be `app` or `proxy`.
This does not work in production as the logs are stored in `/var/log/syslog`.
* `app-sh`: Opens a shell to inspect the `app` container.
* `assets-compile`: Compiles assets.
* `assets-css`: Compiles css.
