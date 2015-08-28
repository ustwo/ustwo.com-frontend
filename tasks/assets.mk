## Assets tasks ###############################################################
assets_image = ustwo/usweb-assets:$(TAG)
assets_name = $(project_name)_$(TIER)_assets

.PHONY: \
  assets-build \
  assets-compile \
  assets-create \
  assets-css \
  assets-rm \
  assets-save

ifeq ($(TIER), dev)
  assets_volumes := \
    -v $(BASE_PATH)/share/nginx:/usr/share/nginx:ro \
    -v $(BASE_PATH)/etc/nginx/conf.d/dev.conf:/etc/nginx/conf.d/default.conf:ro \
    -v $(BASE_PATH)/etc/nginx/locations:/etc/nginx/locations:ro
endif

ifeq ($(TIER), staging)
  nginx_config := -v $(BASE_PATH)/etc/nginx/conf.d/staging.conf:/etc/nginx/conf.d/default.conf:ro
endif

ifeq ($(TIER), canary)
  nginx_config := -v $(BASE_PATH)/etc/nginx/conf.d/canary.conf:/etc/nginx/conf.d/default.conf:ro
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

assets-compile: compile_cmd = $(if $(VERBOSE), compile-dev, compile)
assets-compile:
	@echo "Compiling assets into share/nginx/assets"
	$(call compile, npm run $(compile_cmd))

assets-css:
	@echo "Compiling assets into share/nginx/assets"
	$(call compile, npm run css)
