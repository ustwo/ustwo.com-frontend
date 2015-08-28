## Compiler tasks ##############################################################
compiler_image := ustwo/usweb-compiler:$(TAG)
compiler_version = $(TAG)
compiler_name = $(project_name)_$(TIER)_compiler

.PHONY: \
  compiler-rm \
  compiler-create \
  compiler-build \
  compiler-pull \
  compiler-push

ifeq ($(TIER), dev)
  compiler_volumes = \
    -v $(BASE_PATH)/gulpfile.js:/usr/local/src/gulpfile.js \
    -v $(BASE_PATH)/compiler.json:/usr/local/src/package.json \
    -v $(BASE_PATH)/share/nginx/assets:/usr/local/src/public \
    -v $(BASE_PATH)/src:/usr/local/src/src
endif

define compile
	$(DOCKER_TASK) $(compiler_volumes) $(compiler_image) $1
endef

compiler-build:
	$(DOCKER) build -t $(compiler_image) -f Dockerfile .
