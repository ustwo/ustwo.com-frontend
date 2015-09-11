## Compiler tasks #############################################################
compiler_image := ustwo/usweb:compiler
compiler_name = $(project_name)_compiler

.PHONY: \
  compiler-build \
	compiler-push \
	compiler-pull

compiler_volumes = \
  -v $(BASE_PATH)/gulpfile.js:/usr/local/src/gulpfile.js \
  -v $(BASE_PATH)/compiler.json:/usr/local/src/package.json \
  -v $(BASE_PATH)/share/nginx/assets:/usr/local/src/public \
  -v $(BASE_PATH)/src:/usr/local/src/src \

define compile
	$(if $(CI), $(DOCKER_CI_TASK), $(DOCKER_TASK)) \
		$(compiler_volumes) \
		$(compiler_image) $1
endef

compiler-build:
	$(DOCKER) build -t $(compiler_image) -f Dockerfile .

compiler-pull:
	$(DOCKER) pull $(compiler_image)

compiler-push:
	$(DOCKER) push $(compiler_image)
