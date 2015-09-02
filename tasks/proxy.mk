## Proxy tasks ################################################################
PROXY_HTTP_PORT ?= 9080
PROXY_HTTPS_PORT ?= 9443

# proxy_image := ustwo/usweb-proxy:$(TAG)
proxy_image := nginx
proxy_name = $(project_name)_$(TIER)_proxy

.PHONY: \
	proxy-log \
	proxy-create \
	proxy-rm

proxy-rm:
	@echo "Removing $(proxy_name)"
	@$(DOCKER_RM) $(proxy_name)

proxy-log:
	$(DOCKER) logs -f $(proxy_name)

proxy-create:
	@echo "Creating $(proxy_name)"
	@$(DOCKER_RUN) \
		--name $(proxy_name) \
		-p $(PROXY_HTTPS_PORT):443 \
		-p $(PROXY_HTTP_PORT):80 \
		$(docker_host) \
		--volumes-from $(vault_name) \
		--volumes-from $(assets_name) \
		--restart always \
		$(project_labels) \
		$(proxy_image)

# TODO: Remove me when the migration is done
canary-create:
	@echo "Creating canary"
	@$(DOCKER_RUN) \
		--name $(project_name)_canary_proxy \
		-p 9443:443 \
		-p 9080:80 \
		$(docker_host) \
		--volumes-from $(vault_name) \
		--volumes-from $(assets_name) \
		-v $(BASE_PATH)/etc/nginx/conf.d/canary.conf:/etc/nginx/conf.d/default.conf:ro \
		--restart always \
		$(project_labels) \
		$(proxy_image)

canary-rm:
	@echo "Removing canary"
	@$(DOCKER_RM) $(project_name)_canary_proxy


