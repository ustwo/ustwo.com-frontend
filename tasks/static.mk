# The name "proxy" prepares the component for the future usage where it will
# proxy API calls as well as serving static files.
STATIC_HTTP_PORT ?= 10080
STATIC_HTTPS_PORT ?= 10443

proxy_image := ustwo/usweb-proxy:$(TAG)
static_name = $(project_name)_$(TIER)_static

.PHONY: static-create static-rm static-iid static-push static-pull

proxy-build: app-assets
	$(DOCKER) build \
		-t $(proxy_image) \
		-f Dockerfile.proxy .

proxy-push:
	$(DOCKER) push $(proxy_image)

proxy-pull:
	$(DOCKER) pull $(proxy_image)

static-create:
	@echo "Creating $(static_name)"
	@$(DOCKER_RUN) \
		--name $(static_name) \
		-p $(STATIC_HTTPS_PORT):443 \
		-p $(STATIC_HTTP_PORT):80 \
		--restart always \
		--label project_name=$(project_name) \
		--label tier=$(TIER) \
		$(proxy_image)

static-rm:
	@echo "Removing $(static_name)"
	@$(DOCKER_RM) $(static_name)

static-iid:
	$(ANSIBLE_SHELL) \
		-a "docker inspect -f {{'{{'}}.Image{{'}}'}} $(static_name) > static.iid"

rollback-template:
	@echo $(DOCKER_RUN) \
		--name $(static_name) \
		-p $(PROXY_HTTPS_PORT):443 \
		-p $(PROXY_HTTP_PORT):80 \
		--restart always \
		--label project_name=$(project_name) \
		--label tier=$(TIER) \
		$(proxy_image)
