## App tasks ##################################################################
image_name := ustwo/usweb-app
app_image := $(image_name):$(VERSION)
app_name = $(project_name)_app

.PHONY: \
  app-rm \
  app-create \
  app-log \
  app-sh \
  app-build \
  app-pull \
  app-push

ifeq ($(LOCAL_FS), true)
  app_volumes = \
    -v $(BASE_PATH)/package.json:/usr/local/src/package.json \
    -v $(BASE_PATH)/src:/usr/local/src/src
endif
ifeq ($(VERBOSE), true)
  verbosity = -e VERBOSE=true
endif

app-build:
	$(DOCKER) build -t $(app_image) -f Dockerfile.app .

app-pull:
	$(DOCKER) pull $(app_image)

app-push:
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
		$(project_labels) \
		-p 8888:8888 \
		$(docker_host) \
		-e PROXY_HTTPS_PORT=$(PROXY_HTTPS_PORT) \
		$(verbosity) \
		$(app_image)

app-log:
	$(DOCKER) logs -f $(app_name)

app-sh:
	$(DOCKER_EXEC) $(app_name) /bin/bash
