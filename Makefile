TIER := dev
BASE_PATH := $(PWD)
TAG := 0.3.3

project_name := ustwosite

include tasks/app.mk
include tasks/build.mk
include tasks/provision.mk
include tasks/proxy.mk
include tasks/vault.mk


init: vault-create app-create proxy-create
init-rm: vault-rm app-rm proxy-rm
deploy: app-rm proxy-rm app-create proxy-create

ps:
	@docker ps -a \
		--filter 'label=project_name=$(project_name)' \
		--filter 'label=tier=$(TIER)'

static_name := $(project_name)_$(TIER)_static
static-create:
	@echo "Creating $(static_name)"
	@docker run -d \
		--name $(static_name) \
		-p $(PROXY_HTTPS_PORT):443 \
		-p $(PROXY_HTTP_PORT):80 \
		--restart always \
		--label project_name=$(project_name) \
		--label tier=$(TIER) \
		$(proxy_image)
static-rm:
	@echo "Removing $(static_name)"
	@docker rm -f $(static_name)


static-iid:
	ansible $$(docker-machine ip $(MACHINE_ALIAS)) \
		--become \
		-m shell \
		-a "docker inspect -f {{'{{'}}.Image{{'}}'}} $(static_name) > static.iid"

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

rollback-template:
	@echo docker run -d \
		--name $(static_name) \
		-p $(PROXY_HTTPS_PORT):443 \
		-p $(PROXY_HTTP_PORT):80 \
		--restart always \
		--label project_name=$(project_name) \
		--label tier=$(TIER) \
		$(proxy_image)

rollback-production:
	@$(MAKE) rollback-template \
		TIER=production \
		PROXY_HTTP_PORT=80 \
		PROXY_HTTPS_PORT=443


deploy-production:
	$(MAKE) deploy TIER=production PROXY_HTTP_PORT=80 PROXY_HTTPS_PORT=443

deploy-staging:
	$(MAKE) deploy TIER=staging PROXY_HTTP_PORT=80 PROXY_HTTPS_PORT=443
