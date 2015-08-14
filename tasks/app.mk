## App tasks ##################################################################
image_name := ustwo/ustwo.com-frontend
app_image := $(image_name):$(TAG)
app_version = $(TAG)
app_name = $(project_name)_$(TIER)_app

.PHONY: app-rm app-create app-log app-sh build pull push

ifeq ($(TIER), dev)
  app_volumes = \
    -v $(BASE_PATH)/gulpfile.js:/usr/local/src/gulpfile.js \
    -v $(BASE_PATH)/package.json:/usr/local/src/package.json \
    -v $(BASE_PATH)/src:/usr/local/src/src
  app_cmd = npm run dev
endif

build:
	$(DOCKER) build -t $(app_image) .

pull:
	$(DOCKER) pull $(app_image)

push:
	$(DOCKER) push $(app_image)

app-rm:
	@echo "Removing $(app_name)"
	@$(DOCKER_RM) $(app_name)

app-create:
	@echo "Creating $(app_name)"
	@$(DOCKER_RUN) \
		--name $(app_name) \
		$(app_volumes) \
		--restart always \
		--label project_name=$(project_name) \
		--label tier=$(TIER) \
		--label version=$(app_version) \
		-p 8888:8888 \
		--add-host docker.ustwo.com:172.17.42.1 \
		-e PROXY_HTTPS_PORT=$(PROXY_HTTPS_PORT) \
		$(app_image) \
		$(app_cmd)

app-log:
	$(DOCKER) logs -f $(app_name)

app-sh:
	$(DOCKER_EXEC) $(app_name) /bin/bash

css:
	$(DOCKER_EXEC) $(app_name) npm run css

app-compile:
	$(DOCKER_EXEC) $(app_name) npm run compile

app-assets: app-compile
	$(RM) share/nginx/public
	$(DOCKER_CP) $(app_name):/usr/local/src/public share/nginx/
	$(CP) src/templates/index.html share/nginx/html/index.html
	$(CP) src/assets/favicon.* share/nginx/public/
