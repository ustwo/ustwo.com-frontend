BASE_PATH ?= $(PWD)
VERSION ?= dev
MACHINE_ALIAS ?= ustwosite
IDENTITY_FILE ?= ~/.docker/machine/machines/ustwosite/id_rsa
ANSIBLE_INVENTORY ?= ./etc/ansible/hosts
ABSORB_BRANCH ?= master
GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD 2>/dev/null)

project_name := usweb
project_namespace := ustwo/$(project_name)

## CLI aliases ################################################################
AWK := awk
CP := cp
GIT := git
GREP := grep
MKDIR := mkdir -p
RM := rm -rf
XARGS := xargs
DOCKER := docker
DOCKER_CP := $(DOCKER) cp
DOCKER_EXEC := $(DOCKER) exec -it
DOCKER_RM := $(DOCKER) rm -vf
DOCKER_RUN := $(DOCKER) run -d
DOCKER_VOLUME := $(DOCKER) run
DOCKER_TASK := $(DOCKER) run --rm -it
# CircleCI fails if you try to remove a container
DOCKER_CI_TASK := $(DOCKER) run -it
DOCKER_MACHINE := docker-machine
MACHINE_IP = $(shell $(DOCKER_MACHINE) ip $(MACHINE_ALIAS))
ANSIBLE := ansible
ANSIBLE_SHELL = $(ANSIBLE) $(MACHINE_IP) --become -m shell
ANSIBLE_PLAY := ansible-playbook -b -v \
	--private-key=$(IDENTITY_FILE) \
	--inventory-file=$(ANSIBLE_INVENTORY)
###############################################################################

default: compiler-build build
install: init

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
vault: vault-save
build: app-build assets-build
test: assets-test
push: app-push assets-push
pull: app-pull assets-pull
init: vault-create assets-create app-create proxy-create
clean-no-confirm: proxy-rm app-rm assets-rm vault-rm
clean:
	$(call confirm,"Are you sure you want to clean __$(DOCKER_MACHINE_NAME)__?",$(MAKE) -i clean-no-confirm)
deploy: clean-no-confirm init
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
	git checkout $(ABSORB_BRANCH)
	git pull --rebase=preserve origin $(ABSORB_BRANCH)
	git checkout $(GIT_BRANCH)
	git rebase $(ABSORB_BRANCH)
