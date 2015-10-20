## Sauce tasks #############################################################
sauce_id = sauce_connect
sauce_name = $(project_name)_$(sauce_id)

.PHONY: \
  sauce-rm \
  sauce-create \
  sauce-log

sauce-rm:
	@echo "Removing $(sauce_name)"
	@$(DOCKER_RM) $(sauce_name)

sauce-create:
	@echo "Creating $(sauce_name)"
ifeq ($(strip $(sauce_available)),)
	@$(DOCKER) run -d \
		--name $(sauce_name) \
		-p 8000:8000 \
		-e SAUCE_USERNAME=$(SAUCE_USERNAME) \
		-e SAUCE_ACCESS_KEY=$(SAUCE_ACCESS_KEY) \
		--link usweb_proxy:local.ustwo.com \
		ustwo/docker-sauce-connect
	# TODO: use something smarter than sleep
	sleep 15
else
	@echo "Skipping creating $(sauce_name) as it's already running!"
endif

sauce-log:
	docker logs -f $(sauce_name)

define sauce_available
	$(shell $(DOCKER) ps -a | $(GREP) $(sauce_name) | $(AWK) '{print $$1}')
endef
