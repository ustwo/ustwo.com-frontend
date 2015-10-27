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

define compile
	$(if $(CI), $(DOCKER_CI_TASK), $(DOCKER_TASK)) \
		$(compiler_volumes) \
		$(verbose_flag) \
		$(cache_flag) \
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
