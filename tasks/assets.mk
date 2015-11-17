## Assets tasks ###############################################################
assets_id := assets
assets_image = $(call image_tag,$(assets_id),$(VERSION))
assets_name = $(project_name)_$(assets_id)
assets_dockerfile = Dockerfile.$(assets_id)

.PHONY: \
  assets-build \
  assets-compile \
  assets-create \
  assets-css \
  assets-rm \
  assets-save

ifeq ("$(LOCAL_FS)", "true")
  assets_volumes := \
    -v $(BASE_PATH)/share/nginx:/usr/share/nginx:ro \
    -v $(BASE_PATH)/etc/nginx/conf.d/default.conf:/etc/nginx/conf.d/default.conf:ro \
    -v $(BASE_PATH)/etc/nginx/locations:/etc/nginx/locations:ro
endif

assets-build: assets-compile
	$(DOCKER) build -t $(assets_image) -f $(assets_dockerfile) .

assets-build-ci: assets-compile-ci
	$(DOCKER) build -t $(assets_image) -f $(assets_dockerfile) .


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

# Removes generated files by any assets-% task related to compile.
assets-clean:
	$(RM) share/nginx/assets

# Compiles all assets.
assets-compile:
	@$(call compile, npm run compile)

# Copies images into share/nginx/assets/images
assets-images:
	@$(call compile, npm run images)

# Compiles CSS into share/nginx/assets/css
assets-css:
	@$(call compile, npm run css)

assets-css-watch: assets-css
	@echo "Watching CSS files..."
	@$(FSWATCH) -or -0 -l 0.2 \
		-i \.scss \
		-i \.css \
		$(PWD)/src/app \
	| $(XARGS) -0 -o -n1 -I{} $(call compile, npm run css)

# Compiles SPA vendors into share/nginx/assets/js
assets-vendors:
	@$(call compile, npm run vendors)

# Compiles SPA into share/nginx/assets/js
assets-spa:
	@$(call compile, npm run spa)

# Runs SPA tests
assets-unit-test:
	@$(call compile, npm test)


assets-integration-test: INTEGRATION = true
assets-integration-test: sauce-startup
	@$(call compile, npm run integration $(subst /,-,"$(USER)-$(CIRCLE_BRANCH)"))
