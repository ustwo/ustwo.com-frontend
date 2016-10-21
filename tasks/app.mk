## App tasks ##################################################################
app_id = app
app_image = $(call image_tag,$(app_id),$(VERSION))
app_name = $(project_name)_$(app_id)
app_dockerfile = Dockerfile.$(app_id)

.PHONY: \
  app-rm \
  app-create \
  app-log \
  app-sh \
  app-build \
  app-pull \
  app-push

ifeq ("$(LOCAL_FS)", "true")
  app_volumes = \
    -v $(BASE_PATH)/package.app.json:/home/ustwo/package.json \
    -v $(BASE_PATH)/src:/home/ustwo/src
endif

app-build:
	$(DOCKER) build -t $(app_image) -f $(app_dockerfile) .

app-pull:
	$(DOCKER) pull $(app_image)

app-push:
	$(DOCKER) push $(app_image)

app-rm:
	@echo "Removing $(app_name)"
	@$(DOCKER_RM) $(app_name)

app-create:
	@echo "Creating $(app_name)"
	@$(DOCKER_PROC) \
		--name $(app_name) \
		$(app_volumes) \
		--restart always \
		$(project_labels) \
		--net=$(network_name) \
		-e DOCKER_PROXY_HOST=$(proxy_name) \
		$(verbose_flag) \
		$(app_image)

app-log:
	$(DOCKER) logs -f $(app_name)

app-sh:
	$(DOCKER_EXEC) $(app_name) /bin/sh
