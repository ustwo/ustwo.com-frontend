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

# TODO add error checking and return with error or retry when Sauce Connect is unable to establish connection
define wait_for_sauce
@echo "Waiting for Sauce Connect tunnel to be ready..."
while [ -z "`$(DOCKER) logs $(sauce_name) | $(GREP) 'Sauce Connect is up, you may start your tests'`" ] ; do \
	sleep 1 ; \
done;
endef

sauce-create:
	@echo "Creating $(sauce_name)"
	@$(DOCKER) run -d \
		--name $(sauce_name) \
		-p 8000:8000 \
		--net=$(network_name) \
		$(project_labels) \
		ustwo/sauce-connect:4.4 \
		-P 8000 -u $(SAUCE_USERNAME) -k $(SAUCE_ACCESS_KEY) --tunnel-identifier $(subst /,-,"$(USER)-$(CIRCLE_BRANCH)") $(if $(CI),,--no-ssl-bump-domains *.ustwo.com)
	@$(call wait_for_sauce)

define wait_for_node
@echo "Waiting for Node app to be ready..."
while [ -z "`$(DOCKER) logs $(app_name) | $(GREP) 'up and running'`" ] ; do \
	sleep 1 ; \
done;
endef

sauce_available = $(shell $(DOCKER) ps -a | $(GREP) $(sauce_name))

sauce-startup:
	@$(call wait_for_node)
ifeq ($(strip $(sauce_available)),)
	@$(MAKE) sauce-create
else
ifeq ($(strip $(shell $(DOCKER) logs $(sauce_name) | $(GREP) 'Connection closed\|Shutting down\|Cleaning up\|could not establish a connection')),)
	@echo "Skipping creating $(sauce_name) as it's already running"
else
	@echo "Sauce Connect container is running, but tunnel has been closed"
	@$(MAKE) sauce-rm sauce-create
endif
endif

sauce-log:
	@$(DOCKER) logs -f $(sauce_name)

sauce-sh:
	$(DOCKER_EXEC) $(sauce_name) /bin/sh
