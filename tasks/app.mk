## App tasks ##################################################################
app_image = $(image)
app_version = $(TAG)
app_name = $(project_name)_$(TIER)_app

.PHONY: app-rm app-create

ifeq ($(TIER), dev)
  app_volumes = \
    -v $(BASE_PATH)/gulpfile.js:/usr/local/src/gulpfile.js \
    -v $(BASE_PATH)/node_modules:/usr/local/src/node_modules \
    -v $(BASE_PATH)/package.json:/usr/local/src/package.json \
    -v $(BASE_PATH)/src:/usr/local/src/src
endif

app-rm:
	docker rm -f $(app_name)

app-create:
	docker run -d \
		--name $(app_name) \
		$(app_volumes) \
		--label project_name=$(project_name) \
		--label tier=$(TIER) \
		--label version=$(app_version) \
		$(app_image)
