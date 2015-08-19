define docker_host
	--add-host docker.ustwo.com:172.17.42.1
endef

define project_labels
	--label project_name=$(project_name) \
	--label tier=$(TIER) \
	--label version=$(TAG)
endef

define project_filters
	--filter 'label=project_name=$(project_name)' \
	--filter 'label=tier=$(TIER)'
endef


define warn
	@echo "*********************************************************************"
	@echo "*WARNING* $1"
	@echo "*********************************************************************"
endef
