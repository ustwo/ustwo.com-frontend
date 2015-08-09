TIER := dev
BASE_PATH := $(PWD)
TAG := 0.3.3
MACHINE_ALIAS := ustwosite

project_name := ustwosite
# project_name := usweb

## CLI aliases ################################################################
RM := rm -rf
CP := cp
DOCKER := docker
DOCKER.cp := $(DOCKER) exec -it
DOCKER.exec := $(DOCKER) exec -it
DOCKER.rm := $(DOCKER) rm -rf
DOCKER.run := $(DOCKER) run -d
DOCKER.task := $(DOCKER) run --rm -it
DOCKER_MACHINE := docker-machine
ANSIBLE := ansible
ANSIBLE.play := ansible-playbook
ANSIBLE.shell = $(ANSIBLE) \
	$$(docker-machine ip $(MACHINE_ALIAS)) \
	--become -m shell
###############################################################################

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

include tasks/app.mk
include tasks/build.mk
include tasks/provision.mk
include tasks/proxy.mk
include tasks/static.mk
include tasks/vault.mk


init: vault-create app-create proxy-create
init-rm: vault-rm app-rm proxy-rm
deploy: app-rm proxy-rm app-create proxy-create

ps:
	@echo $(DOCKER) ps -a \
		--filter 'label=project_name=$(project_name)' \
		--filter 'label=tier=$(TIER)'

iid-production:
	$(MAKE) static-iid TIER=production MACHINE_ALIAS=ustwositepro

rm-production:
	$(MAKE) static-iid static-rm \
		TIER=production \
		MACHINE_ALIAS=ustwositepro

init-production:
	$(MAKE) static-create \
		TIER=production \
		PROXY_HTTP_PORT=80 \
		PROXY_HTTPS_PORT=443

rollback-production:
	@$(MAKE) rollback-template \
		TIER=production \
		PROXY_HTTP_PORT=80 \
		PROXY_HTTPS_PORT=443

deploy-production:
	$(MAKE) deploy TIER=production PROXY_HTTP_PORT=80 PROXY_HTTPS_PORT=443

deploy-staging:
	$(MAKE) deploy TIER=staging PROXY_HTTP_PORT=80 PROXY_HTTPS_PORT=443
