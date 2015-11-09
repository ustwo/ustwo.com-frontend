# Release

Since this is more specific part of the project, we're keeping steps related to release in this separate document.

As a general overview we're using Docker Machine to set up our server environments (staging and production) as Docker environments, so it's easy to push images around between local and remote containers.

We're also making use of private Docker Hub repositories to store and distribute builds.

To get a list of infrastructure platforms supported by Docker Machine, have a look at the output of `docker-machine create` (without any more parameters).

## Tag / push images

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

## Deploy to staging

1. Set the right environment

        $ eval $(docker-machine env ustwosite)

2. Pull images

        $ make pull VERSION=1.2.3

3. Deploy

        $ make deploy-staging VERSION=1.2.3

4. Clean old images, keeping only the last known working version in case of rollback

        $ make ls
        $ make nuke VERSION=1.2.2

## Deploy to production

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

6. Purge CDN cache

        $ make cdn-purge

7. Clean old images, keeping only the last known working version in case of rollback

        $ make ls
        $ make nuke VERSION=1.2.2

