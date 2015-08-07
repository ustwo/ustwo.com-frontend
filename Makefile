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

init-production:
	$(MAKE) init \
		TIER=production \
		PROXY_HTTP_PORT=80 \
		PROXY_HTTPS_PORT=443 \
		BASE_PATH=/home/ubuntu


deploy-production:
	$(MAKE) deploy TIER=production PROXY_HTTP_PORT=80 PROXY_HTTPS_PORT=443

deploy-staging:
	$(MAKE) deploy TIER=staging PROXY_HTTP_PORT=80 PROXY_HTTPS_PORT=443
