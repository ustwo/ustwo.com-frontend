## Assets tasks ###############################################################
assets_image = ustwo/usweb-assets:$(VERSION)
assets_name = $(project_name)_assets
assets_template = Dockerfile.assets

.PHONY: \
  assets-build \
  assets-compile \
  assets-create \
  assets-css \
  assets-rm \
  assets-save

ifeq ($(LOCAL_FS), true)
  assets_volumes := \
    -v $(BASE_PATH)/share/nginx:/usr/share/nginx:ro \
    -v $(BASE_PATH)/etc/nginx/conf.d/default.conf:/etc/nginx/conf.d/default.conf:ro \
    -v $(BASE_PATH)/etc/nginx/locations:/etc/nginx/locations:ro
endif

assets-build: assets-compile
	$(DOCKER) build -t $(assets_image) -f $(assets_template) .

assets-pull:
	$(DOCKER) pull $(assets_image)

assets-push:
	$(DOCKER) push $(assets_image)

assets-rm:
	@echo "Removing $(assets_name)"
	@$(DOCKER_RM) $(assets_name)

assets-create:
	@echo "Creating $(assets_name)"
	@$(DOCKER_VOLUME) \
		--name $(assets_name) \
		--read-only \
		$(project_labels) \
		$(assets_volumes) \
		$(assets_image)

assets-compile: compile_cmd = $(if $(VERBOSE), compile-dev, compile)
assets-compile:
	@echo "Compiling assets into share/nginx/assets"
	$(call compile, npm run $(compile_cmd))

assets-css:
	@echo "Compiling assets into share/nginx/assets"
	$(call compile, npm run css)
