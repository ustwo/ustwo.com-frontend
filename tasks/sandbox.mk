## Sandbox tasks ##################################################################
sandbox_id = sandbox
sandbox_image = $(call image_tag,$(sandbox_id),$(VERSION))
sandbox_name = $(project_name)_$(sandbox_id)
sandbox_dockerfile = Dockerfile.$(sandbox_id)

.PHONY: \
  sandbox-rm \
  sandbox-create \
  sandbox-log \
  sandbox-sh \
  sandbox-build \
  sandbox-pull \
  sandbox-push

ifeq ($(LOCAL_FS), true)
  sandbox_volumes = \
    -v $(BASE_PATH)/package.json:/home/ustwo/package.json \
    -v $(BASE_PATH)/src:/home/ustwo/src
endif

sandbox-build:
	$(DOCKER) build -t $(sandbox_image) -f $(sandbox_dockerfile) .

sandbox-pull:
	$(DOCKER) pull $(sandbox_image)

sandbox-push:
	$(DOCKER) push $(sandbox_image)

sandbox-rm:
	@echo "Removing $(sandbox_name)"
	@$(DOCKER_RM) $(sandbox_name)

sandbox-create:
	@echo "Creating $(sandbox_name)"
	@$(DOCKER_RUN) \
		--name $(sandbox_name) \
		$(sandbox_volumes) \
		--restart always \
		$(project_labels) \
		-p 8889:8889 \
		$(docker_host) \
		-e PROXY_HTTPS_PORT=$(PROXY_HTTPS_PORT) \
		$(verbose_flag) \
		$(sandbox_image)

sandbox-log:
	$(DOCKER) logs -f $(sandbox_name)

sandbox-sh:
	$(DOCKER_EXEC) $(sandbox_name) /bin/sh
