TIER ?= dev
BASE_PATH ?= $(PWD)
TAG ?= 0.3.4
MACHINE_ALIAS ?= ustwosite
IDENTITY_FILE ?= ~/.docker/machine/machines/ustwosite/id_rsa
ANSIBLE_INVENTORY ?= /etc/ansible/hosts
GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD 2>/dev/null)

project_name := ustwosite
# project_name := usweb

## CLI aliases ################################################################
RM := rm -rf
CP := cp
DOCKER := docker
DOCKER_CP := $(DOCKER) cp
DOCKER_EXEC := $(DOCKER) exec -it
DOCKER_RM := $(DOCKER) rm -f
DOCKER_RUN := $(DOCKER) run -d
DOCKER_VOLUME := $(DOCKER) run
DOCKER_TASK := $(DOCKER) run --rm -it
DOCKER_MACHINE := docker-machine
MACHINE_IP = $(shell $(DOCKER_MACHINE) ip $(MACHINE_ALIAS))
ANSIBLE := ansible
ANSIBLE_SHELL = $(ANSIBLE) $(MACHINE_IP) --become -m shell
ANSIBLE_PLAY := ansible-playbook -b -v --private-key=$(IDENTITY_FILE)
# --inventory-file=$(ANSIBLE_INVENTORY)


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

init: vault-create app-create proxy-create
init-rm: vault-rm app-rm proxy-rm
deploy: app-rm proxy-rm app-create proxy-create

ps:
	@$(DOCKER) ps -a \
		--filter 'label=project_name=$(project_name)' \
		--filter 'label=tier=$(TIER)'

iid-production: TIER := production
iid-production: MACHINE_ALIAS := ustwositepro
iid-production: static-iid

rm-production: TIER := production
rm-production: static-rm

init-production: TIER := production
init-production: MACHINE_ALIAS := ustwositepro
init-production: STATIC_HTTP_PORT := 80
init-production: STATIC_HTTPS_PORT := 443
init-production: static-create static-iid

rollback-production: TIER := production
rollback-production: STATIC_HTTP_PORT := 80
rollback-production: STATIC_HTTPS_PORT := 443
rollback-production: rollback-template

deploy-production: proxy-pull rm-production init-production

# deploy-staging: TIER := staging
# deploy-staging: PROXY_HTTP_PORT := 80
# deploy-staging: PROXY_HTTPS_PORT := 443
# deploy-staging: deploy
deploy-staging:
	$(MAKE) deploy TIER=staging PROXY_HTTPS_PORT=443 PROXY_HTTP_PORT=80

absorb:
	git checkout master
	git pull --rebase origin master
	git checkout $(GIT_BRANCH)
	git rebase master
	git checkout master
	echo $(GIT_BRANCH)
	# git merge --no-ff $(GIT_BRANCH)
