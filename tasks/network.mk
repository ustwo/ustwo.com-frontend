## Network tasks ##############################################################
network_name = usweb

.PHONY: \
  network-create \
  network-rm \
  network-ls

network-create:
	@$(DOCKER) network create $(network_name)

network-rm:
	@$(DOCKER) network rm $(network_name)

network-ls:
	@$(DOCKER) network ls
