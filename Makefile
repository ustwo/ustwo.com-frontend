BASE_PATH ?= $(PWD)
VERSION ?= dev
IDENTITY_FILE ?= ~/.docker/machine/machines/ustwosite/id_rsa
SOURCE_BRANCH ?= master
GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD 2>/dev/null)

project_name := usweb
project_namespace := ustwo/$(project_name)
internal_path := /home/ustwo

## CLI aliases ################################################################
AWK := awk
CP := cp
GIT := git
GREP := grep
CURL := curl
MKDIR := mkdir -p
FSWATCH := fswatch
RM := rm -rf
MV := mv
XARGS := xargs
DOCKER := docker
DOCKER_CP := $(DOCKER) cp
DOCKER_EXEC := $(DOCKER) exec -it
DOCKER_RM := $(DOCKER) rm -vf
DOCKER_PROC := $(DOCKER) run -d
DOCKER_VOLUME := $(DOCKER) create
DOCKER_TASK := $(DOCKER) run --rm -it
# CircleCI fails if you try to remove a container
DOCKER_CI_TASK := $(DOCKER) run -it
ANSIBLE := $(DOCKER_TASK) \
	-v $(IDENTITY_FILE):/root/.ssh/id_rsa \
	-v $(PWD):$(internal_path) \
	-w $(internal_path) \
	ustwo/ansible:1.9.4
ANSIBLE_PLAY := $(ANSIBLE) ansible-playbook -b -v \
	--private-key=/root/.ssh/id_rsa \
	--inventory-file=$(internal_path)/etc/ansible/hosts
###############################################################################

default: build-all

include tasks/*.mk

## Automatic variables ########################################################
#
#  $@ The filename representing the target.
#  $% The filename element of an archive member specification.
#  $< The filename of the first prerequisite.
#  $? The names of all prerequisites that are newer than the target, separated
#     by spaces.
#  $^ The filenames of all the prerequisites, separated by spaces.
#  $+ Similar to $^, this is the names of all the prerequisites separated by
#     spaces, except that $+ includes duplicates.
#  $* The stem of the target filename. A stem is typically a filename without
#     its suffix.
#
###############################################################################

## Porcelain ##################################################################
install: network-create vault-create assets-create app-create sandbox-create diversity-create proxy-create
build-all: compiler-build sandbox-build build
vault: vault-save
build: app-build assets-build sandbox-build
test: assets-unit-test assets-integration-test
push: app-push assets-push sandbox-push
pull: app-pull assets-pull sandbox-pull diversity-pull
clean-no-confirm:
	@$(DOCKER_RM) $(shell $(DOCKER) ps -aq $(project_filters))
	@$(MAKE) network-rm
clean:
	$(call confirm,"Are you sure you want to clean __$(DOCKER_MACHINE_NAME)__?",$(MAKE) -i clean-no-confirm)
deploy: clean-no-confirm install
deploy-production:
	$(MAKE) -i deploy \
		PROXY_HTTPS_PORT=443 \
		PROXY_HTTP_PORT=80
deploy-staging: deploy-production
release: release-create

seeds: build
love: deploy
stuff: assets-compile
css: assets-css
css-watch: assets-css-watch
vendors: assets-vendors
spa: assets-spa
images: assets-images

sandbox: sandbox-rm sandbox-create

## Deprecated  ################################################################
init: install
## Environment  ###############################################################
##
# Lists all containers related to the project.
ps:
	@$(DOCKER) ps -a $(project_filters)
##
# Lists the status of all containers related to the project.
stats: quiet_ps := $(shell $(DOCKER) ps -aq $(project_filters))
stats:
	@$(if $(quiet_ps), \
		$(DOCKER) stats --no-stream $(quiet_ps), \
		echo "No containers for $(project_name)")
##
# Lists all images related to the project.
ls:
	@$(DOCKER) images \
	| $(GREP) $(project_name)
##
# Removes the images for a given version
nuke:
	$(DOCKER) images \
	| $(GREP) $(project_name) \
	| $(GREP) $(VERSION) \
	| $(AWK) '{print $$3}' \
	| $(XARGS) $(DOCKER) rmi
##
# Absorbs changes from a branch (by default: master) and rebases current branch on top of it.
absorb:
	$(GIT) checkout $(SOURCE_BRANCH)
	$(GIT) pull --rebase=preserve origin $(SOURCE_BRANCH)
	$(GIT) checkout $(GIT_BRANCH)
	$(GIT) rebase $(SOURCE_BRANCH)
