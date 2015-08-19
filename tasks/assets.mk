## Assets tasks ###############################################################
assets_image = ustwo/usweb-assets:$(TAG)
assets_name = $(project_name)_$(TIER)_assets

.PHONY: \
	assets-build \
	assets-create \
	assets-rm \
	assets-save

ifeq ($(TIER), dev)
  assets_volumes = -v $(BASE_PATH)/share/nginx:/usr/share/nginx:ro
endif

assets-rm:
	@echo "Removing $(assets_name)"
	@$(DOCKER_RM) $(assets_name)

assets-create:
	@echo "Creating $(assets_name)"
	@$(DOCKER_VOLUME) \
		--name $(assets_name) \
		$(project_labels) \
		$(assets_volumes) \
		$(assets_image)

assets-build: assets-compile
	$(DOCKER) build -t $(assets_image) -f Dockerfile.assets .

assets-compile: compile_cmd = $(if $(VVV), compile-dev, compile)
assets-compile:
	@echo "Compiling assets into share/nginx/assets"
	$(DOCKER_TASK) \
		$(builder_volumes) \
		$(builder_image) \
		npm run $(compile_cmd)

assets-css:
	@echo "Compiling assets into share/nginx/assets"
	$(call builder-task, npm run css)
