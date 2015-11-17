## Compiler tasks #############################################################
compiler_id = compiler
compiler_image := ustwo/usweb:$(compiler_id)
compiler_name = $(project_name)_$(compiler_id)
compiler_dockerfile = Dockerfile.$(compiler_id)

.PHONY: \
  compiler-build \
  compiler-push \
  compiler-pull

compiler_volumes = \
  -v $(BASE_PATH)/package.compiler.json:/home/ustwo/package.json \
  -v $(BASE_PATH)/share/nginx/assets:/home/ustwo/public \
  -v $(BASE_PATH)/test:/home/ustwo/test \
  -v $(BASE_PATH)/src:/home/ustwo/src

# The compiler needs to be part of the shared network **only** when running
# integration tests.
compiler_network = $(if $(INTEGRATION),--net=$(network_name),)

define compile
	$(if $(CI), $(DOCKER_CI_TASK), $(DOCKER_TASK)) \
		$(compiler_volumes) \
		$(verbose_flag) \
		$(cache_flag) \
		$(compiler_network) \
		-e PROXY_NAME=$(proxy_name) \
		-e SAUCE_USERNAME=$(SAUCE_USERNAME) \
		-e SAUCE_ACCESS_KEY=$(SAUCE_ACCESS_KEY) \
		$(compiler_image) $1
endef

compiler-build:
	$(DOCKER) build -t $(compiler_image) -f $(compiler_dockerfile) .

compiler-pull:
	$(DOCKER) pull $(compiler_image)

compiler-push:
	$(DOCKER) push $(compiler_image)

compiler-shell:
	$(DOCKER) run --rm -it \
	$(compiler_volumes) \
	$(verbose_flag) \
	$(compiler_image) \
	sh
