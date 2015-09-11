BASE_PATH ?= $(PWD)
VERSION ?= dev
MACHINE_ALIAS ?= ustwosite
IDENTITY_FILE ?= ~/.docker/machine/machines/ustwosite/id_rsa
ANSIBLE_INVENTORY ?= ./etc/ansible/hosts
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

default:
	@echo "$(.VARIABLES)" | tr ' ' "\n" | sort -

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

vault: vault-save
build: app-build assets-build
test: assets-test
push: app-push assets-push
pull: app-pull assets-pull
init: vault-create assets-create app-create proxy-create
clean: proxy-rm app-rm assets-rm vault-rm
init-rm: clean
deploy: clean init
css: assets-css
release: release-create

## Porcelain ##################################################################
seeds: build
infection: push
incubation: pull
offspring: init
extermination: init-rm
love: extermination offspring
stuff: assets-compile


ps:
	@$(DOCKER) ps -a $(project_filters)

stats: quiet_ps := $(shell $(DOCKER) ps -aq $(project_filters))
stats:
	@$(if $(quiet_ps), \
		$(DOCKER) stats --no-stream $(quiet_ps), \
		echo "No containers for $(project_name)")

ls:
	@$(DOCKER) images \
	| $(GREP) $(project_name)

nuke:
	$(DOCKER) images \
	| $(GREP) $(project_name) \
	| $(GREP) $(VERSION) \
	| $(AWK) '{print $$3}' \
	| $(XARGS) $(DOCKER) rmi

deploy-production:
	$(MAKE) -i love \
		PROXY_HTTPS_PORT=443 \
		PROXY_HTTP_PORT=80

deploy-staging: deploy-production

deploy-canary:
	$(MAKE) -i canary-rm canary-create \
		BASE_PATH=/home/ubuntu

absorb:
	git checkout master
	git pull --rebase=preserve origin master
	git checkout $(GIT_BRANCH)
	git rebase master

test:
	echo "Yay"
