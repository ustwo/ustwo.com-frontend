## App tasks ##################################################################
app_image = $(image)
app_version = $(TAG)
app_name = $(project_name)_$(TIER)_app

.PHONY: app-rm app-create app-log app-sh

ifeq ($(TIER), dev)
  app_volumes = \
    -v $(BASE_PATH)/gulpfile.js:/usr/local/src/gulpfile.js \
    -v $(BASE_PATH)/package.json:/usr/local/src/package.json \
    -v $(BASE_PATH)/src:/usr/local/src/src
  app_cmd = npm run dev
endif
# app_volumes := $(if $(TIER), "x", "y")

app-rm:
	@echo "Removing $(app_name)"
	@$(DOCKER.rm) $(app_name)

app-create:
	@echo "Creating $(app_name)"
	@$(DOCKER.run) \
		--name $(app_name) \
		$(app_volumes) \
		--restart always \
		--label project_name=$(project_name) \
		--label tier=$(TIER) \
		--label version=$(app_version) \
		$(app_image) \
		$(app_cmd)

app-log:
	$(DOCKER) logs -f $(app_name)

app-sh:
	$(DOCKER.exec) $(app_name) /bin/bash

css:
	$(DOCKER.exec) $(app_name) npm run css

app-compile:
	$(DOCKER.exec) $(app_name) npm run compile

app-assets: app-compile
	$(RM) share/nginx/public
	$(DOCKER.cp) $(app_name):/usr/local/src/public share/nginx/
	$(CP) src/templates/index.html share/nginx/html/index.html
	$(CP) src/assets/favicon.* share/nginx/public/
