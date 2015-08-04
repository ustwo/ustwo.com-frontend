## Proxy tasks ################################################################
PROXY_HTTP_PORT ?= 9080
PROXY_HTTPS_PORT ?= 9443

PROXY_NAME = $(PROJECT_NAME)_$(TIER)_proxy

proxy-rm:
	docker rm -f $(PROXY_NAME)

proxy-create:
	docker run -d \
		--name $(PROXY_NAME) \
		-p $(PROXY_HTTPS_PORT):443 \
		-p $(PROXY_HTTP_PORT):80 \
		--link $(APP_NAME):app \
		--volumes-from $(VAULT_NAME) \
		--label project_name=$(PROJECT_NAME) \
		--label tier=$(TIER) \
		nginx
