## Diversity Dashboard tasks ##################################################
#
# For more details of how this service works, check the Git repository at:
# https://github.com/ustwo/diversity-dashboard
#
# The Docker image is automatically built as part of the above repository
# release cycle.  From here the only action required is pulling from the
# Docker Hub. For more, https://hub.docker.com/r/ustwo/diversity-dashboard/
#
# The service is proxied by nginx (`usweb_proxy`) when receives a request to
# https://diversity.ustwo.com.  Check etc/nginx/conf.d/default.conf for
# details.
diversity_id = diversity
diversity_image = ustwo/diversity-dashboard
diversity_name = $(project_name)_$(diversity_id)


diversity-pull:
	$(DOCKER) pull $(diversity_image)
.PHONY: diversity-pull

diversity-rm:
	@echo "Removing $(diversity_name)"
	@$(DOCKER_RM) $(diversity_name)
.PHONY: diversity-rm

diversity-create:
	@echo "Creating $(diversity_name)"
	@$(DOCKER_PROC) \
		--name $(diversity_name) \
		--restart always \
		$(project_labels) \
		--net=$(network_name) \
		$(diversity_image)
.PHONY: diversity-create

diversity-log:
	$(DOCKER) logs -f $(diversity_name)
.PHONY: diversity-log

diversity-sh:
	$(DOCKER_EXEC) $(diversity_name) /bin/sh
.PHONY: diversity-sh
