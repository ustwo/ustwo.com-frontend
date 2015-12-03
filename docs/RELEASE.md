# Release

Since this is more specific part of the project, we're keeping steps related to
release in this separate document.

As a general overview locally we're using Docker Machine to set up and control
the environment, but due to some bugs in 0.5.0 at the moment on staging and
production you need to log in via SSH manually and run the make commands inside.

We're also making use of private Docker Hub repositories to store and distribute
tagged images, built on CI.

*IMPORTANT*: you have to be added to the ustwo organisation and logged in to
Docker Hub (`docker login`) in order to be able to deploy!

To get a list of infrastructure platforms supported by Docker Machine, have a
look at the output of `docker-machine create` (without any more parameters).

In order to be able to access the staging and production environments you'll
need to have your SSH public key added by someone in the team. As for the CDN
commands, you need to set up `CDN77_LOGIN` and `CDN77_API_KEY` as environment
variables.

## Tag / push images

If the commit you are releasing from has been picked up by CircleCI (so you have
a snapshot available `ustwo/usweb:app-{git hash}`) you can release with:

        $ make release VERSION=1.2.3
        $ git push --tags origin master

If not, do it manually (only for emergencies when you cannot wait for the
CircleCI build):

1. Tag the release

        $ make release-tag-create VERSION=1.2.3
        $ git push --tags origin master

2. Build fresh Docker images

        $ make build VERSION=1.2.3

3. Publish the release

        $ make push VERSION=1.2.3

## Deploy to staging

1. Log in using SSH

        $ ssh <staging-machine>

2. Pull images

        $ sudo make pull VERSION=1.2.3

3. Deploy

        $ sudo make deploy-staging VERSION=1.2.3

4. Clean old images, keeping the last known working version in case of rollback

        $ sudo make ls
        $ sudo make nuke VERSION=1.2.1

5. Exit SSH

        $ exit

6. Purge CDN cache

        $ make cdn-purge-staging

## Deploy to production

It assumes you followed the staging flow so the tagged images are available in
the Docker Hub.

1. Deploy in your local environment

        $ make -i love VERSION=1.2.3

2. Test deployment

        $ open https://local.ustwo.com:9443

3. Log in using SSH

        $ ssh <production-machine>

4. Pull images

        $ sudo make pull VERSION=1.2.3

5. Deploy

        $ sudo make deploy-production VERSION=1.2.3

6. Clean old images, keeping the last known working version in case of rollback

        $ sudo make ls
        $ sudo make nuke VERSION=1.2.1

7. Exit SSH

        $ exit

8. Purge CDN cache

        $ make cdn-purge-production

9. After waiting and making sure the CDN purge happened, warm the cache up for
all pages

        $ make cdn-prefetch-production

