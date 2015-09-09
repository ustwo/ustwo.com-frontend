## Compiler tasks ##############################################################
compiler_image := ustwo/usweb-compiler
compiler_name = $(project_name)_compiler

.PHONY: \
  compiler-build

define compile
	$(DOCKER_TASK) \
		-v $(BASE_PATH)/gulpfile.js:/usr/local/src/gulpfile.js \
		-v $(BASE_PATH)/compiler.json:/usr/local/src/package.json \
		-v $(BASE_PATH)/share/nginx/assets:/usr/local/src/public \
		-v $(BASE_PATH)/src:/usr/local/src/src \
		-v $(BASE_PATH)/test:/usr/local/src/test \
		$(compiler_image) $1
endef

compiler-build:
	$(DOCKER) build -t $(compiler_image) -f Dockerfile .


define compileci
	$(DOCKER) run -t \
		-v $(BASE_PATH)/gulpfile.js:/usr/local/src/gulpfile.js \
		-v $(BASE_PATH)/compiler.json:/usr/local/src/package.json \
		-v $(BASE_PATH)/share/nginx/assets:/usr/local/src/public \
		-v $(BASE_PATH)/src:/usr/local/src/src \
		$(compiler_image) $1
endef
