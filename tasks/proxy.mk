## Proxy tasks ################################################################
PROXY_HTTP_PORT ?= 9080
PROXY_HTTPS_PORT ?= 9443

proxy_image := nginx:1.9.4
proxy_name = $(project_name)_proxy

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
	@$(DOCKER_PROC) \
		--name $(proxy_name) \
		-p $(PROXY_HTTPS_PORT):443 \
		-p $(PROXY_HTTP_PORT):80 \
		$(docker_host) \
		--volumes-from $(vault_name) \
		--volumes-from $(assets_name) \
		--restart always \
		$(project_labels) \
		$(proxy_image)
