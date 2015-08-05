## Proxy tasks ################################################################
PROXY_HTTP_PORT ?= 9080
PROXY_HTTPS_PORT ?= 9443

proxy_name = $(project_name)_$(TIER)_proxy

.PHONY: proxy-rm proxy-create

proxy-rm:
	@echo "Removing $(proxy_name)"
	@docker rm -f $(proxy_name)

proxy-create:
	@echo "Creating $(proxy_name)"
	@docker run -d \
		--name $(proxy_name) \
		-p $(PROXY_HTTPS_PORT):443 \
		-p $(PROXY_HTTP_PORT):80 \
		--link $(app_name):app \
		--volumes-from $(vault_name) \
		--restart always \
		--label project_name=$(project_name) \
		--label tier=$(TIER) \
		nginx
