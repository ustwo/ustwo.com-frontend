define docker_host
	--add-host docker.ustwo.com:172.17.42.1
endef

define project_labels
	--label project_name=$(project_name) \
	--label version=$(VERSION)
endef

define project_filters
	--filter 'label=project_name=$(project_name)'
endef


define warn
	@echo "*********************************************************************"
	@echo "*WARNING* $1"
	@echo "*********************************************************************"
endef
