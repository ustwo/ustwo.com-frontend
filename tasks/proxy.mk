## Proxy tasks ################################################################
PROXY_HTTP_PORT ?= 9080
PROXY_HTTPS_PORT ?= 9443

proxy_image := ustwo/usweb-proxy:$(TAG)
proxy_name = $(project_name)_$(TIER)_proxy

.PHONY: proxy-rm proxy-create

proxy-build: app-assets
	$(DOCKER) build \
		-t $(proxy_image) \
		-f Dockerfile.proxy .

proxy-push:
	$(DOCKER) push $(proxy_image)

proxy-pull:
	$(DOCKER) pull $(proxy_image)


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
		--add-host docker.ustwo.com:172.17.42.1 \
		--volumes-from $(vault_name) \
		--restart always \
		$(project_labels) \
		$(proxy_image)

# proxy-iid:
# 	$(ANSIBLE_SHELL) \
# 		-a "docker inspect -f {{'{{'}}.Image{{'}}'}} $(proxy_name) > proxy.iid"



# docker $(docker-machine config a) save IMAGE | docker $(docker-machine config b) load
save:
	$(DOCKER) save --output=spa.$(TAG).tar $(proxy_image)

load:
	$(DOCKER) load --input=spa.$(TAG).tar
