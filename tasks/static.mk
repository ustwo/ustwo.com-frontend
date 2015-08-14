# The name "proxy" prepares the component for the future usage where it will
# proxy API calls as well as serving static files.
STATIC_HTTP_PORT ?= 10080
STATIC_HTTPS_PORT ?= 10443

static_name = $(project_name)_$(TIER)_static

.PHONY: static-create static-rm static-iid

static-create:
	@echo "Creating $(static_name)"
	@$(DOCKER_RUN) \
		--name $(static_name) \
		-p $(STATIC_HTTPS_PORT):443 \
		-p $(STATIC_HTTP_PORT):80 \
		--restart always \
		--add-host docker.ustwo.com:172.17.42.1 \
		--label project_name=$(project_name) \
		--label tier=$(TIER) \
		$(proxy_image)

static-rm:
	@echo "Removing $(static_name)"
	@$(DOCKER_RM) $(static_name)

static-iid:
	$(ANSIBLE_SHELL) \
		-a "docker inspect -f {{'{{'}}.Image{{'}}'}} $(static_name) > static.iid"

# x:
# 	docker $(docker-machine config a) save IMAGE | docker $(docker-machine config b) load
