TIER ?= dev
BASE_PATH ?= $(PWD)
TAG ?= 1.2.0
MACHINE_ALIAS ?= ustwosite
IDENTITY_FILE ?= ~/.docker/machine/machines/ustwosite/id_rsa
ANSIBLE_INVENTORY ?= ./etc/ansible/hosts
GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD 2>/dev/null)

project_name := usweb

## CLI aliases ################################################################
RM := rm -rf
CP := cp
MKDIR := mkdir -p
DOCKER := docker
DOCKER_CP := $(DOCKER) cp
DOCKER_EXEC := $(DOCKER) exec -it
DOCKER_RM := $(DOCKER) rm -vf
DOCKER_RUN := $(DOCKER) run -d
DOCKER_VOLUME := $(DOCKER) run
DOCKER_TASK := $(DOCKER) run --rm -it
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

# TODO: Prevents breaking Phil's flow
css: assets-css

vault: vault-save
build: app-build assets-build
push: app-push assets-push
pull: app-pull assets-pull
init: vault-create assets-create app-create proxy-create
init-rm: proxy-rm app-rm assets-rm vault-rm
deploy: init-rm init

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
		echo "No containers for $(TIER)")

ls:
	@$(DOCKER) images \
	| grep $(project_name)

nuke:
	$(DOCKER) images \
	| grep $(project_name) \
	| awk '{print $$1":$(TAG)"}' \
	| xargs docker rmi


rm-production: TIER := production
rm-production: init-rm

deploy-production:
	$(MAKE) -i love \
		BASE_PATH=/home/ubuntu \
		TIER=production \
		PROXY_HTTPS_PORT=443 \
		PROXY_HTTP_PORT=80

deploy-canary:
	$(MAKE) -i canary-rm canary-create \
		BASE_PATH=/home/ubuntu \
		TIER=production


# deploy-staging: TIER = staging
# deploy-staging: PROXY_HTTP_PORT = 80
# deploy-staging: PROXY_HTTPS_PORT = 443
# deploy-staging: BASE_PATH = /home/ubuntu
# deploy-staging: deploy
deploy-staging:
	$(MAKE) -i love \
		BASE_PATH=/home/ubuntu \
		TIER=staging \
		PROXY_HTTPS_PORT=443 \
		PROXY_HTTP_PORT=80

absorb:
	git checkout master
	git pull --rebase=preserve origin master
	git checkout $(GIT_BRANCH)
	git rebase master
