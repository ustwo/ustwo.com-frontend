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

ifeq ($(LOCAL_FS), true)
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

assets-clean:
	$(RM) share/nginx/assets

assets-compile:
	$(call compile, npm run compile)

assets-images:
	$(call compile, npm run images)

assets-css:
	$(call compile, npm run css)

assets-css-watch:
	$(call compile, npm run css-watch)

assets-vendors:
	$(call compile, npm run vendors)

assets-spa:
	$(call compile, npm run spa)

assets-test:
	$(call compile, npm test)
