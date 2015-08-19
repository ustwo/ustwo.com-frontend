## Builder tasks ##############################################################
builder_image := ustwo/usweb-builder:$(TAG)
builder_version = $(TAG)
builder_name = $(project_name)_$(TIER)_builder

.PHONY: \
	builder-rm \
	builder-create \
	builder-build \
	builder-pull \
	builder-push

ifeq ($(TIER), dev)
  builder_volumes = \
    -v $(BASE_PATH)/gulpfile.js:/usr/local/src/gulpfile.js \
    -v $(BASE_PATH)/package-builder.json:/usr/local/src/package.json \
    -v $(BASE_PATH)/share/nginx/assets:/usr/local/src/public \
    -v $(BASE_PATH)/src:/usr/local/src/src
endif

define builder-task
	$(DOCKER_TASK) $(builder_volumes) $(builder_image) $1
endef

builder-build:
	$(DOCKER) build -t $(builder_image) -f Dockerfile .

builder-pull:
	$(DOCKER) pull $(builder_image)

builder-push:
	$(DOCKER) push $(builder_image)

builder-rm:
	@echo "Removing $(builder_name)"
	@$(DOCKER_RM) $(builder_name)
