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
  -v $(BASE_PATH)/gulpfile.babel.js:/usr/local/src/gulpfile.babel.js \
  -v $(BASE_PATH)/compiler.json:/usr/local/src/package.json \
  -v $(BASE_PATH)/share/nginx/assets:/usr/local/src/public \
  -v $(BASE_PATH)/test:/usr/local/src/test \
  -v $(BASE_PATH)/src:/usr/local/src/src

define compile
	@$(if $(CI), $(DOCKER_CI_TASK), $(DOCKER_TASK)) \
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
