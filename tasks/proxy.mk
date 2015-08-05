## Proxy tasks ################################################################
PROXY_HTTP_PORT ?= 9080
PROXY_HTTPS_PORT ?= 9443

proxy_image := ustwo/ustwo.com-proxy:$(TAG)
proxy_name := $(project_name)_$(TIER)_proxy

.PHONY: proxy-rm proxy-create proxy-push proxy-pull

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
		$(proxy_image)

proxy-build: app-assets
	docker build \
		-t $(proxy_image) \
		-f Dockerfile.proxy .

proxy-push:
	docker push $(proxy_image)

proxy-pull:
	docker pull $(proxy_image)
