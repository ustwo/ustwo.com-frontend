## Network tasks ##############################################################
network_name = usweb

# WARNING: in test
# net-install: net-create-app app-create
net-install:
	$(DOCKER) network connect $(network_name) $(proxy_name)


net-create-app:
	$(DOCKER) network create $(network_name)


net-ls:
	@$(DOCKER) network ls
