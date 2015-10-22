## Sauce tasks #############################################################
sauce_id = sauce_connect
sauce_name = $(project_name)_$(sauce_id)

.PHONY: \
  sauce-rm \
  sauce-create \
  sauce-startup \
  sauce-log

sauce-rm:
	@echo "Removing $(sauce_name)"
	@$(DOCKER_RM) $(sauce_name)

sauce-create:
	@echo "Creating $(sauce_name)"
	@$(DOCKER) run -d \
		--name $(sauce_name) \
		-p 8000:8000 \
		-e SAUCE_USERNAME=$(SAUCE_USERNAME) \
		-e SAUCE_ACCESS_KEY=$(SAUCE_ACCESS_KEY) \
		--link $(proxy_name):local.ustwo.com \
		ustwo/docker-sauce-connect
	# TODO: use something smarter than sleep
	sleep 15

sauce_available = $(shell $(DOCKER) ps -a | $(GREP) $(sauce_name) | $(AWK) '{print $$1}')

sauce-startup:
ifeq ($(strip $(sauce_available)),)
	@$(MAKE) sauce-create
else
ifeq ($(strip $(shell $(DOCKER) logs $(sauce_name) | $(GREP) 'Connection closed' | $(AWK) '{print $$1}')),)
	@echo "Skipping creating $(sauce_name) as it's already running"
else
	@echo "Sauce Connect container is running, but tunnel has been closed"
	@$(MAKE) sauce-rm
	@$(MAKE) sauce-create
endif
endif

sauce-log:
	@$(DOCKER) logs -f $(sauce_name)

