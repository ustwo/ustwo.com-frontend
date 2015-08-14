
define project_labels
	--label project_name=$(project_name) \
	--label tier=$(TIER) \
	--label version=$(app_version)
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
